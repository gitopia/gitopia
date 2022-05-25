package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/spf13/cobra"
)

func CmdCreateBounty() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-bounty [amount] [state] [deadline] [parent-id] [parent] [created-at] [updated-at]",
		Short: "Create a new Bounty",
		Args:  cobra.ExactArgs(7),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argAmount := args[0]
			argState := args[1]
			argDeadline := args[2]
			argParentId := args[3]
			argParent := args[4]
			argCreatedAt := args[5]
			argUpdatedAt := args[6]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateBounty(clientCtx.GetFromAddress().String(), argAmount, argState, argDeadline, argParentId, argParent, argCreatedAt, argUpdatedAt)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateBounty() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-bounty [id] [amount] [state] [deadline] [parent-id] [parent] [created-at] [updated-at]",
		Short: "Update a Bounty",
		Args:  cobra.ExactArgs(8),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argAmount := args[1]

			argState := args[2]

			argDeadline := args[3]

			argParentId := args[4]

			argParent := args[5]

			argCreatedAt := args[6]

			argUpdatedAt := args[7]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateBounty(clientCtx.GetFromAddress().String(), id, argAmount, argState, argDeadline, argParentId, argParent, argCreatedAt, argUpdatedAt)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteBounty() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-bounty [id]",
		Short: "Delete a Bounty by id",
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

			msg := types.NewMsgDeleteBounty(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
