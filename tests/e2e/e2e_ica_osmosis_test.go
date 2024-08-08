package e2e

import (
	"fmt"
	"time"

	"github.com/cosmos/gogoproto/proto"
	icatypes "github.com/cosmos/ibc-go/v7/modules/apps/27-interchain-accounts/types"

	"cosmossdk.io/math"

	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
)

func (s *IntegrationTestSuite) testICAOsmosisRegisterAccountAndSendTx() {
	s.Run("register_ICA_account_and_send_tx_to_osmosis", func() {
		var (
			icaAccount             string
			recipientBalances      sdk.Coins
			recipientBalanceBefore int64
			err                    error
		)

		address, _ := s.chainC.validators[0].keyInfo.GetAddress()
		icaOwnerAccount := address.String()
		icaOwnerPortID, _ := icatypes.NewControllerPortID(icaOwnerAccount)

		chainCAPIEndpoint := fmt.Sprintf("http://%s", s.valResources[s.chainC.id][0].GetHostPort("1317/tcp"))
		chainOsmosisAPIEndpoint := "http://localhost:1317"

		s.registerICAAccount(s.chainC, 0, icaOwnerAccount, connectionID, standardFees.String())
		s.completeChannelHandshakeFromTry(
			s.hermesOsmosisResource,
			s.chainC.id, "localosmosis",
			connectionID, connectionID,
			icaOwnerPortID, icatypes.HostPortID,
			icaChannel, icaChannel)

		s.Require().Eventually(
			func() bool {
				icaAccount, _ = queryICAAccountAddress(chainCAPIEndpoint, icaOwnerAccount, connectionID)
				return icaAccount != ""
			},
			time.Minute,
			5*time.Second,
		)

		s.T().Logf("Interchain Account address: %s", icaAccount)

		recipient := "osmo1jllfytsz4dryxhz5tl7u73v29exsf80vz52ucc"

		s.Require().Eventually(
			func() bool {
				recipientBalances, err = queryGitopiaAllBalances(chainOsmosisAPIEndpoint, recipient)
				s.Require().NoError(err)
				return recipientBalances.Len() != 0
			},
			time.Minute,
			5*time.Second,
		)
		for _, c := range recipientBalances {
			if c.Denom == "uosmo" {
				recipientBalanceBefore = c.Amount.Int64()
				break
			}
		}

		config := sdk.GetConfig()
		config.SetBech32PrefixForAccount("osmo", "pub")

		amountToICASend := int64(1000000000)
		bankSendMsg := banktypes.NewMsgSend(
			sdk.MustAccAddressFromBech32(icaAccount),
			sdk.MustAccAddressFromBech32(recipient),
			sdk.NewCoins(sdk.NewCoin("uosmo", math.NewInt(amountToICASend))))

		s.buildICASendTransactionFile(cdc, []proto.Message{bankSendMsg}, s.chainC.validators[0].configDir())
		s.sendICATransaction(s.chainC, 0, icaOwnerAccount, connectionID, configFile(ICASendTransactionFileName), standardFees.String())
		s.Require().True(s.hermesClearPacket(s.hermesOsmosisResource, hermesConfigWithGasPrices, s.chainC.id, icaOwnerPortID, icaChannel))

		s.Require().Eventually(
			func() bool {
				recipientBalances, err = queryGitopiaAllBalances(chainOsmosisAPIEndpoint, recipient)
				s.Require().NoError(err)
				return recipientBalances.Len() != 0
			},
			time.Minute,
			5*time.Second,
		)

		for _, c := range recipientBalances {
			if c.Denom == "uosmo" {
				s.Require().Equal(recipientBalanceBefore+amountToICASend, c.Amount.Int64())
				break
			}
		}
	})
}
