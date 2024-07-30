package e2e

import (
	"fmt"
	"strconv"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

const ibcDenom = "ibc/4502C6FCE15100B9ABE95AC9B570924C92ADD08F6640926268F62BFAF431DE8B"

func (s *IntegrationTestSuite) testIBCOsmosisTokenTransfer() {
	s.Run("send_ulore_to_chainOsmosis", func() {
		// require the recipient account receives the IBC tokens (IBC packets ACKd)
		var (
			balances      sdk.Coins
			err           error
			beforeBalance int64
			ibcStakeDenom string
		)

		address, _ := s.chainA.validators[0].keyInfo.GetAddress()
		sender := address.String()

		recipient := "osmo1jllfytsz4dryxhz5tl7u73v29exsf80vz52ucc"

		chainOsmosisAPIEndpoint := "http://localhost:1317"

		s.Require().Eventually(
			func() bool {
				balances, err = queryGitopiaAllBalances(chainOsmosisAPIEndpoint, recipient)
				s.Require().NoError(err)
				return balances.Len() != 0
			},
			time.Minute,
			5*time.Second,
		)
		for _, c := range balances {
			if c.Denom == ibcDenom {
				beforeBalance = c.Amount.Int64()
				break
			}
		}

		tokenAmt := 3300000000
		s.sendIBC(s.chainA, 0, sender, recipient, strconv.Itoa(tokenAmt)+uloreDenom, standardFees.String(), "", false)

		pass := s.hermesClearPacket(hermesConfigWithGasPrices, s.chainA.id, transferPort, transferChannel)
		s.Require().True(pass)

		s.Require().Eventually(
			func() bool {
				balances, err = queryGitopiaAllBalances(chainOsmosisAPIEndpoint, recipient)
				s.Require().NoError(err)
				return balances.Len() != 0
			},
			time.Minute,
			5*time.Second,
		)
		for _, c := range balances {
			if c.Denom == ibcDenom {
				ibcStakeDenom = c.Denom
				s.Require().Equal((int64(tokenAmt) + beforeBalance), c.Amount.Int64())
				break
			}
		}

		s.Require().NotEmpty(ibcStakeDenom)
	})
}

func (s *IntegrationTestSuite) testGitopiaOsmosisIBCUpgrade() {
	s.Run("gitopia_osmosis_ibc_upgrade", func() {
		// require the recipient account receives the IBC tokens (IBC packets ACKd)
		var (
			balances      sdk.Coins
			err           error
			beforeBalance int64
			ibcStakeDenom string
		)

		sender := "gitopia18pqef3j8808c8fhq4apcxp72unk74jmjr5zgnt"
		recipient := "osmo1jllfytsz4dryxhz5tl7u73v29exsf80vz52ucc"

		chainCAPIEndpoint := fmt.Sprintf("http://%s", s.valResources[s.chainC.id][0].GetHostPort("1317/tcp"))
		chainOsmosisAPIEndpoint := "http://localhost:1317"

		s.Require().Eventually(
			func() bool {
				balances, err = queryGitopiaAllBalances(chainOsmosisAPIEndpoint, recipient)
				s.Require().NoError(err)
				return balances.Len() != 0
			},
			time.Minute,
			5*time.Second,
		)
		for _, c := range balances {
			if c.Denom == ibcDenom {
				beforeBalance = c.Amount.Int64()
				break
			}
		}

		tokenAmt := 3300000000
		s.sendIBC(s.chainC, 0, sender, recipient, strconv.Itoa(tokenAmt)+uloreDenom, standardFees.String(), "", false)

		pass := s.hermesClearPacket(hermesConfigWithGasPrices, s.chainC.id, transferPort, transferChannel)
		s.Require().True(pass)

		s.Require().Eventually(
			func() bool {
				balances, err = queryGitopiaAllBalances(chainOsmosisAPIEndpoint, recipient)
				s.Require().NoError(err)
				return balances.Len() != 0
			},
			time.Minute,
			5*time.Second,
		)
		for _, c := range balances {
			if c.Denom == ibcDenom {
				ibcStakeDenom = c.Denom
				s.Require().Equal((int64(tokenAmt) + beforeBalance), c.Amount.Int64())
				break
			}
		}

		s.Require().NotEmpty(ibcStakeDenom)

		// software upgrade proposal and stop the chain

		height := s.getLatestBlockHeight(s.chainC, 0)
		proposalHeight := height + govProposalBlockBuffer

		s.writeGovLegProposal(s.chainC, int64(proposalHeight), "v4")

		submitGovFlags := []string{
			"software-upgrade",
			"v4",
			"--title='Upgrade V4'",
			"--description='Software Upgrade'",
			"--no-validate",
			fmt.Sprintf("--upgrade-height=%d", proposalHeight),
			fmt.Sprintf("--upgrade-info=%s", configFile(proposalCommunitySpendFilename)),
		}

		proposalCounter++
		depositGovFlags := []string{strconv.Itoa(proposalCounter), depositAmount.String()}
		voteGovFlags := []string{strconv.Itoa(proposalCounter), "yes"}
		s.submitLegacyGovProposal(s.chainC, chainCAPIEndpoint, sender, proposalCounter, upgradetypes.ProposalTypeSoftwareUpgrade, submitGovFlags, depositGovFlags, voteGovFlags, "vote", true)

		s.verifyChainHaltedAtUpgradeHeight(s.chainC, 0, proposalHeight)
		s.T().Logf("Successfully halted chain at  height %d", proposalHeight)

		s.Require().NoError(s.dkrPool.Purge(s.valResources[s.chainC.id][0]))

		s.T().Logf("Restarting chain %s with v4 binary", s.chainC.id)
		s.runValidatorWithUpgradedBinary(s.chainC, 30, proposalHeight)

		// reset ibc stake denom
		ibcStakeDenom = ""

		beforeBalance += int64(tokenAmt)

		tokenAmt = 5000000000
		s.sendIBC(s.chainC, 0, sender, recipient, strconv.Itoa(tokenAmt)+uloreDenom, standardFees.String(), "", false)

		pass = s.hermesClearPacket(hermesConfigWithGasPrices, s.chainC.id, transferPort, transferChannel)
		s.Require().True(pass)

		s.Require().Eventually(
			func() bool {
				balances, err = queryGitopiaAllBalances(chainOsmosisAPIEndpoint, recipient)
				s.Require().NoError(err)
				return balances.Len() != 0
			},
			time.Minute,
			5*time.Second,
		)
		for _, c := range balances {
			if c.Denom == ibcDenom {
				ibcStakeDenom = c.Denom
				s.Require().Equal((int64(tokenAmt) + beforeBalance), c.Amount.Int64())
				break
			}
		}

		s.Require().NotEmpty(ibcStakeDenom)
	})
}
