package cli

import (
	"github.com/spf13/cobra"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func CmdCreateComment() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-comment [parentId] [commentIid] [body] [attachments] [diffHunk] [path] [system] [authorId] [authorAssociation] [createdAt] [updatedAt] [commentType] [extensions]",
		Short: "Creates a new comment",
		Args:  cobra.ExactArgs(13),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsParentId := string(args[0])
			argsCommentIid := string(args[1])
			argsBody := string(args[2])
			argsAttachments := string(args[3])
			argsDiffHunk := string(args[4])
			argsPath := string(args[5])
			argsSystem := string(args[6])
			argsAuthorId := string(args[7])
			argsAuthorAssociation := string(args[8])
			argsCreatedAt := string(args[9])
			argsUpdatedAt := string(args[10])
			argsCommentType := string(args[11])
			argsExtensions := string(args[12])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateComment(clientCtx.GetFromAddress().String(), string(argsParentId), string(argsCommentIid), string(argsBody), string(argsAttachments), string(argsDiffHunk), string(argsPath), string(argsSystem), string(argsAuthorId), string(argsAuthorAssociation), string(argsCreatedAt), string(argsUpdatedAt), string(argsCommentType), string(argsExtensions))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateComment() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-comment [id] [parentId] [commentIid] [body] [attachments] [diffHunk] [path] [system] [authorId] [authorAssociation] [createdAt] [updatedAt] [commentType] [extensions]",
		Short: "Update a comment",
		Args:  cobra.ExactArgs(14),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsParentId := string(args[1])
			argsCommentIid := string(args[2])
			argsBody := string(args[3])
			argsAttachments := string(args[4])
			argsDiffHunk := string(args[5])
			argsPath := string(args[6])
			argsSystem := string(args[7])
			argsAuthorId := string(args[8])
			argsAuthorAssociation := string(args[9])
			argsCreatedAt := string(args[10])
			argsUpdatedAt := string(args[11])
			argsCommentType := string(args[12])
			argsExtensions := string(args[13])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateComment(clientCtx.GetFromAddress().String(), id, string(argsParentId), string(argsCommentIid), string(argsBody), string(argsAttachments), string(argsDiffHunk), string(argsPath), string(argsSystem), string(argsAuthorId), string(argsAuthorAssociation), string(argsCreatedAt), string(argsUpdatedAt), string(argsCommentType), string(argsExtensions))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteComment() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-comment [id] [parentId] [commentIid] [body] [attachments] [diffHunk] [path] [system] [authorId] [authorAssociation] [createdAt] [updatedAt] [commentType] [extensions]",
		Short: "Delete a comment by id",
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

			msg := types.NewMsgDeleteComment(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
