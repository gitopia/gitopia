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
	"github.com/gitopia/gitopia/x/gitopia/utils"
)

func CmdCreateIssue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-issue [title] [description] [repositoryId] [labels] [weight] [assignees]",
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
			labelIds, err := utils.SliceAtoi(argsLabels)
			if err != nil {
				return err
			}
			argsWeight, err := strconv.ParseUint(args[4], 10, 64)
			if err != nil {
				return err
			}
			argsAssignees := strings.Split(args[5], ",")
			if len(argsAssignees) == 1 && argsAssignees[0] == "" {
				argsAssignees = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateIssue(clientCtx.GetFromAddress().String(), string(argsTitle), string(argsDescription), argsRepositoryId, labelIds, argsWeight, argsAssignees)
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
		Use:   "update-issue [id] [title] [description] [weight] [assignees]",
		Short: "Update a issue",
		Args:  cobra.ExactArgs(5),
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
			argsWeight, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return err
			}
			argsAssignees := strings.Split(args[4], ",")

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateIssue(clientCtx.GetFromAddress().String(), id, string(argsTitle), string(argsDescription), argsWeight, argsAssignees)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateIssueTitle() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-issue-title [id] [title]",
		Short: "Update a issue title",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsTitle, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateIssueTitle(clientCtx.GetFromAddress().String(), id, string(argsTitle))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateIssueDescription() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-issue-description [id] [description]",
		Short: "Update issue description",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsDescription, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateIssueDescription(clientCtx.GetFromAddress().String(), id, string(argsDescription))
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
		Use:   "toggle-issue-state [id]",
		Short: "Toggles issue state",
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

			msg := types.NewMsgToggleIssueState(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdAddIssueAssignees() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-issue-assignees [id] [assignees]",
		Short: "Add issue assignees",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsAssignees := strings.Split(args[1], ",")
			if len(argsAssignees) == 1 && argsAssignees[0] == "" {
				argsAssignees = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddIssueAssignees(clientCtx.GetFromAddress().String(), id, argsAssignees)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdRemoveIssueAssignees() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "remove-issue-assignees [id] [assignees]",
		Short: "Remove issue assignees",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsAssignees := strings.Split(args[1], ",")
			if len(argsAssignees) == 1 && argsAssignees[0] == "" {
				argsAssignees = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemoveIssueAssignees(clientCtx.GetFromAddress().String(), id, argsAssignees)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdAddIssueLabels() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-issue-labels [id] [labels]",
		Short: "Add issue labels",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsLabels := strings.Split(args[1], ",")
			labelIds, err := utils.SliceAtoi(argsLabels)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddIssueLabels(clientCtx.GetFromAddress().String(), id, labelIds)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdRemoveIssueLabels() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "remove-issue-labels [id] [labels]",
		Short: "Remove issue labels",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsLabels := strings.Split(args[1], ",")
			labelIds, err := utils.SliceAtoi(argsLabels)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemoveIssueLabels(clientCtx.GetFromAddress().String(), id, labelIds)
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
