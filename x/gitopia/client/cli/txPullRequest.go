package cli

import (
	"strconv"

	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func CmdCreatePullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-pullRequest [title] [description] [headBranch] [headRepoId] [baseBranch] [baseRepoId]",
		Short: "Create a new pullRequest",
		Args:  cobra.ExactArgs(6),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsTitle, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argsDescription, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			argsHeadBranch, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}
			argsHeadRepoId, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return err
			}
			argsBaseBranch, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}
			argsBaseRepoId, err := strconv.ParseUint(args[5], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreatePullRequest(clientCtx.GetFromAddress().String(), argsTitle, argsDescription, argsHeadBranch, argsHeadRepoId, argsBaseBranch, argsBaseRepoId)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdatePullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-pullRequest [id] [title] [description]",
		Short: "Update a pullRequest",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsTitle, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			argsDescription, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdatePullRequest(clientCtx.GetFromAddress().String(), id, argsTitle, argsDescription)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeletePullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-pullRequest [id]",
		Short: "Delete a pullRequest by id",
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

			msg := types.NewMsgDeletePullRequest(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
