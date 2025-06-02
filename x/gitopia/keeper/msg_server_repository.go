package keeper

import (
	"context"
	"fmt"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/gitopia/gitopia/v6/x/gitopia/utils"
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

	address, err := k.ResolveAddress(ctx, msg.Owner)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	if _, found := k.GetAddressRepository(ctx, address.Address, msg.Name); found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v/%v) already exists", msg.Creator, msg.Name))
	}

	var repository = types.Repository{
		Creator: msg.Creator,
		Name:    msg.Name,
		Owner: &types.RepositoryOwner{
			Id:   address.Address,
			Type: address.OwnerType,
		},
		Description:   msg.Description,
		DefaultBranch: "master",
		CreatedAt:     ctx.BlockTime().Unix(),
		UpdatedAt:     ctx.BlockTime().Unix(),
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryCollaborator_ADMIN) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("cannot create repository"))
	}

	id := k.AppendRepository(
		ctx,
		repository,
	)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.CreateRepositoryEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeRepoOwnerTypeKey, repository.Owner.Type.String()),
			sdk.NewAttribute(types.EventAttributeCreatedAtKey, strconv.FormatInt(repository.CreatedAt, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgCreateRepositoryResponse{
		RepositoryId: types.RepositoryId{
			Id:   repository.Owner.Id,
			Name: repository.Name,
		},
	}, nil
}

func (k msgServer) ChangeOwner(goCtx context.Context, msg *types.MsgChangeOwner) (*types.MsgChangeOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	ownerAddress, err := k.ResolveAddress(ctx, msg.Owner)
	if err != nil {
		return nil, err
	}

	if address.Address == ownerAddress.Address {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "self transfer not allowed")
	}

	if _, found := k.GetAddressRepository(ctx, ownerAddress.Address, msg.RepositoryId.Name); found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) already exist", msg.Owner, msg.RepositoryId.Name))
	}

	switch address.OwnerType {
	case types.OwnerType_USER:
		if msg.Creator != repository.Owner.Id {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "unauthorized")
		}
	case types.OwnerType_DAO:
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "unauthorized")
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "something went wrong")
	}

	switch ownerAddress.OwnerType {
	case types.OwnerType_USER:
		_, found = k.GetUser(ctx, ownerAddress.Address)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("owner (%v) doesn't exist", msg.Owner))
		}
	case types.OwnerType_DAO:
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "unauthorized")
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "something went wrong")
	}

	repository.Owner = &types.RepositoryOwner{
		Id:   ownerAddress.Address,
		Type: ownerAddress.OwnerType,
	}
	repository.UpdatedAt = ctx.BlockTime().Unix()

	k.RemoveAddressRepository(ctx, address.Address, repository.Name)
	k.SetRepository(ctx, repository)
	k.SetBaseRepositoryKey(ctx, types.BaseRepositoryKey{
		Id:      repository.Id,
		Address: repository.Owner.Id,
		Name:    repository.Name,
	})

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.ChangeOwnerEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeRepoOwnerTypeKey, repository.Owner.Type.String()),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgChangeOwnerResponse{}, nil
}

func (k msgServer) ForkRepository(goCtx context.Context, msg *types.MsgForkRepository) (*types.MsgForkRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	ownerAddress, err := k.ResolveAddress(ctx, msg.Owner)
	if err != nil {
		return nil, err
	}

	// Check if the user already has a repository with the same name
	if _, found := k.GetAddressRepository(ctx, ownerAddress.Address, msg.ForkRepositoryName); found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository (%v/%v) already exist", msg.Owner, msg.ForkRepositoryName))
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !repository.AllowForking {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "forking is not allowed")
	}

	// Check branch exists
	if msg.Branch != "" {
		if _, found := k.GetRepositoryBranch(ctx, repository.Id, msg.Branch); !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch %v not found in parent repository, id = %v", msg.Branch, repository.Id))
		}
	}

	var forkRepository = types.Repository{
		Creator: msg.Creator,
		Name:    msg.ForkRepositoryName,
		Owner: &types.RepositoryOwner{
			Id:   ownerAddress.Address,
			Type: ownerAddress.OwnerType,
		},
		Description:   msg.ForkRepositoryDescription,
		DefaultBranch: repository.DefaultBranch,
		CreatedAt:     ctx.BlockTime().Unix(),
		UpdatedAt:     ctx.BlockTime().Unix(),
		Fork:          true,
		Parent:        repository.Id,
		License:       repository.License,
		Commits:       repository.Commits,
	}

	// If only a particular branch is copied to the fork repository, set that as default branch
	if msg.Branch != "" {
		forkRepository.DefaultBranch = msg.Branch
	}

	if !k.HavePermission(ctx, msg.Creator, forkRepository, types.RepositoryCollaborator_ADMIN) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("unauthorized"))
	}

	id := k.AppendRepository(
		ctx,
		forkRepository,
	)

	// Copy branches to forked repository
	if msg.Branch != "" {
		branch, _ := k.GetRepositoryBranch(ctx, repository.Id, msg.Branch)
		branch.RepositoryId = id
		k.AppendBranch(ctx, branch)
	} else {
		branches := k.GetAllRepositoryBranch(ctx, repository.Id)
		for _, branch := range branches {
			branch.RepositoryId = id
			k.AppendBranch(ctx, branch)
		}
	}

	// Update parent repository forks
	repository.Forks = append(repository.Forks, id)
	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.ForkRepositoryEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, forkRepository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, forkRepository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeRepoOwnerTypeKey, forkRepository.Owner.Type.String()),
			sdk.NewAttribute(types.EventAttributeParentRepoId, strconv.FormatUint(forkRepository.Parent, 10)),
			sdk.NewAttribute(types.EventAttributeCreatedAtKey, strconv.FormatInt(forkRepository.CreatedAt, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(forkRepository.UpdatedAt, 10)),
		),
	)

	return &types.MsgForkRepositoryResponse{
		Id: id,
	}, nil
}

func (k msgServer) RenameRepository(goCtx context.Context, msg *types.MsgRenameRepository) (*types.MsgRenameRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}

	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if msg.Name == repository.Name {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("renaming with same name not allowed"))
	}

	if _, found := k.GetAddressRepository(ctx, address.Address, msg.Name); found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) already exist", repository.Owner.Id, msg.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryRenamePermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	k.RemoveAddressRepository(ctx, address.Address, repository.Name)
	repository.Name = msg.Name
	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)
	k.SetBaseRepositoryKey(ctx, types.BaseRepositoryKey{
		Id:      repository.Id,
		Address: repository.Owner.Id,
		Name:    repository.Name,
	})

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.RenameRepositoryEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgRenameRepositoryResponse{}, nil
}

func (k msgServer) UpdateRepositoryDescription(goCtx context.Context, msg *types.MsgUpdateRepositoryDescription) (*types.MsgUpdateRepositoryDescriptionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}

	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if msg.Description == repository.Description {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("description not modified"))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryUpdateDescriptionPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	repository.Description = msg.Description
	repository.UpdatedAt = ctx.BlockTime().Unix()

	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateRepositoryDescriptionEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdateRepositoryDescriptionResponse{}, nil
}

func (k msgServer) ToggleRepositoryArchived(goCtx context.Context, msg *types.MsgToggleRepositoryArchived) (*types.MsgToggleRepositoryArchivedResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryToggleRepositoryArchivedPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	repository.Archived = !repository.Archived
	repository.UpdatedAt = ctx.BlockTime().Unix()

	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.ToggleRepositoryArchivedEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeToggleRepositoryArchived, strconv.FormatBool(repository.Archived)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgToggleRepositoryArchivedResponse{}, nil
}

func (k msgServer) UpdateRepositoryCollaborator(goCtx context.Context, msg *types.MsgUpdateRepositoryCollaborator) (*types.MsgUpdateRepositoryCollaboratorResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	// In case of dao, check if dao requires a proposal to update collaborator
	if repository.Owner.Type == types.OwnerType_DAO {
		dao, found := k.GetDao(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", repository.Owner.Id))
		}

		if dao.Config.RequireCollaboratorProposal {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}
	}

	userAddress, err := k.ResolveAddress(ctx, msg.User)
	if err != nil {
		return nil, err
	}

	_, found = k.GetUser(ctx, userAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.User))
	}

	if msg.Creator == userAddress.Address {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "action not permittable")
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryCollaboratorPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	permission, exists := types.RepositoryCollaborator_Permission_value[msg.Role]
	if !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid permission arg (%v)", msg.Role))
	}

	if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, userAddress.Address); exists {
		repository.Collaborators[i].Permission = types.RepositoryCollaborator_Permission(permission)
	} else {
		repositoryCollaborator := types.RepositoryCollaborator{
			Id:         userAddress.Address,
			Permission: types.RepositoryCollaborator_Permission(permission),
		}
		repository.Collaborators = append(repository.Collaborators, &repositoryCollaborator)
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateRepositoryCollaboratorEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoCollaboratorKey, userAddress.Address),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdateRepositoryCollaboratorResponse{}, nil
}

func (k msgServer) UpdateDaoRepositoryCollaborator(goCtx context.Context, msg *types.MsgUpdateDaoRepositoryCollaborator) (*types.MsgUpdateDaoRepositoryCollaboratorResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	dao, found := k.GetDao(ctx, repository.Owner.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", repository.Owner.Id))
	}

	userAddress, err := k.ResolveAddress(ctx, msg.User)
	if err != nil {
		return nil, err
	}

	_, found = k.GetUser(ctx, userAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.User))
	}

	// check if the message admin and the group admin are the same
	err = k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
	}

	permission, exists := types.RepositoryCollaborator_Permission_value[msg.Role]
	if !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid permission arg (%v)", msg.Role))
	}

	if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, userAddress.Address); exists {
		repository.Collaborators[i].Permission = types.RepositoryCollaborator_Permission(permission)
	} else {
		repositoryCollaborator := types.RepositoryCollaborator{
			Id:         userAddress.Address,
			Permission: types.RepositoryCollaborator_Permission(permission),
		}
		repository.Collaborators = append(repository.Collaborators, &repositoryCollaborator)
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoRepositoryCollaboratorEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Admin),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoCollaboratorKey, userAddress.Address),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdateDaoRepositoryCollaboratorResponse{}, nil
}

func (k msgServer) RemoveRepositoryCollaborator(goCtx context.Context, msg *types.MsgRemoveRepositoryCollaborator) (*types.MsgRemoveRepositoryCollaboratorResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	// In case of dao, check if dao requires a proposal to update collaborator
	if repository.Owner.Type == types.OwnerType_DAO {
		dao, found := k.GetDao(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", repository.Owner.Id))
		}

		if dao.Config.RequireCollaboratorProposal {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}
	}

	userAddress, err := k.ResolveAddress(ctx, msg.User)
	if err != nil {
		return nil, err
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryCollaboratorPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, userAddress.Address); exists {
		repository.Collaborators = append(repository.Collaborators[:i], repository.Collaborators[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("collaborators with id (%v) doesn't exists", msg.User))
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.RemoveRepositoryCollaboratorEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoCollaboratorKey, userAddress.Address),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgRemoveRepositoryCollaboratorResponse{}, nil
}

func (k msgServer) RemoveDaoRepositoryCollaborator(goCtx context.Context, msg *types.MsgRemoveDaoRepositoryCollaborator) (*types.MsgRemoveDaoRepositoryCollaboratorResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	dao, found := k.GetDao(ctx, repository.Owner.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", repository.Owner.Id))
	}

	userAddress, err := k.ResolveAddress(ctx, msg.User)
	if err != nil {
		return nil, err
	}

	// check if the message admin and the group admin are the same
	err = k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
	}

	if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, userAddress.Address); exists {
		repository.Collaborators = append(repository.Collaborators[:i], repository.Collaborators[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("collaborators with id (%v) doesn't exists", msg.User))
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.RemoveDaoRepositoryCollaboratorEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Admin),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoCollaboratorKey, userAddress.Address),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgRemoveDaoRepositoryCollaboratorResponse{}, nil
}

func (k msgServer) CreateRepositoryLabel(goCtx context.Context, msg *types.MsgCreateRepositoryLabel) (*types.MsgCreateRepositoryLabelResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}

	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryLabelPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

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
	repository.UpdatedAt = ctx.BlockTime().Unix()

	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.CreateRepositoryLabelEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoLabelIdKey, strconv.FormatUint(repositoryLabel.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoLabelNameKey, repositoryLabel.Name),
			sdk.NewAttribute(types.EventAttributeRepoLabelColorKey, repositoryLabel.Color),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgCreateRepositoryLabelResponse{Id: repositoryLabel.Id}, nil
}

func (k msgServer) UpdateRepositoryLabel(goCtx context.Context, msg *types.MsgUpdateRepositoryLabel) (*types.MsgUpdateRepositoryLabelResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}

	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryLabelPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

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

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateRepositoryLabelEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoLabelIdKey, strconv.FormatUint(msg.LabelId, 10)),
			sdk.NewAttribute(types.EventAttributeRepoLabelNameKey, msg.Name),
			sdk.NewAttribute(types.EventAttributeRepoLabelColorKey, msg.Color),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdateRepositoryLabelResponse{}, nil
}

func (k msgServer) DeleteRepositoryLabel(goCtx context.Context, msg *types.MsgDeleteRepositoryLabel) (*types.MsgDeleteRepositoryLabelResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}

	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryLabelPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if i, exists := utils.RepositoryLabelIdExists(repository.Labels, msg.LabelId); exists {
		repository.Labels = append(repository.Labels[:i], repository.Labels[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("label id (%v) doesn't exists", msg.LabelId))
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DeleteRepositoryLabelEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoLabelIdKey, strconv.FormatUint(msg.LabelId, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgDeleteRepositoryLabelResponse{}, nil
}

func (k msgServer) ToggleRepositoryForking(goCtx context.Context, msg *types.MsgToggleRepositoryForking) (*types.MsgToggleRepositoryForkingResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}

	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.ToggleRepositoryForkingPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	repository.AllowForking = !repository.AllowForking
	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.ToggleRepositoryForkingEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoAllowForkingKey, strconv.FormatBool(repository.AllowForking)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgToggleRepositoryForkingResponse{AllowForking: repository.AllowForking}, nil
}

func (k msgServer) ToggleArweaveBackup(goCtx context.Context, msg *types.MsgToggleArweaveBackup) (*types.MsgToggleArweaveBackupResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}

	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.RepositoryBackupPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	switch repository.Owner.Type {
	case types.OwnerType_USER:
		user, found := k.GetUser(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("owner (%v) doesn't exist", repository.Owner.Id))
		}

		if !user.Verified {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not verified", repository.Owner.Id))
		}
	case types.OwnerType_DAO:
		dao, found := k.GetDao(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("owner (%v) doesn't exist", repository.Owner.Id))
		}

		if !dao.Verified {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("dao (%v) is not verified", repository.Owner.Id))
		}
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid owner type: %v", repository.Owner.Type))
	}

	repository.EnableArweaveBackup = !repository.EnableArweaveBackup
	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.ToggleArweaveBackupEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoEnableArweaveBackupKey, strconv.FormatBool(repository.EnableArweaveBackup)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgToggleArweaveBackupResponse{EnableArweaveBackup: repository.EnableArweaveBackup}, nil
}

func (k msgServer) DeleteRepository(goCtx context.Context, msg *types.MsgDeleteRepository) (*types.MsgDeleteRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.Address, msg.RepositoryId.Name)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %s when archived is set to true", msg.RepositoryId.Name)
	}

	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.DeleteRepositoryPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	DoRemoveRepository(ctx, k, repository)

	// Remove the repository id -> owner address, repository name mapping
	k.RemoveBaseRepositoryKey(ctx, repository.Id)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DeleteRepositoryEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
		),
	)

	return &types.MsgDeleteRepositoryResponse{}, nil
}

func DoRemoveRepository(ctx sdk.Context, k msgServer, repository types.Repository) {
	for _, fork := range repository.Forks {
		DecoupleForkRepository(ctx, k, fork)
	}

	repositoryIssues := k.GetAllRepositoryIssue(ctx, repository.Id)
	for _, i := range repositoryIssues {
		DoRemoveIssue(ctx, k, i, repository)
	}

	repositoryPullRequests := k.GetAllRepositoryPullRequest(ctx, repository.Id)
	for _, pr := range repositoryPullRequests {
		DoRemovePullRequest(ctx, k, pr, repository)
	}

	for _, r := range repository.Releases {
		release, _ := k.GetRelease(ctx, r.Id)
		DoRemoveRelease(ctx, k, release, repository)
	}

	k.RemoveAddressRepository(ctx, repository.Owner.Id, repository.Name)
}

func DecoupleForkRepository(ctx sdk.Context, k msgServer, repositoryId uint64) error {
	forkedRepository, found := k.GetRepositoryById(ctx, repositoryId)
	if !found {
		return sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", repositoryId))
	}
	forkedRepository.Parent = 0
	forkedRepository.Fork = false
	forkedRepository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, forkedRepository)
	return nil
}
