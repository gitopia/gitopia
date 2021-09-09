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

	cmd.AddCommand(CmdCreatePullRequest())
	cmd.AddCommand(CmdUpdatePullRequest())
	cmd.AddCommand(CmdUpdatePullRequestTitle())
	cmd.AddCommand(CmdUpdatePullRequestDescription())
	cmd.AddCommand(CmdSetPullRequestState())
	cmd.AddCommand(CmdDeletePullRequest())

	cmd.AddCommand(CmdCreateOrganization())
	cmd.AddCommand(CmdUpdateOrganizationMember())
	cmd.AddCommand(CmdRemoveOrganizationMember())
	cmd.AddCommand(CmdUpdateOrganization())
	cmd.AddCommand(CmdDeleteOrganization())

	cmd.AddCommand(CmdCreateComment())
	cmd.AddCommand(CmdUpdateComment())
	cmd.AddCommand(CmdDeleteComment())

	cmd.AddCommand(CmdCreateIssue())
	cmd.AddCommand(CmdUpdateIssue())
	cmd.AddCommand(CmdUpdateIssueTitle())
	cmd.AddCommand(CmdUpdateIssueDescription())
	cmd.AddCommand(CmdToggleIssueState())
	cmd.AddCommand(CmdAddIssueAssignees())
	cmd.AddCommand(CmdRemoveIssueAssignees())
	cmd.AddCommand(CmdDeleteIssue())

	cmd.AddCommand(CmdCreateRepository())
	cmd.AddCommand(CmdForkRepository())
	cmd.AddCommand(CmdRenameRepository())
	cmd.AddCommand(CmdChangeOwner())
	cmd.AddCommand(CmdUpdateRepositoryCollaborator())
	cmd.AddCommand(CmdRemoveRepositoryCollaborator())
	cmd.AddCommand(CmdCreateRepositoryLabel())
	cmd.AddCommand(CmdDeleteRepositoryLabel())
	cmd.AddCommand(CmdCreateBranch())
	cmd.AddCommand(CmdSetDefaultBranch())
	cmd.AddCommand(CmdDeleteBranch())
	cmd.AddCommand(CmdCreateTag())
	cmd.AddCommand(CmdDeleteTag())
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
