package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/spf13/cobra"
)

func CmdListBranch() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-branch",
		Short: "list all branch",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllBranchRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.BranchAll(context.Background(), params)
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

func CmdListRepositoryBranch() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-repository-branch [id] [repository-name]",
		Short: "list all repository branch",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			argId := args[0]
			argRepositoryName := args[1]

			params := &types.QueryAllRepositoryBranchRequest{
				Id:             argId,
				RepositoryName: argRepositoryName,
				Pagination:     pageReq,
			}

			res, err := queryClient.RepositoryBranchAll(context.Background(), params)
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

func CmdShowRepositoryBranch() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-branch [id] [repository-name] [branch-name]",
		Short: "shows a branch",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argId := args[0]
			argRepositoryName := args[1]
			argBranchName := args[2]

			params := &types.QueryGetRepositoryBranchRequest{
				Id:             argId,
				RepositoryName: argRepositoryName,
				BranchName:     argBranchName,
			}

			res, err := queryClient.RepositoryBranch(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
