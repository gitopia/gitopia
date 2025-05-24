package cli

import (
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
	"github.com/gitopia/gitopia/v5/x/gitopia/utils"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

func CmdCreatePullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-pullRequest [title] [description] [headBranch] [headRepoId] [headRepoName] [baseBranch] [baseRepoId] [baseRepoName] [reviewers] [assignees] [labelIds] [issueIids]",
		Short: "Create a new pullRequest",
		Args:  cobra.ExactArgs(12),
		RunE: func(cmd *cobra.Command, args []string) error {
			argTitle := args[0]
			argDescription := args[1]
			argHeadBranch := args[2]
			argHeadId := args[3]
			argHeadRepositoryName := args[4]
			argBaseBranch := args[5]
			argBaseId := args[6]
			argBaseRepositoryName := args[7]
			argReviewers := strings.Split(args[8], ",")
			if len(argReviewers) == 1 && argReviewers[0] == "" {
				argReviewers = []string{}
			}
			argAssignees := strings.Split(args[9], ",")
			if len(argAssignees) == 1 && argAssignees[0] == "" {
				argAssignees = []string{}
			}

			var labelIds []uint64
			var err error
			argLabels := strings.Split(args[10], ",")
			if len(argLabels) == 1 && argLabels[0] == "" {
				labelIds = []uint64{}
			} else {
				labelIds, err = utils.SliceAtoi(argLabels)
				if err != nil {
					return err
				}
			}

			var issueIids []uint64
			argIssueIids := strings.Split(args[11], ",")
			if len(argIssueIids) == 1 && argIssueIids[0] == "" {
				issueIids = []uint64{}
			} else {
				issueIids, err = utils.SliceAtoi(argIssueIids)
				if err != nil {
					return err
				}
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreatePullRequest(
				clientCtx.GetFromAddress().String(),
				argTitle,
				argDescription,
				argHeadBranch,
				types.RepositoryId{Id: argHeadId, Name: argHeadRepositoryName},
				argBaseBranch,
				types.RepositoryId{Id: argBaseId, Name: argBaseRepositoryName},
				argReviewers,
				argAssignees,
				labelIds,
				issueIids,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdatePullRequestTitle() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-pullrequest-title [repository-id] [iid] [title]",
		Short: "Update a pullRequest title",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsTitle, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdatePullRequestTitle(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, string(argsTitle))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdatePullRequestDescription() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-pullrequest-description [repository-id] [iid] [description]",
		Short: "Update pullRequest description",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsDescription, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdatePullRequestDescription(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, string(argsDescription))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdInvokeMergePullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "invoke-merge-pullrequest [repository-id] [iid] [provider]",
		Short: "Emits an event for git-server to merge a Pull Request",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsProvider, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgInvokeMergePullRequest(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, string(argsProvider))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdSetPullRequestState() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "set-pullrequest-state [repository-id] [iid] [state] [merge-commit-sha] [comment-body] [task-id]",
		Short: "Set pullrequest state",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsState, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}
			argsMergeCommitSha, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}
			argsCommentBody, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}
			argsTaskId, err := strconv.ParseUint(args[5], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgSetPullRequestState(clientCtx.GetFromAddress().String(),
				argsRepositoryId,
				argsIid,
				string(argsState),
				string(argsMergeCommitSha),
				string(argsCommentBody),
				argsTaskId,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdAddPullRequestReviewers() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-pullrequest-reviewers [repository-id] [iid] [reviewers]",
		Short: "Add pullRequest reviewers",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsReviewers := strings.Split(args[2], ",")
			if len(argsReviewers) == 1 && argsReviewers[0] == "" {
				argsReviewers = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddPullRequestReviewers(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, argsReviewers)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdRemovePullRequestReviewers() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "remove-pullrequest-reviewers [repository-id] [iid] [reviewers]",
		Short: "Remove pullRequest reviewers",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsReviewers := strings.Split(args[2], ",")
			if len(argsReviewers) == 1 && argsReviewers[0] == "" {
				argsReviewers = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemovePullRequestReviewers(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, argsReviewers)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdAddPullRequestAssignees() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-pullrequest-assignees [repository-id] [iid] [assignees]",
		Short: "Add pullRequest assignees",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsAssignees := strings.Split(args[2], ",")
			if len(argsAssignees) == 1 && argsAssignees[0] == "" {
				argsAssignees = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddPullRequestAssignees(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, argsAssignees)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdRemovePullRequestAssignees() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "remove-pullrequest-assignees [repository-id] [iid] [assignees]",
		Short: "Remove pullRequest assignees",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsAssignees := strings.Split(args[2], ",")
			if len(argsAssignees) == 1 && argsAssignees[0] == "" {
				argsAssignees = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemovePullRequestAssignees(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, argsAssignees)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdLinkPullRequestIssueByIid() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "link-pullrequest-issue-by-iid [repository-id] [pullrequest-iid] [issue-iid]",
		Short: "Link pullRequest issue by Iid",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsPullRequestIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsIssueIid, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgLinkPullRequestIssueByIid(clientCtx.GetFromAddress().String(), argsRepositoryId, argsPullRequestIid, argsIssueIid)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUnlinkPullRequestIssueByIid() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "unlink-pullrequest-issue-by-iid [repository-id] [pullrequest-iid] [issue-iid]",
		Short: "Unlink pullRequest issue by Iid",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsPullRequestIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsIssueIid, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUnlinkPullRequestIssueByIid(clientCtx.GetFromAddress().String(), argsRepositoryId, argsPullRequestIid, argsIssueIid)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdAddPullRequestLabels() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-pullrequest-labels [repository-id] [iid] [labels]",
		Short: "Add pullrequest labels",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsLabels := strings.Split(args[2], ",")
			labelIds, err := utils.SliceAtoi(argsLabels)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddPullRequestLabels(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, labelIds)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdRemovePullRequestLabels() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "remove-pullrequest-labels [repository-id] [iid] [labels]",
		Short: "Remove issue labels",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsLabels := strings.Split(args[2], ",")
			labelIds, err := utils.SliceAtoi(argsLabels)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemovePullRequestLabels(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, labelIds)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeletePullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-pullRequest [repository-id] [iid]",
		Short: "Delete a pullRequest",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeletePullRequest(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
