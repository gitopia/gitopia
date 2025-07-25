package e2e

import "fmt"

var (
	runBankTest                     = true
	runEncodeTest                   = true
	runEvidenceTest                 = true
	runFeeGrantTest                 = true
	runGovTest                      = true
	runIBCTest                      = true
	runSlashingTest                 = true
	runStakingAndDistributionTest   = true
	runVestingTest                  = true
	runRestInterfacesTest           = true
	runGitopiaTest                  = true
	runGitopiaOsmosisIBCUpgradeTest = false
	runV5ToV6UpgradeTest            = true
)

func (s *IntegrationTestSuite) TestRestInterfaces() {
	if !runRestInterfacesTest {
		s.T().Skip()
	}
	s.testRestInterfaces()
}

func (s *IntegrationTestSuite) TestBank() {
	if !runBankTest {
		s.T().Skip()
	}
	s.testBankTokenTransfer()
}

func (s *IntegrationTestSuite) TestEncode() {
	if !runEncodeTest {
		s.T().Skip()
	}
	s.testEncode()
	s.testDecode()
}

func (s *IntegrationTestSuite) TestEvidence() {
	if !runEvidenceTest {
		s.T().Skip()
	}
	s.testEvidence()
}

func (s *IntegrationTestSuite) TestFeeGrant() {
	if !runFeeGrantTest {
		s.T().Skip()
	}
	s.testFeeGrant()
}

func (s *IntegrationTestSuite) TestGov() {
	if !runGovTest {
		s.T().Skip()
	}
	// stops the chain after halt height
	// resets the testing environment
	s.GovSoftwareUpgrade()

	s.GovCancelSoftwareUpgrade()
	s.GovCommunityPoolSpend()
}

func (s *IntegrationTestSuite) TestIBC() {
	if !runIBCTest {
		s.T().Skip()
	}

	s.testIBCTokenTransfer()
	// s.testMultihopIBCTokenTransfer()
	// s.testFailedMultihopIBCTokenTransfer()
	s.testICARegisterAccountAndSendTx()
}

func (s *IntegrationTestSuite) TestSlashing() {
	if !runSlashingTest {
		s.T().Skip()
	}
	chainAPI := fmt.Sprintf("http://%s", s.valResources[s.chainA.id][0].GetHostPort("1317/tcp"))
	s.testSlashing(chainAPI)
}

// todo add fee test with wrong denom order
func (s *IntegrationTestSuite) TestStakingAndDistribution() {
	if !runStakingAndDistributionTest {
		s.T().Skip()
	}
	s.testStaking()
	s.testDistribution()
}

func (s *IntegrationTestSuite) TestVesting() {
	if !runVestingTest {
		s.T().Skip()
	}
	chainAAPI := fmt.Sprintf("http://%s", s.valResources[s.chainA.id][0].GetHostPort("1317/tcp"))
	s.testDelayedVestingAccount(chainAAPI)
	s.testContinuousVestingAccount(chainAAPI)
	// s.testPeriodicVestingAccount(chainAAPI) TODO: add back when v0.45 adds the missing CLI command.
}

func (s *IntegrationTestSuite) TestChainUpgrade() {
	if !runV5ToV6UpgradeTest {
		s.T().Skip()
	}
	s.TestV5ToV6Upgrade()
}

func (s *IntegrationTestSuite) TestGitopia() {
	if !runGitopiaTest {
		s.T().Skip()
	}
	s.TestGitopiaRepositoryWorkflow()
}

func (s *IntegrationTestSuite) TestGitopiaOsmosisIBC() {
	if !runGitopiaOsmosisIBCUpgradeTest {
		s.T().Skip()
	}
	// s.testIBCOsmosisTokenTransfer()
	s.testGitopiaOsmosisIBCUpgrade()
}
