package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/spf13/cobra"
)

func CmdListTag() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-tag",
		Short: "list all tag",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllTagRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.TagAll(context.Background(), params)
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

func CmdListRepositoryTag() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-repository-tag [id] [repository-name]",
		Short: "list all repository tag",
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

			params := &types.QueryAllRepositoryTagRequest{
				Id:             argId,
				RepositoryName: argRepositoryName,
				Pagination:     pageReq,
			}

			res, err := queryClient.RepositoryTagAll(context.Background(), params)
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

func CmdShowRepositoryTag() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-repository-tag [id] [repository-name] [tag-name]",
		Short: "shows a tag",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argId := args[0]
			argRepositoryName := args[1]
			argTagName := args[2]

			params := &types.QueryGetRepositoryTagRequest{
				Id:             argId,
				RepositoryName: argRepositoryName,
				TagName:        argTagName,
			}

			res, err := queryClient.RepositoryTag(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
