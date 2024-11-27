package cli

import (
	"fmt"
	// "strings"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	// "github.com/cosmos/cosmos-sdk/client/flags"
	// sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/gitopia/gitopia/v5/x/gitopia/types"
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

	cmd.AddCommand(CmdListTag())
	cmd.AddCommand(CmdListRepositoryTag())
	cmd.AddCommand(CmdShowRepositoryTag())

	cmd.AddCommand(CmdListDaoMember())

	cmd.AddCommand(CmdListBounty())
	cmd.AddCommand(CmdShowBounty())
	// this line is used by starport scaffolding # 1

	cmd.AddCommand(CmdListRelease())
	cmd.AddCommand(CmdShowRelease())

	cmd.AddCommand(CmdListPullRequest())
	cmd.AddCommand(CmdListRepositoryPullRequest())
	cmd.AddCommand(CmdShowRepositoryPullRequest())

	cmd.AddCommand(CmdListDao())
	cmd.AddCommand(CmdShowDao())

	cmd.AddCommand(CmdListComment())
	cmd.AddCommand(CmdListIssueComment())
	cmd.AddCommand(CmdListPullRequestComment())
	cmd.AddCommand(CmdShowIssueComment())
	cmd.AddCommand(CmdShowPullRequestComment())

	cmd.AddCommand(CmdListIssue())
	cmd.AddCommand(CmdListRepositoryIssue())
	cmd.AddCommand(CmdShowRepositoryIssue())

	cmd.AddCommand(CmdListRepository())
	cmd.AddCommand(CmdShowRepository())

	cmd.AddCommand(CmdListUser())
	cmd.AddCommand(CmdShowUser())

	cmd.AddCommand(CmdListWhois())
	cmd.AddCommand(CmdShowWhois())

	return cmd
}
