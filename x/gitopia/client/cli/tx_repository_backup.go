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

func CmdAddRepositoryBackupRef() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-repository-backup-ref [id] [repository-name] [store] [ref]",
		Short: "add repository backup reference",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argId := args[0]
			argRepositoryName := args[1]
			argStore := (types.RepositoryBackupStore)(types.RepositoryBackupStore_value[args[2]])
			argRef := args[3]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddRepositoryBackupRef(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				argStore,
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

func CmdUpdateRepositoryBackupRef() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-repository-backup-ref [id] [repository-name] [store] [ref]",
		Short: "update repository backup reference",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argId := args[0]
			argRepositoryName := args[1]
			argStore := (types.RepositoryBackupStore)(types.RepositoryBackupStore_value[args[2]])
			argRef := args[3]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateRepositoryBackupRef(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				argStore,
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
