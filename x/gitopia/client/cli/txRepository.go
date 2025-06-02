package cli

import (
	"strconv"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
)

func CmdCreateRepository() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-repository [name] [ownerId] [description]",
		Short: "Create a new repository",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argName := args[0]
			argOwnerId := args[1]
			argDescription := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateRepository(
				clientCtx.GetFromAddress().String(),
				string(argName),
				argOwnerId,
				string(argDescription),
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

func CmdForkRepository() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "fork-repository [owner-id] [repository-name] [fork-repository-name] [fork-repository-description] [branch] [fork-owner-id] [task-id]",
		Short: "Fork existing repository",
		Args:  cobra.ExactArgs(6),
		RunE: func(cmd *cobra.Command, args []string) error {
			argid := args[0]
			argRepositoryName := args[1]
			argForkRepositoryName := args[2]
			argForkRepositoryDescription := args[3]
			argBranch := args[4]
			argOwnerId := args[5]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgForkRepository(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argid, Name: argRepositoryName},
				argForkRepositoryName,
				argForkRepositoryDescription,
				argBranch,
				argOwnerId,
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

func CmdRenameRepository() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "rename-repository [owner-id] [old-name] [new-name]",
		Short: "Rename repository",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argOwnerId := args[0]
			argRepositoryName := args[1]
			argName := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRenameRepository(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argOwnerId, Name: argRepositoryName},
				string(argName),
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

func CmdUpdateRepositoryDescription() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-repository-description [owner-id] [repository-name] [description]",
		Short: "Update repository description",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argOwnerid := args[0]
			argRepositoryName := args[1]
			argDescription := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateRepositoryDescription(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argOwnerid, Name: argRepositoryName},
				argDescription,
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

func CmdToggleRepositoryArchived() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "toggle-repository-archived [owner-id] [repository-name]",
		Short: "toggle repository archived",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argOwnerid := args[0]
			argRepositoryName := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}
			msg := types.NewMsgToggleRepositoryArchived(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argOwnerid, Name: argRepositoryName},
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

func CmdChangeOwner() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "change-owner [id] [repository-name] [owner-id]",
		Short: "Change Owner of existing repository",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId := args[0]
			argRepositoryName := args[1]
			argOwner := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgChangeOwner(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				argOwner,
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

func CmdUpdateRepositoryCollaborator() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-repository-collaborator [id] [repository-name] [user] [role]",
		Short: "Add repository collaborator",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId := args[0]
			argRepositoryName := args[1]
			argUser := args[2]
			argRole := args[3]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateRepositoryCollaborator(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				argUser,
				argRole,
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

func CmdRemoveRepositoryCollaborator() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "remove-repository-collaborator [id] [repository-name] [user]",
		Short: "Remove repository collaborator",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId := args[0]
			argRepositoryName := args[1]
			argUser := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemoveRepositoryCollaborator(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				argUser,
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

func CmdCreateRepositoryLabel() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-repository-label [id] [repository-name] [label-name] [color] [description]",
		Short: "Create Repository Label",
		Args:  cobra.ExactArgs(5),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId := args[0]
			argRepositoryName := args[1]
			argName := args[2]
			argColor := args[3]
			argDescription := args[4]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateRepositoryLabel(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				argName,
				argColor,
				argDescription,
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

func CmdUpdateRepositoryLabel() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-repository-label [id] [repository-name] [label-id] [name] [color] [description]",
		Short: "Update Repository Label",
		Args:  cobra.ExactArgs(6),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId := args[0]
			argRepositoryName := args[1]

			labelId, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}

			argName := args[3]
			argColor := args[4]
			argDescription := args[5]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateRepositoryLabel(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				labelId,
				argName,
				argColor,
				argDescription,
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

func CmdDeleteRepositoryLabel() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-repository-label [id] [repsitory-name] [label-id]",
		Short: "Delete Repository Label",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId := args[0]
			argRepositoryName := args[1]

			labelId, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteRepositoryLabel(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
				labelId,
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

func CmdToggleRepositoryForking() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "toggle-repository-forking [id] [repository-name]",
		Short: "Toggle repository forking",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId := args[0]
			argRepositoryName := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgToggleRepositoryForking(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
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

func CmdToggleArweaveBackup() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "toggle-arweave-backup [id] [repository-name]",
		Short: "Toggle arweave backup",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId := args[0]
			argRepositoryName := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgToggleArweaveBackup(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
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

func CmdDeleteRepository() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-repository [id] [repository-name]",
		Short: "Delete a repository",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argId := args[0]
			argRepositoryName := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteRepository(
				clientCtx.GetFromAddress().String(),
				types.RepositoryId{Id: argId, Name: argRepositoryName},
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
