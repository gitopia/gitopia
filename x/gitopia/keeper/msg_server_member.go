package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
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

	dao, found := k.GetDao(ctx, daoAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.DaoId))
	}

	memberAddress, err := k.ResolveAddress(ctx, msg.UserId)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	_, found = k.GetUser(ctx, memberAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.UserId))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	if _, found := k.GetDaoMember(ctx, daoAddress.address, memberAddress.address); found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is already member of dao", msg.UserId))
	}

	member := types.Member{
		Address:    memberAddress.address,
		DaoAddress: daoAddress.address,
		Role:       msg.Role,
	}

	k.AppendMember(ctx, member)

	dao.UpdatedAt = ctx.BlockTime().Unix()
	k.SetDao(ctx, dao)

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

	dao, found := k.GetDao(ctx, daoAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.DaoId))
	}

	memberAddress, err := k.ResolveAddress(ctx, msg.UserId)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	_, found = k.GetUser(ctx, memberAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.UserId))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	member, found := k.GetDaoMember(ctx, daoAddress.address, memberAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a member of dao", msg.UserId))
	}

	member.Role = msg.Role
	k.SetMember(ctx, member)

	dao.UpdatedAt = ctx.BlockTime().Unix()
	k.SetDao(ctx, dao)

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

	dao, found := k.GetDao(ctx, daoAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.DaoId))
	}

	memberAddress, err := k.ResolveAddress(ctx, msg.UserId)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	_, found = k.GetUser(ctx, memberAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.UserId))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	member, found := k.GetDaoMember(ctx, daoAddress.address, memberAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user (%v) is not a member of dao", msg.UserId))
	}

	k.RemoveDaoMember(ctx, member.DaoAddress, member.Address)

	dao.UpdatedAt = ctx.BlockTime().Unix()
	k.SetDao(ctx, dao)

	return &types.MsgRemoveMemberResponse{}, nil
}
