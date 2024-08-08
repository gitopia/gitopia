package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
	"github.com/spf13/cobra"
)

func CmdListMember() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-member",
		Short: "list all member",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllMemberRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.MemberAll(context.Background(), params)
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

func CmdShowDaoMember() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-dao-member [dao-id] [user-id]",
		Short: "shows dao member",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argDaoId := args[0]
			argUserId := args[1]

			params := &types.QueryGetDaoMemberRequest{
				DaoId:  argDaoId,
				UserId: argUserId,
			}

			res, err := queryClient.DaoMember(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
