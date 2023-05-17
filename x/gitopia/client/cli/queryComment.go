package cli

import (
	"context"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
	"github.com/spf13/cobra"
)

func CmdListComment() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-comment",
		Short: "list all comment",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllCommentRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.CommentAll(context.Background(), params)
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

func CmdListIssueComment() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-issue-comment [repository-id] [issue-iid]",
		Short: "list all issue comment",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			issueIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			params := &types.QueryAllIssueCommentRequest{
				RepositoryId: repositoryId,
				IssueIid:     issueIid,
				Pagination:   pageReq,
			}

			res, err := queryClient.IssueCommentAll(context.Background(), params)
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

func CmdListPullRequestComment() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-pullrequest-comment [repository-id] [pullrequest-iid]",
		Short: "list all pullrequest comment",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			pullRequestIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			params := &types.QueryAllPullRequestCommentRequest{
				RepositoryId:   repositoryId,
				PullRequestIid: pullRequestIid,
				Pagination:     pageReq,
			}

			res, err := queryClient.PullRequestCommentAll(context.Background(), params)
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

func CmdShowIssueComment() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-issue-comment [repository-id] [issue-iid] [comment-iid]",
		Short: "shows a issue comment",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			issueIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			commentIid, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}

			params := &types.QueryGetIssueCommentRequest{
				RepositoryId: repositoryId,
				IssueIid:     issueIid,
				CommentIid:   commentIid,
			}

			res, err := queryClient.IssueComment(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowPullRequestComment() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-pullrequest-comment [repository-id] [pullrequest-iid] [comment-iid]",
		Short: "shows a pullrequest comment",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			pullRequestIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			commentIid, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}

			params := &types.QueryGetPullRequestCommentRequest{
				RepositoryId:   repositoryId,
				PullRequestIid: pullRequestIid,
				CommentIid:     commentIid,
			}

			res, err := queryClient.PullRequestComment(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
