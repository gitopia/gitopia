package cli

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/spf13/cobra"
)

func CmdAuthorizeProvider() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "authorize-provider [granter] [provider] [permission]",
		Short: "Authorize provider",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argGranter := args[0]
			argProvider := args[1]
			argPermission := (types.ProviderPermission)(types.ProviderPermission_value[args[2]])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAuthorizeProvider(
				clientCtx.GetFromAddress().String(),
				argGranter,
				argProvider,
				argPermission,
			)
			if err != nil {
				return err
			}
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdRevokeProviderPermission() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "revoke-provider-permission [granter] [provider] [permission]",
		Short: "Revoke provider permission",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argGranter := args[0]
			argProvider := args[1]
			argPermission := (types.ProviderPermission)(types.ProviderPermission_value[args[2]])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRevokeProviderPermission(
				clientCtx.GetFromAddress().String(),
				argGranter,
				argProvider,
				argPermission,
			)
			if err != nil {
				return err
			}
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
