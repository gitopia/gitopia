package cli

import (
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

func CmdCreatePullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-pullRequest [title] [description] [headBranch] [headRepoId] [baseBranch] [baseRepoId] [reviewers] [assignees] [labelIds]",
		Short: "Create a new pullRequest",
		Args:  cobra.ExactArgs(9),
		RunE: func(cmd *cobra.Command, args []string) error {
			argTitle := args[0]
			argDescription := args[1]
			argHeadBranch := args[2]
			argHeadId := args[3]
			argHeadRepositoryName := args[4]
			argBaseBranch := args[5]
			argBaseId := args[6]
			argBaseRepositoryName := args[7]
			argReviewers := strings.Split(args[6], ",")
			if len(argReviewers) == 1 && argReviewers[0] == "" {
				argReviewers = nil
			}
			argAssignees := strings.Split(args[7], ",")
			if len(argAssignees) == 1 && argAssignees[0] == "" {
				argAssignees = nil
			}
			argLabels := strings.Split(args[8], ",")
			labelIds, err := utils.SliceAtoi(argLabels)
			if err != nil {
				return err
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
		Use:   "update-pullrequest-title [id] [title]",
		Short: "Update a pullRequest title",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsTitle, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdatePullRequestTitle(clientCtx.GetFromAddress().String(), id, string(argsTitle))
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
		Use:   "update-pullrequest-description [id] [description]",
		Short: "Update pullRequest description",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsDescription, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdatePullRequestDescription(clientCtx.GetFromAddress().String(), id, string(argsDescription))
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
		Use:   "invoke-merge-pullrequest [id] [provider]",
		Short: "Emits an event for git-server to merge a Pull Request",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsProvider, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgInvokeMergePullRequest(clientCtx.GetFromAddress().String(), id, string(argsProvider))
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
		Use:   "set-pullrequest-state [id] [state] [merge_commit_sha]",
		Short: "Set pullrequest state",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
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

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgSetPullRequestState(clientCtx.GetFromAddress().String(), id, string(argsState), string(argsMergeCommitSha))
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
		Use:   "add-pullrequest-reviewers [id] [reviewers]",
		Short: "Add pullRequest reviewers",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsReviewers := strings.Split(args[1], ",")
			if len(argsReviewers) == 1 && argsReviewers[0] == "" {
				argsReviewers = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddPullRequestReviewers(clientCtx.GetFromAddress().String(), id, argsReviewers)
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
		Use:   "remove-pullrequest-reviewers [id] [reviewers]",
		Short: "Remove pullRequest reviewers",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsReviewers := strings.Split(args[1], ",")
			if len(argsReviewers) == 1 && argsReviewers[0] == "" {
				argsReviewers = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemovePullRequestReviewers(clientCtx.GetFromAddress().String(), id, argsReviewers)
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
		Use:   "add-pullrequest-assignees [id] [assignees]",
		Short: "Add pullRequest assignees",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsAssignees := strings.Split(args[1], ",")
			if len(argsAssignees) == 1 && argsAssignees[0] == "" {
				argsAssignees = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddPullRequestAssignees(clientCtx.GetFromAddress().String(), id, argsAssignees)
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
		Use:   "remove-pullrequest-assignees [id] [assignees]",
		Short: "Remove pullRequest assignees",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsAssignees := strings.Split(args[1], ",")
			if len(argsAssignees) == 1 && argsAssignees[0] == "" {
				argsAssignees = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemovePullRequestAssignees(clientCtx.GetFromAddress().String(), id, argsAssignees)
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
		Use:   "link-pullrequest-issue-by-iid [id] [issue-iid]",
		Short: "Link pullRequest issue by Iid",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsIssueIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgLinkPullRequestIssueByIid(clientCtx.GetFromAddress().String(), id, argsIssueIid)
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
		Use:   "unlink-pullrequest-issue-by-iid [id] [issue-iid]",
		Short: "Unlink pullRequest issue by Iid",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsIssueIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUnlinkPullRequestIssueByIid(clientCtx.GetFromAddress().String(), id, argsIssueIid)
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
		Use:   "add-pullrequest-labels [id] [labels]",
		Short: "Add pullrequest labels",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsLabels := strings.Split(args[1], ",")
			labelIds, err := utils.SliceAtoi(argsLabels)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddPullRequestLabels(clientCtx.GetFromAddress().String(), id, labelIds)
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
		Use:   "remove-pullrequest-labels [id] [labels]",
		Short: "Remove issue labels",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsLabels := strings.Split(args[1], ",")
			labelIds, err := utils.SliceAtoi(argsLabels)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemovePullRequestLabels(clientCtx.GetFromAddress().String(), id, labelIds)
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
		Use:   "delete-pullRequest [id]",
		Short: "Delete a pullRequest by id",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeletePullRequest(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
