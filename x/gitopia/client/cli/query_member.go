package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/spf13/cobra"
)

func CmdListDaoMember() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-dao-member [dao-id]",
		Short: "list all dao member",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			argDaoId := args[0]

			params := &types.QueryAllDaoMemberRequest{
				DaoId:      argDaoId,
				Pagination: pageReq,
			}

			res, err := queryClient.DaoMemberAll(context.Background(), params)
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
