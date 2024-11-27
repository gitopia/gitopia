package cli

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/x/group"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

func CmdCreateDao() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-dao [name] [description] [avatar-url] [location] [website] [voting-period]",
		Short: "Create a new Dao",
		Args:  cobra.ExactArgs(6),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsName, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}
			argsDescription, err := cast.ToStringE(args[1])
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
			argsVotingPeriod, err := cast.ToStringE(args[5])
			argsPercentage, err := cast.ToStringE(args[6])

			membersStr, err := cmd.Flags().GetStringSlice("members")
			if err != nil {
				return err
			}

			var members []group.MemberRequest
			for _, memberStr := range membersStr {
				parts := strings.Split(memberStr, ",")
				if len(parts) != 3 {
					return fmt.Errorf("invalid member format: %s", memberStr)
				}
				member := group.MemberRequest{
					Address:  parts[0],
					Weight:   parts[1],
					Metadata: parts[2],
				}
				members = append(members, member)
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateDao(clientCtx.GetFromAddress().String(), argsName, argsDescription, argsAvatarUrl, argsLocation, argsWebsite, members, argsVotingPeriod, argsPercentage, &types.DaoConfig{})
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdRenameDao() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "rename-dao [id] [name]",
		Short: "Rename dao",
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

			msg := types.NewMsgRenameDao(clientCtx.GetFromAddress().String(), id, string(argsName))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateDaoDescription() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-dao-description [id] [description]",
		Short: "Update dao description",
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

			msg := types.NewMsgUpdateDaoDescription(clientCtx.GetFromAddress().String(), id, argsDescription)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateDaoWebsite() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-dao-website [id] [url]",
		Short: "Update dao website",
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

			msg := types.NewMsgUpdateDaoWebsite(clientCtx.GetFromAddress().String(), id, argsUrl)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateDaoLocation() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-dao-location [id] [location]",
		Short: "Update dao location",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}

			argsLocation, err := cast.ToStringE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateDaoLocation(clientCtx.GetFromAddress().String(), id, argsLocation)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateDaoAvatar() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-dao-avatar [id] [url]",
		Short: "Update dao avatar",
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

			msg := types.NewMsgUpdateDaoAvatar(clientCtx.GetFromAddress().String(), id, argsUrl)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdUpdateDaoPinnedRepositories() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-dao-pinned-repos [id] [repository-id]",
		Short: "Update dao pinned repositories",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := cast.ToStringE(args[0])
			if err != nil {
				return err
			}

			argsRepositoryID, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateDaoPinnedRepositories(clientCtx.GetFromAddress().String(), id, argsRepositoryID)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteDao() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-dao [id]",
		Short: "Delete a dao by id",
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

			msg := types.NewMsgDeleteDao(clientCtx.GetFromAddress().String(), id)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
