package cli

import (
	"strconv"

	"github.com/spf13/cobra"

	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
)

func CmdCreateUser() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-user [username] [name] [avatar-url] [bio]",
		Short: "Create a new user",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsUsername, err := cast.ToStringE(args[0])
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
			argsBio, err := cast.ToStringE(args[3])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateUser(clientCtx.GetFromAddress().String(), string(argsUsername), argsName, argsAvatarUrl, argsBio)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateUserUsername() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-user-username [username]",
		Short: "Update user username",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsUsername := string(args[0])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateUserUsername(clientCtx.GetFromAddress().String(), string(argsUsername))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateUserName() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-user-name [name]",
		Short: "Update user name",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsName := string(args[0])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateUserName(clientCtx.GetFromAddress().String(), string(argsName))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateUserBio() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-user-bio [bio]",
		Short: "Update user bio",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsBio := string(args[0])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateUserBio(clientCtx.GetFromAddress().String(), string(argsBio))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateUserAvatar() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-user-avatar [url]",
		Short: "Update user avatar",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsUrl := string(args[0])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateUserAvatar(clientCtx.GetFromAddress().String(), string(argsUrl))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateUserPinnedRepositories() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-user-pinned-repos [repository-id]",
		Short: "Update user pinned repositories",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsRepositoryID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateUserPinnedRepositories(clientCtx.GetFromAddress().String(), argsRepositoryID)
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
		Use:   "delete-user",
		Short: "Delete a user",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteUser(clientCtx.GetFromAddress().String())
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

// func CmdTransferUser() *cobra.Command {
// 	cmd := &cobra.Command{
// 		Use:   "transfer-user [address]",
// 		Short: "Transfer the user to new address",
// 		Args:  cobra.ExactArgs(1),
// 		RunE: func(cmd *cobra.Command, args []string) error {
// 			address := string(args[0])

// 			clientCtx, err := client.GetClientTxContext(cmd)
// 			if err != nil {
// 				return err
// 			}

// 			msg := types.NewMsgTransferUser(clientCtx.GetFromAddress().String(), address)
// 			if err := msg.ValidateBasic(); err != nil {
// 				return err
// 			}
// 			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
// 		},
// 	}

// 	flags.AddTxFlagsToCmd(cmd)

// 	return cmd
// }
