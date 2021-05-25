package cli

import (
	"github.com/spf13/cobra"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func CmdCreateIssue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-issue [iid] [title] [state] [description] [authorId] [comments] [pullRequests] [repositoryId] [labels] [weight] [assigneesId] [createdAt] [updatedAt] [closedAt] [closedBy] [extensions]",
		Short: "Creates a new issue",
		Args:  cobra.ExactArgs(16),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsIid := string(args[0])
			argsTitle := string(args[1])
			argsState := string(args[2])
			argsDescription := string(args[3])
			argsAuthorId := string(args[4])
			argsComments := string(args[5])
			argsPullRequests := string(args[6])
			argsRepositoryId := string(args[7])
			argsLabels := string(args[8])
			argsWeight := string(args[9])
			argsAssigneesId := string(args[10])
			argsCreatedAt := string(args[11])
			argsUpdatedAt := string(args[12])
			argsClosedAt := string(args[13])
			argsClosedBy := string(args[14])
			argsExtensions := string(args[15])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateIssue(clientCtx.GetFromAddress().String(), string(argsIid), string(argsTitle), string(argsState), string(argsDescription), string(argsAuthorId), string(argsComments), string(argsPullRequests), string(argsRepositoryId), string(argsLabels), string(argsWeight), string(argsAssigneesId), string(argsCreatedAt), string(argsUpdatedAt), string(argsClosedAt), string(argsClosedBy), string(argsExtensions))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateIssue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-issue [id] [iid] [title] [state] [description] [authorId] [comments] [pullRequests] [repositoryId] [labels] [weight] [assigneesId] [createdAt] [updatedAt] [closedAt] [closedBy] [extensions]",
		Short: "Update a issue",
		Args:  cobra.ExactArgs(17),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsIid := string(args[1])
			argsTitle := string(args[2])
			argsState := string(args[3])
			argsDescription := string(args[4])
			argsAuthorId := string(args[5])
			argsComments := string(args[6])
			argsPullRequests := string(args[7])
			argsRepositoryId := string(args[8])
			argsLabels := string(args[9])
			argsWeight := string(args[10])
			argsAssigneesId := string(args[11])
			argsCreatedAt := string(args[12])
			argsUpdatedAt := string(args[13])
			argsClosedAt := string(args[14])
			argsClosedBy := string(args[15])
			argsExtensions := string(args[16])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateIssue(clientCtx.GetFromAddress().String(), id, string(argsIid), string(argsTitle), string(argsState), string(argsDescription), string(argsAuthorId), string(argsComments), string(argsPullRequests), string(argsRepositoryId), string(argsLabels), string(argsWeight), string(argsAssigneesId), string(argsCreatedAt), string(argsUpdatedAt), string(argsClosedAt), string(argsClosedBy), string(argsExtensions))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteIssue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-issue [id] [iid] [title] [state] [description] [authorId] [comments] [pullRequests] [repositoryId] [labels] [weight] [assigneesId] [createdAt] [updatedAt] [closedAt] [closedBy] [extensions]",
		Short: "Delete a issue by id",
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

			msg := types.NewMsgDeleteIssue(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
