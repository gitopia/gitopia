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
		Use:   "add-repository-backup-ref [repository-id] [store] [ref]",
		Short: "add repository backup reference",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argStore := (types.Store)(types.Store_value[args[1]])
			argRef := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddRepositoryBackupRef(
				clientCtx.GetFromAddress().String(),
				argRepositoryId,
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
