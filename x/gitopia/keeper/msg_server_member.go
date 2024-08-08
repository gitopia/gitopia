package keeper

import (
	"context"
	"fmt"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
)

func (k msgServer) AddMember(goCtx context.Context, msg *types.MsgAddMember) (*types.MsgAddMemberResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	daoAddress, err := k.ResolveAddress(ctx, msg.DaoId)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.DaoId))
	}

	memberAddress, err := k.ResolveAddress(ctx, msg.UserId)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	_, found = k.GetUser(ctx, memberAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.UserId))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.Address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	if _, found := k.GetDaoMember(ctx, daoAddress.Address, memberAddress.Address); found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is already member of dao", msg.UserId))
	}

	member := types.Member{
		Address:    memberAddress.Address,
		DaoAddress: daoAddress.Address,
		Role:       msg.Role,
	}

	k.AppendMember(ctx, member)

	dao.UpdatedAt = ctx.BlockTime().Unix()
	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.AddDaoMemberEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeDaoMemberAddressKey, member.Address),
			sdk.NewAttribute(types.EventAttributeDaoMemberRoleKey, member.Role.String()),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

	return &types.MsgAddMemberResponse{}, nil
}

func (k msgServer) UpdateMemberRole(goCtx context.Context, msg *types.MsgUpdateMemberRole) (*types.MsgUpdateMemberRoleResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	daoAddress, err := k.ResolveAddress(ctx, msg.DaoId)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.DaoId))
	}

	memberAddress, err := k.ResolveAddress(ctx, msg.UserId)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	_, found = k.GetUser(ctx, memberAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.UserId))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.Address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	member, found := k.GetDaoMember(ctx, daoAddress.Address, memberAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a member of dao", msg.UserId))
	}

	owners := k.GetAllDaoOwner(ctx, daoAddress.Address)
	if len(owners) == 1 && memberAddress.Address == msg.Creator { // Only owner cannot update their role
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("owner (%v) is the only owner", msg.UserId))
	}

	member.Role = msg.Role
	k.SetMember(ctx, member)

	dao.UpdatedAt = ctx.BlockTime().Unix()
	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoMemberRoleEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeDaoMemberAddressKey, member.Address),
			sdk.NewAttribute(types.EventAttributeDaoMemberRoleKey, member.Role.String()),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdateMemberRoleResponse{}, nil
}

func (k msgServer) RemoveMember(goCtx context.Context, msg *types.MsgRemoveMember) (*types.MsgRemoveMemberResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	daoAddress, err := k.ResolveAddress(ctx, msg.DaoId)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.DaoId))
	}

	memberAddress, err := k.ResolveAddress(ctx, msg.UserId)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	_, found = k.GetUser(ctx, memberAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.UserId))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.Address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	member, found := k.GetDaoMember(ctx, daoAddress.Address, memberAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a member of dao", msg.UserId))
	}

	owners := k.GetAllDaoOwner(ctx, daoAddress.Address)
	if len(owners) == 1 && memberAddress.Address == msg.Creator { // only owner cannot remove themselves
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("owner (%v) is the only owner", msg.UserId))
	}

	k.RemoveDaoMember(ctx, member.DaoAddress, member.Address)

	dao.UpdatedAt = ctx.BlockTime().Unix()
	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.RemoveDaoMemberEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeDaoMemberAddressKey, member.Address),
			sdk.NewAttribute(types.EventAttributeDaoMemberRoleKey, member.Role.String()),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

	return &types.MsgRemoveMemberResponse{}, nil
}
