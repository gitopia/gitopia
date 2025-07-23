package keeper

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/group"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/gitopia/gitopia/v6/x/gitopia/utils"
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

	groupMsg := &group.MsgCreateGroupWithPolicy{
		Admin:              msg.Creator,
		Members:            msg.Members,
		GroupMetadata:      daoName,
		GroupPolicyAsAdmin: true,
	}

	hours, err := sdk.NewDecFromStr(msg.VotingPeriod)
	if err != nil {
		return nil, err
	}

	seconds := hours.Mul(sdk.NewDec(int64(time.Hour))).TruncateInt().Int64()
	votingPeriod := time.Duration(seconds)

	policy := group.NewPercentageDecisionPolicy(
		msg.Percentage,
		votingPeriod,
		time.Duration(0),
	)
	err = groupMsg.SetDecisionPolicy(policy)
	if err != nil {
		return nil, err
	}

	// Create the group
	res, err := k.groupKeeper.CreateGroupWithPolicy(ctx, groupMsg)
	if err != nil {
		return nil, err
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
		GroupId:     res.GroupId,
		Config:      *msg.Config,
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

	// save the group id and dao id mapping
	k.AppendGroupDao(ctx, dao.GroupId, types.GroupDao{DaoAddress: dao.Address})

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

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.Id))
	}

	// check if the message admin and the group admin are the same
	err = k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
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
			Creator:   msg.Admin,
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

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	// check if the message admin and the group admin are the same
	k.doAuthenticated(ctx, dao.GroupId, msg.Admin)

	dao.Description = msg.Description
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoDescriptionEventKey),
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

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	// check if the message admin and the group admin are the same
	err = k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
	}

	dao.Website = msg.Url
	dao.UpdatedAt = ctx.BlockTime().Unix()
	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoWebsiteEventKey),
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

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	// check if the message admin and the group admin are the same
	err = k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
	}

	dao.Location = msg.Location
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoLocationEventKey),
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

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	// check if the message admin and the group admin are the same
	err = k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
	}

	dao.AvatarUrl = msg.Url
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoAvatarEventKey),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeAvatarUrl, dao.AvatarUrl),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdateDaoAvatarResponse{}, nil
}

func (k msgServer) UpdateDaoMetadata(goCtx context.Context, msg *types.MsgUpdateDaoMetadata) (*types.MsgUpdateDaoMetadataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	// check if the message admin and the group admin are the same
	err = k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
	}

	if msg.Name != "" {
		// Dao name validation and whois update
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
				Creator:   msg.Admin,
				Name:      newDaoName,
				Address:   dao.Address,
				OwnerType: types.OwnerType_DAO,
			}
			k.AppendWhois(ctx, whois)
		}

		dao.Name = msg.Name
	}
	if msg.Description != "" {
		dao.Description = msg.Description
	}
	if msg.AvatarUrl != "" {
		dao.AvatarUrl = msg.AvatarUrl
	}
	if msg.Location != "" {
		dao.Location = msg.Location
	}
	if msg.Website != "" {
		dao.Website = msg.Website
	}

	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoMetadataEventKey),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeDaoDescription, dao.Description),
			sdk.NewAttribute(types.EventAttributeDaoLocation, dao.Location),
			sdk.NewAttribute(types.EventAttributeDaoWebsite, dao.Website),
			sdk.NewAttribute(types.EventAttributeAvatarUrl, dao.AvatarUrl),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdateDaoMetadataResponse{}, nil
}

func (k msgServer) DeleteDao(goCtx context.Context, msg *types.MsgDeleteDao) (*types.MsgDeleteDaoResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	dao, found := k.GetDao(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", msg.Id))
	}

	// check if the message admin and the group admin are the same
	err := k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
	}

	DoRemoveDao(ctx, k, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DeleteDaoEventKey),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
		),
	)

	return &types.MsgDeleteDaoResponse{}, nil
}

func DoRemoveDao(ctx sdk.Context, k msgServer, dao types.Dao) {
	repositories := k.GetAllAddressRepository(ctx, dao.Address)
	for _, repository := range repositories {
		DoRemoveRepository(ctx, k, repository)
	}

	// delete group

	k.RemoveDao(ctx, dao.Address)
}

func (k msgServer) UpdateDaoPinnedRepositories(goCtx context.Context, msg *types.MsgUpdateDaoPinnedRepositories) (*types.MsgUpdateDaoPinnedRepositoriesResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.Id))
	}

	// check if the message admin and the group admin are the same
	err = k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
	}

	if alreadyMax := utils.CheckDaoPinnedRepositoryAllowMax(dao); alreadyMax {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("pinned repositories of (%v) already maximum", msg.Id))
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
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoNameKey, dao.Name),
			sdk.NewAttribute(types.EventAttributeDaoPinnedRepositories, strconv.FormatUint(msg.RepositoryId, 10)),
			sdk.NewAttribute(types.EventAttributeUpdatedAtKey, strconv.FormatInt(dao.UpdatedAt, 10)),
		),
	)

	return &types.MsgUpdateDaoPinnedRepositoriesResponse{}, nil
}

func (k msgServer) DaoTreasurySpend(goCtx context.Context, msg *types.MsgDaoTreasurySpend) (*types.MsgDaoTreasurySpendResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.Id))
	}

	// check if the message admin and the group admin are the same
	err = k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
	}

	// Check if the dao treasury has enough balance
	recipientAddr, _ := sdk.AccAddressFromBech32(msg.Recipient)
	daoAddr, _ := sdk.AccAddressFromBech32(dao.Address)
	balance := k.bankKeeper.GetAllBalances(ctx, daoAddr)
	if !balance.IsAllGTE(msg.Amount) {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, "dao treasury balance %v is smaller than %v", balance, msg.Amount)
	}

	// Send coins from dao treasury to recipient
	err = k.bankKeeper.SendCoins(ctx, daoAddr, recipientAddr, msg.Amount)
	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.DaoTreasurySpendEventKey),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeRecipientKey, msg.Recipient),
			sdk.NewAttribute(types.EventAttributeAmountKey, msg.Amount.String()),
		),
	)

	return &types.MsgDaoTreasurySpendResponse{}, nil
}

func (k msgServer) UpdateDaoConfig(goCtx context.Context, msg *types.MsgUpdateDaoConfig) (*types.MsgUpdateDaoConfigResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	daoAddress, err := k.ResolveAddress(ctx, msg.Id)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, err.Error())
	}

	dao, found := k.GetDao(ctx, daoAddress.Address)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("dao (%v) doesn't exist", msg.Id))
	}

	// check if the message admin and the group admin are the same
	err = k.doAuthenticated(ctx, dao.GroupId, msg.Admin)
	if err != nil {
		return nil, err
	}

	dao.Config = msg.Config
	dao.UpdatedAt = ctx.BlockTime().Unix()

	k.SetDao(ctx, dao)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.UpdateDaoConfigEventKey),
			sdk.NewAttribute(types.EventAttributeDaoIdKey, strconv.FormatUint(dao.Id, 10)),
			sdk.NewAttribute(types.EventAttributeDaoAddressKey, dao.Address),
			sdk.NewAttribute(types.EventAttributeDaoRequirePullRequestProposalKey, strconv.FormatBool(msg.Config.RequirePullRequestProposal)),
			sdk.NewAttribute(types.EventAttributeDaoRequireRepositoryDeletionProposalKey, strconv.FormatBool(msg.Config.RequireRepositoryDeletionProposal)),
			sdk.NewAttribute(types.EventAttributeDaoRequireCollaboratorProposalKey, strconv.FormatBool(msg.Config.RequireCollaboratorProposal)),
			sdk.NewAttribute(types.EventAttributeDaoRequireReleaseProposalKey, strconv.FormatBool(msg.Config.RequireReleaseProposal)),
		),
	)

	return &types.MsgUpdateDaoConfigResponse{}, nil
}

// doAuthenticated makes sure that the group admin initiated the request
func (k Keeper) doAuthenticated(ctx sdk.Context, groupId uint64, msgAdmin string) error {
	groupRes, err := k.groupKeeper.GroupInfo(ctx, &group.QueryGroupInfoRequest{
		GroupId: groupId,
	})
	if err != nil {
		return err
	}
	admin, err := sdk.AccAddressFromBech32(groupRes.Info.Admin)
	if err != nil {
		return sdkerrors.Wrap(err, "group admin")
	}
	msgAdminAddr, err := sdk.AccAddressFromBech32(msgAdmin)
	if err != nil {
		return sdkerrors.Wrap(err, "message admin")
	}
	if !admin.Equals(msgAdminAddr) {
		return sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "not group admin; got %s, expected %s", msgAdmin, groupRes.Info.Admin)
	}

	return nil
}
