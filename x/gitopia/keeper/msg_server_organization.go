package keeper

import (
	"context"
	"fmt"
	"strconv"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
)

func (k msgServer) CreateOrganization(goCtx context.Context, msg *types.MsgCreateOrganization) (*types.MsgCreateOrganizationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user %v doesn't exist", msg.Creator))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetUserOwner(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	// Check if username is available
	if k.HasWhois(ctx, msg.Name) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("name %v already taken", msg.Name))
	}

	createdAt := time.Now().Unix()
	updatedAt := createdAt
	verified := false
	var members []*types.OrganizationMember

	var organizationMember = types.OrganizationMember{
		Id:   msg.Creator,
		Role: "Owner",
	}

	members = append(members, &organizationMember)

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

	// Update user Organizations
	user := k.GetUser(ctx, msg.Creator)

	var userOrganization = types.UserOrganization{
		Name: organization.Name,
		Id:   id,
	}
	user.Organizations = append(user.Organizations, &userOrganization)

	k.SetUser(ctx, user)

	// Update whois
	var whois = types.Whois{
		Creator: msg.Creator,
		Name:    msg.Name,
		Address: strconv.FormatUint(id, 10),
	}

	k.Keeper.SetWhois(
		ctx,
		msg.Name,
		whois,
	)

	return &types.MsgCreateOrganizationResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateOrganizationMember(goCtx context.Context, msg *types.MsgUpdateOrganizationMember) (*types.MsgUpdateOrganizationMemberResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator %v doesn't exist", msg.Creator))
	}

	if !k.HasUser(ctx, msg.User) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user %v doesn't exist", msg.User))
	}

	// Checks that the element exists
	if !k.HasOrganization(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	organization := k.GetOrganization(ctx, msg.Id)

	if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
		if organization.Members[i].Role != "Owner" {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a part of organization", msg.Creator))
	}

	var organizationMember = types.OrganizationMember{
		Id:   msg.User,
		Role: msg.Role,
	}

	organization.Members = append(organization.Members, &organizationMember)

	k.SetOrganization(ctx, organization)

	return &types.MsgUpdateOrganizationMemberResponse{}, nil
}

func (k msgServer) RemoveOrganizationMember(goCtx context.Context, msg *types.MsgRemoveOrganizationMember) (*types.MsgRemoveOrganizationMemberResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator %v doesn't exist", msg.Creator))
	}

	// Checks that the element exists
	if !k.HasOrganization(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	organization := k.GetOrganization(ctx, msg.Id)

	if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
		if organization.Members[i].Role != "Owner" {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a part of organization", msg.Creator))
	}

	if i, exists := utils.OrganizationMemberExists(organization.Members, msg.User); exists {
		organization.Members = append(organization.Members[:i], organization.Members[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("User (%v) doesn't exists in organization members", msg.User))
	}

	k.SetOrganization(ctx, organization)

	return &types.MsgRemoveOrganizationMemberResponse{}, nil
}

func (k msgServer) UpdateOrganization(goCtx context.Context, msg *types.MsgUpdateOrganization) (*types.MsgUpdateOrganizationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasOrganization(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	organization := k.GetOrganization(ctx, msg.Id)

	if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
		if organization.Members[i].Role != "Owner" {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a part of organization", msg.Creator))
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
