package cli

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	// "github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
)

var (
	DefaultRelativePacketTimeoutTimestamp = uint64((time.Duration(10) * time.Minute).Nanoseconds())
)

const (
	flagPacketTimeoutTimestamp = "packet-timeout-timestamp"
	flagExpiration             = "expiration"
)

// GetTxCmd returns the transaction commands for this module
func GetTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("%s transactions subcommands", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(CmdToggleArweaveBackup())

	cmd.AddCommand(CmdAuthorizeProvider())
	cmd.AddCommand(CmdRevokeProviderPermission())

	cmd.AddCommand(CmdCreateTask())
	cmd.AddCommand(CmdUpdateTask())
	cmd.AddCommand(CmdDeleteTask())

	cmd.AddCommand(CmdSetBranch())
	cmd.AddCommand(CmdSetDefaultBranch())
	cmd.AddCommand(CmdDeleteBranch())

	cmd.AddCommand(CmdSetTag())
	cmd.AddCommand(CmdDeleteTag())

	cmd.AddCommand(CmdUpdateRepositoryBackupRef())
	cmd.AddCommand(CmdAddRepositoryBackupRef())

	cmd.AddCommand(CmdCreateBounty())
	cmd.AddCommand(CmdUpdateBountyExpiry())
	cmd.AddCommand(CmdCloseBounty())
	cmd.AddCommand(CmdDeleteBounty())
	cmd.AddCommand(CmdToggleForcePush())
	cmd.AddCommand(CmdExercise())
	// this line is used by starport scaffolding # 1

	cmd.AddCommand(CmdCreateRelease())
	cmd.AddCommand(CmdUpdateRelease())
	cmd.AddCommand(CmdDeleteRelease())

	cmd.AddCommand(CmdCreatePullRequest())
	cmd.AddCommand(CmdUpdatePullRequestTitle())
	cmd.AddCommand(CmdUpdatePullRequestDescription())
	cmd.AddCommand(CmdInvokeMergePullRequest())
	cmd.AddCommand(CmdSetPullRequestState())
	cmd.AddCommand(CmdAddPullRequestAssignees())
	cmd.AddCommand(CmdLinkPullRequestIssueByIid())
	cmd.AddCommand(CmdUnlinkPullRequestIssueByIid())
	cmd.AddCommand(CmdRemovePullRequestAssignees())
	cmd.AddCommand(CmdAddPullRequestReviewers())
	cmd.AddCommand(CmdRemovePullRequestReviewers())
	cmd.AddCommand(CmdAddPullRequestLabels())
	cmd.AddCommand(CmdRemovePullRequestLabels())
	cmd.AddCommand(CmdDeletePullRequest())

	cmd.AddCommand(CmdCreateDao())

	cmd.AddCommand(CmdCreateComment())
	cmd.AddCommand(CmdUpdateComment())
	cmd.AddCommand(CmdDeleteComment())
	cmd.AddCommand(CmdToggleCommentResolved())

	cmd.AddCommand(CmdCreateIssue())
	cmd.AddCommand(CmdUpdateIssueTitle())
	cmd.AddCommand(CmdUpdateIssueDescription())
	cmd.AddCommand(CmdToggleIssueState())
	cmd.AddCommand(CmdAddIssueAssignees())
	cmd.AddCommand(CmdRemoveIssueAssignees())
	cmd.AddCommand(CmdAddIssueLabels())
	cmd.AddCommand(CmdRemoveIssueLabels())
	cmd.AddCommand(CmdDeleteIssue())

	cmd.AddCommand(CmdCreateRepository())
	cmd.AddCommand(CmdInvokeForkRepository())
	cmd.AddCommand(CmdForkRepository())
	cmd.AddCommand(CmdRenameRepository())
	cmd.AddCommand(CmdUpdateRepositoryDescription())
	cmd.AddCommand(CmdToggleRepositoryArchived())
	cmd.AddCommand(CmdChangeOwner())
	cmd.AddCommand(CmdUpdateRepositoryCollaborator())
	cmd.AddCommand(CmdRemoveRepositoryCollaborator())
	cmd.AddCommand(CmdCreateRepositoryLabel())
	cmd.AddCommand(CmdUpdateRepositoryLabel())
	cmd.AddCommand(CmdDeleteRepositoryLabel())
	cmd.AddCommand(CmdToggleRepositoryForking())
	cmd.AddCommand(CmdDeleteRepository())

	cmd.AddCommand(CmdCreateUser())
	cmd.AddCommand(CmdUpdateUserUsername())
	cmd.AddCommand(CmdUpdateUserName())
	cmd.AddCommand(CmdUpdateUserBio())
	cmd.AddCommand(CmdUpdateUserAvatar())
	cmd.AddCommand(CmdUpdateUserPinnedRepositories())
	cmd.AddCommand(CmdDeleteUser())
	// cmd.AddCommand(CmdTransferUser())

	return cmd
}
