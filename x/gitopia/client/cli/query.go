package cli

import (
	"fmt"
	// "strings"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	// "github.com/cosmos/cosmos-sdk/client/flags"
	// sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd(queryRoute string) *cobra.Command {
	// Group gitopia queries under a subcommand
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(CmdListTask())
	cmd.AddCommand(CmdShowTask())

	cmd.AddCommand(CmdListBranch())
	cmd.AddCommand(CmdListRepositoryBranch())
	cmd.AddCommand(CmdShowRepositoryBranch())

	// this line is used by starport scaffolding # 1

	cmd.AddCommand(CmdListRelease())
	cmd.AddCommand(CmdShowRelease())

	cmd.AddCommand(CmdListPullRequest())
	cmd.AddCommand(CmdShowPullRequest())

	cmd.AddCommand(CmdListOrganization())
	cmd.AddCommand(CmdShowOrganization())

	cmd.AddCommand(CmdListComment())
	cmd.AddCommand(CmdShowComment())

	cmd.AddCommand(CmdListIssue())
	cmd.AddCommand(CmdShowIssue())

	cmd.AddCommand(CmdListRepository())
	cmd.AddCommand(CmdShowRepository())

	cmd.AddCommand(CmdListBranch())

	cmd.AddCommand(CmdListUser())
	cmd.AddCommand(CmdShowUser())

	cmd.AddCommand(CmdListWhois())
	cmd.AddCommand(CmdShowWhois())

	return cmd
}
