package keeper

import (
	"context"
	"fmt"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
)

const (
	CreateRepositoryGas = 10
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

	var user types.User
	var organization types.Organization
	var found bool
	if msg.OwnerType == types.RepositoryOwner_USER.String() {
		if msg.Creator != msg.OwnerId {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "owner and creator mismatched")
		}

		user, found = k.GetUser(ctx, msg.OwnerId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.OwnerId))
		}

		// Checks if the the msg sender is the same as the current owner
		if msg.Creator != user.Creator {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
		}

		if _, exists := utils.UserRepositoryExists(user.Repositories, msg.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", msg.Name))
		}
	} else if msg.OwnerType == types.RepositoryOwner_ORGANIZATION.String() {
		organization, found = k.GetOrganization(ctx, msg.OwnerId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.OwnerId))
		}

		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
			if organization.Members[i].Role != types.OrganizationMember_OWNER {
				return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
			}
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a part of organization", msg.Creator))
		}

		if _, exists := utils.OrganizationRepositoryExists(organization.Repositories, msg.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", msg.Name))
		}
	}

	createdAt := ctx.BlockTime().Unix()
	updatedAt := createdAt
	defaultBranch := string("master")

	ownerType := types.RepositoryOwner_Type_value[msg.OwnerType]

	owner := types.RepositoryOwner{
		Id:   msg.OwnerId,
		Type: types.RepositoryOwner_Type(ownerType),
	}

	var repository = types.Repository{
		Creator:       msg.Creator,
		Name:          msg.Name,
		Owner:         &owner,
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
	if msg.OwnerType == types.RepositoryOwner_USER.String() {
		var userRepository = types.UserRepository{
			Name: repository.Name,
			Id:   id,
		}
		user.Repositories = append(user.Repositories, &userRepository)

		k.SetUser(ctx, user)
	} else if msg.OwnerType == types.RepositoryOwner_ORGANIZATION.String() {
		var organizationRepository = types.OrganizationRepository{
			Name: repository.Name,
			Id:   id,
		}
		organization.Repositories = append(organization.Repositories, &organizationRepository)

		k.SetOrganization(ctx, organization)
	}

	ctx.GasMeter().ConsumeGas(CreateRepositoryGas, "Create repository")

	return &types.MsgCreateRepositoryResponse{
		Id:   id,
		Name: repository.Name,
	}, nil
}

func (k msgServer) ChangeOwner(goCtx context.Context, msg *types.MsgChangeOwner) (*types.MsgChangeOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	repository, found := k.GetRepository(ctx, msg.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.RepositoryId))
	}

	currentOwner := repository.Owner

	newOwnerId := msg.OwnerId
	newOwnerType := msg.OwnerType

	var currentUser types.User
	var newUser types.User
	var currentOrganization types.Organization
	var newOrganization types.Organization

	if currentOwner.Type == types.RepositoryOwner_USER {
		if !utils.HavePermission(repository, msg.Creator, utils.RepositoryTransferOwnershipPermission, nil) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}

		currentUser, found = k.GetUser(ctx, currentOwner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", currentOwner.Id))
		}

		if i, exists := utils.UserRepositoryExists(currentUser.Repositories, repository.Name); exists {
			currentUser.Repositories = append(currentUser.Repositories[:i], currentUser.Repositories[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) doesn't exists in currentUser repositories", repository.Name))
		}
	} else if currentOwner.Type == types.RepositoryOwner_ORGANIZATION {
		currentOrganization, found = k.GetOrganization(ctx, currentOwner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", currentOwner.Id))
		}

		if !utils.HavePermission(repository, msg.Creator, utils.RepositoryTransferOwnershipPermission, currentOrganization) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}

		if i, exists := utils.OrganizationRepositoryExists(currentOrganization.Repositories, repository.Name); exists {
			currentOrganization.Repositories = append(currentOrganization.Repositories[:i], currentOrganization.Repositories[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) doesn't exists in currentOrganization repositories", repository.Name))
		}
	}

	if newOwnerType == types.RepositoryOwner_USER.String() {
		newUser, found = k.GetUser(ctx, newOwnerId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", newOwnerId))
		}

		if _, exists := utils.UserRepositoryExists(newUser.Repositories, repository.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", repository.Name))
		}

		var newUserRepository = types.UserRepository{
			Name: repository.Name,
			Id:   repository.Id,
		}
		newUser.Repositories = append(newUser.Repositories, &newUserRepository)
	} else if newOwnerType == types.RepositoryOwner_ORGANIZATION.String() {
		newOrganization, found = k.GetOrganization(ctx, newOwnerId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", newOwnerId))
		}

		if _, exists := utils.OrganizationRepositoryExists(newOrganization.Repositories, repository.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", repository.Name))
		}

		var newOrganizationRepository = types.OrganizationRepository{
			Name: repository.Name,
			Id:   repository.Id,
		}
		newOrganization.Repositories = append(newOrganization.Repositories, &newOrganizationRepository)
	}

	ownerType := types.RepositoryOwner_Type_value[newOwnerType]
	owner := types.RepositoryOwner{
		Id:   newOwnerId,
		Type: types.RepositoryOwner_Type(ownerType),
	}

	currentTime := ctx.BlockTime().Unix()

	repository.Owner = &owner
	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	if currentOwner.Type == types.RepositoryOwner_USER {
		k.SetUser(ctx, currentUser)
	} else if currentOwner.Type == types.RepositoryOwner_ORGANIZATION {
		k.SetOrganization(ctx, currentOrganization)
	}

	if newOwnerType == types.RepositoryOwner_USER.String() {
		k.SetUser(ctx, newUser)
	} else if newOwnerType == types.RepositoryOwner_ORGANIZATION.String() {
		k.SetOrganization(ctx, newOrganization)
	}

	return &types.MsgChangeOwnerResponse{}, nil
}

func (k msgServer) InvokeForkRepository(goCtx context.Context, msg *types.MsgInvokeForkRepository) (*types.MsgInvokeForkRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	repository, found := k.GetRepository(ctx, msg.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.RepositoryId))
	}

	if !repository.AllowForking {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "forking is not allowed")
	}

	var user types.User
	var organization types.Organization
	if msg.OwnerType == types.RepositoryOwner_USER.String() {
		if msg.Creator != msg.OwnerId {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "owner and creator mismatched")
		}

		user, found = k.GetUser(ctx, msg.OwnerId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.OwnerId))
		}

		// Checks if the the msg sender is the same as the current owner
		if msg.Creator != user.Creator {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
		}

		if _, exists := utils.UserRepositoryExists(user.Repositories, repository.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", repository.Name))
		}
	} else if msg.OwnerType == types.RepositoryOwner_ORGANIZATION.String() {
		organization, found = k.GetOrganization(ctx, msg.OwnerId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.OwnerId))
		}

		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
			if organization.Members[i].Role != types.OrganizationMember_OWNER {
				return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
			}
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a part of organization", msg.Creator))
		}

		if _, exists := utils.OrganizationRepositoryExists(organization.Repositories, repository.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", repository.Name))
		}
	}

	id := k.AppendTask(ctx, types.Task{
		Type:     types.TaskType(types.TypeForkRepository),
		State:    types.TaskState(types.StatePending),
		Creator:  msg.Creator,
		Provider: msg.Provider,
	})

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.InvokeForkRepositoryEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeOwnerIdKey, msg.OwnerId),
			sdk.NewAttribute(types.EventAttributeOwnerTypeKey, msg.OwnerType),
			sdk.NewAttribute(types.EventAttributeTaskIdKey, strconv.FormatUint(id, 10)),
		),
	)
	return &types.MsgInvokeForkRepositoryResponse{}, nil
}

func (k msgServer) ForkRepository(goCtx context.Context, msg *types.MsgForkRepository) (*types.MsgForkRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	repository, found := k.GetRepository(ctx, msg.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.RepositoryId))
	}

	if !repository.AllowForking {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "forking is not allowed")
	}

	_, found = k.GetTask(ctx, msg.TaskId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("task id (%d) doesn't exist", msg.TaskId))
	}

	var user types.User
	var organization types.Organization
	if msg.OwnerType == types.RepositoryOwner_USER.String() {
		if msg.Creator != msg.OwnerId {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "owner and creator mismatched")
		}

		user, found = k.GetUser(ctx, msg.OwnerId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.OwnerId))
		}

		// Checks if the the msg sender is the same as the current owner
		if msg.Creator != user.Creator {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
		}

		if _, exists := utils.UserRepositoryExists(user.Repositories, repository.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", repository.Name))
		}
	} else if msg.OwnerType == types.RepositoryOwner_ORGANIZATION.String() {
		organization, found = k.GetOrganization(ctx, msg.OwnerId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.OwnerId))
		}

		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
			if organization.Members[i].Role != types.OrganizationMember_OWNER {
				return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
			}
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a part of organization", msg.Creator))
		}

		if _, exists := utils.OrganizationRepositoryExists(organization.Repositories, repository.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) already exists", repository.Name))
		}
	}

	createdAt := ctx.BlockTime().Unix()

	ownerType := types.RepositoryOwner_Type_value[msg.OwnerType]
	owner := types.RepositoryOwner{
		Id:   msg.OwnerId,
		Type: types.RepositoryOwner_Type(ownerType),
	}

	var forkRepo = types.Repository{
		Creator:       msg.Creator,
		Name:          repository.Name,
		Owner:         &owner,
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
	if msg.OwnerType == types.RepositoryOwner_USER.String() {
		var userRepository = types.UserRepository{
			Name: repository.Name,
			Id:   id,
		}
		user.Repositories = append(user.Repositories, &userRepository)

		k.SetUser(ctx, user)
	} else if msg.OwnerType == types.RepositoryOwner_ORGANIZATION.String() {
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

func (k msgServer) ForkRepositorySuccess(goCtx context.Context, msg *types.MsgForkRepositorySuccess) (*types.MsgForkRepositorySuccessResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	repository, found := k.GetRepository(ctx, msg.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.RepositoryId))
	}

	if msg.Creator != repository.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "msg creator and repository creator are different")
	}

	task, found := k.GetTask(ctx, msg.TaskId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("task id (%d) doesn't exist", msg.TaskId))
	}

	// Update task state
	if task.Creator != msg.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "unauthorized")
	}

	task.State = types.StateSuccess
	k.SetTask(ctx, task)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.ForkRepositoryEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeParentRepoId, strconv.FormatUint(repository.Parent, 10)),
			sdk.NewAttribute(types.EventAttributeTaskIdKey, strconv.FormatUint(msg.TaskId, 10)),
			sdk.NewAttribute(types.EventAttributeTaskStateKey, task.State.String()),
		),
	)
	return &types.MsgForkRepositorySuccessResponse{
		Id: repository.Id,
	}, nil
}

func (k msgServer) RenameRepository(goCtx context.Context, msg *types.MsgRenameRepository) (*types.MsgRenameRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	if msg.Name == repository.Name {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("renaming with same name not allowed"))
	}

	ownerId := repository.Owner.Id
	ownerType := repository.Owner.Type

	if ownerType == types.RepositoryOwner_USER {
		user, found := k.GetUser(ctx, ownerId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", ownerId))
		}

		if !utils.HavePermission(repository, msg.Creator, utils.RepositoryRenamePermission, nil) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}

		if _, exists := utils.UserRepositoryExists(user.Repositories, msg.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository with name (%v) already exists", msg.Name))
		}

		if i, exists := utils.UserRepositoryExists(user.Repositories, repository.Name); exists {
			user.Repositories = append(user.Repositories[:i], user.Repositories[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) doesn't exist in owner repositories", repository.Name))
		}

		var userRepository = types.UserRepository{
			Name: msg.Name,
			Id:   repository.Id,
		}
		user.Repositories = append(user.Repositories, &userRepository)

		k.SetUser(ctx, user)
	} else if ownerType == types.RepositoryOwner_ORGANIZATION {
		organization, found := k.GetOrganization(ctx, ownerId)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", ownerId))
		}

		if !utils.HavePermission(repository, msg.Creator, utils.RepositoryRenamePermission, organization) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}

		if _, exists := utils.OrganizationRepositoryExists(organization.Repositories, msg.Name); exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository with name (%v) already exists", msg.Name))
		}

		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, repository.Name); exists {
			organization.Repositories = append(organization.Repositories[:i], organization.Repositories[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v) doesn't exist in organization repositories", repository.Name))
		}

		var organizationRepository = types.OrganizationRepository{
			Name: msg.Name,
			Id:   repository.Id,
		}
		organization.Repositories = append(organization.Repositories, &organizationRepository)

		k.SetOrganization(ctx, organization)
	}

	currentTime := ctx.BlockTime().Unix()

	repository.Name = msg.Name
	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgRenameRepositoryResponse{}, nil
}

func (k msgServer) UpdateRepositoryCollaborator(goCtx context.Context, msg *types.MsgUpdateRepositoryCollaborator) (*types.MsgUpdateRepositoryCollaboratorResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	_, found = k.GetUser(ctx, msg.User)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.User))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	if msg.Creator == msg.User {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "action not permittable")
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.RepositoryCollaboratorPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	permission, exists := types.RepositoryCollaborator_Permission_value[msg.Role]
	if !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid permission arg (%v)", msg.Role))
	}

	if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.User); exists {
		repository.Collaborators[i].Permission = types.RepositoryCollaborator_Permission(permission)
		k.SetRepository(ctx, repository)

		return &types.MsgUpdateRepositoryCollaboratorResponse{}, nil
	}

	var repositoryCollaborator = types.RepositoryCollaborator{
		Id:         msg.User,
		Permission: types.RepositoryCollaborator_Permission(permission),
	}

	repository.Collaborators = append(repository.Collaborators, &repositoryCollaborator)
	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgUpdateRepositoryCollaboratorResponse{}, nil
}

func (k msgServer) RemoveRepositoryCollaborator(goCtx context.Context, msg *types.MsgRemoveRepositoryCollaborator) (*types.MsgRemoveRepositoryCollaboratorResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.RepositoryCollaboratorPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.User); exists {
		repository.Collaborators = append(repository.Collaborators[:i], repository.Collaborators[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("collaborators with id (%v) doesn't exists", msg.User))
	}

	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgRemoveRepositoryCollaboratorResponse{}, nil
}

func (k msgServer) CreateRepositoryLabel(goCtx context.Context, msg *types.MsgCreateRepositoryLabel) (*types.MsgCreateRepositoryLabelResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.RepositoryLabelPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	if _, exists := utils.RepositoryLabelExists(repository.Labels, msg.Name); exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label (%v) already exists", msg.Name))
	}

	repository.LabelsCount += 1
	var repositoryLabel = types.RepositoryLabel{
		Id:          repository.LabelsCount,
		Name:        msg.Name,
		Color:       msg.Color,
		Description: msg.Description,
	}

	repository.Labels = append(repository.Labels, &repositoryLabel)
	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgCreateRepositoryLabelResponse{Id: repositoryLabel.Id}, nil
}

func (k msgServer) UpdateRepositoryLabel(goCtx context.Context, msg *types.MsgUpdateRepositoryLabel) (*types.MsgUpdateRepositoryLabelResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.RepositoryId))
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.RepositoryLabelPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	if i, exists := utils.RepositoryLabelIdExists(repository.Labels, msg.LabelId); exists {
		if j, exists := utils.RepositoryLabelExists(repository.Labels, msg.Name); exists {
			if repository.Labels[i].Id != repository.Labels[j].Id {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label name (%v) already exists", msg.Name))
			}
		}
		if repository.Labels[i].Name == msg.Name && repository.Labels[i].Color == msg.Color && repository.Labels[i].Description == msg.Description {
			return &types.MsgUpdateRepositoryLabelResponse{}, nil
		}
		repository.Labels[i].Name = msg.Name
		repository.Labels[i].Color = msg.Color
		repository.Labels[i].Description = msg.Description
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label (%d) doesn't exists", msg.LabelId))
	}

	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgUpdateRepositoryLabelResponse{}, nil
}

func (k msgServer) DeleteRepositoryLabel(goCtx context.Context, msg *types.MsgDeleteRepositoryLabel) (*types.MsgDeleteRepositoryLabelResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.RepositoryId)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.RepositoryId))
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.RepositoryLabelPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	if i, exists := utils.RepositoryLabelIdExists(repository.Labels, msg.LabelId); exists {
		repository.Labels = append(repository.Labels[:i], repository.Labels[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) doesn't exists", msg.LabelId))
	}

	repository.UpdatedAt = currentTime
	k.SetRepository(ctx, repository)

	return &types.MsgDeleteRepositoryLabelResponse{}, nil
}

func (k msgServer) SetRepositoryBranch(goCtx context.Context, msg *types.MsgSetRepositoryBranch) (*types.MsgSetRepositoryBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.PushBranchPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	if i, exists := utils.RepositoryBranchExists(repository.Branches, msg.Name); exists {
		repository.Branches[i].Sha = msg.CommitSHA
		repository.Branches[i].LastUpdatedAt = currentTime
	} else {
		if len(repository.Branches) == 0 {
			repository.DefaultBranch = msg.Name
		}
		var repositoryBranch = types.RepositoryBranch{
			Name:          msg.Name,
			Sha:           msg.CommitSHA,
			LastUpdatedAt: currentTime,
		}
		repository.Branches = append(repository.Branches, &repositoryBranch)
	}

	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgSetRepositoryBranchResponse{}, nil
}

func (k msgServer) MultiSetRepositoryBranch(goCtx context.Context, msg *types.MsgMultiSetRepositoryBranch) (*types.MsgMultiSetRepositoryBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}
	var organization types.Organization

	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.PushBranchPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	for _, branch := range msg.Branches {
		if i, exists := utils.RepositoryBranchExists(repository.Branches, branch.Name); exists {
			if repository.Branches[i].Sha != branch.CommitSHA {
				repository.Branches[i].Sha = branch.CommitSHA
				repository.Branches[i].LastUpdatedAt = currentTime
			}
		} else {
			if len(repository.Branches) == 0 {
				repository.DefaultBranch = branch.Name
			}
			var repositoryBranch = types.RepositoryBranch{
				Name:          branch.Name,
				Sha:           branch.CommitSHA,
				LastUpdatedAt: currentTime,
			}
			repository.Branches = append(repository.Branches, &repositoryBranch)
		}
	}

	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgMultiSetRepositoryBranchResponse{}, nil
}

func (k msgServer) SetDefaultBranch(goCtx context.Context, msg *types.MsgSetDefaultBranch) (*types.MsgSetDefaultBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.DefaultBranchPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	if i, exists := utils.RepositoryBranchExists(repository.Branches, msg.Name); exists {
		repository.DefaultBranch = repository.Branches[i].Name
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch (%v) doesn't exist", msg.Name))
	}

	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgSetDefaultBranchResponse{}, nil
}

func (k msgServer) DeleteBranch(goCtx context.Context, msg *types.MsgDeleteBranch) (*types.MsgDeleteBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.PushBranchPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	if i, exists := utils.RepositoryBranchExists(repository.Branches, msg.Name); exists {
		if repository.DefaultBranch != repository.Branches[i].Name {
			repository.Branches = append(repository.Branches[:i], repository.Branches[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch (%v) is default branch", msg.Name))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch (%v) doesn't exist", msg.Name))
	}

	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgDeleteBranchResponse{}, nil
}

func (k msgServer) MultiDeleteBranch(goCtx context.Context, msg *types.MsgMultiDeleteBranch) (*types.MsgMultiDeleteBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization

	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.PushBranchPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	for _, branch := range msg.Branches {
		if i, exists := utils.RepositoryBranchExists(repository.Branches, branch); exists {
			if repository.DefaultBranch != repository.Branches[i].Name {
				repository.Branches = append(repository.Branches[:i], repository.Branches[i+1:]...)
			} else {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch (%v) is default branch", branch))
			}
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch (%v) doesn't exist", branch))
		}
	}

	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgMultiDeleteBranchResponse{}, nil
}

func (k msgServer) SetRepositoryTag(goCtx context.Context, msg *types.MsgSetRepositoryTag) (*types.MsgSetRepositoryTagResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.PushTagPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	if i, exists := utils.RepositoryTagExists(repository.Tags, msg.Name); exists {
		repository.Tags[i].Sha = msg.Sha
		repository.Tags[i].LastUpdatedAt = currentTime
	} else {
		var repositoryTag = types.RepositoryTag{
			Name:          msg.Name,
			Sha:           msg.Sha,
			LastUpdatedAt: currentTime,
		}
		repository.Tags = append(repository.Tags, &repositoryTag)
	}

	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgSetRepositoryTagResponse{}, nil
}

func (k msgServer) MultiSetRepositoryTag(goCtx context.Context, msg *types.MsgMultiSetRepositoryTag) (*types.MsgMultiSetRepositoryTagResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization

	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.PushTagPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	for _, tag := range msg.Tags {
		if i, exists := utils.RepositoryTagExists(repository.Tags, tag.Name); exists {
			repository.Tags[i].Sha = tag.CommitSHA
			repository.Tags[i].LastUpdatedAt = currentTime
		} else {
			var repositoryTag = types.RepositoryTag{
				Name:          tag.Name,
				Sha:           tag.CommitSHA,
				LastUpdatedAt: currentTime,
			}
			repository.Tags = append(repository.Tags, &repositoryTag)
		}
	}

	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgMultiSetRepositoryTagResponse{}, nil
}

func (k msgServer) DeleteTag(goCtx context.Context, msg *types.MsgDeleteTag) (*types.MsgDeleteTagResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.PushTagPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	if i, exists := utils.RepositoryTagExists(repository.Tags, msg.Name); exists {
		repository.Tags = append(repository.Tags[:i], repository.Tags[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("tag (%v) doesn't exist", msg.Name))
	}

	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgDeleteTagResponse{}, nil
}

func (k msgServer) MultiDeleteTag(goCtx context.Context, msg *types.MsgMultiDeleteTag) (*types.MsgMultiDeleteTagResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization

	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.PushTagPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	for _, tag := range msg.Tags {
		if i, exists := utils.RepositoryTagExists(repository.Tags, tag); exists {
			repository.Tags = append(repository.Tags[:i], repository.Tags[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("tag (%v) doesn't exist", tag))
		}
	}

	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgMultiDeleteTagResponse{}, nil
}

func (k msgServer) ToggleRepositoryForking(goCtx context.Context, msg *types.MsgToggleRepositoryForking) (*types.MsgToggleRepositoryForkingResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.ToggleRepositoryForkingPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	currentTime := ctx.BlockTime().Unix()

	repository.AllowForking = !repository.AllowForking
	repository.UpdatedAt = currentTime

	k.SetRepository(ctx, repository)

	return &types.MsgToggleRepositoryForkingResponse{AllowForking: repository.AllowForking}, nil
}

func (k msgServer) DeleteRepository(goCtx context.Context, msg *types.MsgDeleteRepository) (*types.MsgDeleteRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	user, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	repository, found := k.GetRepository(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	var organization types.Organization
	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	if !utils.HavePermission(repository, msg.Creator, utils.DeleteRepositoryPermission, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	DoRemoveRepository(ctx, k, &user, &organization, repository)

	return &types.MsgDeleteRepositoryResponse{}, nil
}

func DoRemoveRepository(ctx sdk.Context, k msgServer, user *types.User, organization *types.Organization, repository types.Repository) {
	for _, fork := range repository.Forks {
		DecoupleForkRepository(ctx, k, fork)
	}

	for _, i := range repository.Issues {
		issue, _ := k.GetIssue(ctx, i.Id)
		DoRemoveIssue(ctx, k, issue, repository)
	}

	for _, pr := range repository.PullRequests {
		pullRequest, _ := k.GetPullRequest(ctx, pr.Id)
		DoRemovePullRequest(ctx, k, pullRequest, repository)
	}

	for _, r := range repository.Releases {
		release, _ := k.GetRelease(ctx, r.Id)
		DoRemoveRelease(ctx, k, release, repository)
	}

	if repository.Owner.Type == types.RepositoryOwner_USER {
		if i, exists := utils.UserRepositoryExists(user.Repositories, repository.Name); exists {
			user.Repositories = append(user.Repositories[:i], user.Repositories[i+1:]...)
		}

		user.UpdatedAt = ctx.BlockTime().Unix()
		k.SetUser(ctx, *user)
	} else {
		if i, exists := utils.OrganizationRepositoryExists(organization.Repositories, repository.Name); exists {
			organization.Repositories = append(organization.Repositories[:i], organization.Repositories[i+1:]...)
		}

		organization.UpdatedAt = ctx.BlockTime().Unix()
		k.SetOrganization(ctx, *organization)
	}

	k.RemoveRepository(ctx, repository.Id)
}

func DecoupleForkRepository(ctx sdk.Context, k msgServer, repositoryId uint64) error {
	forkedRepository, found := k.GetRepository(ctx, repositoryId)
	if !found {
		return sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", repositoryId))
	}
	forkedRepository.Parent = 0
	forkedRepository.Fork = false
	forkedRepository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, forkedRepository)
	return nil
}
