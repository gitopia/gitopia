package cli

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/v3/x/gitopia/types"
	"github.com/spf13/cobra"
)

func CmdAddMember() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-member [dao-id] [user-id] [role]",
		Short: "Add a new member",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argDaoId := args[0]
			argUserId := args[1]
			argRole := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddMember(clientCtx.GetFromAddress().String(), argDaoId, argUserId, types.MemberRole(types.MemberRole_value[argRole]))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateMemberRole() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-member-role [dao-id] [user-id] [role]",
		Short: "Update a member role",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argDaoId := args[0]
			argUserId := args[1]
			argRole := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateMemberRole(clientCtx.GetFromAddress().String(), argDaoId, argUserId, types.MemberRole(types.MemberRole_value[argRole]))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdRemoveMember() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "remove-member [dao-id] [user-id]",
		Short: "Remove a member",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			argDaoId := args[0]
			argUserId := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemoveMember(clientCtx.GetFromAddress().String(), argDaoId, argUserId)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
