package e2e

import (
	"fmt"
	"time"

	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	"github.com/ory/dockertest/v3"
	"github.com/ory/dockertest/v3/docker"
)

// TestV5ToV6Upgrade tests the upgrade from v5 to v6
func (s *IntegrationTestSuite) TestV5ToV6Upgrade() {
	s.T().Log("Starting v5 to v6 upgrade test")

	// Get current height and calculate upgrade height
	chainAAPIEndpoint := fmt.Sprintf("http://%s", s.valResources[s.chainA.id][0].GetHostPort("1317/tcp"))
	senderAddress, _ := s.chainA.validators[0].keyInfo.GetAddress()
	sender := senderAddress.String()
	height := s.getLatestBlockHeight(s.chainA, 0)
	proposalHeight := height + govProposalBlockBuffer

	// Create and submit software upgrade proposal
	s.writeGovLegProposal(s.chainA, int64(proposalHeight), "v6")

	submitGovFlags := []string{
		"software-upgrade",
		"v6",
		"--title='Upgrade to v6'",
		"--description='Software Upgrade to v6'",
		"--no-validate",
		fmt.Sprintf("--upgrade-height=%d", proposalHeight),
		fmt.Sprintf("--upgrade-info=%s", configFile(proposalCommunitySpendFilename)),
	}

	depositGovFlags := []string{"1", depositAmount.String()}
	voteGovFlags := []string{"1", "yes=0.8,no=0.1,abstain=0.05,no_with_veto=0.05"}
	s.submitLegacyGovProposal(s.chainA, chainAAPIEndpoint, sender, 1, upgradetypes.ProposalTypeSoftwareUpgrade, submitGovFlags, depositGovFlags, voteGovFlags, "weighted-vote", true)

	// Verify chain halts at upgrade height
	s.verifyChainHaltedAtUpgradeHeight(s.chainA, 0, proposalHeight)
	s.T().Logf("Successfully halted chain at height %d", proposalHeight)

	// Stop the v5 containers
	for _, vr := range s.valResources[s.chainA.id] {
		err := s.dkrPool.Purge(vr)
		s.Require().NoError(err)
	}

	// Start new containers with v6 image
	s.T().Log("Starting v6 validators...")
	s.valResources[s.chainA.id] = make([]*dockertest.Resource, len(s.chainA.validators))
	for i, val := range s.chainA.validators {
		runOpts := &dockertest.RunOptions{
			Name:      val.instanceName(),
			NetworkID: s.dkrNet.Network.ID,
			Mounts: []string{
				fmt.Sprintf("%s/:%s", val.configDir(), gitopiaHomePath),
			},
			Repository: "gitopia/gitopiad-e2e", // This should be the v6 image
		}

		// expose the first validator for debugging and communication
		if val.index == 0 {
			portOffset := 10
			runOpts.PortBindings = map[docker.Port][]docker.PortBinding{
				"1317/tcp":  {{HostIP: "", HostPort: fmt.Sprintf("%d", 1317+portOffset)}},
				"6060/tcp":  {{HostIP: "", HostPort: fmt.Sprintf("%d", 6060+portOffset)}},
				"6061/tcp":  {{HostIP: "", HostPort: fmt.Sprintf("%d", 6061+portOffset)}},
				"6062/tcp":  {{HostIP: "", HostPort: fmt.Sprintf("%d", 6062+portOffset)}},
				"6063/tcp":  {{HostIP: "", HostPort: fmt.Sprintf("%d", 6063+portOffset)}},
				"6064/tcp":  {{HostIP: "", HostPort: fmt.Sprintf("%d", 6064+portOffset)}},
				"6065/tcp":  {{HostIP: "", HostPort: fmt.Sprintf("%d", 6065+portOffset)}},
				"9090/tcp":  {{HostIP: "", HostPort: fmt.Sprintf("%d", 9090+portOffset)}},
				"26656/tcp": {{HostIP: "", HostPort: fmt.Sprintf("%d", 26656+portOffset)}},
				"26657/tcp": {{HostIP: "", HostPort: fmt.Sprintf("%d", 26657+portOffset)}},
			}
		}

		resource, err := s.dkrPool.RunWithOptions(runOpts, noRestart)
		s.Require().NoError(err)

		s.valResources[s.chainA.id][i] = resource
		s.T().Logf("started Gitopia v6 validator container: %s", resource.Container.ID)
	}

	// Verify chain is producing blocks after upgrade
	s.Require().Eventually(
		func() bool {
			currentHeight := s.getLatestBlockHeight(s.chainA, 0)
			return currentHeight > proposalHeight
		},
		5*time.Minute,
		time.Second,
		"Chain failed to produce blocks after upgrade",
	)

	s.T().Log("Successfully upgraded to v6 and verified block production")
}
