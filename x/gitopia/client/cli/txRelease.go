package cli

import (
	"strconv"

	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
)

func CmdCreateRelease() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-release [repositoryId] [tagName] [target] [name] [description] [attachments] [draft] [preRelease] [isTag]",
		Short: "Create a new release",
		Args:  cobra.ExactArgs(9),
		RunE: func(cmd *cobra.Command, args []string) error {
			argOwnerid := args[0]
			argRepositoryName := args[1]
			argTagName := args[2]
			argTarget := args[3]
			argName := args[4]
			argDescription := args[5]
			argAttachments := args[6]
			argDraft, err := strconv.ParseBool(args[7])
			if err != nil {
				return err
			}
			argPreRelease, err := strconv.ParseBool(args[8])
			if err != nil {
				return err
			}
			argIsTag, err := strconv.ParseBool(args[9])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateRelease(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argOwnerid, Name: argRepositoryName},
				argTagName,
				argTarget,
				argName,
				argDescription,
				argAttachments,
				argDraft,
				argPreRelease,
				argIsTag,
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

func CmdUpdateRelease() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-release [id] [tagName] [target] [name] [description] [attachments] [draft] [preRelease] [isTag]",
		Short: "Update a release",
		Args:  cobra.ExactArgs(9),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
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
			argsDraft, err := strconv.ParseBool(args[6])
			if err != nil {
				return err
			}
			argsPreRelease, err := strconv.ParseBool(args[7])
			if err != nil {
				return err
			}
			argsIsTag, err := strconv.ParseBool(args[8])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateRelease(clientCtx.GetFromAddress().String(), id, argsTagName, argsTarget, argsName, argsDescription, argsAttachments, argsDraft, argsPreRelease, argsIsTag)
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
