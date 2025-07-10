package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/gitopia/gitopia/v6/x/gitopia/utils"
)

func (k msgServer) CreateRelease(goCtx context.Context, msg *types.MsgCreateRelease) (*types.MsgCreateReleaseResponse, error) {
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

	// In case of dao, check if dao requires a proposal to create a new release
	if repository.Owner.Type == types.OwnerType_DAO {
		dao, found := k.GetDao(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", repository.Owner.Id))
		}

		if dao.Config.RequireReleaseProposal {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("dao (%v) requires a proposal to create a new release", repository.Owner.Id))
		}
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.ReleasePermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if _, found := k.GetRepositoryTag(ctx, repository.Id, msg.TagName); !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("tag (%v) does not exists", msg.TagName))
	}

	if _, exists := utils.RepositoryReleaseTagExists(repository.Releases, msg.TagName); exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("release with tag (%v) already exists", msg.TagName))
	}

	if _, found := k.GetRepositoryBranch(ctx, repository.Id, msg.Target); !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("target branch (%v) does not exists", msg.Target))
	}

	attachments := []*types.Attachment{}

	if msg.Attachments != "" {
		if err := json.Unmarshal([]byte(msg.Attachments), &attachments); err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "unable to unmarshal attachments")
		}
	}

	currentTime := ctx.BlockTime().Unix()

	var release = types.Release{
		Creator:      msg.Creator,
		RepositoryId: repository.Id,
		TagName:      msg.TagName,
		Target:       msg.Target,
		Name:         msg.Name,
		Description:  msg.Description,
		Attachments:  attachments,
		Draft:        msg.Draft,
		PreRelease:   msg.PreRelease,
		IsTag:        msg.IsTag,
		CreatedAt:    currentTime,
		UpdatedAt:    currentTime,
	}

	if msg.Draft {
		release.PublishedAt = time.Time{}.Unix()
	} else {
		release.PublishedAt = currentTime
	}

	id := k.AppendRelease(
		ctx,
		release,
	)

	var repositoryRelease = types.RepositoryRelease{
		TagName: msg.TagName,
		Id:      id,
	}

	repository.Releases = append(repository.Releases, &repositoryRelease)

	k.SetRepository(ctx, repository)

	attachmentsJson, _ := json.Marshal(release.Attachments)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.CreateReleaseEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(release.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeReleaseIdKey, strconv.FormatUint(id, 10)),
			sdk.NewAttribute(types.EventAttributeReleaseTagNameKey, release.TagName),
			sdk.NewAttribute(types.EventAttributeReleaseNameKey, release.Name),
			sdk.NewAttribute(types.EventAttributeReleaseDescriptionKey, release.Description),
			sdk.NewAttribute(types.EventAttributeReleaseDraftKey, strconv.FormatBool(release.Draft)),
			sdk.NewAttribute(types.EventAttributeReleasePreReleaseKey, strconv.FormatBool(release.PreRelease)),
			sdk.NewAttribute(types.EventAttributeReleaseAttachmentsKey, string(attachmentsJson)),
			sdk.NewAttribute(types.EventAttributeProviderKey, msg.Provider),
			sdk.NewAttribute(types.EventAttributeCreatedAtKey, strconv.FormatInt(release.CreatedAt, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(release.UpdatedAt, 10)),
			sdk.NewAttribute(types.EventAttributePublishedAtKey, strconv.FormatInt(release.PublishedAt, 10)),
		),
	)

	return &types.MsgCreateReleaseResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateRelease(goCtx context.Context, msg *types.MsgUpdateRelease) (*types.MsgUpdateReleaseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	release, found := k.GetRelease(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("release id (%d) doesn't exist", msg.Id))
	}

	repository, found := k.GetRepositoryById(ctx, release.RepositoryId)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %d when archived is set to true", release.RepositoryId)
	}

	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", msg.Id))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.ReleasePermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if _, found := k.GetRepositoryTag(ctx, repository.Id, msg.TagName); !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("tag (%v) does not exists", msg.TagName))
	}

	if i, exists := utils.RepositoryReleaseTagExists(repository.Releases, msg.TagName); exists {
		if repository.Releases[i].Id != msg.Id {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("release with tag (%v) already exists", msg.TagName))
		}
	}

	if _, found := k.GetRepositoryBranch(ctx, repository.Id, msg.Target); !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("target branch (%v) does not exists", msg.Target))
	}

	attachments := []*types.Attachment{}

	if msg.Attachments != "" {
		if err := json.Unmarshal([]byte(msg.Attachments), &attachments); err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "unable to unmarshal attachments")
		}
	}

	currentTime := ctx.BlockTime().Unix()

	release.TagName = msg.TagName
	release.Target = msg.Target
	release.Name = msg.Name
	release.Description = msg.Description
	release.Attachments = attachments
	release.Draft = msg.Draft
	release.PreRelease = msg.PreRelease
	release.IsTag = msg.IsTag
	release.UpdatedAt = currentTime

	if msg.Draft {
		release.PublishedAt = time.Time{}.Unix()
	} else {
		release.PublishedAt = currentTime
	}

	if i, exists := utils.RepositoryReleaseIdExists(repository.Releases, msg.Id); exists {
		if repository.Releases[i].TagName != msg.TagName {
			repository.Releases[i].TagName = msg.TagName
			k.SetRepository(ctx, repository)
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("release with Id (%d) doesn't exists in repository", msg.Id))
	}

	k.SetRelease(ctx, release)

	attachmentsJson, _ := json.Marshal(release.Attachments)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateReleaseEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(release.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeReleaseIdKey, strconv.FormatUint(release.Id, 10)),
			sdk.NewAttribute(types.EventAttributeReleaseTagNameKey, release.TagName),
			sdk.NewAttribute(types.EventAttributeReleaseNameKey, release.Name),
			sdk.NewAttribute(types.EventAttributeReleaseDescriptionKey, release.Description),
			sdk.NewAttribute(types.EventAttributeReleaseDraftKey, strconv.FormatBool(release.Draft)),
			sdk.NewAttribute(types.EventAttributeReleasePreReleaseKey, strconv.FormatBool(release.PreRelease)),
			sdk.NewAttribute(types.EventAttributeReleaseAttachmentsKey, string(attachmentsJson)),
			sdk.NewAttribute(types.EventAttributeProviderKey, msg.Provider),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(release.UpdatedAt, 10)),
			sdk.NewAttribute(types.EventAttributePublishedAtKey, strconv.FormatInt(release.PublishedAt, 10)),
		),
	)

	return &types.MsgUpdateReleaseResponse{}, nil
}

func (k msgServer) DeleteRelease(goCtx context.Context, msg *types.MsgDeleteRelease) (*types.MsgDeleteReleaseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	release, found := k.GetRelease(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("release id (%d) doesn't exist", msg.Id))
	}

	repository, found := k.GetRepositoryById(ctx, release.RepositoryId)
	if repository.Archived {
		return nil, fmt.Errorf("don't allow any modifications to repository %d when archived is set to true", release.RepositoryId)
	}

	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", release.RepositoryId))
	}

	if !k.HavePermission(ctx, msg.Creator, repository, types.ReleasePermission) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	DoRemoveRelease(ctx, k, release, repository)

	attachmentsJson, _ := json.Marshal(release.Attachments)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DeleteReleaseEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(release.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeRepoOwnerIdKey, repository.Owner.Id),
			sdk.NewAttribute(types.EventAttributeReleaseIdKey, strconv.FormatUint(release.Id, 10)),
			sdk.NewAttribute(types.EventAttributeReleaseTagNameKey, release.TagName),
			sdk.NewAttribute(types.EventAttributeReleaseAttachmentsKey, string(attachmentsJson)),
			sdk.NewAttribute(types.EventAttributeProviderKey, msg.Provider),
		),
	)

	return &types.MsgDeleteReleaseResponse{}, nil
}

func DoRemoveRelease(ctx sdk.Context, k msgServer, release types.Release, repository types.Repository) {
	if i, exists := utils.RepositoryReleaseIdExists(repository.Releases, release.Id); exists {
		repository.Releases = append(repository.Releases[:i], repository.Releases[i+1:]...)
	}

	repository.UpdatedAt = ctx.BlockTime().Unix()

	k.SetRepository(ctx, repository)
	k.RemoveRelease(ctx, release.Id)
}
