package keeper

import (
	"context"
	"fmt"
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateUser(goCtx context.Context, msg *types.MsgCreateUser) (*types.MsgCreateUserResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("user already exists: %v", msg.Creator))
	}

	username := strings.ToLower(msg.Username)

	if _, found := k.GetWhois(ctx, username); found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("username is already taken: (%v)", msg.Username))
	}

	if _, reserved := types.ReservedUsernames[username]; reserved {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("(%v) is reserved name", msg.Username))
	}

	user := types.User{
		Creator:   msg.Creator,
		Username:  msg.Username,
		CreatedAt: ctx.BlockTime().Unix(),
		UpdatedAt: ctx.BlockTime().Unix(),
		AvatarUrl: msg.AvatarUrl,
		Bio:       msg.Bio,
		Name:      msg.Name,
	}

	whois := types.Whois{
		Creator:   msg.Creator,
		Name:      username,
		Address:   msg.Creator,
		OwnerType: types.OwnerType_USER,
	}

	id := k.AppendUser(
		ctx,
		user,
	)

	k.Keeper.AppendWhois(
		ctx,
		whois,
	)

	return &types.MsgCreateUserResponse{Id: id}, nil
}

func (k msgServer) UpdateUserUsername(goCtx context.Context, msg *types.MsgUpdateUserUsername) (*types.MsgUpdateUserUsernameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	user, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	newUsername := strings.ToLower(msg.Username)
	currentUsername := strings.ToLower(user.Username)

	if _, found := k.GetWhois(ctx, newUsername); found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("username is already taken: (%v)", msg.Username))
	}

	if _, reserved := types.ReservedUsernames[newUsername]; reserved {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("(%v) is reserved name", msg.Username))
	}

	if whois, found := k.GetWhois(ctx, currentUsername); found {
		// Remove existing key
		k.RemoveWhois(ctx, whois.Name)

		whois.Name = newUsername
		k.SetWhois(ctx, whois)
	} else {
		whois := types.Whois{
			Creator:   msg.Creator,
			Name:      newUsername,
			Address:   msg.Creator,
			OwnerType: types.OwnerType_USER,
		}
		k.AppendWhois(ctx, whois)
	}

	user.Username = msg.Username
	user.UpdatedAt = ctx.BlockTime().Unix()

	k.SetUser(ctx, user)

	return &types.MsgUpdateUserUsernameResponse{}, nil
}

func (k msgServer) UpdateUserName(goCtx context.Context, msg *types.MsgUpdateUserName) (*types.MsgUpdateUserNameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	user, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	user.Name = msg.Name
	user.UpdatedAt = ctx.BlockTime().Unix()

	k.SetUser(ctx, user)

	return &types.MsgUpdateUserNameResponse{}, nil
}

func (k msgServer) UpdateUserBio(goCtx context.Context, msg *types.MsgUpdateUserBio) (*types.MsgUpdateUserBioResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	user, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	user.Bio = msg.Bio
	user.UpdatedAt = ctx.BlockTime().Unix()

	k.SetUser(ctx, user)

	return &types.MsgUpdateUserBioResponse{}, nil
}

func (k msgServer) UpdateUserAvatar(goCtx context.Context, msg *types.MsgUpdateUserAvatar) (*types.MsgUpdateUserAvatarResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	user, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	user.AvatarUrl = msg.Url
	user.UpdatedAt = ctx.BlockTime().Unix()

	k.SetUser(ctx, user)

	return &types.MsgUpdateUserAvatarResponse{}, nil
}

func (k msgServer) DeleteUser(goCtx context.Context, msg *types.MsgDeleteUser) (*types.MsgDeleteUserResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	user, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
	}

	DoRemoveUser(ctx, k, user)
	k.Keeper.RemoveWhois(
		ctx,
		strings.ToLower(user.Username),
	)

	return &types.MsgDeleteUserResponse{}, nil
}

func DoRemoveUser(ctx sdk.Context, k msgServer, user types.User) {
	daos := k.GetAllUserDao(ctx, user.Creator)
	for _, dao := range daos {
		DoRemoveDao(ctx, k, user, dao)
		k.Keeper.RemoveWhois(
			ctx,
			strings.ToLower(dao.Name),
		)
	}

	repositories := k.GetAllAddressRepository(ctx, user.Creator)
	for _, repository := range repositories {
		DoRemoveRepository(ctx, k, repository)
	}

	k.RemoveUser(ctx, user.Creator)
}

// func (k msgServer) TransferUser(goCtx context.Context, msg *types.MsgTransferUser) (*types.MsgTransferUserResponse, error) {
// 	ctx := sdk.UnwrapSDKContext(goCtx)

// 	user, found := k.GetUser(ctx, msg.Creator)
// 	if !found {
// 		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", msg.Creator))
// 	}

// 	user.Creator = msg.Address

// 	for _, org := range user.Organizations {
// 		organization, found := k.GetOrganization(ctx, org.Id)
// 		if !found {
// 			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", org.Id))
// 		}

// 		organization.Creator = msg.Address

// 		if i, exists := utils.OrganizationMemberExists(organization.Members, msg.Creator); exists {
// 			organization.Members[i].Id = msg.Address
// 		}

// 		k.SetOrganization(ctx, organization)
// 	}

// 	repoStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.RepositoryKey))
// 	repoIterator := sdk.KVStorePrefixIterator(repoStore, []byte{})
// 	defer repoIterator.Close()

// 	for ; repoIterator.Valid(); repoIterator.Next() {
// 		var repository types.Repository
// 		var isModified bool
// 		k.cdc.MustUnmarshal(repoIterator.Value(), &repository)

// 		if repository.Creator == msg.Creator {
// 			repository.Creator = msg.Address
// 			isModified = true
// 		}

// 		if repository.Owner.Id == msg.Creator {
// 			repository.Owner.Id = msg.Address
// 			isModified = true
// 		}

// 		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, msg.Creator); exists {
// 			repository.Collaborators[i].Id = msg.Address
// 			isModified = true
// 		}

// 		if isModified {
// 			k.SetRepository(ctx, repository)
// 		}
// 	}

// 	issueStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
// 	issueIterator := sdk.KVStorePrefixIterator(issueStore, []byte{})
// 	defer issueIterator.Close()

// 	for ; issueIterator.Valid(); issueIterator.Next() {
// 		var issue types.Issue
// 		var isModified bool
// 		k.cdc.MustUnmarshal(issueIterator.Value(), &issue)

// 		if issue.Creator == msg.Creator {
// 			issue.Creator = msg.Address
// 			isModified = true
// 		}

// 		if i, exists := utils.AssigneeExists(issue.Assignees, msg.Creator); exists {
// 			issue.Assignees[i] = msg.Address
// 			isModified = true
// 		}

// 		if isModified {
// 			k.SetIssue(ctx, issue)
// 		}
// 	}

// 	commentStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CommentKey))
// 	commentIterator := sdk.KVStorePrefixIterator(commentStore, []byte{})
// 	defer commentIterator.Close()

// 	for ; commentIterator.Valid(); commentIterator.Next() {
// 		var comment types.Comment
// 		var isModified bool
// 		k.cdc.MustUnmarshal(commentIterator.Value(), &comment)

// 		if comment.Creator == msg.Creator {
// 			comment.Creator = msg.Address
// 			isModified = true
// 		}

// 		if isModified {
// 			k.SetComment(ctx, comment)
// 		}
// 	}

// 	releaseStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReleaseKey))
// 	releaseIterator := sdk.KVStorePrefixIterator(releaseStore, []byte{})
// 	defer releaseIterator.Close()

// 	for ; releaseIterator.Valid(); releaseIterator.Next() {
// 		var release types.Release
// 		var isModified bool
// 		k.cdc.MustUnmarshal(releaseIterator.Value(), &release)

// 		if release.Creator == msg.Creator {
// 			release.Creator = msg.Address
// 			isModified = true
// 		}

// 		for i := 0; i < len(release.Attachments); i++ {
// 			if release.Attachments[i].Uploader == msg.Creator {
// 				release.Attachments[i].Uploader = msg.Address
// 				isModified = true
// 			}
// 		}

// 		if isModified {
// 			k.SetRelease(ctx, release)
// 		}
// 	}

// 	k.SetUser(ctx, user)
// 	k.RemoveUser(ctx, msg.Creator)

// 	return &types.MsgTransferUserResponse{}, nil
// }
