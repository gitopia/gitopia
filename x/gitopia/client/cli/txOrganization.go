package cli

import (
	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func CmdCreateOrganization() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-organization [name] [description]",
		Short: "Create a new organization",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsName, err := cast.ToStringE(args[0])
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

			msg := types.NewMsgCreateOrganization(clientCtx.GetFromAddress().String(), argsName, argsDescription)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdRenameOrganization() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "rename-organization [id] [name]",
		Short: "Rename organization",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}

			argsName, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRenameOrganization(clientCtx.GetFromAddress().String(), id, string(argsName))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateOrganizationMember() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-organization-member [id] [user] [role]",
		Short: "Add organization member",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}

			argsUser, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			argsRole, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateOrganizationMember(clientCtx.GetFromAddress().String(), id, argsUser, argsRole)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdRemoveOrganizationMember() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "remove-organization-member [id] [user]",
		Short: "Remove organization member",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}

			argsUser, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRemoveOrganizationMember(clientCtx.GetFromAddress().String(), id, argsUser)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateOrganization() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-organization [id] [name] [avatarUrl] [location] [website] [description]",
		Short: "Update a organization",
		Args:  cobra.ExactArgs(6),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}

			argsName, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			argsAvatarUrl, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}

			argsLocation, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}

			argsWebsite, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}

			argsDescription, err := cast.ToStringE(args[5])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateOrganization(clientCtx.GetFromAddress().String(), id, argsName, argsAvatarUrl, argsLocation, argsWebsite, argsDescription)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateOrganizationDescription() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-organization-description [id] [description]",
		Short: "Update organization description",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := cast.ToStringE(args[0])
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

			msg := types.NewMsgUpdateOrganizationDescription(clientCtx.GetFromAddress().String(), id, argsDescription)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateOrganizationAvatar() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-organization-avatar [id] [url]",
		Short: "Update organization avatar",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}

			argsUrl, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateOrganizationAvatar(clientCtx.GetFromAddress().String(), id, argsUrl)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteOrganization() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-organization [id]",
		Short: "Delete a organization by id",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteOrganization(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
