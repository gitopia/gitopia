package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func (k msgServer) CreateUser(goCtx context.Context, msg *types.MsgCreateUser) (*types.MsgCreateUserResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if user exists already
	if k.HasUser(ctx, msg.Creator) {
		return &types.MsgCreateUserResponse{}, fmt.Errorf("user already exists: %v", msg.Creator)
	}

	if len(msg.Username) > 0 {
		// Check if username is available
		if k.HasWhois(ctx, msg.Username) {
			return &types.MsgCreateUserResponse{}, fmt.Errorf("username is already taken: %v", msg.Username)
		}
	}

	var user = types.User{
		Creator:  msg.Creator,
		Username: msg.Username,
	}

	id := k.AppendUser(
		ctx,
		user,
	)

	return &types.MsgCreateUserResponse{Id: id}, nil
}

func (k msgServer) UpdateUser(goCtx context.Context, msg *types.MsgUpdateUser) (*types.MsgUpdateUserResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var user = types.User{
		Creator:        msg.Creator,
		Username:       msg.Username,
		UsernameGithub: msg.UsernameGithub,
		AvatarUrl:      msg.AvatarUrl,
		// Followers:             msg.Followers,
		// Following:             msg.Following,
		// Repositories:          msg.Repositories,
		// RepositoriesArchived: msg.Repositories_archived,
		// Organizations:         msg.Organizations,
		// StarredRepos:         msg.Starred_repos,
		Subscriptions: msg.Subscriptions,
		Email:         msg.Email,
		Bio:           msg.Bio,
		// CreatedAt:             msg.CreatedAt,
		// UpdatedAt:             msg.UpdatedAt,
		Extensions: msg.Extensions,
	}

	// Checks that the element exists
	if !k.HasUser(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetUserOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetUser(ctx, user)

	return &types.MsgUpdateUserResponse{}, nil
}

func (k msgServer) DeleteUser(goCtx context.Context, msg *types.MsgDeleteUser) (*types.MsgDeleteUserResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	if msg.Creator != k.GetUserOwner(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveUser(ctx, msg.Id)

	return &types.MsgDeleteUserResponse{}, nil
}
