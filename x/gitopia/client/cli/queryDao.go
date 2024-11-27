package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

func CmdListDao() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-dao",
		Short: "list all Dao",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllDaoRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.DaoAll(context.Background(), params)
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

func CmdShowDao() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-dao [id]",
		Short: "shows a Dao",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			id, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}

			params := &types.QueryGetDaoRequest{
				Id: id,
			}

			res, err := queryClient.Dao(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
