package cli

import (
	"context"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

func CmdListIssue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-issue",
		Short: "list all issue",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllIssueRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.IssueAll(context.Background(), params)
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

func CmdListRepositoryIssue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-repository-issue [id] [repository-name]",
		Short: "list all repository issue",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			id, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			repositoryName, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			params := &types.QueryAllRepositoryIssueRequest{
				Id:             id,
				RepositoryName: repositoryName,
				Pagination:     pageReq,
			}

			res, err := queryClient.RepositoryIssueAll(context.Background(), params)
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

func CmdShowRepositoryIssue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-repository-issue [id] [repository-name] [issue-iid]",
		Short: "shows a repository issue",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			id, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			repositoryName, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			issueIid, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}

			params := &types.QueryGetRepositoryIssueRequest{
				Id:             id,
				RepositoryName: repositoryName,
				IssueIid:       issueIid,
			}

			res, err := queryClient.RepositoryIssue(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
