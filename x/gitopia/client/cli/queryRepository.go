package cli

import (
	"context"
	"encoding/json"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/spf13/cobra"
)

func CmdListRepository() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-repository",
		Short: "list all repository",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllRepositoryRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.RepositoryAll(context.Background(), params)
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

func CmdShowRepository() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-repository [id]",
		Short: "shows a repository",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			params := &types.QueryGetRepositoryRequest{
				Id: id,
			}

			res, err := queryClient.Repository(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdListBranch() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-branch [id]",
		Short: "list all branches",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			params := &types.QueryGetRepositoryRequest{
				Id: id,
			}

			res, err := queryClient.Repository(context.Background(), params)
			if err != nil {
				return err
			}

			branches, err := json.Marshal(res.Repository.Branches)
			if err != nil {
				return err
			}

			return clientCtx.PrintBytes(branches)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
