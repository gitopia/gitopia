package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func ElementExists(s []uint64, val uint64) (int, bool) {
	for i, v := range s {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func (k msgServer) CreateRepository(goCtx context.Context, msg *types.MsgCreateRepository) (*types.MsgCreateRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasUser(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user %v doesn't exist", msg.Creator))
	}

	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != k.GetUserOwner(ctx, msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var o Owner
	if err := json.Unmarshal([]byte(msg.Owner), &o); err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "unable to unmarshal owner")
	}

	var user types.User
	if o.Type == "User" {
		user = k.GetUser(ctx, o.ID)
		if _, exists := user.RepositoryNames[msg.Name]; exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v already exists", msg.Name))
		}
	} else if o.Type == "Organization" {
		// Todo
	}

	createdAt := time.Now().Unix()
	updatedAt := createdAt
	defaultBranch := string("master")

	var repository = types.Repository{
		Creator:       msg.Creator,
		Name:          msg.Name,
		Owner:         msg.Owner,
		Description:   msg.Description,
		DefaultBranch: defaultBranch,
		CreatedAt:     createdAt,
		UpdatedAt:     updatedAt,
	}

	id := k.AppendRepository(
		ctx,
		repository,
	)

	// Update user/organization repositories
	if o.Type == "User" {
		user.Repositories = append(user.Repositories, id)

		// Repository name lookup

		// Initialize the map if it's nil
		if user.RepositoryNames == nil {
			user.RepositoryNames = make(map[string]uint64)
		}

		user.RepositoryNames[repository.Name] = id

		k.SetUser(ctx, user)
	} else if o.Type == "Organization" {
		// Todo
	}

	return &types.MsgCreateRepositoryResponse{
		Id: id,
	}, nil
}

func (k msgServer) RenameRepository(goCtx context.Context, msg *types.MsgRenameRepository) (*types.MsgRenameRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}
	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != owner.ID {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	repository := k.GetRepository(ctx, msg.Id)

	if owner.Type == "User" {
		user := k.GetUser(ctx, owner.ID)
		if _, exists := user.RepositoryNames[msg.Name]; exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v already exists", msg.Name))
		}

		delete(user.RepositoryNames, repository.Name)
		user.RepositoryNames[msg.Name] = repository.Id

		k.SetUser(ctx, user)
	} else if owner.Type == "Organization" {
		// Todo
	}

	repository.Name = msg.Name

	k.SetRepository(ctx, repository)

	return &types.MsgRenameRepositoryResponse{}, nil
}

func (k msgServer) CreateBranch(goCtx context.Context, msg *types.MsgCreateBranch) (*types.MsgCreateBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}
	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != owner.ID {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var repository = k.GetRepository(ctx, msg.Id)

	// Initialize the map if it's nil
	if repository.Branches == nil {
		repository.Branches = make(map[string]string)
	}

	repository.Branches[msg.Name] = msg.CommitSHA

	k.SetRepository(ctx, repository)

	return &types.MsgCreateBranchResponse{}, nil
}

func (k msgServer) SetDefaultBranch(goCtx context.Context, msg *types.MsgSetDefaultBranch) (*types.MsgSetDefaultBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}
	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != owner.ID {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var repository = k.GetRepository(ctx, msg.Id)

	// Change DefaultBranch only if branch exists
	if _, exists := repository.Branches[msg.Name]; exists {
		repository.DefaultBranch = msg.Name
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch %v doesn't exist", msg.Name))
	}

	k.SetRepository(ctx, repository)

	return &types.MsgSetDefaultBranchResponse{}, nil
}

func (k msgServer) DeleteBranch(goCtx context.Context, msg *types.MsgDeleteBranch) (*types.MsgDeleteBranchResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}
	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != owner.ID {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var repository = k.GetRepository(ctx, msg.Id)

	// Delete only if branch exists and is not default branch
	if _, exists := repository.Branches[msg.Name]; exists {
		if repository.DefaultBranch != msg.Name {
			delete(repository.Branches, msg.Name)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch %v is default branch", msg.Name))
		}
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("branch %v doesn't exist", msg.Name))
	}

	k.SetRepository(ctx, repository)

	return &types.MsgDeleteBranchResponse{}, nil
}

func (k msgServer) UpdateRepository(goCtx context.Context, msg *types.MsgUpdateRepository) (*types.MsgUpdateRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var repository = k.GetRepository(ctx, msg.Id)

	repository.Name = msg.Name
	repository.Description = msg.Description
	repository.Labels = msg.Labels
	repository.UpdatedAt = time.Now().Unix()
	repository.License = msg.License
	repository.DefaultBranch = msg.DefaultBranch

	// Checks that the element exists
	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}
	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != owner.ID {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetRepository(ctx, repository)

	return &types.MsgUpdateRepositoryResponse{}, nil
}

func (k msgServer) DeleteRepository(goCtx context.Context, msg *types.MsgDeleteRepository) (*types.MsgDeleteRepositoryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.HasRepository(ctx, msg.Id) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	owner, err := k.GetRepositoryOwner(ctx, msg.Id)
	if err != nil {
		return nil, err
	}
	// Checks if the the msg sender is the same as the current owner
	if msg.Creator != owner.ID {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var repository = k.GetRepository(ctx, msg.Id)

	if owner.Type == "User" {
		user := k.GetUser(ctx, owner.ID)
		if _, exists := user.RepositoryNames[repository.Name]; !exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %v doesn't exist in user %v repositoryNames", repository.Name, owner.ID))
		}

		delete(user.RepositoryNames, repository.Name)

		// Checks if repository exists
		if i, ok := ElementExists(user.Repositories, repository.Id); ok {
			user.Repositories = append(user.Repositories[:i], user.Repositories[i+1:]...)
		} else {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("repository %d doesn't exist in user %v repositories", repository.Id, owner.ID))
		}

		k.SetUser(ctx, user)
	} else if owner.Type == "Organization" {
		// Todo
	}

	k.RemoveRepository(ctx, msg.Id)

	return &types.MsgDeleteRepositoryResponse{}, nil
}
