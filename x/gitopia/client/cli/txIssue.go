package cli

import (
	"strconv"
	"strings"

	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func sliceAtoi(str []string) ([]uint64, error) {
	si := make([]uint64, 0, len(str))
	for _, a := range str {
		i, err := strconv.ParseUint(a, 10, 64)
		if err != nil {
			return si, err
		}
		si = append(si, i)
	}
	return si, nil
}

func CmdCreateIssue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-issue [title] [description] [repositoryId] [labels] [weight] [assigneesId]",
		Short: "Create a new issue",
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
			argsRepositoryId, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}
			argsLabels := strings.Split(args[3], ",")
			argsWeight, err := strconv.ParseUint(args[4], 10, 64)
			if err != nil {
				return err
			}
			argsAssigneesId := strings.Split(args[5], ",")
			assigneesId, err := sliceAtoi(argsAssigneesId)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateIssue(clientCtx.GetFromAddress().String(), string(argsTitle), string(argsDescription), argsRepositoryId, argsLabels, argsWeight, assigneesId)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateIssue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-issue [id] [title] [description] [labels] [weight] [assigneesId]",
		Short: "Update a issue",
		Args:  cobra.ExactArgs(6),
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
			argsLabels := strings.Split(args[3], ",")
			argsWeight, err := strconv.ParseUint(args[4], 10, 64)
			if err != nil {
				return err
			}
			argsAssigneesId := strings.Split(args[5], ",")
			assigneesId, err := sliceAtoi(argsAssigneesId)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateIssue(clientCtx.GetFromAddress().String(), id, string(argsTitle), string(argsDescription), argsLabels, argsWeight, assigneesId)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdToggleIssueState() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "toggle-issue-state [id] [closedBy]",
		Short: "Toggles issue state",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsClosedBy, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgToggleIssueState(clientCtx.GetFromAddress().String(), id, argsClosedBy)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteIssue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-issue [id]",
		Short: "Delete a issue by id",
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

			msg := types.NewMsgDeleteIssue(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
