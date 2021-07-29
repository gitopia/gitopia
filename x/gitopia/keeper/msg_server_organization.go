package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateOrganization(goCtx context.Context, msg *types.MsgCreateOrganization) (*types.MsgCreateOrganizationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var organization = types.Organization{
		Creator:         msg.Creator,
		Name:            msg.Name,
		AvatarUrl:       msg.AvatarUrl,
		Followers:       msg.Followers,
		Following:       msg.Following,
		Repositories:    msg.Repositories,
		RepositoryNames: msg.RepositoryNames,
		Teams:           msg.Teams,
		Members:         msg.Members,
		Location:        msg.Location,
		Email:           msg.Email,
		Website:         msg.Website,
		Verified:        msg.Verified,
		Description:     msg.Description,
		CreatedAt:       msg.CreatedAt,
		UpdatedAt:       msg.UpdatedAt,
		Extensions:      msg.Extensions,
	}

	id := k.AppendOrganization(
		ctx,
		organization,
	)

	return &types.MsgCreateOrganizationResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateOrganization(goCtx context.Context, msg *types.MsgUpdateOrganization) (*types.MsgUpdateOrganizationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var organization = types.Organization{
		Creator:         msg.Creator,
		Id:              msg.Id,
		Name:            msg.Name,
		AvatarUrl:       msg.AvatarUrl,
		Followers:       msg.Followers,
		Following:       msg.Following,
		Repositories:    msg.Repositories,
		RepositoryNames: msg.RepositoryNames,
		Teams:           msg.Teams,
		Members:         msg.Members,
		Location:        msg.Location,
		Email:           msg.Email,
		Website:         msg.Website,
		Verified:        msg.Verified,
		Description:     msg.Description,
		CreatedAt:       msg.CreatedAt,
		UpdatedAt:       msg.UpdatedAt,
		Extensions:      msg.Extensions,
	}

	// Checks that the element exists
	if !k.HasOrganization(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetOrganizationOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetOrganization(ctx, organization)

	return &types.MsgUpdateOrganizationResponse{}, nil
}

func (k msgServer) DeleteOrganization(goCtx context.Context, msg *types.MsgDeleteOrganization) (*types.MsgDeleteOrganizationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasOrganization(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	if msg.Creator != k.GetOrganizationOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveOrganization(ctx, msg.Id)

	return &types.MsgDeleteOrganizationResponse{}, nil
}
