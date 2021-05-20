package cli

import (
	"strconv"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func CmdCreateUser() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-user [username]",
		Short: "Creates a new user",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsUsername := string(args[0])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateUser(clientCtx.GetFromAddress().String(), string(argsUsername))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateUser() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-user [id] [username] [usernameGithub] [avatarUrl] [followers] [following] [repositories] [repositories_archived] [organizations] [starred_repos] [subscriptions] [email] [bio] [createdAt] [updatedAt] [extensions]",
		Short: "Update a user",
		Args:  cobra.ExactArgs(16),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			argsUsername := string(args[1])
			argsUsernameGithub := string(args[2])
			argsAvatarUrl := string(args[3])
			argsFollowers := string(args[4])
			argsFollowing := string(args[5])
			argsRepositories := string(args[6])
			argsRepositories_archived := string(args[7])
			argsOrganizations := string(args[8])
			argsStarred_repos := string(args[9])
			argsSubscriptions := string(args[10])
			argsEmail := string(args[11])
			argsBio := string(args[12])
			argsCreatedAt := string(args[13])
			argsUpdatedAt := string(args[14])
			argsExtensions := string(args[15])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateUser(clientCtx.GetFromAddress().String(), id, string(argsUsername), string(argsUsernameGithub), string(argsAvatarUrl), string(argsFollowers), string(argsFollowing), string(argsRepositories), string(argsRepositories_archived), string(argsOrganizations), string(argsStarred_repos), string(argsSubscriptions), string(argsEmail), string(argsBio), string(argsCreatedAt), string(argsUpdatedAt), string(argsExtensions))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteUser() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-user [id] [username] [usernameGithub] [avatarUrl] [followers] [following] [repositories] [repositories_archived] [organizations] [starred_repos] [subscriptions] [email] [bio] [createdAt] [updatedAt] [extensions]",
		Short: "Delete a user by id",
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

			msg := types.NewMsgDeleteUser(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
