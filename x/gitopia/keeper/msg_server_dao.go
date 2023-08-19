package keeper

import (
	"context"
	"fmt"
	"strconv"
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v3/x/gitopia/types"
	"github.com/gitopia/gitopia/v3/x/gitopia/utils"
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
		Address:     NewDaoAddress(k.GetDaoCount(ctx)).String(),
		Name:        msg.Name,
		Description: msg.Description,
		CreatedAt:   ctx.BlockTime().Unix(),
		UpdatedAt:   ctx.BlockTime().Unix(),
		AvatarUrl:   msg.AvatarUrl,
		Location:    msg.Location,
		Website:     msg.Website,
	}

	// Check if there is a dao with the same address already
	_, found = k.GetDao(ctx, dao.Address)
	if found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "dao address already exists")
	}

	id := k.AppendDao(
		ctx,
		dao,
	)

	member := types.Member{
		Address:    msg.Creator,
		DaoAddress: dao.Address,
		Role:       types.MemberRole_OWNER,
	}

	k.AppendMember(ctx, member)

	whois := types.Whois{
		Creator:   msg.Creator,
		Name:      daoName,
		Address:   dao.Address,
		OwnerType: types.OwnerType_DAO,
	}

	k.Keeper.AppendWhois(
		ctx,
		whois,
	)

	gParams := k.GetParams(ctx)
	err := k.Keeper.AuthorizeProvider(ctx, gParams.GitServer, dao.Address, nil, types.ProviderPermission_GIT_SERVER)
	if err != nil {
		return nil, err
	}

	err = k.Keeper.AuthorizeProvider(ctx, gParams.StorageProvider, dao.Address, nil, types.ProviderPermission_STORAGE)
	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.CreateDaoEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeDaoDescription, dao.Description),
			sdk.NewAttribute(types.EventAttributeAvatarUrl, dao.AvatarUrl),
			sdk.NewAttribute(types.EventAttributeDaoLocation, dao.Location),
			sdk.NewAttribute(types.EventAttributeDaoWebsite, dao.Website),
			sdk.NewAttribute(types.EventAttributeCreatedAtKey, strconv.FormatInt(dao.CreatedAt, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

	return &types.MsgCreateDaoResponse{
		Id: dao.Address,
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

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.Address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	newDaoName := strings.ToLower(msg.Name)
	currentDaoName := strings.ToLower(dao.Name)

	if whois, found := k.GetWhois(ctx, newDaoName); found && whois.Address != daoAddress.Address {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("name is already taken: (%v)", msg.Name))
	}
	if _, reserved := types.ReservedUsernames[newDaoName]; reserved {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("(%v) is reserved name", msg.Name))
	}

	if whois, found := k.GetWhois(ctx, currentDaoName); found {
		if newDaoName != currentDaoName { // skip whois update for case change in dao name
			// Remove existing key
			k.RemoveWhois(ctx, whois.Name)

			whois.Name = newDaoName
			k.SetWhois(
				ctx,
				whois,
			)
		}
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

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.RenameDaoEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

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

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.Address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	dao.Description = msg.Description
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoDescriptionEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeDaoDescription, dao.Description),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

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

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.Address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	dao.Website = msg.Url
	dao.UpdatedAt = ctx.BlockTime().Unix()
	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoWebsiteEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeDaoWebsite, dao.Website),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

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

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.Address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	dao.Location = msg.Location
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoLocationEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeDaoLocation, dao.Location),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

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

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.Address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	dao.AvatarUrl = msg.Url
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoAvatarEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeAvatarUrl, dao.AvatarUrl),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

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

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DeleteDaoEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
		),
	)

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

func (k msgServer) UpdateDaoPinnedRepositories(goCtx context.Context, msg *types.MsgUpdateDaoPinnedRepositories) (*types.MsgUpdateDaoPinnedRepositoriesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.Id))
	}

	if m, found := k.GetDaoMember(ctx, daoAddress.Address, msg.Creator); found {
		if m.Role != types.MemberRole_OWNER {
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) does not have required permission", msg.Creator))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) is not a member of dao", msg.Creator))
	}

	if alreadyMax := utils.CheckDaoPinnedRepositoryAllowMax(dao); alreadyMax {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("pinned repositories of (%v) already maximum", msg.Creator))
	}

	if exists := utils.CheckDaoRepositoryPinnedExists(dao, msg.RepositoryId); exists {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("Repository Id (%v) already exists in the list", msg.RepositoryId))
	}

	repository, found := k.GetRepositoryById(ctx, msg.RepositoryId)

	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository (%v) doesn't exist", msg.RepositoryId))
	}

	if repository.Owner.Type == types.OwnerType_DAO {
		owner, found := k.GetDao(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", repository.Owner.Id))
		}
		if dao.Id != owner.Id {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository owner (%v) is not same as dao", msg.RepositoryId))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("Repository owner (%v) isn't dao", msg.RepositoryId))
	}

	dao.PinnedRepos = append(dao.PinnedRepos, msg.RepositoryId)
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoPinnedRepositoriesEventKey),
			sdk.NewAttribute(types.EventAttributeCreatorKey, msg.Creator),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeDaoPinnedRepositories, strconv.FormatUint(msg.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdateDaoPinnedRepositoriesResponse{}, nil
}
