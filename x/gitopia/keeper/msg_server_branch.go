package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) SetBranch(goCtx context.Context, msg *types.MsgSetBranch) (*types.MsgSetBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.address, msg.RepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.PushBranchPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	branch, found := k.GetRepositoryBranch(ctx, repository.Id, msg.Branch.Name)
	if found {
		branch.Sha = msg.Branch.Sha
		branch.UpdatedAt = ctx.BlockTime().Unix()
		k.SetRepositoryBranch(ctx, branch)
	} else {
		branch = types.Branch{
			RepositoryId:   repository.Id,
			Name:           msg.Branch.Name,
			Sha:            msg.Branch.Sha,
			AllowForcePush: true,
			CreatedAt:      ctx.BlockTime().Unix(),
			UpdatedAt:      ctx.BlockTime().Unix(),
		}
		id := k.AppendBranch(ctx, branch)

		branch.Id = id // For event attribute
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	branchJson, _ := json.Marshal(branch)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.MultiSetRepositoryBranchEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeRepoOwnerTypeKey, repository.Owner.Type.String()),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoBranchKey, string(branchJson)),
			sdk.NewAttribute(types.EventAttributeIsGitRefUpdatedKey, strconv.FormatBool(true)),
			sdk.NewAttribute(types.EventAttributeRepoEnableArweaveBackupKey, strconv.FormatBool(repository.EnableArweaveBackup)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgSetBranchResponse{}, nil
}

func (k msgServer) MultiSetBranch(goCtx context.Context, msg *types.MsgMultiSetBranch) (*types.MsgMultiSetBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.address, msg.RepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.PushBranchPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	var updatedBranches []types.Branch
	for _, branch := range msg.Branches {
		if b, found := k.GetRepositoryBranch(ctx, repository.Id, branch.Name); found {
			b.Sha = branch.Sha
			b.UpdatedAt = ctx.BlockTime().Unix()
			k.SetRepositoryBranch(ctx, b)

			updatedBranches = append(updatedBranches, b)
		} else {
			b := types.Branch{
				RepositoryId:   repository.Id,
				Name:           branch.Name,
				Sha:            branch.Sha,
				AllowForcePush: true,
				CreatedAt:      ctx.BlockTime().Unix(),
				UpdatedAt:      ctx.BlockTime().Unix(),
			}
			id := k.AppendBranch(ctx, b)

			b.Id = id // For event attribute
			updatedBranches = append(updatedBranches, b)
		}
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	branchesJson, _ := json.Marshal(updatedBranches)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.MultiSetRepositoryBranchEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeRepoOwnerTypeKey, repository.Owner.Type.String()),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoBranchKey, string(branchesJson)),
			sdk.NewAttribute(types.EventAttributeIsGitRefUpdatedKey, strconv.FormatBool(true)),
			sdk.NewAttribute(types.EventAttributeRepoEnableArweaveBackupKey, strconv.FormatBool(repository.EnableArweaveBackup)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgMultiSetBranchResponse{}, nil
}

func (k msgServer) SetDefaultBranch(goCtx context.Context, msg *types.MsgSetDefaultBranch) (*types.MsgSetDefaultBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.address, msg.RepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.PushBranchPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	branch, found := k.GetRepositoryBranch(ctx, repository.Id, msg.Branch)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch (%v) doesn't exist", msg.Branch))
	}

	repository.DefaultBranch = msg.Branch
	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	branchJson, _ := json.Marshal(branch)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.SetRepositoryDefaultBranchEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoBranchKey, string(branchJson)),
			sdk.NewAttribute(types.EventAttributeRepoDefaultBranchKey, repository.DefaultBranch),
			sdk.NewAttribute(types.EventAttributeIsGitRefUpdatedKey, strconv.FormatBool(true)),
			sdk.NewAttribute(types.EventAttributeRepoEnableArweaveBackupKey, strconv.FormatBool(repository.EnableArweaveBackup)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgSetDefaultBranchResponse{}, nil
}

func (k msgServer) DeleteBranch(goCtx context.Context, msg *types.MsgDeleteBranch) (*types.MsgDeleteBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.address, msg.RepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.PushBranchPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	branch, found := k.GetRepositoryBranch(ctx, repository.Id, msg.Branch)
	if found {
		k.RemoveRepositoryBranch(ctx, repository.Id, msg.Branch)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch (%v) doesn't exist", msg.Branch))
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	branchJson, _ := json.Marshal(branch)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DeleteRepositoryBranchEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoBranchKey, string(branchJson)),
			sdk.NewAttribute(types.EventAttributeIsGitRefUpdatedKey, strconv.FormatBool(true)),
			sdk.NewAttribute(types.EventAttributeRepoEnableArweaveBackupKey, strconv.FormatBool(repository.EnableArweaveBackup)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgDeleteBranchResponse{}, nil
}

func (k msgServer) MultiDeleteBranch(goCtx context.Context, msg *types.MsgMultiDeleteBranch) (*types.MsgMultiDeleteBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	address, err := k.ResolveAddress(ctx, msg.RepositoryId.Id)
	if err != nil {
		return nil, err
	}

	repository, found := k.GetAddressRepository(ctx, address.address, msg.RepositoryId.Name)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v/%v) doesn't exist", msg.RepositoryId.Id, msg.RepositoryId.Name))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.PushBranchPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	/* Check if all branch exists */
	var deletedBranches []types.Branch
	for _, branch := range msg.Branches {
		branch, found := k.GetRepositoryBranch(ctx, repository.Id, branch)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch (%v) doesn't exist", branch))
		}

		deletedBranches = append(deletedBranches, branch)
	}

	for _, branch := range msg.Branches {
		k.RemoveRepositoryBranch(ctx, repository.Id, branch)
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	branchesJson, _ := json.Marshal(deletedBranches)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.MultiDeleteRepositoryBranchEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoBranchKey, string(branchesJson)),
			sdk.NewAttribute(types.EventAttributeIsGitRefUpdatedKey, strconv.FormatBool(true)),
			sdk.NewAttribute(types.EventAttributeRepoEnableArweaveBackupKey, strconv.FormatBool(repository.EnableArweaveBackup)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgMultiDeleteBranchResponse{}, nil
}

func (k msgServer) ToggleForcePush(goCtx context.Context,  msg *types.MsgToggleForcePush) (*types.MsgToggleForcePushResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

    // TODO: Handling the message
    _ = ctx

	return &types.MsgToggleForcePushResponse{}, nil
}