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
)

func CmdCreateComment() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-comment [parentId] [body] [attachments] [diffHunk] [path] [system] [authorAssociation] [commentType]",
		Short: "Create a new comment",
		Args:  cobra.ExactArgs(8),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsParentId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsBody, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			argsAttachments := strings.Split(args[2], ",")
			argsDiffHunk, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}
			argsPath, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}
			argsSystem, err := strconv.ParseBool(args[5])
			if err != nil {
				return err
			}

			argsAuthorAssociation, err := cast.ToStringE(args[6])
			if err != nil {
				return err
			}
			argsCommentType, err := cast.ToStringE(args[7])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateComment(clientCtx.GetFromAddress().String(), argsParentId, string(argsBody), argsAttachments, string(argsDiffHunk), string(argsPath), argsSystem, string(argsAuthorAssociation), string(argsCommentType))
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
		Use:   "update-comment [id] [body] [attachments]",
		Short: "Update a comment",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsBody, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			argsAttachments := strings.Split(args[2], ",")

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateComment(clientCtx.GetFromAddress().String(), id, string(argsBody), argsAttachments)
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
		Use:   "delete-comment [id]",
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
