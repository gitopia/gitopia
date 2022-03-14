package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
)

func (k msgServer) CreateOrganization(goCtx context.Context, msg *types.MsgCreateOrganization) (*types.MsgCreateOrganizationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	user, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != user.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	// Check if username is available
	// if k.HasWhois(ctx, msg.Name) {
	// 	return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("name %v already taken", msg.Name))
	// }

	if _, exists := utils.UserOrganizationExists(user.Organizations, msg.Name); exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("organization name (%v) already in use", msg.Name))
	}

	createdAt := ctx.BlockTime().Unix()
	updatedAt := createdAt
	verified := false
	var members []*types.OrganizationMember

	var organizationMember = types.OrganizationMember{
		Id:   msg.Creator,
		Role: types.OrganizationMember_OWNER,
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
	var userOrganization = types.UserOrganization{
		Name: organization.Name,
		Id:   id,
	}
	user.Organizations = append(user.Organizations, &userOrganization)

	k.SetUser(ctx, user)

	// Update whois
	// var whois = types.Whois{
	// 	Creator: msg.Creator,
	// 	Name:    msg.Name,
	// 	Address: strconv.FormatUint(id, 10),
	// }

	// k.Keeper.SetWhois(
	// 	ctx,
	// 	msg.Name,
	// 	whois,
	// )

	return &types.MsgCreateOrganizationResponse{
		Id: id,
	}, nil
}

func (k msgServer) RenameOrganization(goCtx context.Context, msg *types.MsgRenameOrganization) (*types.MsgRenameOrganizationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	organization, found := k.GetOrganization(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}
	user, found := k.GetUser(ctx, organization.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization creator (%v) doesn't exist", organization.Creator))
	}

	var havePermission bool = false

	if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
		if organization.Members[i].Role == types.OrganizationMember_OWNER {
			havePermission = true
		}
	}

	if !havePermission {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
	}

	if i, exists := utils.UserOrganizationExists(user.Organizations, msg.Name); exists {
		if user.Organizations[i].Id != msg.Id {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("organization name (%v) already in use", msg.Name))
		}
	}

	if i, exists := utils.UserOrganizationIdExists(user.Organizations, msg.Id); exists {
		user.Organizations[i].Name = msg.Name
	}

	currentTime := ctx.BlockTime().Unix()

	organization.Name = msg.Name
	organization.UpdatedAt = currentTime

	k.SetOrganization(ctx, organization)
	k.SetUser(ctx, user)

	return &types.MsgRenameOrganizationResponse{}, nil
}

func (k msgServer) UpdateOrganizationMember(goCtx context.Context, msg *types.MsgUpdateOrganizationMember) (*types.MsgUpdateOrganizationMemberResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	_, found = k.GetUser(ctx, msg.User)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.User))
	}

	organization, found := k.GetOrganization(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if msg.Creator == msg.User {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "action not permittable")
	}

	if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
		if organization.Members[i].Role != types.OrganizationMember_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a member of organization", msg.Creator))
	}

	role, exists := types.OrganizationMember_Role_value[msg.Role]
	if !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid role arg (%v)", msg.Role))
	}

	if i, exists := utils.OrganizationMemberExists(organization.Members, msg.User); exists {
		organization.Members[i].Role = types.OrganizationMember_Role(role)
		k.SetOrganization(ctx, organization)

		return &types.MsgUpdateOrganizationMemberResponse{}, nil
	}

	var organizationMember = types.OrganizationMember{
		Id:   msg.User,
		Role: types.OrganizationMember_Role(role),
	}

	organization.Members = append(organization.Members, &organizationMember)

	k.SetOrganization(ctx, organization)

	return &types.MsgUpdateOrganizationMemberResponse{}, nil
}

func (k msgServer) RemoveOrganizationMember(goCtx context.Context, msg *types.MsgRemoveOrganizationMember) (*types.MsgRemoveOrganizationMemberResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	organization, found := k.GetOrganization(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
		if organization.Members[i].Role != types.OrganizationMember_OWNER {
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

	if _, exists := utils.OrganizationMemberWithRoleExists(organization.Members, types.OrganizationMember_OWNER); !exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "can't remove only owner")
	}

	k.SetOrganization(ctx, organization)

	return &types.MsgRemoveOrganizationMemberResponse{}, nil
}

func (k msgServer) UpdateOrganization(goCtx context.Context, msg *types.MsgUpdateOrganization) (*types.MsgUpdateOrganizationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	organization, found := k.GetOrganization(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
		if organization.Members[i].Role != types.OrganizationMember_OWNER {
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
	organization.UpdatedAt = ctx.BlockTime().Unix()

	k.SetOrganization(ctx, organization)

	return &types.MsgUpdateOrganizationResponse{}, nil
}

func (k msgServer) DeleteOrganization(goCtx context.Context, msg *types.MsgDeleteOrganization) (*types.MsgDeleteOrganizationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	user, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	organization, found := k.GetOrganization(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if msg.Creator != organization.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	DoRemoveOrganization(ctx, k, user, organization)

	return &types.MsgDeleteOrganizationResponse{}, nil
}

func DoRemoveOrganization(ctx sdk.Context, k msgServer, user types.User, organization types.Organization) {
	for _, r := range organization.Repositories {
		repository, _ := k.GetRepository(ctx, r.Id)
		DoRemoveRepository(ctx, k, user, repository)
	}

	if i, exists := utils.UserOrganizationExists(user.Organizations, organization.Name); exists {
		user.Organizations = append(user.Organizations[:i], user.Organizations[i+1:]...)
	}

	k.SetUser(ctx, user)
	k.RemoveOrganization(ctx, organization.Address)
}
