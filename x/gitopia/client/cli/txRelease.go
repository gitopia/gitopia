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

func CmdCreateRelease() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-release [repositoryId] [tagName] [target] [name] [description] [attachments] [draft] [preRelease] [isTag] [createdAt] [updatedAt] [publishedAt]",
		Short: "Create a new release",
		Args:  cobra.ExactArgs(12),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argsTagName, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			argsTarget, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}
			argsName, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}
			argsDescription, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}
			argsAttachments, err := cast.ToStringE(args[5])
			if err != nil {
				return err
			}
			argsDraft, err := cast.ToStringE(args[6])
			if err != nil {
				return err
			}
			argsPreRelease, err := cast.ToStringE(args[7])
			if err != nil {
				return err
			}
			argsIsTag, err := cast.ToStringE(args[8])
			if err != nil {
				return err
			}
			argsCreatedAt, err := cast.ToStringE(args[9])
			if err != nil {
				return err
			}
			argsUpdatedAt, err := cast.ToStringE(args[10])
			if err != nil {
				return err
			}
			argsPublishedAt, err := cast.ToStringE(args[11])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateRelease(clientCtx.GetFromAddress().String(), argsRepositoryId, argsTagName, argsTarget, argsName, argsDescription, argsAttachments, argsDraft, argsPreRelease, argsIsTag, argsCreatedAt, argsUpdatedAt, argsPublishedAt)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateRelease() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-release [id] [repositoryId] [tagName] [target] [name] [description] [attachments] [draft] [preRelease] [isTag] [createdAt] [updatedAt] [publishedAt]",
		Short: "Update a release",
		Args:  cobra.ExactArgs(13),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsRepositoryId, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			argsTagName, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}

			argsTarget, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}

			argsName, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}

			argsDescription, err := cast.ToStringE(args[5])
			if err != nil {
				return err
			}

			argsAttachments, err := cast.ToStringE(args[6])
			if err != nil {
				return err
			}

			argsDraft, err := cast.ToStringE(args[7])
			if err != nil {
				return err
			}

			argsPreRelease, err := cast.ToStringE(args[8])
			if err != nil {
				return err
			}

			argsIsTag, err := cast.ToStringE(args[9])
			if err != nil {
				return err
			}

			argsCreatedAt, err := cast.ToStringE(args[10])
			if err != nil {
				return err
			}

			argsUpdatedAt, err := cast.ToStringE(args[11])
			if err != nil {
				return err
			}

			argsPublishedAt, err := cast.ToStringE(args[12])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateRelease(clientCtx.GetFromAddress().String(), id, argsRepositoryId, argsTagName, argsTarget, argsName, argsDescription, argsAttachments, argsDraft, argsPreRelease, argsIsTag, argsCreatedAt, argsUpdatedAt, argsPublishedAt)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteRelease() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-release [id]",
		Short: "Delete a release by id",
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

			msg := types.NewMsgDeleteRelease(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
