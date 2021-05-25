package cli

import (
	"strconv"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func CmdCreateRepository() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-repository [name] [owner] [description]",
		Short: "Creates a new repository",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsName := string(args[0])
			argsOwner := string(args[1])
			argsDescription := string(args[2])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateRepository(clientCtx.GetFromAddress().String(), string(argsName), string(argsOwner), string(argsDescription))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateRepository() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-repository [id] [name] [owner] [description] [forks] [branches] [tags] [subscribers] [commits] [issuesOpen] [issuesClosed] [pulls] [labels] [releases] [createdAt] [updatedAt] [pushedAt] [stargazers] [archived] [license] [defaultBranch] [extensions]",
		Short: "Update a repository",
		Args:  cobra.ExactArgs(22),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsName := string(args[1])
			argsOwner := string(args[2])
			argsDescription := string(args[3])
			argsForks := string(args[4])
			argsBranches := string(args[5])
			argsTags := string(args[6])
			argsSubscribers := string(args[7])
			argsCommits := string(args[8])
			argsIssuesOpen := string(args[9])
			argsIssuesClosed := string(args[10])
			argsPulls := string(args[11])
			argsLabels := string(args[12])
			argsReleases := string(args[13])
			argsCreatedAt := string(args[14])
			argsUpdatedAt := string(args[15])
			argsPushedAt := string(args[16])
			argsStargazers := string(args[17])
			argsArchived := string(args[18])
			argsLicense := string(args[19])
			argsDefaultBranch := string(args[20])
			argsExtensions := string(args[21])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateRepository(clientCtx.GetFromAddress().String(), id, string(argsName), string(argsOwner), string(argsDescription), string(argsForks), string(argsBranches), string(argsTags), string(argsSubscribers), string(argsCommits), string(argsIssuesOpen), string(argsIssuesClosed), string(argsPulls), string(argsLabels), string(argsReleases), string(argsCreatedAt), string(argsUpdatedAt), string(argsPushedAt), string(argsStargazers), string(argsArchived), string(argsLicense), string(argsDefaultBranch), string(argsExtensions))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteRepository() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-repository [id] [name] [owner] [description] [forks] [branches] [tags] [subscribers] [commits] [issuesOpen] [issuesClosed] [pulls] [labels] [releases] [createdAt] [updatedAt] [pushedAt] [stargazers] [archived] [license] [defaultBranch] [extensions]",
		Short: "Delete a repository by id",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteRepository(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
