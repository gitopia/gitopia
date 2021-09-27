package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
)

func (k msgServer) CreateRelease(goCtx context.Context, msg *types.MsgCreateRelease) (*types.MsgCreateReleaseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.RepositoryId) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository %d doesn't exist", msg.RepositoryId))
	}

	repository := k.GetRepository(ctx, msg.RepositoryId)

	var organization types.Organization

	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		if !k.HasOrganization(ctx, repository.Owner.Id) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}

		organization = k.GetOrganization(ctx, repository.Owner.Id)
	}

	if !utils.HaveRepositoryPermission(repository, msg.Creator, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if _, exists := utils.RepositoryTagExists(repository.Tags, msg.TagName); !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("tag (%v) doesn't exists", msg.TagName))
	}

	if _, exists := utils.RepositoryReleaseTagExists(repository.Releases, msg.TagName); exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("release with tag (%v) already exists", msg.TagName))
	}

	if _, exists := utils.RepositoryBranchExists(repository.Branches, msg.Target); !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("target branch (%v) doesn't exists", msg.Target))
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
		RepositoryId: msg.RepositoryId,
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

	return &types.MsgCreateReleaseResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateRelease(goCtx context.Context, msg *types.MsgUpdateRelease) (*types.MsgUpdateReleaseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasRelease(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetReleaseOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	release := k.GetRelease(ctx, msg.Id)

	repository := k.GetRepository(ctx, release.RepositoryId)

	if _, exists := utils.RepositoryTagExists(repository.Tags, msg.TagName); !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("tag (%v) doesn't exists", msg.TagName))
	}

	if i, exists := utils.RepositoryReleaseTagExists(repository.Releases, msg.TagName); exists {
		if repository.Releases[i].Id != msg.Id {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("release with tag (%v) already exists", msg.TagName))
		}
	}

	if _, exists := utils.RepositoryBranchExists(repository.Branches, msg.Target); !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("target branch (%v) doesn't exists", msg.Target))
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

	return &types.MsgUpdateReleaseResponse{}, nil
}

func (k msgServer) DeleteRelease(goCtx context.Context, msg *types.MsgDeleteRelease) (*types.MsgDeleteReleaseResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasRelease(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	if msg.Creator != k.GetReleaseOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveRelease(ctx, msg.Id)

	return &types.MsgDeleteReleaseResponse{}, nil
}
