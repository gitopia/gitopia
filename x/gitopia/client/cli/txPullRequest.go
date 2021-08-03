package cli

import (
	"strconv"

	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func CmdCreatePullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-pullRequest [iid] [title] [state] [description] [locked] [comments] [issues] [repositoryId] [labels] [assignees] [reviewers] [draft] [createdAt] [updatedAt] [closedAt] [closedBy] [mergedAt] [mergedBy] [mergeCommitSha] [maintainerCanModify] [head] [base] [extensions]",
		Short: "Create a new pullRequest",
		Args:  cobra.ExactArgs(23),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsIid, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argsTitle, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			argsState, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}
			argsDescription, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}
			argsLocked, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}
			argsComments, err := cast.ToStringE(args[5])
			if err != nil {
				return err
			}
			argsIssues, err := cast.ToStringE(args[6])
			if err != nil {
				return err
			}
			argsRepositoryId, err := cast.ToStringE(args[7])
			if err != nil {
				return err
			}
			argsLabels, err := cast.ToStringE(args[8])
			if err != nil {
				return err
			}
			argsAssignees, err := cast.ToStringE(args[9])
			if err != nil {
				return err
			}
			argsReviewers, err := cast.ToStringE(args[10])
			if err != nil {
				return err
			}
			argsDraft, err := cast.ToStringE(args[11])
			if err != nil {
				return err
			}
			argsCreatedAt, err := cast.ToStringE(args[12])
			if err != nil {
				return err
			}
			argsUpdatedAt, err := cast.ToStringE(args[13])
			if err != nil {
				return err
			}
			argsClosedAt, err := cast.ToStringE(args[14])
			if err != nil {
				return err
			}
			argsClosedBy, err := cast.ToStringE(args[15])
			if err != nil {
				return err
			}
			argsMergedAt, err := cast.ToStringE(args[16])
			if err != nil {
				return err
			}
			argsMergedBy, err := cast.ToStringE(args[17])
			if err != nil {
				return err
			}
			argsMergeCommitSha, err := cast.ToStringE(args[18])
			if err != nil {
				return err
			}
			argsMaintainerCanModify, err := cast.ToStringE(args[19])
			if err != nil {
				return err
			}
			argsHead, err := cast.ToStringE(args[20])
			if err != nil {
				return err
			}
			argsBase, err := cast.ToStringE(args[21])
			if err != nil {
				return err
			}
			argsExtensions, err := cast.ToStringE(args[22])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreatePullRequest(clientCtx.GetFromAddress().String(), argsIid, argsTitle, argsState, argsDescription, argsLocked, argsComments, argsIssues, argsRepositoryId, argsLabels, argsAssignees, argsReviewers, argsDraft, argsCreatedAt, argsUpdatedAt, argsClosedAt, argsClosedBy, argsMergedAt, argsMergedBy, argsMergeCommitSha, argsMaintainerCanModify, argsHead, argsBase, argsExtensions)
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
		Use:   "update-pullRequest [id] [iid] [title] [state] [description] [locked] [comments] [issues] [repositoryId] [labels] [assignees] [reviewers] [draft] [createdAt] [updatedAt] [closedAt] [closedBy] [mergedAt] [mergedBy] [mergeCommitSha] [maintainerCanModify] [head] [base] [extensions]",
		Short: "Update a pullRequest",
		Args:  cobra.ExactArgs(24),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsIid, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			argsTitle, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}

			argsState, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}

			argsDescription, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}

			argsLocked, err := cast.ToStringE(args[5])
			if err != nil {
				return err
			}

			argsComments, err := cast.ToStringE(args[6])
			if err != nil {
				return err
			}

			argsIssues, err := cast.ToStringE(args[7])
			if err != nil {
				return err
			}

			argsRepositoryId, err := cast.ToStringE(args[8])
			if err != nil {
				return err
			}

			argsLabels, err := cast.ToStringE(args[9])
			if err != nil {
				return err
			}

			argsAssignees, err := cast.ToStringE(args[10])
			if err != nil {
				return err
			}

			argsReviewers, err := cast.ToStringE(args[11])
			if err != nil {
				return err
			}

			argsDraft, err := cast.ToStringE(args[12])
			if err != nil {
				return err
			}

			argsCreatedAt, err := cast.ToStringE(args[13])
			if err != nil {
				return err
			}

			argsUpdatedAt, err := cast.ToStringE(args[14])
			if err != nil {
				return err
			}

			argsClosedAt, err := cast.ToStringE(args[15])
			if err != nil {
				return err
			}

			argsClosedBy, err := cast.ToStringE(args[16])
			if err != nil {
				return err
			}

			argsMergedAt, err := cast.ToStringE(args[17])
			if err != nil {
				return err
			}

			argsMergedBy, err := cast.ToStringE(args[18])
			if err != nil {
				return err
			}

			argsMergeCommitSha, err := cast.ToStringE(args[19])
			if err != nil {
				return err
			}

			argsMaintainerCanModify, err := cast.ToStringE(args[20])
			if err != nil {
				return err
			}

			argsHead, err := cast.ToStringE(args[21])
			if err != nil {
				return err
			}

			argsBase, err := cast.ToStringE(args[22])
			if err != nil {
				return err
			}

			argsExtensions, err := cast.ToStringE(args[23])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdatePullRequest(clientCtx.GetFromAddress().String(), id, argsIid, argsTitle, argsState, argsDescription, argsLocked, argsComments, argsIssues, argsRepositoryId, argsLabels, argsAssignees, argsReviewers, argsDraft, argsCreatedAt, argsUpdatedAt, argsClosedAt, argsClosedBy, argsMergedAt, argsMergedBy, argsMergeCommitSha, argsMaintainerCanModify, argsHead, argsBase, argsExtensions)
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
