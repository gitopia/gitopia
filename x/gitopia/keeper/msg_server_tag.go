package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
)

func (k msgServer) SetTag(goCtx context.Context, msg *types.MsgSetTag) (*types.MsgSetTagResponse, error) {
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

	if !k.HavePermission(ctx, msg.Creator, repository, types.PushTagPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	tag, found := k.GetRepositoryTag(ctx, repository.Id, msg.Tag.Name)
	if found {
		tag.Sha = msg.Tag.Sha
		tag.UpdatedAt = ctx.BlockTime().Unix()
		k.SetRepositoryTag(ctx, tag)
	} else {
		tag = types.Tag{
			RepositoryId: repository.Id,
			Name:         msg.Tag.Name,
			Sha:          msg.Tag.Sha,
			CreatedAt:    ctx.BlockTime().Unix(),
			UpdatedAt:    ctx.BlockTime().Unix(),
		}
		id := k.AppendTag(ctx, tag)

		tag.Id = id // For event attribute
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	tagJson, _ := json.Marshal(tag)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.SetRepositoryTagEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeRepoOwnerTypeKey, repository.Owner.Type.String()),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoTagKey, string(tagJson)),
			sdk.NewAttribute(types.EventAttributeIsGitRefUpdatedKey, strconv.FormatBool(true)),
			sdk.NewAttribute(types.EventAttributeRepoEnableArweaveBackupKey, strconv.FormatBool(repository.EnableArweaveBackup)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgSetTagResponse{}, nil
}

func (k msgServer) MultiSetTag(goCtx context.Context, msg *types.MsgMultiSetTag) (*types.MsgMultiSetTagResponse, error) {
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

	if !k.HavePermission(ctx, msg.Creator, repository, types.PushTagPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	var updatedTags []types.Tag
	for _, tag := range msg.Tags {
		if t, found := k.GetRepositoryTag(ctx, repository.Id, tag.Name); found {
			t.Sha = tag.Sha
			t.UpdatedAt = ctx.BlockTime().Unix()
			k.SetRepositoryTag(ctx, t)

			updatedTags = append(updatedTags, t)
		} else {
			t := types.Tag{
				RepositoryId: repository.Id,
				Name:         tag.Name,
				Sha:          tag.Sha,
				CreatedAt:    ctx.BlockTime().Unix(),
				UpdatedAt:    ctx.BlockTime().Unix(),
			}
			id := k.AppendTag(ctx, t)

			t.Id = id // For event attribute
			updatedTags = append(updatedTags, t)
		}
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	tagsJson, _ := json.Marshal(updatedTags)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.MultiSetRepositoryTagEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeRepoOwnerTypeKey, repository.Owner.Type.String()),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoTagKey, string(tagsJson)),
			sdk.NewAttribute(types.EventAttributeIsGitRefUpdatedKey, strconv.FormatBool(true)),
			sdk.NewAttribute(types.EventAttributeRepoEnableArweaveBackupKey, strconv.FormatBool(repository.EnableArweaveBackup)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgMultiSetTagResponse{}, nil
}

func (k msgServer) DeleteTag(goCtx context.Context, msg *types.MsgDeleteTag) (*types.MsgDeleteTagResponse, error) {
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

	if !k.HavePermission(ctx, msg.Creator, repository, types.PushTagPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	tag, found := k.GetRepositoryTag(ctx, repository.Id, msg.Tag)
	if found {
		k.RemoveRepositoryTag(ctx, repository.Id, msg.Tag)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("tag (%v) doesn't exist", msg.Tag))
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	tagJson, _ := json.Marshal(tag)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DeleteRepositoryTagEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeRepoOwnerTypeKey, repository.Owner.Type.String()),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoTagKey, string(tagJson)),
			sdk.NewAttribute(types.EventAttributeIsGitRefUpdatedKey, strconv.FormatBool(true)),
			sdk.NewAttribute(types.EventAttributeRepoEnableArweaveBackupKey, strconv.FormatBool(repository.EnableArweaveBackup)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgDeleteTagResponse{}, nil
}

func (k msgServer) MultiDeleteTag(goCtx context.Context, msg *types.MsgMultiDeleteTag) (*types.MsgMultiDeleteTagResponse, error) {
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

	if !k.HavePermission(ctx, msg.Creator, repository, types.PushTagPermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	/* Check if all tag exists */
	var deletedTags []types.Tag
	for _, tag := range msg.Tags {
		tag, found := k.GetRepositoryTag(ctx, repository.Id, tag)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("tag (%v) doesn't exist", tag))
		}

		deletedTags = append(deletedTags, tag)
	}

	for _, tag := range msg.Tags {
		k.RemoveRepositoryTag(ctx, repository.Id, tag)
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()
	k.SetRepository(ctx, repository)

	tagsJson, _ := json.Marshal(deletedTags)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.MultiDeleteRepositoryTagEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeRepoOwnerTypeKey, repository.Owner.Type.String()),
			sdk.NewAttribute(types.EventAttributeRepoNameKey, repository.Name),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(repository.Id, 10)),
			sdk.NewAttribute(types.EventAttributeRepoTagKey, string(tagsJson)),
			sdk.NewAttribute(types.EventAttributeIsGitRefUpdatedKey, strconv.FormatBool(true)),
			sdk.NewAttribute(types.EventAttributeRepoEnableArweaveBackupKey, strconv.FormatBool(repository.EnableArweaveBackup)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(repository.UpdatedAt, 10)),
		),
	)

	return &types.MsgMultiDeleteTagResponse{}, nil
}
