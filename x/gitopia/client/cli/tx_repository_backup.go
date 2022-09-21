package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdAddArweaveBackupRef() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-arweave-backup-ref [id] [repository-name] [ref]",
		Short: "add arweave backup reference",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argId := args[0]
			argRepositoryName := args[1]
			argRef := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddArweaveBackupRef(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				argRef,
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

func CmdUpdateIpfsBackupRef() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-ipfs-backup-ref [id] [repository-name] [ref]",
		Short: "update ipfs backup reference",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argId := args[0]
			argRepositoryName := args[1]
			argRef := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateIpfsBackupRef(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				argRef,
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
