package keeper

import (
	"context"
	"fmt"
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateDao(goCtx context.Context, msg *types.MsgCreateDao) (*types.MsgCreateDaoResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	daoName := strings.ToLower(msg.Name)

	if _, found := k.GetWhois(ctx, daoName); found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("name is already taken: (%v)", msg.Name))
	}

	if _, reserved := types.ReservedUsernames[daoName]; reserved {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("(%v) is reserved name", msg.Name))
	}

	var dao = types.Dao{
		Creator:     msg.Creator,
		Name:        msg.Name,
		Description: msg.Description,
		CreatedAt:   ctx.BlockTime().Unix(),
		UpdatedAt:   ctx.BlockTime().Unix(),
		AvatarUrl:   msg.AvatarUrl,
		Location:    msg.Location,
		Website:     msg.Website,
	}

	id := k.AppendDao(
		ctx,
		dao,
	)

	if id == "" {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "dao address already exists")
	}

	member := types.Member{
		Address:    msg.Creator,
		DaoAddress: id,
		Role:       types.MemberRole_OWNER,
	}

	k.AppendMember(ctx, member)

	whois := types.Whois{
		Creator:   msg.Creator,
		Name:      daoName,
		Address:   id,
		OwnerType: types.OwnerType_DAO,
	}

	k.Keeper.AppendWhois(
		ctx,
		whois,
	)

	return &types.MsgCreateDaoResponse{
		Id: id,
	}, nil
}

func (k msgServer) RenameDao(goCtx context.Context, msg *types.MsgRenameDao) (*types.MsgRenameDaoResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	newDaoName := strings.ToLower(msg.Name)
	currentDaoName := strings.ToLower(dao.Name)

	if _, found := k.GetWhois(ctx, newDaoName); found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("name is already taken: (%v)", msg.Name))
	}
	if _, reserved := types.ReservedUsernames[newDaoName]; reserved {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("(%v) is reserved name", msg.Name))
	}

	if whois, found := k.GetWhois(ctx, currentDaoName); found {
		// Remove existing key
		k.RemoveWhois(ctx, whois.Name)

		whois.Name = newDaoName
		k.SetWhois(
			ctx,
			whois,
		)
	} else {
		whois = types.Whois{
			Creator:   msg.Creator,
			Name:      newDaoName,
			Address:   dao.Address,
			OwnerType: types.OwnerType_DAO,
		}
		k.AppendWhois(ctx, whois)
	}

	dao.Name = msg.Name
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	return &types.MsgRenameDaoResponse{}, nil
}

func (k msgServer) UpdateDaoDescription(goCtx context.Context, msg *types.MsgUpdateDaoDescription) (*types.MsgUpdateDaoDescriptionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	dao.Description = msg.Description
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	return &types.MsgUpdateDaoDescriptionResponse{}, nil
}

func (k msgServer) UpdateDaoWebsite(goCtx context.Context, msg *types.MsgUpdateDaoWebsite) (*types.MsgUpdateDaoWebsiteResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	dao.Website = msg.Url
	dao.UpdatedAt = ctx.BlockTime().Unix()
	k.SetDao(ctx, dao)

	return &types.MsgUpdateDaoWebsiteResponse{}, nil
}

func (k msgServer) UpdateDaoLocation(goCtx context.Context, msg *types.MsgUpdateDaoLocation) (*types.MsgUpdateDaoLocationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	dao.Location = msg.Location
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	return &types.MsgUpdateDaoLocationResponse{}, nil
}

func (k msgServer) UpdateDaoAvatar(goCtx context.Context, msg *types.MsgUpdateDaoAvatar) (*types.MsgUpdateDaoAvatarResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	dao.AvatarUrl = msg.Url
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	return &types.MsgUpdateDaoAvatarResponse{}, nil
}

func (k msgServer) DeleteDao(goCtx context.Context, msg *types.MsgDeleteDao) (*types.MsgDeleteDaoResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	user, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	dao, found := k.GetDao(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if msg.Creator != dao.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	DoRemoveDao(ctx, k, user, dao)

	return &types.MsgDeleteDaoResponse{}, nil
}

func DoRemoveDao(ctx sdk.Context, k msgServer, user types.User, dao types.Dao) {
	repositories := k.GetAllAddressRepository(ctx, dao.Address)
	for _, repository := range repositories {
		DoRemoveRepository(ctx, k, repository)
	}

	members := k.GetAllDaoMember(ctx, dao.Address)
	for _, member := range members {
		k.RemoveDaoMember(ctx, dao.Address, member.Address)
	}

	k.RemoveDao(ctx, dao.Address)
}
