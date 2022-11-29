package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/x/rewards/types"
	"github.com/spf13/cobra"
)


func CmdListTask() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-task [addr]",
		Short: "list all task for the address",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryTasksRequest{
				Address: args[0],
			}

			res, err := queryClient.Tasks(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}