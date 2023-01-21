package cli

import (
    "strconv"
	
	"github.com/spf13/cobra"
    "github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

var _ = strconv.Itoa(0)

func CmdToggleForcePush() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "toggle-force-push [id] [repository-id] [branch-name]",
		Short: "configure restricted push access to branch",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
      		 argId := args[0]
             argRepositoryId := args[1]
             argBranchName := args[2]
            
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgToggleForcePush(
				clientCtx.GetFromAddress().String(),
				argId,
				argRepositoryId,
				argBranchName,
				
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