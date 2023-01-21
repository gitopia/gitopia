package cli

import (
	"strconv"
	
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdSetBranch() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "set-branch [id] [repository-name] [branch-name] [sha]",
		Short: "Set a branch",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argId := args[0]
			argRepositoryName := args[1]
			argBranchName := args[2]
			argSha := args[3]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgSetBranch(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				types.MsgSetBranch_Branch{Name: argBranchName, Sha: argSha},
			)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdSetDefaultBranch() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "set-default-branch [id] [repository-name] [branch-name]",
		Short: "Set a default branch",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId := args[0]
			argRepositoryName := args[1]
			argBranchName := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgSetDefaultBranch(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				argBranchName,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteBranch() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-branch [id] [repository-name] [branch-name]",
		Short: "Delete repository branch by name",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId := args[0]
			argRepositoryName := args[1]
			argBranchName := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteBranch(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				argBranchName,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdToggleForcePush() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "toggle-force-push [id] [repository-id] [branch-name]",
		Short: "configure restricted push access to branch",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
      		 argId := args[0]
             argRepositoryId := args[1]
             argBranchName := args[2]
            
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgToggleForcePush(
				clientCtx.GetFromAddress().String(),
				argId,
				argRepositoryId,
				argBranchName,
				
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

    return cmd
}