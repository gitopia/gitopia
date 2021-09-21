package cli

import (
	"strconv"
	"strings"

	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
)

func CmdCreatePullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-pullRequest [title] [description] [headBranch] [headRepoId] [baseBranch] [baseRepoId] [reviewers] [assignees] [labelIds]",
		Short: "Create a new pullRequest",
		Args:  cobra.ExactArgs(9),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsTitle, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argsDescription, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			argsHeadBranch, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}
			argsHeadRepoId, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return err
			}
			argsBaseBranch, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}
			argsBaseRepoId, err := strconv.ParseUint(args[5], 10, 64)
			if err != nil {
				return err
			}
			argsReviewers := strings.Split(args[6], ",")
			if len(argsReviewers) == 1 && argsReviewers[0] == "" {
				argsReviewers = nil
			}
			argsAssignees := strings.Split(args[7], ",")
			if len(argsAssignees) == 1 && argsAssignees[0] == "" {
				argsAssignees = nil
			}
			argsLabels := strings.Split(args[8], ",")
			labelIds, err := utils.SliceAtoi(argsLabels)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreatePullRequest(clientCtx.GetFromAddress().String(), argsTitle, argsDescription, argsHeadBranch, argsHeadRepoId, argsBaseBranch, argsBaseRepoId, argsReviewers, argsAssignees, labelIds)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdatePullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-pullRequest [id] [title] [description]",
		Short: "Update a pullRequest",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsTitle, err := cast.ToStringE(args[1])
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

			msg := types.NewMsgUpdatePullRequest(clientCtx.GetFromAddress().String(), id, argsTitle, argsDescription)
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

func CmdSetPullRequestState() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "set-pullrequest-state [id]",
		Short: "Set pullrequest state",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsState, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			argsMergeCommitSha, err := cast.ToStringE(args[2])
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
