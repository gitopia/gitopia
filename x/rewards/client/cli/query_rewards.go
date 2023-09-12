package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/v3/x/rewards/types"
	"github.com/spf13/cobra"
)

func CmdListRewards() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-rewards",
		Short: "list all rewards",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllRewardsRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.RewardsAll(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddPaginationFlagsToCmd(cmd, cmd.Use)
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowRewards() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-rewards [recipient]",
		Short: "shows a rewards",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argRecipient := args[0]

			params := &types.QueryGetRewardRequest{
				Recipient: argRecipient,
			}

			res, err := queryClient.Reward(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
