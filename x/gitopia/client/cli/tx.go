package cli

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	// "github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

var (
	DefaultRelativePacketTimeoutTimestamp = uint64((time.Duration(10) * time.Minute).Nanoseconds())
)

const (
	flagPacketTimeoutTimestamp = "packet-timeout-timestamp"
)

// GetTxCmd returns the transaction commands for this module
func GetTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("%s transactions subcommands", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	// this line is used by starport scaffolding # 1

	cmd.AddCommand(CmdCreateComment())
	cmd.AddCommand(CmdUpdateComment())
	cmd.AddCommand(CmdDeleteComment())

	cmd.AddCommand(CmdCreateIssue())
	cmd.AddCommand(CmdUpdateIssue())
	cmd.AddCommand(CmdChangeIssueState())
	cmd.AddCommand(CmdDeleteIssue())

	cmd.AddCommand(CmdCreateRepository())
	cmd.AddCommand(CmdUpdateRepository())
	cmd.AddCommand(CmdDeleteRepository())

	cmd.AddCommand(CmdCreateUser())
	cmd.AddCommand(CmdUpdateUser())
	cmd.AddCommand(CmdDeleteUser())

	cmd.AddCommand(CmdCreateWhois())
	cmd.AddCommand(CmdUpdateWhois())
	cmd.AddCommand(CmdDeleteWhois())

	return cmd
}
