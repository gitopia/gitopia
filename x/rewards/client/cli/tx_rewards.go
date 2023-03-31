package cli

import (
	
    "github.com/spf13/cobra"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	cosmosTypes "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/rewards/types"
)

func CmdCreateRewards() *cobra.Command {
    cmd := &cobra.Command{
		Use:   "create-reward [recipient] [amount]",
		Short: "Create a new reward",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
            // Get indexes
         indexRecipient := args[0]
        
            // Get value arguments
			argAmount, err := cosmosTypes.ParseCoinNormalized(args[1])
			if err != nil {
				return err
			}
		
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateReward(
			    clientCtx.GetFromAddress().String(),
			    indexRecipient,
                argAmount,
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