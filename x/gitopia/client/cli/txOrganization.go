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

func CmdCreateOrganization() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-organization [name] [avatarUrl] [followers] [following] [repositories] [repositoryNames] [teams] [members] [location] [email] [website] [verified] [description] [createdAt] [updatedAt] [extensions]",
		Short: "Create a new organization",
		Args:  cobra.ExactArgs(16),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsName, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argsAvatarUrl, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}
			argsFollowers, err := cast.ToStringE(args[2])
			if err != nil {
				return err
			}
			argsFollowing, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}
			argsRepositories, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}
			argsRepositoryNames, err := cast.ToStringE(args[5])
			if err != nil {
				return err
			}
			argsTeams, err := cast.ToStringE(args[6])
			if err != nil {
				return err
			}
			argsMembers, err := cast.ToStringE(args[7])
			if err != nil {
				return err
			}
			argsLocation, err := cast.ToStringE(args[8])
			if err != nil {
				return err
			}
			argsEmail, err := cast.ToStringE(args[9])
			if err != nil {
				return err
			}
			argsWebsite, err := cast.ToStringE(args[10])
			if err != nil {
				return err
			}
			argsVerified, err := cast.ToStringE(args[11])
			if err != nil {
				return err
			}
			argsDescription, err := cast.ToStringE(args[12])
			if err != nil {
				return err
			}
			argsCreatedAt, err := cast.ToStringE(args[13])
			if err != nil {
				return err
			}
			argsUpdatedAt, err := cast.ToStringE(args[14])
			if err != nil {
				return err
			}
			argsExtensions, err := cast.ToStringE(args[15])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateOrganization(clientCtx.GetFromAddress().String(), argsName, argsAvatarUrl, argsFollowers, argsFollowing, argsRepositories, argsRepositoryNames, argsTeams, argsMembers, argsLocation, argsEmail, argsWebsite, argsVerified, argsDescription, argsCreatedAt, argsUpdatedAt, argsExtensions)
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
		Use:   "update-organization [id] [name] [avatarUrl] [followers] [following] [repositories] [repositoryNames] [teams] [members] [location] [email] [website] [verified] [description] [createdAt] [updatedAt] [extensions]",
		Short: "Update a organization",
		Args:  cobra.ExactArgs(17),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
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

			argsFollowers, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}

			argsFollowing, err := cast.ToStringE(args[4])
			if err != nil {
				return err
			}

			argsRepositories, err := cast.ToStringE(args[5])
			if err != nil {
				return err
			}

			argsRepositoryNames, err := cast.ToStringE(args[6])
			if err != nil {
				return err
			}

			argsTeams, err := cast.ToStringE(args[7])
			if err != nil {
				return err
			}

			argsMembers, err := cast.ToStringE(args[8])
			if err != nil {
				return err
			}

			argsLocation, err := cast.ToStringE(args[9])
			if err != nil {
				return err
			}

			argsEmail, err := cast.ToStringE(args[10])
			if err != nil {
				return err
			}

			argsWebsite, err := cast.ToStringE(args[11])
			if err != nil {
				return err
			}

			argsVerified, err := cast.ToStringE(args[12])
			if err != nil {
				return err
			}

			argsDescription, err := cast.ToStringE(args[13])
			if err != nil {
				return err
			}

			argsCreatedAt, err := cast.ToStringE(args[14])
			if err != nil {
				return err
			}

			argsUpdatedAt, err := cast.ToStringE(args[15])
			if err != nil {
				return err
			}

			argsExtensions, err := cast.ToStringE(args[16])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateOrganization(clientCtx.GetFromAddress().String(), id, argsName, argsAvatarUrl, argsFollowers, argsFollowing, argsRepositories, argsRepositoryNames, argsTeams, argsMembers, argsLocation, argsEmail, argsWebsite, argsVerified, argsDescription, argsCreatedAt, argsUpdatedAt, argsExtensions)
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
			id, err := strconv.ParseUint(args[0], 10, 64)
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
