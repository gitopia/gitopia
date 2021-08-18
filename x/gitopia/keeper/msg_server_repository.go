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
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user %v doesn't exist", o.ID))
		}

		// Checks if the the msg sender is the same as the current owner
		if msg.Creator != k.GetUserOwner(ctx, msg.Creator) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
		}

		user = k.GetUser(ctx, o.ID)
		if _, exists := user.Repositories[msg.Name]; exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v already exists", msg.Name))
		}
	} else if o.Type == "Organization" {
		orgId, err := strconv.ParseUint(o.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, orgId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization %v doesn't exist", o.ID))
		}

		organization = k.GetOrganization(ctx, orgId)

		// Checks if the the msg sender is the same as the current owner
		if organization.Members[msg.Creator] != "Owner" {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
		}

		if _, exists := organization.Repositories[msg.Name]; exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v already exists", msg.Name))
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
		// Repository name lookup

		// Initialize the map if it's nil
		if user.Repositories == nil {
			user.Repositories = make(map[string]uint64)
		}

		user.Repositories[repository.Name] = id

		k.SetUser(ctx, user)
	} else if o.Type == "Organization" {
		// Initialize the map if it's nil
		if organization.Repositories == nil {
			organization.Repositories = make(map[string]uint64)
		}

		organization.Repositories[repository.Name] = id

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

	if currentOwner.Type == "User" {
		if msg.Creator != currentOwner.ID && repository.Collaborators[msg.Creator] != "Admin" {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
		}

		currentUser = k.GetUser(ctx, currentOwner.ID)

		if _, exists := currentUser.Repositories[repository.Name]; !exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v doesn't exists in currentUser repositories", repository.Name))
		}
		delete(currentUser.Repositories, repository.Name)
	} else if currentOwner.Type == "Organization" {
		currentOwnerId, err := strconv.ParseUint(currentOwner.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}

		currentOrganization = k.GetOrganization(ctx, currentOwnerId)

		if currentOrganization.Members[msg.Creator] != "Owner" && repository.Collaborators[msg.Creator] != "Admin" {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user %v doesn't have permission to perform this operation", msg.Creator))
		}

		if _, exists := currentOrganization.Repositories[repository.Name]; !exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v doesn't exists in currentOrganization repositories", repository.Name))
		}
		delete(currentOrganization.Repositories, repository.Name)
	}

	if newOwner.Type == "User" {
		if !k.HasUser(ctx, newOwner.ID) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user %v doesn't exist", newOwner.ID))
		}

		newUser = k.GetUser(ctx, newOwner.ID)

		if _, exists := newUser.Repositories[repository.Name]; exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v already exists", repository.Name))
		}

		if newUser.Repositories == nil {
			newUser.Repositories = make(map[string]uint64)
		}
		newUser.Repositories[repository.Name] = repository.Id
	} else if newOwner.Type == "Organization" {
		newOwnerId, err := strconv.ParseUint(newOwner.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, newOwnerId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization %v doesn't exist", newOwner.ID))
		}

		newOrganization = k.GetOrganization(ctx, newOwnerId)

		if _, exists := newOrganization.Repositories[repository.Name]; exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v already exists", repository.Name))
		}

		if newOrganization.Repositories == nil {
			newOrganization.Repositories = make(map[string]uint64)
		}
		newOrganization.Repositories[repository.Name] = repository.Id
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
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user %v doesn't exist", o.ID))
		}

		// Checks if the the msg sender is the same as the current owner
		if msg.Creator != k.GetUserOwner(ctx, msg.Creator) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
		}

		user = k.GetUser(ctx, o.ID)
		if _, exists := user.Repositories[repository.Name]; exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v already exists", repository.Name))
		}
	} else if o.Type == "Organization" {
		orgId, err := strconv.ParseUint(o.ID, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid organization Id")
		}
		if !k.HasOrganization(ctx, orgId) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization %v doesn't exist", o.ID))
		}

		organization = k.GetOrganization(ctx, orgId)

		// Checks if the the msg sender is the same as the current owner
		if organization.Members[msg.Creator] != "Owner" {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
		}

		if _, exists := organization.Repositories[repository.Name]; exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v already exists", repository.Name))
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
		// Initialize the map if it's nil
		if user.Repositories == nil {
			user.Repositories = make(map[string]uint64)
		}

		user.Repositories[repository.Name] = id

		k.SetUser(ctx, user)
	} else if o.Type == "Organization" {
		// Initialize the map if it's nil
		if organization.Repositories == nil {
			organization.Repositories = make(map[string]uint64)
		}

		organization.Repositories[repository.Name] = id

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

	if owner.Type == "User" {
		// Checks if the the msg sender is the same as the current owner
		if msg.Creator != owner.ID && repository.Collaborators[msg.Creator] != "Admin" {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
		}
		if !k.HasUser(ctx, owner.ID) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user %v doesn't exist", owner.ID))
		}

		user := k.GetUser(ctx, owner.ID)

		if _, exists := user.Repositories[msg.Name]; exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v already exists", msg.Name))
		}

		delete(user.Repositories, repository.Name)
		user.Repositories[msg.Name] = repository.Id

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

		// Checks if the the msg sender is the same as the current owner
		if organization.Members[msg.Creator] != "Owner" && repository.Collaborators[msg.Creator] != "Admin" {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user %v doesn't have permission to perform this operation", msg.Creator))
		}

		if _, exists := organization.Repositories[msg.Name]; exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v already exists", msg.Name))
		}

		delete(organization.Repositories, repository.Name)
		organization.Repositories[msg.Name] = repository.Id

		k.SetOrganization(ctx, organization)
	}

	repository.Name = msg.Name

	k.SetRepository(ctx, repository)

	return &types.MsgRenameRepositoryResponse{}, nil
}

func (k msgServer) UpdateRepositoryCollaborator(goCtx context.Context, msg *types.MsgUpdateRepositoryCollaborator) (*types.MsgUpdateRepositoryCollaboratorResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator %v doesn't exist", msg.Creator))
	}

	if !k.HasUser(ctx, msg.User) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user %v doesn't exist", msg.User))
	}

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	repository := k.GetRepository(ctx, msg.Id)

	var o Owner
	if err := json.Unmarshal([]byte(repository.Owner), &o); err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "unable to unmarshal owner")
	}

	// Checks if the the msg sender is the same as the current owner or Admin
	if msg.Creator != o.ID && repository.Collaborators[msg.Creator] != "Admin" {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user %v doesn't have permission to perform this operation", msg.Creator))
	}

	if repository.Collaborators == nil {
		repository.Collaborators = make(map[string]string)
	}
	repository.Collaborators[msg.User] = msg.Role

	k.SetRepository(ctx, repository)

	return &types.MsgUpdateRepositoryCollaboratorResponse{}, nil
}

func (k msgServer) RemoveRepositoryCollaborator(goCtx context.Context, msg *types.MsgRemoveRepositoryCollaborator) (*types.MsgRemoveRepositoryCollaboratorResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator %v doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	repository := k.GetRepository(ctx, msg.Id)

	var o Owner
	if err := json.Unmarshal([]byte(repository.Owner), &o); err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "unable to unmarshal owner")
	}

	// Checks if the the msg sender is the same as the current owner or Admin
	if msg.Creator != o.ID && repository.Collaborators[msg.Creator] != "Admin" {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user %v doesn't have permission to perform this operation", msg.Creator))
	}

	if _, exists := repository.Collaborators[msg.User]; !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("User %v doesn't exists in repository collaborators", msg.User))
	}
	delete(repository.Collaborators, msg.User)

	k.SetRepository(ctx, repository)

	return &types.MsgRemoveRepositoryCollaboratorResponse{}, nil
}

func (k msgServer) CreateBranch(goCtx context.Context, msg *types.MsgCreateBranch) (*types.MsgCreateBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

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

	var repository = k.GetRepository(ctx, msg.Id)

	// Initialize the map if it's nil
	if repository.Branches == nil {
		repository.Branches = make(map[string]string)
	}

	repository.Branches[msg.Name] = msg.CommitSHA

	k.SetRepository(ctx, repository)

	return &types.MsgCreateBranchResponse{}, nil
}

func (k msgServer) SetDefaultBranch(goCtx context.Context, msg *types.MsgSetDefaultBranch) (*types.MsgSetDefaultBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

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

	var repository = k.GetRepository(ctx, msg.Id)

	// Change DefaultBranch only if branch exists
	if _, exists := repository.Branches[msg.Name]; exists {
		repository.DefaultBranch = msg.Name
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch %v doesn't exist", msg.Name))
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

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}
	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != owner.ID {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var repository = k.GetRepository(ctx, msg.Id)

	// Delete only if branch exists and is not default branch
	if _, exists := repository.Branches[msg.Name]; exists {
		if repository.DefaultBranch != msg.Name {
			delete(repository.Branches, msg.Name)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch %v is default branch", msg.Name))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch %v doesn't exist", msg.Name))
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

	k.RemoveRepository(ctx, msg.Id)

	return &types.MsgDeleteRepositoryResponse{}, nil
}
