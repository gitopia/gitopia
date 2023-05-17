package cli

import (
	"encoding/json"
	"strconv"

	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
)

func CmdCreateComment() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-comment [repository-id] [parent-iid] [parent] [body] [attachments] [diffhunk] [path] [position]",
		Short: "Create a new comment",
		Args:  cobra.ExactArgs(8),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsParentIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsParent, err := strconv.ParseInt(args[2], 10, 32)
			if err != nil {
				return err
			}
			argsBody, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}
			argsAttachments, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}
			attachments := []*types.Attachment{}
			if argsAttachments != "" {
				if err := json.Unmarshal([]byte(argsAttachments), &attachments); err != nil {
					return err
				}
			}
			argsDiffHunk, err := cast.ToStringE(args[5])
			if err != nil {
				return err
			}
			argsPath, err := cast.ToStringE(args[6])
			if err != nil {
				return err
			}
			argsPosition, err := strconv.ParseUint(args[7], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateComment(clientCtx.GetFromAddress().String(),
				argsRepositoryId,
				argsParentIid,
				types.CommentParent(argsParent),
				string(argsBody),
				attachments,
				string(argsDiffHunk),
				string(argsPath),
				argsPosition)
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
		Use:   "update-comment [repository-id] [parent-iid] [parent] [comment-iid] [body] [attachments]",
		Short: "Update a comment",
		Args:  cobra.ExactArgs(6),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsParentIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsParent, err := strconv.ParseInt(args[2], 10, 32)
			if err != nil {
				return err
			}
			argsCommentIid, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return err
			}
			argsBody, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}
			argsAttachments, err := cast.ToStringE(args[5])
			if err != nil {
				return err
			}
			attachments := []*types.Attachment{}
			if argsAttachments != "" {
				if err := json.Unmarshal([]byte(argsAttachments), &attachments); err != nil {
					return err
				}
			}
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateComment(clientCtx.GetFromAddress().String(), argsRepositoryId, argsParentIid, types.CommentParent(argsParent), argsCommentIid, string(argsBody), attachments)
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
		Use:   "delete-comment [repository-id] [parent-iid] [parent] [comment-iid]",
		Short: "Delete a comment",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsParentIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsParent, err := strconv.ParseInt(args[2], 10, 32)
			if err != nil {
				return err
			}
			argsCommentIid, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteComment(clientCtx.GetFromAddress().String(), argsRepositoryId, argsParentIid, types.CommentParent(argsParent), argsCommentIid)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
