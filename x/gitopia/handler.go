package gitopia

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

// NewHandler ...
func NewHandler(k keeper.Keeper) sdk.Handler {
	msgServer := keeper.NewMsgServerImpl(k)

	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		ctx = ctx.WithEventManager(sdk.NewEventManager())

		switch msg := msg.(type) {
		// this line is used by starport scaffolding # 1
		case *types.MsgCreateRelease:
			res, err := msgServer.CreateRelease(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateRelease:
			res, err := msgServer.UpdateRelease(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeleteRelease:
			res, err := msgServer.DeleteRelease(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgCreatePullRequest:
			res, err := msgServer.CreatePullRequest(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdatePullRequest:
			res, err := msgServer.UpdatePullRequest(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdatePullRequestTitle:
			res, err := msgServer.UpdatePullRequestTitle(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdatePullRequestDescription:
			res, err := msgServer.UpdatePullRequestDescription(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgSetPullRequestState:
			res, err := msgServer.SetPullRequestState(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgAddPullRequestReviewers:
			res, err := msgServer.AddPullRequestReviewers(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgRemovePullRequestReviewers:
			res, err := msgServer.RemovePullRequestReviewers(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgAddPullRequestAssignees:
			res, err := msgServer.AddPullRequestAssignees(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgRemovePullRequestAssignees:
			res, err := msgServer.RemovePullRequestAssignees(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgAddPullRequestLabels:
			res, err := msgServer.AddPullRequestLabels(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgRemovePullRequestLabels:
			res, err := msgServer.RemovePullRequestLabels(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeletePullRequest:
			res, err := msgServer.DeletePullRequest(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgCreateOrganization:
			res, err := msgServer.CreateOrganization(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgRenameOrganization:
			res, err := msgServer.RenameOrganization(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateOrganizationMember:
			res, err := msgServer.UpdateOrganizationMember(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgRemoveOrganizationMember:
			res, err := msgServer.RemoveOrganizationMember(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateOrganization:
			res, err := msgServer.UpdateOrganization(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeleteOrganization:
			res, err := msgServer.DeleteOrganization(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgCreateComment:
			res, err := msgServer.CreateComment(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateComment:
			res, err := msgServer.UpdateComment(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeleteComment:
			res, err := msgServer.DeleteComment(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgCreateIssue:
			res, err := msgServer.CreateIssue(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateIssue:
			res, err := msgServer.UpdateIssue(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateIssueTitle:
			res, err := msgServer.UpdateIssueTitle(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateIssueDescription:
			res, err := msgServer.UpdateIssueDescription(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgToggleIssueState:
			res, err := msgServer.ToggleIssueState(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgAddIssueAssignees:
			res, err := msgServer.AddIssueAssignees(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgRemoveIssueAssignees:
			res, err := msgServer.RemoveIssueAssignees(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgAddIssueLabels:
			res, err := msgServer.AddIssueLabels(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgRemoveIssueLabels:
			res, err := msgServer.RemoveIssueLabels(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeleteIssue:
			res, err := msgServer.DeleteIssue(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgCreateRepository:
			res, err := msgServer.CreateRepository(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgForkRepository:
			res, err := msgServer.ForkRepository(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgRenameRepository:
			res, err := msgServer.RenameRepository(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgChangeOwner:
			res, err := msgServer.ChangeOwner(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateRepositoryCollaborator:
			res, err := msgServer.UpdateRepositoryCollaborator(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgRemoveRepositoryCollaborator:
			res, err := msgServer.RemoveRepositoryCollaborator(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgCreateRepositoryLabel:
			res, err := msgServer.CreateRepositoryLabel(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateRepositoryLabel:
			res, err := msgServer.UpdateRepositoryLabel(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeleteRepositoryLabel:
			res, err := msgServer.DeleteRepositoryLabel(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgSetRepositoryBranch:
			res, err := msgServer.SetRepositoryBranch(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgMultiSetRepositoryBranch:
			res, err := msgServer.MultiSetRepositoryBranch(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgSetDefaultBranch:
			res, err := msgServer.SetDefaultBranch(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeleteBranch:
			res, err := msgServer.DeleteBranch(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgMultiDeleteBranch:
			res, err := msgServer.MultiDeleteBranch(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgSetRepositoryTag:
			res, err := msgServer.SetRepositoryTag(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgMultiSetRepositoryTag:
			res, err := msgServer.MultiSetRepositoryTag(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeleteTag:
			res, err := msgServer.DeleteTag(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgToggleRepositoryForking:
			res, err := msgServer.ToggleRepositoryForking(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateRepository:
			res, err := msgServer.UpdateRepository(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeleteRepository:
			res, err := msgServer.DeleteRepository(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgCreateUser:
			res, err := msgServer.CreateUser(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateUser:
			res, err := msgServer.UpdateUser(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeleteUser:
			res, err := msgServer.DeleteUser(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgTransferUser:
			res, err := msgServer.TransferUser(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgSetWhois:
			res, err := msgServer.SetWhois(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgUpdateWhois:
			res, err := msgServer.UpdateWhois(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		case *types.MsgDeleteWhois:
			res, err := msgServer.DeleteWhois(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)

		default:
			errMsg := fmt.Sprintf("unrecognized %s message type: %T", types.ModuleName, msg)
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, errMsg)
		}
	}
}
