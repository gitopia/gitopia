package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
)

func ElementExists(s []uint64, val uint64) (int, bool) {
	for i, v := range s {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func (k msgServer) CreateRepository(goCtx context.Context, msg *types.MsgCreateRepository) (*types.MsgCreateRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var o Owner
	if err := json.Unmarshal([]byte(msg.Owner), &o); err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "unable to unmarshal owner")
	}

	var user types.User
	var organization types.Organization
	if o.Type == "User" {
		if msg.Creator != o.ID {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "owner and creator mismatched")
		}

		if !k.HasUser(ctx, o.ID) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", o.ID))
		}

		// Checks if the the msg sender is the same as the current owner
		if msg.Creator != k.GetUserOwner(ctx, msg.Creator) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
		}

		user = k.GetUser(ctx, o.ID)

		if _, exists := utils.UserRepositoryExists(user.Repositories, msg.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", msg.Name))
		}
	} else if o.Type == "Organization" {
		orgId, err := strconv.ParseUint(o.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, orgId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", o.ID))
		}

		organization = k.GetOrganization(ctx, orgId)

		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
			if organization.Members[i].Role != "Owner" {
				return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
			}
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a part of organization", msg.Creator))
		}

		if _, exists := utils.OrganizationRepositoryExists(organization.Repositories, msg.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", msg.Name))
		}
	}

	createdAt := time.Now().Unix()
	updatedAt := createdAt
	defaultBranch := string("master")

	var repository = types.Repository{
		Creator:       msg.Creator,
		Name:          msg.Name,
		Owner:         msg.Owner,
		Description:   msg.Description,
		DefaultBranch: defaultBranch,
		CreatedAt:     createdAt,
		UpdatedAt:     updatedAt,
		Fork:          false,
		IssuesCount:   0,
		PullsCount:    0,
	}

	id := k.AppendRepository(
		ctx,
		repository,
	)

	// Update user/organization repositories
	if o.Type == "User" {
		var userRepository = types.UserRepository{
			Name: repository.Name,
			Id:   id,
		}
		user.Repositories = append(user.Repositories, &userRepository)

		k.SetUser(ctx, user)
	} else if o.Type == "Organization" {
		var organizationRepository = types.OrganizationRepository{
			Name: repository.Name,
			Id:   id,
		}
		organization.Repositories = append(organization.Repositories, &organizationRepository)

		k.SetOrganization(ctx, organization)
	}

	return &types.MsgCreateRepositoryResponse{
		Id:   id,
		Name: repository.Name,
	}, nil
}

func (k msgServer) ChangeOwner(goCtx context.Context, msg *types.MsgChangeOwner) (*types.MsgChangeOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasRepository(ctx, msg.RepositoryId) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository %d doesn't exist", msg.RepositoryId))
	}

	currentOwner, err := k.GetRepositoryOwner(ctx, msg.RepositoryId)
	if err != nil {
		return nil, err
	}

	var newOwner Owner
	if err := json.Unmarshal([]byte(msg.Owner), &newOwner); err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "unable to unmarshal owner")
	}

	repository := k.GetRepository(ctx, msg.RepositoryId)

	var currentUser types.User
	var newUser types.User
	var currentOrganization types.Organization
	var newOrganization types.Organization

	var havePermission bool = false

	if currentOwner.Type == "User" {
		if msg.Creator == currentOwner.ID {
			havePermission = true
		}

		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.Creator); exists {
			if repository.Collaborators[i].Permission == "Admin" || havePermission {
				havePermission = true
			}
		}

		if !havePermission {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}

		currentUser = k.GetUser(ctx, currentOwner.ID)

		if i, exists := utils.UserRepositoryExists(currentUser.Repositories, repository.Name); exists {
			currentUser.Repositories = append(currentUser.Repositories[:i], currentUser.Repositories[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) doesn't exists in currentUser repositories", repository.Name))
		}
	} else if currentOwner.Type == "Organization" {
		currentOwnerId, err := strconv.ParseUint(currentOwner.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}

		currentOrganization = k.GetOrganization(ctx, currentOwnerId)

		if i, exists := utils.OrganizationMemberExists(currentOrganization.Members, msg.Creator); exists {
			if currentOrganization.Members[i].Role == "Owner" {
				havePermission = true
			}
		}

		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.Creator); exists {
			if repository.Collaborators[i].Permission == "Admin" || havePermission {
				havePermission = true
			}
		}

		if !havePermission {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}

		if i, exists := utils.OrganizationRepositoryExists(currentOrganization.Repositories, repository.Name); exists {
			currentOrganization.Repositories = append(currentOrganization.Repositories[:i], currentOrganization.Repositories[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) doesn't exists in currentOrganization repositories", repository.Name))
		}
	}

	if newOwner.Type == "User" {
		if !k.HasUser(ctx, newOwner.ID) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", newOwner.ID))
		}

		newUser = k.GetUser(ctx, newOwner.ID)

		if _, exists := utils.UserRepositoryExists(newUser.Repositories, repository.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", repository.Name))
		}

		var newUserRepository = types.UserRepository{
			Name: repository.Name,
			Id:   repository.Id,
		}
		newUser.Repositories = append(newUser.Repositories, &newUserRepository)
	} else if newOwner.Type == "Organization" {
		newOwnerId, err := strconv.ParseUint(newOwner.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, newOwnerId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", newOwner.ID))
		}

		newOrganization = k.GetOrganization(ctx, newOwnerId)

		if _, exists := utils.OrganizationRepositoryExists(newOrganization.Repositories, repository.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", repository.Name))
		}

		var newOrganizationRepository = types.OrganizationRepository{
			Name: repository.Name,
			Id:   repository.Id,
		}
		newOrganization.Repositories = append(newOrganization.Repositories, &newOrganizationRepository)
	}

	repository.Owner = msg.Owner

	k.SetRepository(ctx, repository)

	if currentOwner.Type == "User" {
		k.SetUser(ctx, currentUser)
	} else if currentOwner.Type == "Organization" {
		k.SetOrganization(ctx, currentOrganization)
	}

	if newOwner.Type == "User" {
		k.SetUser(ctx, newUser)
	} else if newOwner.Type == "Organization" {
		k.SetOrganization(ctx, newOrganization)
	}

	return &types.MsgChangeOwnerResponse{}, nil
}

func (k msgServer) ForkRepository(goCtx context.Context, msg *types.MsgForkRepository) (*types.MsgForkRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasRepository(ctx, msg.RepositoryId) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository %d doesn't exist", msg.RepositoryId))
	}

	var o Owner
	if err := json.Unmarshal([]byte(msg.Owner), &o); err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "unable to unmarshal owner")
	}

	repository := k.GetRepository(ctx, msg.RepositoryId)

	var user types.User
	var organization types.Organization
	if o.Type == "User" {
		if msg.Creator != o.ID {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "owner and creator mismatched")
		}

		if !k.HasUser(ctx, o.ID) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", o.ID))
		}

		// Checks if the the msg sender is the same as the current owner
		if msg.Creator != k.GetUserOwner(ctx, msg.Creator) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
		}

		user = k.GetUser(ctx, o.ID)
		if _, exists := utils.UserRepositoryExists(user.Repositories, repository.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", repository.Name))
		}
	} else if o.Type == "Organization" {
		orgId, err := strconv.ParseUint(o.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, orgId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", o.ID))
		}

		organization = k.GetOrganization(ctx, orgId)

		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
			if organization.Members[i].Role != "Owner" {
				return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
			}
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a part of organization", msg.Creator))
		}

		if _, exists := utils.OrganizationRepositoryExists(organization.Repositories, repository.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", repository.Name))
		}
	}

	createdAt := time.Now().Unix()

	var forkRepo = types.Repository{
		Creator:       msg.Creator,
		Name:          repository.Name,
		Owner:         msg.Owner,
		Description:   repository.Description,
		Branches:      repository.Branches,
		DefaultBranch: repository.DefaultBranch,
		CreatedAt:     createdAt,
		UpdatedAt:     createdAt,
		Fork:          true,
		Parent:        msg.RepositoryId,
		License:       repository.License,
		Commits:       repository.Commits,
	}

	id := k.AppendRepository(
		ctx,
		forkRepo,
	)

	// Update user/organization repositories
	if o.Type == "User" {
		var userRepository = types.UserRepository{
			Name: repository.Name,
			Id:   id,
		}
		user.Repositories = append(user.Repositories, &userRepository)

		k.SetUser(ctx, user)
	} else if o.Type == "Organization" {
		var organizationRepository = types.OrganizationRepository{
			Name: repository.Name,
			Id:   id,
		}
		organization.Repositories = append(organization.Repositories, &organizationRepository)

		k.SetOrganization(ctx, organization)
	}

	// Update parent repository forks
	repository.Forks = append(repository.Forks, id)
	k.SetRepository(ctx, repository)

	return &types.MsgForkRepositoryResponse{
		Id: id,
	}, nil
}

func (k msgServer) RenameRepository(goCtx context.Context, msg *types.MsgRenameRepository) (*types.MsgRenameRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}

	repository := k.GetRepository(ctx, msg.Id)

	var havePermission bool = false

	if owner.Type == "User" {
		if !k.HasUser(ctx, owner.ID) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", owner.ID))
		}

		if msg.Creator == owner.ID {
			havePermission = true
		}
		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.Creator); exists {
			if repository.Collaborators[i].Permission == "Admin" || havePermission {
				havePermission = true
			}
		}
		if !havePermission {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}

		user := k.GetUser(ctx, owner.ID)

		if i, exists := utils.UserRepositoryExists(user.Repositories, msg.Name); !exists {
			user.Repositories = append(user.Repositories[:i], user.Repositories[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository with name (%v) already exists", msg.Name))
		}

		var userRepository = types.UserRepository{
			Name: msg.Name,
			Id:   repository.Id,
		}
		user.Repositories = append(user.Repositories, &userRepository)

		k.SetUser(ctx, user)
	} else if owner.Type == "Organization" {
		orgId, err := strconv.ParseUint(owner.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, orgId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", owner.ID))
		}

		organization := k.GetOrganization(ctx, orgId)

		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
			if organization.Members[i].Role == "Owner" {
				havePermission = true
			}
		}

		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.Creator); exists {
			if repository.Collaborators[i].Permission == "Admin" || havePermission {
				havePermission = true
			}
		}

		if !havePermission {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}

		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, msg.Name); !exists {
			organization.Repositories = append(organization.Repositories[:i], organization.Repositories[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository with name (%v) already exists", msg.Name))
		}

		var organizationRepository = types.OrganizationRepository{
			Name: msg.Name,
			Id:   repository.Id,
		}
		organization.Repositories = append(organization.Repositories, &organizationRepository)

		k.SetOrganization(ctx, organization)
	}

	repository.Name = msg.Name

	k.SetRepository(ctx, repository)

	return &types.MsgRenameRepositoryResponse{}, nil
}

func (k msgServer) UpdateRepositoryCollaborator(goCtx context.Context, msg *types.MsgUpdateRepositoryCollaborator) (*types.MsgUpdateRepositoryCollaboratorResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	if !k.HasUser(ctx, msg.User) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.User))
	}

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	repository := k.GetRepository(ctx, msg.Id)

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}

	var havePermission bool = false

	if owner.Type == "User" {
		if msg.Creator == owner.ID {
			havePermission = true
		}
	} else if owner.Type == "Organization" {
		orgId, err := strconv.ParseUint(owner.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, orgId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", owner.ID))
		}

		organization := k.GetOrganization(ctx, orgId)

		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
			if organization.Members[i].Role == "Owner" {
				havePermission = true
			}
		}
	}

	if !havePermission {
		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.Creator); exists {
			if repository.Collaborators[i].Permission == "Admin" {
				havePermission = true
			}
		}
	}

	if !havePermission {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if _, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.User); exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("collaborators with id (%v) already exists", msg.User))
	}

	var repositoryCollaborator = types.RepositoryCollaborator{
		Id:         msg.User,
		Permission: msg.Role,
	}

	repository.Collaborators = append(repository.Collaborators, &repositoryCollaborator)

	k.SetRepository(ctx, repository)

	return &types.MsgUpdateRepositoryCollaboratorResponse{}, nil
}

func (k msgServer) RemoveRepositoryCollaborator(goCtx context.Context, msg *types.MsgRemoveRepositoryCollaborator) (*types.MsgRemoveRepositoryCollaboratorResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	repository := k.GetRepository(ctx, msg.Id)

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}

	var havePermission bool = false

	if owner.Type == "User" {
		if msg.Creator == owner.ID {
			havePermission = true
		}
	} else if owner.Type == "Organization" {
		orgId, err := strconv.ParseUint(owner.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, orgId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", owner.ID))
		}

		organization := k.GetOrganization(ctx, orgId)

		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
			if organization.Members[i].Role == "Owner" {
				havePermission = true
			}
		}
	}

	if !havePermission {
		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.Creator); exists {
			if repository.Collaborators[i].Permission == "Admin" {
				havePermission = true
			}
		}
	}

	if !havePermission {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.User); exists {
		repository.Collaborators = append(repository.Collaborators[:i], repository.Collaborators[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("collaborators with id (%v) doesn't exists", msg.User))
	}

	k.SetRepository(ctx, repository)

	return &types.MsgRemoveRepositoryCollaboratorResponse{}, nil
}

func (k msgServer) CreateBranch(goCtx context.Context, msg *types.MsgCreateBranch) (*types.MsgCreateBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	var repository = k.GetRepository(ctx, msg.Id)

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}

	var havePermission bool = false

	if owner.Type == "User" {
		if msg.Creator == owner.ID {
			havePermission = true
		}
	} else if owner.Type == "Organization" {
		orgId, err := strconv.ParseUint(owner.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, orgId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", owner.ID))
		}

		organization := k.GetOrganization(ctx, orgId)

		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
			if organization.Members[i].Role == "Owner" {
				havePermission = true
			}
		}
	}

	if !havePermission {
		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.Creator); exists {
			if repository.Collaborators[i].Permission == "Admin" {
				havePermission = true
			}
		}
	}

	if !havePermission {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if i, exists := utils.RepositoryBranchExists(repository.Branches, msg.Name); exists {
		repository.Branches[i].Sha = msg.CommitSHA
	} else {
		var repositoryBranch = types.RepositoryBranch{
			Name: msg.Name,
			Sha:  msg.CommitSHA,
		}
		repository.Branches = append(repository.Branches, &repositoryBranch)
	}

	k.SetRepository(ctx, repository)

	return &types.MsgCreateBranchResponse{}, nil
}

func (k msgServer) SetDefaultBranch(goCtx context.Context, msg *types.MsgSetDefaultBranch) (*types.MsgSetDefaultBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	var repository = k.GetRepository(ctx, msg.Id)

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}

	var havePermission bool = false

	if owner.Type == "User" {
		if msg.Creator == owner.ID {
			havePermission = true
		}
	} else if owner.Type == "Organization" {
		orgId, err := strconv.ParseUint(owner.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, orgId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", owner.ID))
		}

		organization := k.GetOrganization(ctx, orgId)

		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
			if organization.Members[i].Role == "Owner" {
				havePermission = true
			}
		}
	}

	if !havePermission {
		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.Creator); exists {
			if repository.Collaborators[i].Permission == "Admin" {
				havePermission = true
			}
		}
	}

	if !havePermission {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if i, exists := utils.RepositoryBranchExists(repository.Branches, msg.Name); exists {
		repository.DefaultBranch = repository.Branches[i].Name
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch (%v) doesn't exist", msg.Name))
	}

	k.SetRepository(ctx, repository)

	return &types.MsgSetDefaultBranchResponse{}, nil
}

func (k msgServer) DeleteBranch(goCtx context.Context, msg *types.MsgDeleteBranch) (*types.MsgDeleteBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	var repository = k.GetRepository(ctx, msg.Id)

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}
	var havePermission bool = false

	if owner.Type == "User" {
		if msg.Creator == owner.ID {
			havePermission = true
		}
	} else if owner.Type == "Organization" {
		orgId, err := strconv.ParseUint(owner.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, orgId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", owner.ID))
		}

		organization := k.GetOrganization(ctx, orgId)

		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
			if organization.Members[i].Role == "Owner" {
				havePermission = true
			}
		}
	}

	if !havePermission {
		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.Creator); exists {
			if repository.Collaborators[i].Permission == "Admin" {
				havePermission = true
			}
		}
	}

	if !havePermission {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if i, exists := utils.RepositoryBranchExists(repository.Branches, msg.Name); exists {
		if repository.DefaultBranch != repository.Branches[i].Name {

		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch (%v) is default branch", msg.Name))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch (%v) doesn't exist", msg.Name))
	}

	k.SetRepository(ctx, repository)

	return &types.MsgDeleteBranchResponse{}, nil
}

func (k msgServer) UpdateRepository(goCtx context.Context, msg *types.MsgUpdateRepository) (*types.MsgUpdateRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var repository = k.GetRepository(ctx, msg.Id)

	repository.Name = msg.Name
	repository.Description = msg.Description
	repository.Labels = msg.Labels
	repository.UpdatedAt = time.Now().Unix()
	repository.License = msg.License
	repository.DefaultBranch = msg.DefaultBranch

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}
	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != owner.ID {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetRepository(ctx, repository)

	return &types.MsgUpdateRepositoryResponse{}, nil
}

func (k msgServer) DeleteRepository(goCtx context.Context, msg *types.MsgDeleteRepository) (*types.MsgDeleteRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	/*
		owner, err := k.GetRepositoryOwner(ctx, msg.Id)
		if err != nil {
			return nil, err
		}

		var repository = k.GetRepository(ctx, msg.Id)

		if owner.Type == "User" {
			if msg.Creator != owner.ID && repository.Collaborators[msg.Creator] != "Admin" {
				return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
			}
			if !k.HasUser(ctx, owner.ID) {
				return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user %v doesn't exist", owner.ID))
			}

			user := k.GetUser(ctx, owner.ID)

			if _, exists := user.Repositories[repository.Name]; !exists {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v doesn't exist in user %v repositories", repository.Name, owner.ID))
			}
			delete(user.Repositories, repository.Name)

			k.SetUser(ctx, user)
		} else if owner.Type == "Organization" {
			orgId, err := strconv.ParseUint(owner.ID, 10, 64)
			if err != nil {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
			}
			if !k.HasOrganization(ctx, orgId) {
				return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization %v doesn't exist", owner.ID))
			}

			organization := k.GetOrganization(ctx, orgId)

			if organization.Members[msg.Creator] != "Owner" && repository.Collaborators[msg.Creator] != "Admin" {
				return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user %v doesn't have permission to perform this operation", msg.Creator))
			}

			if _, exists := organization.Repositories[repository.Name]; !exists {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v doesn't exist in organization %v repositories", repository.Name, organization.Name))
			}

			delete(organization.Repositories, repository.Name)

			k.SetOrganization(ctx, organization)
		}
	*/

	k.RemoveRepository(ctx, msg.Id)

	return &types.MsgDeleteRepositoryResponse{}, nil
}
