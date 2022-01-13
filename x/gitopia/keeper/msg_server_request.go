package keeper

import (
	"context"
	"encoding/json"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
)

func (k msgServer) CreateRequest(goCtx context.Context, msg *types.MsgCreateRequest) (*types.MsgCreateRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var request = types.Request{
		Source:      msg.Source,
		Target:      msg.Target,
		RequestType: types.Request_Type(types.Request_Type_value[msg.RequestType]),
		Message:     msg.Message,
		Expiry:      msg.Expiry,
	}

	id := k.AppendRequest(
		ctx,
		request,
	)

	return &types.MsgCreateRequestResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateRequest(goCtx context.Context, msg *types.MsgUpdateRequest) (*types.MsgUpdateRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	request, found := k.GetRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	if msg.Creator != request.Source {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	switch request.RequestType {
	case types.Request_UPDATEREPOSITORYCOLLABORATOR:
		var newMessage types.MsgUpdateRepositoryCollaborator
		json.Unmarshal([]byte(msg.Message), &newMessage)
		var originalMessage types.MsgUpdateRepositoryCollaborator
		json.Unmarshal([]byte(request.Message), &originalMessage)

		_, exists := types.RepositoryCollaborator_Permission_value[newMessage.Role]
		if !exists {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid permission arg (%v)", newMessage.Role))
		}

		originalMessage.Role = newMessage.Role
		requestMsg, err := json.Marshal(originalMessage)
		if err != nil {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "unable to marshal request msg")
		}
		request.Message = string(requestMsg)
		break
	case types.Request_UPDATEDAOMEMBER:
		break
	default:
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid request type")
	}

	k.SetRequest(ctx, request)

	return &types.MsgUpdateRequestResponse{}, nil
}

func (k msgServer) ChangeRequestState(goCtx context.Context, msg *types.MsgChangeRequestState) (*types.MsgChangeRequestStateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	request, found := k.GetRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	if msg.Creator != request.Target {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "unauthorized")
	}

	if request.State != types.Request_AWAITED {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid request, only awaited requests can be ACCEPTED or REJECTED")
	}

	currentTime := ctx.BlockTime().Unix()

	if currentTime-request.Expiry > 0 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid request, request EXPIRED")
	}

	if msg.State == types.Request_ACCEPTED.String() {
		switch request.RequestType {
		case types.Request_UPDATEREPOSITORYCOLLABORATOR:
			var requestMessage types.MsgUpdateRepositoryCollaborator
			json.Unmarshal([]byte(request.Message), &requestMessage)
			_, found := k.GetUser(ctx, requestMessage.Creator)
			if !found {
				return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", requestMessage.Creator))
			}

			_, found = k.GetUser(ctx, requestMessage.User)
			if !found {
				return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", requestMessage.User))
			}

			repository, found := k.GetRepository(ctx, requestMessage.Id)
			if !found {
				return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", requestMessage.Id))
			}

			if requestMessage.Creator == requestMessage.User {
				return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "action not permittable")
			}

			var organization types.Organization

			if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
				organization, found = k.GetOrganization(ctx, repository.Owner.Id)
				if !found {
					return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
				}
			}

			allowed := []types.RepositoryCollaborator_Permission{
				types.RepositoryCollaborator_ADMIN,
			}

			if !utils.HavePermission(repository, allowed, requestMessage.Creator, organization) {
				return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", requestMessage.Creator))
			}

			permission, exists := types.RepositoryCollaborator_Permission_value[requestMessage.Role]
			if !exists {
				return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid permission arg (%v)", requestMessage.Role))
			}

			var repositoryCollaborator = types.RepositoryCollaborator{
				Id:         requestMessage.User,
				Permission: types.RepositoryCollaborator_Permission(permission),
			}

			repository.Collaborators = append(repository.Collaborators, &repositoryCollaborator)
			repository.UpdatedAt = currentTime

			k.SetRepository(ctx, repository)

			request.State = types.Request_ACCEPTED
			break
		case types.Request_UPDATEDAOMEMBER:
			request.State = types.Request_ACCEPTED
			break
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid request type")
		}
	} else if msg.State == types.Request_REJECTED.String() {
		request.State = types.Request_REJECTED
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetRequest(ctx, request)

	return &types.MsgChangeRequestStateResponse{}, nil
}

func (k msgServer) DeleteRequest(goCtx context.Context, msg *types.MsgDeleteRequest) (*types.MsgDeleteRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, found := k.GetUser(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("creator (%v) doesn't exist", msg.Creator))
	}

	request, found := k.GetRequest(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	if request.State != types.Request_AWAITED {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid request, can only delete awaited requests")
	}

	currentTime := ctx.BlockTime().Unix()

	if currentTime-request.Expiry > 0 {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid request, request EXPIRED")
	}

	var requestMessage types.MsgUpdateRepositoryCollaborator
	json.Unmarshal([]byte(request.Message), &requestMessage)

	repository, found := k.GetRepository(ctx, requestMessage.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("repository id (%d) doesn't exist", requestMessage.Id))
	}

	targetUser, found := k.GetUser(ctx, request.Target)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("user (%v) doesn't exist", request.Target))
	}

	var organization types.Organization

	if repository.Owner.Type == types.RepositoryOwner_ORGANIZATION {
		organization, found = k.GetOrganization(ctx, repository.Owner.Id)
		if !found {
			return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("organization (%v) doesn't exist", repository.Owner.Id))
		}
	}

	allowed := []types.RepositoryCollaborator_Permission{
		types.RepositoryCollaborator_ADMIN,
	}

	if !utils.HavePermission(repository, allowed, msg.Creator, organization) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, fmt.Sprintf("user (%v) doesn't have permission to perform this operation", requestMessage.Creator))
	}

	if i, exists := utils.RepositoryRequestIdExists(repository.SentRequests, msg.Id); exists {
		repository.SentRequests = append(repository.SentRequests[:i], repository.SentRequests[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("can't find requestId (%d) under repository (%v)", msg.Id, repository.Name))
	}

	if i, exists := utils.UserRequestIdExists(targetUser.Requests.Received, msg.Id); exists {
		targetUser.Requests.Received = append(targetUser.Requests.Received[:i], targetUser.Requests.Received[i+1:]...)
	} else {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("can't find requestId (%d) under user (%v)", msg.Id, targetUser.Creator))
	}

	k.SetRepository(ctx, repository)
	k.SetUser(ctx, targetUser)
	k.RemoveRequest(ctx, msg.Id)

	return &types.MsgDeleteRequestResponse{}, nil
}
