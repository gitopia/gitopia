package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	cosmosTypes "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v3/x/rewards/types"
	"github.com/spf13/cobra"
)

func CmdCreateRewards() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-reward [recipient] [amount] [series]",
		Short: "Create a new reward",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			// Get indexes
			recipient := args[0]

			// Get value arguments
			argAmount, err := cosmosTypes.ParseCoinNormalized(args[1])
			if err != nil {
				return err
			}

			argSeries, err := strconv.Atoi(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateReward(
				clientCtx.GetFromAddress().String(),
				recipient,
				argAmount,
				types.Series(argSeries),
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
