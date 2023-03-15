package cli

import (
	"context"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

func CmdListPullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-pullRequest",
		Short: "list all pullRequest",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllPullRequestRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.PullRequestAll(context.Background(), params)
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

func CmdListRepositoryPullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-repository-pullRequest [id] [repository-name]",
		Short: "list all repository pullRequest",
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

			params := &types.QueryAllRepositoryPullRequestRequest{
				Id:             id,
				RepositoryName: repositoryName,
				Pagination:     pageReq,
			}

			res, err := queryClient.RepositoryPullRequestAll(context.Background(), params)
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

func CmdShowRepositoryPullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-repository-pullrequest [id] [repository-name] [pullrequest-iid]",
		Short: "shows a repository pullrequest",
		Args:  cobra.ExactArgs(1),
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
			pullRequestIid, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}

			params := &types.QueryGetRepositoryPullRequestRequest{
				Id:             id,
				RepositoryName: repositoryName,
				PullIid:        pullRequestIid,
			}

			res, err := queryClient.RepositoryPullRequest(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
