package cli

import (
	"strconv"
	"strings"

	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	cosmosTypes "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/gitopia/gitopia/v6/x/gitopia/utils"
)

func CmdCreateIssue() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-issue [id] [repository-name] [title] [description] [labels] [weight] [assignees] [bounty-amount] [bounty-expiry]",
		Short: "Create a new issue",
		Args:  cobra.ExactArgs(9),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argRepositoryName, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			argTitle, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}
			argDescription, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}

			var labelIds []uint64
			if args[4] != "" {
				argsLabels := strings.Split(args[4], ",")
				labelIds, err = utils.SliceAtoi(argsLabels)
				if err != nil {
					return err
				}
			}

			argWeight, err := strconv.ParseUint(args[5], 10, 64)
			if err != nil {
				return err
			}
			argAssignees := strings.Split(args[6], ",")
			if len(argAssignees) == 1 && argAssignees[0] == "" {
				argAssignees = nil
			}
			argAmount, err := cosmosTypes.ParseCoinsNormalized(args[7])
			if err != nil {
				return err
			}
			argExpiry, err := strconv.ParseInt(args[8], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateIssue(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				string(argTitle),
				string(argDescription),
				labelIds,
				argWeight,
				argAssignees,
				argAmount,
				argExpiry,
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

func CmdUpdateIssueTitle() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-issue-title [repository-id] [iid] [title]",
		Short: "Update a issue title",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsTitle, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateIssueTitle(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, string(argsTitle))
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
		Use:   "update-issue-description [repository-id] [iid] [description]",
		Short: "Update issue description",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
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

			msg := types.NewMsgUpdateIssueDescription(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, string(argsDescription))
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
		Use:   "toggle-issue-state [repository-id] [iid]",
		Short: "Toggles issue state",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgToggleIssueState(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid)
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
		Use:   "add-issue-assignees [repository-id] [iid] [assignees]",
		Short: "Add issue assignees",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsAssignees := strings.Split(args[2], ",")
			if len(argsAssignees) == 1 && argsAssignees[0] == "" {
				argsAssignees = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddIssueAssignees(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, argsAssignees)
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
		Use:   "remove-issue-assignees [repository-id] [iid] [assignees]",
		Short: "Remove issue assignees",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsAssignees := strings.Split(args[2], ",")
			if len(argsAssignees) == 1 && argsAssignees[0] == "" {
				argsAssignees = nil
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemoveIssueAssignees(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, argsAssignees)
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
		Use:   "add-issue-labels [repository-id] [iid] [labels]",
		Short: "Add issue labels",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsLabels := strings.Split(args[2], ",")
			labelIds, err := utils.SliceAtoi(argsLabels)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddIssueLabels(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, labelIds)
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
		Use:   "remove-issue-labels [repository-id] [iid] [labels]",
		Short: "Remove issue labels",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argsLabels := strings.Split(args[2], ",")
			labelIds, err := utils.SliceAtoi(argsLabels)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemoveIssueLabels(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid, labelIds)
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
		Use:   "delete-issue [repository-id] [iid]",
		Short: "Delete a issue by id",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			argsIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteIssue(clientCtx.GetFromAddress().String(), argsRepositoryId, argsIid)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
