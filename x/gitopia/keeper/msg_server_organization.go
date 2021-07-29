package keeper

import (
	"context"
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateOrganization(goCtx context.Context, msg *types.MsgCreateOrganization) (*types.MsgCreateOrganizationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	createdAt := time.Now().Unix()
	updatedAt := createdAt
	members := map[string]string{msg.Creator: "Owner"}
	verified := false

	var organization = types.Organization{
		Creator:     msg.Creator,
		Name:        msg.Name,
		Description: msg.Description,
		CreatedAt:   createdAt,
		UpdatedAt:   updatedAt,
		Members:     members,
		Verified:    verified,
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

	// Checks that the element exists
	if !k.HasOrganization(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	organization := k.GetOrganization(ctx, msg.Id)

	// Checks if the the msg sender is the same as the current owner
	if organization.Members[msg.Creator] != "Owner" {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	organization.Name = msg.Name
	organization.AvatarUrl = msg.AvatarUrl
	organization.Location = msg.Location
	organization.Email = msg.Email
	organization.Website = msg.Website
	organization.Description = msg.Description
	organization.UpdatedAt = time.Now().Unix()

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
