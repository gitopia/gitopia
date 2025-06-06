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

func (k msgServer) DaoCreateRelease(goCtx context.Context, msg *types.MsgDaoCreateRelease) (*types.MsgDaoCreateReleaseResponse, error) {
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

	dao, found := k.GetDao(ctx, address.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", address.Address))
	}

	// check if the message admin and the group admin are the same
	err = k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
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
		Creator:      msg.Admin,
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

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DaoCreateReleaseEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Admin),
			sdk.NewAttribute(types.EventAttributeRepoIdKey, strconv.FormatUint(release.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeReleaseIdKey, strconv.FormatUint(id, 10)),
			sdk.NewAttribute(types.EventAttributeReleaseTagNameKey, release.TagName),
			sdk.NewAttribute(types.EventAttributeReleaseNameKey, release.Name),
			sdk.NewAttribute(types.EventAttributeReleaseDescriptionKey, release.Description),
			sdk.NewAttribute(types.EventAttributeReleaseDraftKey, strconv.FormatBool(release.Draft)),
			sdk.NewAttribute(types.EventAttributeReleasePreReleaseKey, strconv.FormatBool(release.PreRelease)),
			sdk.NewAttribute(types.EventAttributeProviderKey, msg.Provider),
			sdk.NewAttribute(types.EventAttributeCreatedAtKey, strconv.FormatInt(release.CreatedAt, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(release.UpdatedAt, 10)),
			sdk.NewAttribute(types.EventAttributePublishedAtKey, strconv.FormatInt(release.PublishedAt, 10)),
		),
	)

	return &types.MsgDaoCreateReleaseResponse{
		Id: id,
	}, nil
}
