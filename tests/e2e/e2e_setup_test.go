package e2e

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strconv"
	"strings"
	"testing"
	"time"

	"github.com/ory/dockertest/v3"
	// "github.com/cosmos/cosmos-sdk/crypto/hd"
	// "github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/ory/dockertest/v3/docker"
	"github.com/spf13/viper"
	"github.com/stretchr/testify/suite"

	tmconfig "github.com/cometbft/cometbft/config"
	"github.com/cometbft/cometbft/crypto/ed25519"
	tmjson "github.com/cometbft/cometbft/libs/json"
	rpchttp "github.com/cometbft/cometbft/rpc/client/http"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/server"
	srvconfig "github.com/cosmos/cosmos-sdk/server/config"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	authvesting "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	evidencetypes "github.com/cosmos/cosmos-sdk/x/evidence/types"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"

	"github.com/gitopia/gitopia/v6/app/params"
)

const (
	gitopiadBinary  = "gitopiad"
	txCommand       = "tx"
	queryCommand    = "query"
	keysCommand     = "keys"
	gitopiaHomePath = "/root/.gitopia"
	uloreDenom      = params.BaseCoinUnit
	stakeDenom      = params.BaseCoinUnit
	initBalanceStr  = "100000000000000000ulore"
	minGasPrice     = "0.001"
	// the test basefee in genesis is the same as minGasPrice
	// global fee lower/higher than min_gas_price
	initialBaseFeeAmt               = "0.001"
	gas                             = 200000
	govProposalBlockBuffer          = 75
	relayerAccountIndexHermes       = 0
	numberOfEvidences               = 10
	slashingShares            int64 = 10000

	proposalMaxTotalBypassFilename   = "proposal_max_total_bypass.json"
	proposalCommunitySpendFilename   = "proposal_community_spend.json"
	proposalLSMParamUpdateFilename   = "proposal_lsm_param_update.json"
	proposalBlocksPerEpochFilename   = "proposal_blocks_per_epoch.json"
	proposalFailExpedited            = "proposal_fail_expedited.json"
	proposalExpeditedSoftwareUpgrade = "proposal_expedited_software_upgrade.json"

	// proposalAddConsumerChainFilename    = "proposal_add_consumer.json"
	// proposalRemoveConsumerChainFilename = "proposal_remove_consumer.json"

	hermesBinary              = "hermes"
	hermesConfigWithGasPrices = "/root/.hermes/config.toml"
	hermesConfigNoGasPrices   = "/root/.hermes/config-zero.toml"
	transferPort              = "transfer"
	transferChannel           = "channel-0"

	govAuthority = "gitopia10d07y265gmmuvt4z0w9aw880jnsr700jy65jes"
)

var (
	gaiaConfigPath    = filepath.Join(gitopiaHomePath, "config")
	stakingAmount     = sdk.NewInt(100000000000)
	stakingAmountCoin = sdk.NewCoin(uloreDenom, stakingAmount)
	tokenAmount       = sdk.NewCoin(uloreDenom, sdk.NewInt(3300000000)) // 3,300lore
	standardFees      = sdk.NewCoin(uloreDenom, sdk.NewInt(330000))     // 0.33ulore
	depositAmount     = sdk.NewCoin(uloreDenom, sdk.NewInt(10000000))   // 10lore
	distModuleAddress = authtypes.NewModuleAddress(distrtypes.ModuleName).String()
	govModuleAddress  = authtypes.NewModuleAddress(govtypes.ModuleName).String()
	proposalCounter   = 0
	gasPrices         = "0.001ulore"
)

type IntegrationTestSuite struct {
	suite.Suite

	tmpDirs               []string
	chainA                *chain
	chainB                *chain
	chainC                *chain
	dkrPool               *dockertest.Pool
	dkrNet                *dockertest.Network
	hermesResource        *dockertest.Resource
	hermesOsmosisResource *dockertest.Resource

	valResources map[string][]*dockertest.Resource
}

type AddressResponse struct {
	Name     string `json:"name"`
	Type     string `json:"type"`
	Address  string `json:"address"`
	Mnemonic string `json:"mnemonic"`
}

func TestIntegrationTestSuite(t *testing.T) {
	suite.Run(t, new(IntegrationTestSuite))
}

func (s *IntegrationTestSuite) SetupSuite() {
	s.T().Log("setting up e2e integration test suite...")

	var err error
	s.chainA, err = newChain()
	s.Require().NoError(err)

	s.chainB, err = newChain()
	s.Require().NoError(err)

	s.chainC, err = newChain()
	s.Require().NoError(err)

	s.dkrPool, err = dockertest.NewPool("")
	s.Require().NoError(err)

	s.dkrNet, err = s.dkrPool.CreateNetwork(fmt.Sprintf("%s-%s-testnet", s.chainA.id, s.chainB.id))
	s.Require().NoError(err)

	s.valResources = make(map[string][]*dockertest.Resource)
	s.valResources["storage"] = make([]*dockertest.Resource, 6) // 2 providers * 3 services each

	vestingMnemonic, err := createMnemonic()
	s.Require().NoError(err)

	jailedValMnemonic, err := createMnemonic()
	s.Require().NoError(err)

	// The bootstrapping phase is as follows:
	//
	// 1. Initialize Gaia validator nodes.
	// 2. Create and initialize Gaia validator genesis files (both chains)
	// 3. Start both networks.
	// 4. Create and run IBC relayer (Hermes) containers.
	// 5. Start storage providers.

	s.T().Logf("starting e2e infrastructure for chain A; chain-id: %s; datadir: %s", s.chainA.id, s.chainA.dataDir)
	s.initNodes(s.chainA)
	s.initGenesis(s.chainA, vestingMnemonic, jailedValMnemonic)
	s.initValidatorConfigs(s.chainA)
	s.runValidators(s.chainA, 10)

	// s.T().Logf("starting e2e infrastructure for chain B; chain-id: %s; datadir: %s", s.chainB.id, s.chainB.dataDir)
	// s.initNodes(s.chainB)
	// s.initGenesis(s.chainB, vestingMnemonic, jailedValMnemonic)
	// s.initValidatorConfigs(s.chainB)
	// s.runValidators(s.chainB, 20)

	// time.Sleep(10 * time.Second)
	// s.runIBCRelayer()

	// Start storage providers
	s.runStorageProviders()

	// s.T().Logf("starting e2e infrastructure for chain C; chain-id: %s; datadir: %s", s.chainB.id, s.chainB.dataDir)
	// s.initV3Nodes(s.chainC)
	// s.createGenTxFiles(s.chainC)
	// s.initValidatorConfigs(s.chainC)
	// s.runGitopiaV3(s.chainC, 30)

	// s.connectOsmosisValidator()

	// s.runGitopiaOsmosisIBCRelayer(s.chainC)
}

func (s *IntegrationTestSuite) TearDownSuite() {
	if str := os.Getenv("GITOPIA_E2E_SKIP_CLEANUP"); len(str) > 0 {
		skipCleanup, err := strconv.ParseBool(str)
		s.Require().NoError(err)

		if skipCleanup {
			return
		}
	}

	s.T().Log("tearing down e2e integration test suite...")

	s.Require().NoError(s.dkrPool.Purge(s.hermesResource))
	s.Require().NoError(s.dkrPool.Purge(s.hermesOsmosisResource))

	for _, vr := range s.valResources {
		for _, r := range vr {
			s.Require().NoError(s.dkrPool.Purge(r))
		}
	}

	// remove osmosis validator from network
	s.dkrPool.Client.DisconnectNetwork(s.dkrNet.Network.ID, docker.NetworkConnectionOptions{
		Container: "localosmosis-osmosisd-1",
	})

	s.Require().NoError(s.dkrPool.RemoveNetwork(s.dkrNet))

	os.RemoveAll(s.chainA.dataDir)
	os.RemoveAll(s.chainB.dataDir)
	os.RemoveAll(s.chainC.dataDir)

	for _, td := range s.tmpDirs {
		os.RemoveAll(td)
	}
}

func (s *IntegrationTestSuite) initNodes(c *chain) {
	s.Require().NoError(c.createAndInitValidators(2))
	/* Adding 4 accounts to val0 local directory
	c.genesisAccounts[0]: Relayer Account
	c.genesisAccounts[1]: ICA Owner
	c.genesisAccounts[2]: Test Account 1
	c.genesisAccounts[3]: Test Account 2
	*/
	s.Require().NoError(c.addAccountFromMnemonic(5))
	// Initialize a genesis file for the first validator
	val0ConfigDir := c.validators[0].configDir()
	var addrAll []sdk.AccAddress
	for _, val := range c.validators {
		addr, err := val.keyInfo.GetAddress()
		s.Require().NoError(err)
		addrAll = append(addrAll, addr)
	}

	for _, addr := range c.genesisAccounts {
		acctAddr, err := addr.keyInfo.GetAddress()
		s.Require().NoError(err)
		addrAll = append(addrAll, acctAddr)
	}

	// Add Git server addresses
	gitServerAddr1, err := sdk.AccAddressFromBech32("gitopia1jnq4pk0ene8xne4a43p2a2xpdhf3jqgsgu04n9")
	s.Require().NoError(err)
	gitServerAddr2, err := sdk.AccAddressFromBech32("gitopia1yp9um722xlywmjc0mc0x9jv06vw9t7l4lkgj8v")
	s.Require().NoError(err)
	addrAll = append(addrAll, gitServerAddr1, gitServerAddr2)

	s.Require().NoError(
		modifyGenesis(val0ConfigDir, "", initBalanceStr, addrAll, initialBaseFeeAmt, uloreDenom),
	)
	// copy the genesis file to the remaining validators
	for _, val := range c.validators[1:] {
		_, err := copyFile(
			filepath.Join(val0ConfigDir, "config", "genesis.json"),
			filepath.Join(val.configDir(), "config", "genesis.json"),
		)
		s.Require().NoError(err)
	}
}

func (s *IntegrationTestSuite) initV3Nodes(c *chain) {
	s.Require().NoError(c.createAndInitValidators(2))
	/* Adding 4 accounts to val0 local directory
	c.genesisAccounts[0]: Relayer Account
	c.genesisAccounts[1]: ICA Owner
	c.genesisAccounts[2]: Test Account 1
	c.genesisAccounts[3]: Test Account 2
	*/
	s.Require().NoError(c.addAccountFromMnemonic(5))
}

func (s *IntegrationTestSuite) createGenTxFiles(c *chain) {
	for i, val := range c.validators {
		createValmsg, err := val.buildCreateValidatorMsg(stakingAmountCoin)
		s.Require().NoError(err)
		signedTx, err := val.signMsg(createValmsg)

		s.Require().NoError(err)

		txRaw, err := cdc.MarshalJSON(signedTx)
		s.Require().NoError(err)

		err = os.MkdirAll(filepath.Join(val.configDir(), "config", "gentx"), 0755)
		s.Require().NoError(err)

		genTxFile := filepath.Join(val.configDir(), "config", "gentx", "gentx-"+strconv.Itoa(i)+".json")
		err = os.WriteFile(genTxFile, txRaw, 0644)
		s.Require().NoError(err)
	}

	// copy the gentx files
	_, err := copyFile(
		filepath.Join(c.validators[0].configDir(), "config", "gentx", "gentx-0.json"),
		filepath.Join(c.validators[1].configDir(), "config", "gentx", "gentx-0.json"),
	)
	s.Require().NoError(err)
	_, err = copyFile(
		filepath.Join(c.validators[1].configDir(), "config", "gentx", "gentx-1.json"),
		filepath.Join(c.validators[0].configDir(), "config", "gentx", "gentx-1.json"),
	)
	s.Require().NoError(err)
}

// TODO find a better way to manipulate accounts to add genesis accounts
func (s *IntegrationTestSuite) addGenesisVestingAndJailedAccounts(
	c *chain,
	valConfigDir,
	vestingMnemonic,
	jailedValMnemonic string,
	appGenState map[string]json.RawMessage,
) map[string]json.RawMessage {
	var (
		authGenState    = authtypes.GetGenesisStateFromAppState(cdc, appGenState)
		bankGenState    = banktypes.GetGenesisStateFromAppState(cdc, appGenState)
		stakingGenState = stakingtypes.GetGenesisStateFromAppState(cdc, appGenState)
	)

	// create genesis vesting accounts keys
	kb, err := keyring.New(keyringAppName, keyring.BackendTest, valConfigDir, nil, cdc)
	s.Require().NoError(err)

	keyringAlgos, _ := kb.SupportedAlgorithms()
	algo, err := keyring.NewSigningAlgoFromString(string(hd.Secp256k1Type), keyringAlgos)
	s.Require().NoError(err)

	// create jailed validator account keys
	jailedValKey, err := kb.NewAccount(jailedValidatorKey, jailedValMnemonic, "", sdk.FullFundraiserPath, algo)
	s.Require().NoError(err)

	// create genesis vesting accounts keys
	c.genesisVestingAccounts = make(map[string]sdk.AccAddress)
	for i, key := range genesisVestingKeys {
		// Use the first wallet from the same mnemonic by HD path
		acc, err := kb.NewAccount(key, vestingMnemonic, "", HDPath(i), algo)
		s.Require().NoError(err)
		c.genesisVestingAccounts[key], err = acc.GetAddress()
		s.Require().NoError(err)
		s.T().Logf("created %s genesis account %s\n", key, c.genesisVestingAccounts[key].String())
	}
	var (
		continuousVestingAcc = c.genesisVestingAccounts[continuousVestingKey]
		delayedVestingAcc    = c.genesisVestingAccounts[delayedVestingKey]
	)

	// add jailed validator to staking store
	pubKey, err := jailedValKey.GetPubKey()
	s.Require().NoError(err)

	jailedValAcc, err := jailedValKey.GetAddress()
	s.Require().NoError(err)

	jailedValAddr := sdk.ValAddress(jailedValAcc)
	val, err := stakingtypes.NewValidator(
		jailedValAddr,
		pubKey,
		stakingtypes.NewDescription("jailed", "", "", "", ""),
	)
	s.Require().NoError(err)
	val.Jailed = true
	val.Tokens = sdk.NewInt(slashingShares)
	val.DelegatorShares = sdk.NewDec(slashingShares)
	stakingGenState.Validators = append(stakingGenState.Validators, val)

	// add jailed validator delegations
	stakingGenState.Delegations = append(stakingGenState.Delegations, stakingtypes.Delegation{
		DelegatorAddress: jailedValAcc.String(),
		ValidatorAddress: jailedValAddr.String(),
		Shares:           sdk.NewDec(slashingShares),
	})

	appGenState[stakingtypes.ModuleName], err = cdc.MarshalJSON(stakingGenState)
	s.Require().NoError(err)

	// add jailed account to the genesis
	baseJailedAccount := authtypes.NewBaseAccount(jailedValAcc, pubKey, 0, 0)
	s.Require().NoError(baseJailedAccount.Validate())

	// add continuous vesting account to the genesis
	baseVestingContinuousAccount := authtypes.NewBaseAccount(
		continuousVestingAcc, nil, 0, 0)
	vestingContinuousGenAccount := authvesting.NewContinuousVestingAccountRaw(
		authvesting.NewBaseVestingAccount(
			baseVestingContinuousAccount,
			sdk.NewCoins(vestingAmountVested),
			time.Now().Add(time.Duration(rand.Intn(80)+150)*time.Second).Unix(),
		),
		time.Now().Add(time.Duration(rand.Intn(40)+90)*time.Second).Unix(),
	)
	s.Require().NoError(vestingContinuousGenAccount.Validate())

	// add delayed vesting account to the genesis
	baseVestingDelayedAccount := authtypes.NewBaseAccount(
		delayedVestingAcc, nil, 0, 0)
	vestingDelayedGenAccount := authvesting.NewDelayedVestingAccountRaw(
		authvesting.NewBaseVestingAccount(
			baseVestingDelayedAccount,
			sdk.NewCoins(vestingAmountVested),
			time.Now().Add(time.Duration(rand.Intn(40)+90)*time.Second).Unix(),
		),
	)
	s.Require().NoError(vestingDelayedGenAccount.Validate())

	// unpack and append accounts
	accs, err := authtypes.UnpackAccounts(authGenState.Accounts)
	s.Require().NoError(err)
	accs = append(accs, vestingContinuousGenAccount, vestingDelayedGenAccount, baseJailedAccount)
	accs = authtypes.SanitizeGenesisAccounts(accs)
	genAccs, err := authtypes.PackAccounts(accs)
	s.Require().NoError(err)
	authGenState.Accounts = genAccs

	// update auth module state
	appGenState[authtypes.ModuleName], err = cdc.MarshalJSON(&authGenState)
	s.Require().NoError(err)

	// update balances
	vestingContinuousBalances := banktypes.Balance{
		Address: continuousVestingAcc.String(),
		Coins:   vestingBalance,
	}
	vestingDelayedBalances := banktypes.Balance{
		Address: delayedVestingAcc.String(),
		Coins:   vestingBalance,
	}
	jailedValidatorBalances := banktypes.Balance{
		Address: jailedValAcc.String(),
		Coins:   sdk.NewCoins(tokenAmount),
	}
	stakingModuleBalances := banktypes.Balance{
		Address: authtypes.NewModuleAddress(stakingtypes.NotBondedPoolName).String(),
		Coins:   sdk.NewCoins(sdk.NewCoin(uloreDenom, sdk.NewInt(slashingShares))),
	}
	bankGenState.Balances = append(
		bankGenState.Balances,
		vestingContinuousBalances,
		vestingDelayedBalances,
		jailedValidatorBalances,
		stakingModuleBalances,
	)
	bankGenState.Balances = banktypes.SanitizeGenesisBalances(bankGenState.Balances)

	// update the denom metadata for the bank module
	bankGenState.DenomMetadata = append(bankGenState.DenomMetadata, banktypes.Metadata{
		Description: "An example stable token",
		Display:     uloreDenom,
		Base:        uloreDenom,
		Symbol:      uloreDenom,
		Name:        uloreDenom,
		DenomUnits: []*banktypes.DenomUnit{
			{
				Denom:    uloreDenom,
				Exponent: 0,
			},
		},
	})

	// update bank module state
	appGenState[banktypes.ModuleName], err = cdc.MarshalJSON(bankGenState)
	s.Require().NoError(err)

	return appGenState
}

func (s *IntegrationTestSuite) initGenesis(c *chain, vestingMnemonic, jailedValMnemonic string) {
	var (
		serverCtx = server.NewDefaultContext()
		config    = serverCtx.Config
		validator = c.validators[0]
	)

	config.SetRoot(validator.configDir())
	config.Moniker = validator.moniker

	genFilePath := config.GenesisFile()
	appGenState, genDoc, err := genutiltypes.GenesisStateFromGenFile(genFilePath)
	s.Require().NoError(err)

	appGenState = s.addGenesisVestingAndJailedAccounts(
		c,
		validator.configDir(),
		vestingMnemonic,
		jailedValMnemonic,
		appGenState,
	)

	var evidenceGenState evidencetypes.GenesisState
	s.Require().NoError(cdc.UnmarshalJSON(appGenState[evidencetypes.ModuleName], &evidenceGenState))

	evidenceGenState.Evidence = make([]*codectypes.Any, numberOfEvidences)
	for i := range evidenceGenState.Evidence {
		pk := ed25519.GenPrivKey()
		evidence := &evidencetypes.Equivocation{
			Height:           1,
			Power:            100,
			Time:             time.Now().UTC(),
			ConsensusAddress: sdk.ConsAddress(pk.PubKey().Address().Bytes()).String(),
		}
		evidenceGenState.Evidence[i], err = codectypes.NewAnyWithValue(evidence)
		s.Require().NoError(err)
	}

	appGenState[evidencetypes.ModuleName], err = cdc.MarshalJSON(&evidenceGenState)
	s.Require().NoError(err)

	var genUtilGenState genutiltypes.GenesisState
	s.Require().NoError(cdc.UnmarshalJSON(appGenState[genutiltypes.ModuleName], &genUtilGenState))

	// generate genesis txs
	genTxs := make([]json.RawMessage, len(c.validators))
	for i, val := range c.validators {
		createValmsg, err := val.buildCreateValidatorMsg(stakingAmountCoin)
		s.Require().NoError(err)
		signedTx, err := val.signMsg(createValmsg)

		s.Require().NoError(err)

		txRaw, err := cdc.MarshalJSON(signedTx)
		s.Require().NoError(err)

		genTxs[i] = txRaw
	}

	genUtilGenState.GenTxs = genTxs

	appGenState[genutiltypes.ModuleName], err = cdc.MarshalJSON(&genUtilGenState)
	s.Require().NoError(err)

	genDoc.AppState, err = json.MarshalIndent(appGenState, "", "  ")
	s.Require().NoError(err)

	bz, err := tmjson.MarshalIndent(genDoc, "", "  ")
	s.Require().NoError(err)

	vestingPeriod, err := generateVestingPeriod()
	s.Require().NoError(err)

	rawTx, _, err := buildRawTx()
	s.Require().NoError(err)

	// write the updated genesis file to each validator.
	for _, val := range c.validators {
		err = writeFile(filepath.Join(val.configDir(), "config", "genesis.json"), bz)
		s.Require().NoError(err)

		err = writeFile(filepath.Join(val.configDir(), vestingPeriodFile), vestingPeriod)
		s.Require().NoError(err)

		err = writeFile(filepath.Join(val.configDir(), rawTxFile), rawTx)
		s.Require().NoError(err)
	}
}

// initValidatorConfigs initializes the validator configs for the given chain.
func (s *IntegrationTestSuite) initValidatorConfigs(c *chain) {
	for i, val := range c.validators {
		tmCfgPath := filepath.Join(val.configDir(), "config", "config.toml")

		vpr := viper.New()
		vpr.SetConfigFile(tmCfgPath)
		s.Require().NoError(vpr.ReadInConfig())

		valConfig := tmconfig.DefaultConfig()

		s.Require().NoError(vpr.Unmarshal(valConfig))

		valConfig.P2P.ListenAddress = "tcp://0.0.0.0:26656"
		valConfig.P2P.AddrBookStrict = false
		valConfig.P2P.ExternalAddress = fmt.Sprintf("%s:%d", val.instanceName(), 26656)
		valConfig.RPC.ListenAddress = "tcp://0.0.0.0:26657"
		valConfig.StateSync.Enable = false
		valConfig.LogLevel = "info"

		var peers []string

		for j := 0; j < len(c.validators); j++ {
			if i == j {
				continue
			}

			peer := c.validators[j]
			peerID := fmt.Sprintf("%s@%s%d:26656", peer.nodeKey.ID(), peer.moniker, j)
			peers = append(peers, peerID)
		}

		valConfig.P2P.PersistentPeers = strings.Join(peers, ",")

		tmconfig.WriteConfigFile(tmCfgPath, valConfig)

		// set application configuration
		appCfgPath := filepath.Join(val.configDir(), "config", "app.toml")

		appConfig := srvconfig.DefaultConfig()
		appConfig.API.Enable = true
		appConfig.API.Address = "tcp://0.0.0.0:1317"
		appConfig.MinGasPrices = fmt.Sprintf("%s%s", minGasPrice, uloreDenom)
		appConfig.GRPC.Address = "0.0.0.0:9090"

		srvconfig.SetConfigTemplate(srvconfig.DefaultConfigTemplate)
		srvconfig.WriteConfigFile(appCfgPath, appConfig)
	}
}

// runValidators runs the validators in the chain
func (s *IntegrationTestSuite) runValidators(c *chain, portOffset int) {
	s.T().Logf("starting Gitopia %s validator containers...", c.id)

	s.valResources[c.id] = make([]*dockertest.Resource, len(c.validators))
	for i, val := range c.validators {
		runOpts := &dockertest.RunOptions{
			Name:      val.instanceName(),
			NetworkID: s.dkrNet.Network.ID,
			Mounts: []string{
				fmt.Sprintf("%s/:%s", val.configDir(), gitopiaHomePath),
			},
			Repository: "gitopia/gitopiad-e2e",
		}

		s.Require().NoError(exec.Command("chmod", "-R", "0777", val.configDir()).Run()) //nolint:gosec // this is a test

		// expose the first validator for debugging and communication
		if val.index == 0 {
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

		s.valResources[c.id][i] = resource
		s.T().Logf("started Gitopia %s validator container: %s", c.id, resource.Container.ID)
	}

	rpcClient, err := rpchttp.New(fmt.Sprintf("tcp://localhost:%d", 26657+portOffset), "/websocket")
	s.Require().NoError(err)

	s.Require().Eventually(
		func() bool {
			ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
			defer cancel()

			status, err := rpcClient.Status(ctx)
			if err != nil {
				return false
			}

			// let the node produce a few blocks
			if status.SyncInfo.CatchingUp || status.SyncInfo.LatestBlockHeight < 3 {
				return false
			}
			return true
		},
		5*time.Minute,
		time.Second,
		"Gitopia node failed to produce blocks",
	)
}

func (s *IntegrationTestSuite) runGitopiaV3(c *chain, portOffset int) {
	s.T().Logf("starting Gitopia v3 %s validator containers...", c.id)

	address, _ := s.chainC.genesisAccounts[relayerAccountIndexHermes].keyInfo.GetAddress()
	relayerAddress := address.String()

	s.valResources[c.id] = make([]*dockertest.Resource, len(c.validators))

	for i, val := range c.validators {
		runOpts := &dockertest.RunOptions{
			Name:      val.instanceName(),
			NetworkID: s.dkrNet.Network.ID,
			Mounts: []string{
				fmt.Sprintf("%s/:%s", val.configDir(), gitopiaHomePath),
			},
			Repository: "gitopia/gitopiad-e2e",
			Tag:        "v3.3.0",
			Env: []string{
				fmt.Sprintf("CHAIN_ID=%s", c.id),
				fmt.Sprintf("MONIKER=%s", val.moniker),
				fmt.Sprintf("VALIDATOR_0_MONIKER=%s", c.validators[0].moniker),
				fmt.Sprintf("VALIDATOR_1_MONIKER=%s", c.validators[1].moniker),
				fmt.Sprintf("VALIDATOR_0_MNEMONIC=%s", c.validators[0].mnemonic),
				fmt.Sprintf("VALIDATOR_1_MNEMONIC=%s", c.validators[1].mnemonic),
				fmt.Sprintf("RELAYER_ACCOUNT_ADDRESS=%s", relayerAddress),
			},
			Entrypoint: []string{
				"sh",
				"-c",
				fmt.Sprintf("chmod +x %s/scripts/setup_chain.sh && %s/scripts/setup_chain.sh && tail -f /dev/null", gitopiaHomePath, gitopiaHomePath),
			},
		}

		p := path.Join(val.configDir(), "scripts")
		s.Require().NoError(os.MkdirAll(p, 0o755))
		s.Require().NoError(exec.Command("cp", "scripts/setup_chain.sh", p).Run()) //nolint:gosec // this is a test

		s.Require().NoError(exec.Command("chmod", "-R", "0777", val.configDir()).Run()) //nolint:gosec // this is a test

		// expose the first validator for debugging and communication
		if val.index == 0 {
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

		s.valResources[c.id][i] = resource
		s.T().Logf("started Gitopia %s validator container: %s", c.id, resource.Container.ID)
	}

	rpcClient, err := rpchttp.New(fmt.Sprintf("tcp://localhost:%d", 26657+portOffset), "/websocket")
	s.Require().NoError(err)

	s.Require().Eventually(
		func() bool {
			ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
			defer cancel()

			status, err := rpcClient.Status(ctx)
			if err != nil {
				return false
			}

			// let the node produce a few blocks
			if status.SyncInfo.CatchingUp || status.SyncInfo.LatestBlockHeight < 3 {
				return false
			}
			return true
		},
		5*time.Minute,
		time.Second,
		"Gitopia node failed to produce blocks",
	)
}

// runValidatorWithUpgradedBinary resumes the validator with the upgraded binary.
func (s *IntegrationTestSuite) runValidatorWithUpgradedBinary(c *chain, portOffset, upgradeHeight int) {
	s.T().Logf("resuming Gitopia %s validator with upgraded binary...", c.id)

	for i, val := range c.validators {
		runOpts := &dockertest.RunOptions{
			Name:      val.instanceName(),
			NetworkID: s.dkrNet.Network.ID,
			Mounts: []string{
				fmt.Sprintf("%s/:%s", val.configDir(), gitopiaHomePath),
			},
			Repository: "gitopia/gitopiad-e2e",
		}

		s.Require().NoError(exec.Command("chmod", "-R", "0777", val.configDir()).Run()) //nolint:gosec // this is a test

		// expose the first validator for debugging and communication
		if val.index == 0 {
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

		s.valResources[c.id][i] = resource
		s.T().Logf("resumeded Gitopia %s validator container with upgraded binary: %s", c.id, resource.Container.ID)
	}

	rpcClient, err := rpchttp.New(fmt.Sprintf("tcp://localhost:%d", 26657+portOffset), "/websocket")
	s.Require().NoError(err)

	s.Require().Eventually(
		func() bool {
			ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
			defer cancel()

			status, err := rpcClient.Status(ctx)
			if err != nil {
				return false
			}

			// let the node produce a few blocks after upgrade height
			if status.SyncInfo.CatchingUp || status.SyncInfo.LatestBlockHeight < int64(upgradeHeight)+3 {
				return false
			}
			return true
		},
		5*time.Minute,
		time.Second,
		"Gitopia node failed to produce blocks",
	)
}

func noRestart(config *docker.HostConfig) {
	// in this case we don't want the nodes to restart on failure
	config.RestartPolicy = docker.RestartPolicy{
		Name: "no",
	}
}

// runIBCRelayer bootstraps an IBC Hermes relayer by creating an IBC connection and
// a transfer channel between chainA and chainB.
func (s *IntegrationTestSuite) runIBCRelayer() {
	s.T().Log("starting Hermes relayer container")

	tmpDir, err := os.MkdirTemp("", "gitopia-e2e-testnet-hermes-")
	s.Require().NoError(err)
	s.tmpDirs = append(s.tmpDirs, tmpDir)

	gitopiaAVal := s.chainA.validators[0]
	gitopiaBVal := s.chainB.validators[0]

	gitopiaARly := s.chainA.genesisAccounts[relayerAccountIndexHermes]
	gitopiaBRly := s.chainB.genesisAccounts[relayerAccountIndexHermes]

	hermesCfgPath := path.Join(tmpDir, "hermes")

	s.Require().NoError(os.MkdirAll(hermesCfgPath, 0o755))
	_, err = copyFile(
		filepath.Join("./scripts/", "hermes_bootstrap.sh"),
		filepath.Join(hermesCfgPath, "hermes_bootstrap.sh"),
	)
	s.Require().NoError(err)

	s.hermesResource, err = s.dkrPool.RunWithOptions(
		&dockertest.RunOptions{
			Name:       fmt.Sprintf("%s-%s-relayer", s.chainA.id, s.chainB.id),
			Repository: "gitopia/hermes-e2e",
			Tag:        "1.0.0",
			NetworkID:  s.dkrNet.Network.ID,
			Mounts: []string{
				fmt.Sprintf("%s/:/root/hermes", hermesCfgPath),
			},
			PortBindings: map[docker.Port][]docker.PortBinding{
				"3031/tcp": {{HostIP: "", HostPort: "3031"}},
			},
			Env: []string{
				fmt.Sprintf("GITOPIA_A_E2E_CHAIN_ID=%s", s.chainA.id),
				fmt.Sprintf("GITOPIA_B_E2E_CHAIN_ID=%s", s.chainB.id),
				fmt.Sprintf("GITOPIA_A_E2E_VAL_MNEMONIC=%s", gitopiaAVal.mnemonic),
				fmt.Sprintf("GITOPIA_B_E2E_VAL_MNEMONIC=%s", gitopiaBVal.mnemonic),
				fmt.Sprintf("GITOPIA_A_E2E_RLY_MNEMONIC=%s", gitopiaARly.mnemonic),
				fmt.Sprintf("GITOPIA_B_E2E_RLY_MNEMONIC=%s", gitopiaBRly.mnemonic),
				fmt.Sprintf("GITOPIA_A_E2E_VAL_HOST=%s", s.valResources[s.chainA.id][0].Container.Name[1:]),
				fmt.Sprintf("GITOPIA_B_E2E_VAL_HOST=%s", s.valResources[s.chainB.id][0].Container.Name[1:]),
			},
			User: "root",
			Entrypoint: []string{
				"sh",
				"-c",
				"chmod +x /root/hermes/hermes_bootstrap.sh && /root/hermes/hermes_bootstrap.sh && tail -f /dev/null",
			},
		},
		noRestart,
	)
	s.Require().NoError(err)

	s.T().Logf("started Hermes relayer container: %s", s.hermesResource.Container.ID)

	// XXX: Give time to both networks to start, otherwise we might see gRPC
	// transport errors.
	time.Sleep(10 * time.Second)

	// create the client, connection and channel between the two Gitopia chains
	s.createConnection(s.hermesResource, s.chainA.id, s.chainB.id)
	s.createChannel(s.hermesResource, s.chainA.id, s.chainB.id)
}

// runGitopiaOsmosisIBCRelayer bootstraps an IBC Hermes relayer by creating an IBC connection and
// a transfer channel between chainA and Osmosis localnet.
func (s *IntegrationTestSuite) runGitopiaOsmosisIBCRelayer(c *chain) {
	s.T().Log("starting Hermes relayer container")

	tmpDir, err := os.MkdirTemp("", "gitopia-e2e-testnet-hermes-")
	s.Require().NoError(err)
	s.tmpDirs = append(s.tmpDirs, tmpDir)

	gitopiaCRly := s.chainC.genesisAccounts[relayerAccountIndexHermes]

	hermesCfgPath := path.Join(tmpDir, "hermes")

	s.Require().NoError(os.MkdirAll(hermesCfgPath, 0o755))
	_, err = copyFile(
		filepath.Join("./scripts/", "hermes_bootstrap_osmosis.sh"),
		filepath.Join(hermesCfgPath, "hermes_bootstrap_osmosis.sh"),
	)
	s.Require().NoError(err)

	s.hermesOsmosisResource, err = s.dkrPool.RunWithOptions(
		&dockertest.RunOptions{
			Name:       fmt.Sprintf("%s-osmosis-relayer", c.id),
			Repository: "gitopia/hermes-e2e",
			Tag:        "1.0.0",
			NetworkID:  s.dkrNet.Network.ID,
			Mounts: []string{
				fmt.Sprintf("%s/:/root/hermes", hermesCfgPath),
			},
			PortBindings: map[docker.Port][]docker.PortBinding{
				"3031/tcp": {{HostIP: "", HostPort: "3032"}},
			},
			Env: []string{
				fmt.Sprintf("GITOPIA_A_E2E_CHAIN_ID=%s", c.id),
				"OSMOSIS_E2E_CHAIN_ID=localosmosis",
				fmt.Sprintf("GITOPIA_A_E2E_RLY_MNEMONIC=%s", gitopiaCRly.mnemonic),
				"OSMOSIS_E2E_RLY_MNEMONIC=bottom loan skill merry east cradle onion journey palm apology verb edit desert impose absurd oil bubble sweet glove shallow size build burst effort",
				fmt.Sprintf("GITOPIA_A_E2E_VAL_HOST=%s", s.valResources[c.id][0].Container.Name[1:]),
				"OSMOSIS_E2E_VAL_HOST=localosmosis-osmosisd-1",
			},
			User: "root",
			Entrypoint: []string{
				"sh",
				"-c",
				"chmod +x /root/hermes/hermes_bootstrap_osmosis.sh && /root/hermes/hermes_bootstrap_osmosis.sh && tail -f /dev/null",
			},
		},
		noRestart,
	)
	s.Require().NoError(err)

	s.T().Logf("started Hermes relayer container: %s", s.hermesOsmosisResource.Container.ID)

	// XXX: Give time to both networks to start, otherwise we might see gRPC
	// transport errors.
	time.Sleep(10 * time.Second)

	// create the client, connection and channel between Gitopia and Osmosis localnet
	s.createConnection(s.hermesOsmosisResource, c.id, "localosmosis")
	s.createChannel(s.hermesOsmosisResource, c.id, "localosmosis")
}

// connectOsmosisValidator connects osmosis validator to test docker network
func (s *IntegrationTestSuite) connectOsmosisValidator() {
	s.T().Log("connecting local Osmosis validator to the test docker network")

	err := s.dkrPool.Client.ConnectNetwork(s.dkrNet.Network.ID, docker.NetworkConnectionOptions{
		Container: "localosmosis-osmosisd-1",
	})
	s.Require().NoError(err)

	s.T().Log("connected local Osmosis validator to the test docker network")
}

func (s *IntegrationTestSuite) writeGovCommunitySpendProposal(c *chain, amount sdk.Coin, recipient string) {
	template := `
	{
		"messages":[
		  {
			"@type": "/cosmos.distribution.v1beta1.MsgCommunityPoolSpend",
			"authority": "%s",
			"recipient": "%s",
			"amount": [{
				"denom": "%s",
				"amount": "%s"
			}]
		  }
		],
		"deposit": "100ulore",
		"proposer": "Proposing validator address",
		"metadata": "Community Pool Spend",
		"title": "Fund Team!",
		"summary": "summary",
		"expedited": false
	}
	`
	propMsgBody := fmt.Sprintf(template, govModuleAddress, recipient, amount.Denom, amount.Amount.String())
	err := writeFile(filepath.Join(c.validators[0].configDir(), "config", proposalCommunitySpendFilename), []byte(propMsgBody))
	s.Require().NoError(err)
}

func (s *IntegrationTestSuite) writeGovLegProposal(c *chain, height int64, name string) {
	prop := &upgradetypes.Plan{
		Name:   name,
		Height: height,
		Info:   `{"binaries":{"os1/arch1":"url1","os2/arch2":"url2"}}`,
	}

	commSpendBody, err := json.MarshalIndent(prop, "", " ")
	s.Require().NoError(err)

	err = writeFile(filepath.Join(c.validators[0].configDir(), "config", proposalCommunitySpendFilename), commSpendBody)
	s.Require().NoError(err)
}

func (s *IntegrationTestSuite) writeLiquidStakingParamsUpdateProposal(c *chain, oldParams stakingtypes.Params) {
	template := `
	{
		"messages": [
		 {
		  "@type": "/cosmos.staking.v1beta1.MsgUpdateParams",
		  "authority": "%s",
		  "params": {
		   "unbonding_time": "%s",
		   "max_validators": %d,
		   "max_entries": %d,
		   "historical_entries": %d,
		   "bond_denom": "%s",
		   "min_commission_rate": "%s",
		   "validator_bond_factor": "%s",
		   "global_liquid_staking_cap": "%s",
		   "validator_liquid_staking_cap": "%s"
		  }
		 }
		],
		"metadata": "ipfs://CID",
		"deposit": "100ulore",
		"title": "Update LSM Params",
		"summary": "e2e-test updating LSM staking params",
		"expedited": false
	   }`
	propMsgBody := fmt.Sprintf(template,
		govAuthority,
		oldParams.UnbondingTime,
		oldParams.MaxValidators,
		oldParams.MaxEntries,
		oldParams.HistoricalEntries,
		oldParams.BondDenom,
		oldParams.MinCommissionRate,
		sdk.NewDec(250),           // validator bond factor
		sdk.NewDecWithPrec(25, 2), // 25 global_liquid_staking_cap
		sdk.NewDecWithPrec(50, 2), // 50 validator_liquid_staking_cap
	)

	err := writeFile(filepath.Join(c.validators[0].configDir(), "config", proposalLSMParamUpdateFilename), []byte(propMsgBody))
	s.Require().NoError(err)
}

// writeGovParamChangeProposalBlocksPerEpoch writes a governance proposal JSON file to change the `BlocksPerEpoch`
// parameter to the provided `blocksPerEpoch`
func (s *IntegrationTestSuite) writeGovParamChangeProposalBlocksPerEpoch(c *chain, blocksPerEpoch int64) {
	template := `
	{
		"messages":[
		  {
			"@type": "/cosmos.gov.v1.MsgExecLegacyContent",
			"authority": "%s",
			"content": {
				"@type": "/cosmos.params.v1beta1.ParameterChangeProposal",
				"title": "BlocksPerEpoch",
				"description": "change blocks per epoch",
				"changes": [{
				  "subspace": "provider",
				  "key": "BlocksPerEpoch",
				  "value": "\"%d\""
				}]
			}
		  }
		],
		"deposit": "100ulore",
		"proposer": "sample proposer",
		"metadata": "sample metadata",
		"title": "blocks per epoch title",
		"summary": "blocks per epoch summary",
		"expedited": false
	}`

	propMsgBody := fmt.Sprintf(template,
		govAuthority,
		blocksPerEpoch,
	)

	err := writeFile(filepath.Join(c.validators[0].configDir(), "config", proposalBlocksPerEpochFilename), []byte(propMsgBody))
	s.Require().NoError(err)
}

// writeFailingExpeditedProposal writes a governance proposal JSON file.
// The proposal fails because only SoftwareUpgrade and CancelSoftwareUpgrade can be expedited.
func (s *IntegrationTestSuite) writeFailingExpeditedProposal(c *chain, blocksPerEpoch int64) {
	template := `
	{
		"messages":[
		  {
			"@type": "/cosmos.gov.v1.MsgExecLegacyContent",
			"authority": "%s",
			"content": {
				"@type": "/cosmos.params.v1beta1.ParameterChangeProposal",
				"title": "BlocksPerEpoch",
				"description": "change blocks per epoch",
				"changes": [{
				  "subspace": "provider",
				  "key": "BlocksPerEpoch",
				  "value": "\"%d\""
				}]
			}
		  }
		],
		"deposit": "100ulore",
		"proposer": "sample proposer",
		"metadata": "sample metadata",
		"title": "blocks per epoch title",
		"summary": "blocks per epoch summary",
		"expedited": true
	}`

	propMsgBody := fmt.Sprintf(template,
		govAuthority,
		blocksPerEpoch,
	)

	err := writeFile(filepath.Join(c.validators[0].configDir(), "config", proposalFailExpedited), []byte(propMsgBody))
	s.Require().NoError(err)
}

// MsgSoftwareUpgrade can be expedited but it can only be submitted using "tx gov submit-proposal" command.
// Messages submitted using "tx gov submit-legacy-proposal" command cannot be expedited.
func (s *IntegrationTestSuite) writeExpeditedSoftwareUpgradeProp(c *chain) {
	body := `{
 "messages": [
  {
   "@type": "/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade",
   "authority": "cosmos10d07y265gmmuvt4z0w9aw880jnsr700j6zn9kn",
   "plan": {
    "name": "test-expedited-upgrade",
    "height": "123456789",
    "info": "test",
    "upgraded_client_state": null
   }
  }
 ],
 "metadata": "ipfs://CID",
 "deposit": "100ulore",
 "title": "title",
 "summary": "test",
 "expedited": true
}`

	err := writeFile(filepath.Join(c.validators[0].configDir(), "config", proposalExpeditedSoftwareUpgrade), []byte(body))
	s.Require().NoError(err)
}

func configFile(filename string) string {
	filepath := filepath.Join(gaiaConfigPath, filename)
	return filepath
}

func (s *IntegrationTestSuite) runStorageProviders() {
	s.T().Log("starting storage provider containers...")

	// Create temporary directories for storage provider data
	tmpDir, err := os.MkdirTemp("", "gitopia-e2e-storage-")
	s.Require().NoError(err)
	s.tmpDirs = append(s.tmpDirs, tmpDir)

	// Create directories for each provider
	for i := 0; i < 2; i++ {
		providerDir := filepath.Join(tmpDir, fmt.Sprintf("provider%d", i))
		s.Require().NoError(os.MkdirAll(filepath.Join(providerDir, "ipfs"), 0755))
		s.Require().NoError(os.MkdirAll(filepath.Join(providerDir, "cluster"), 0755))
		s.Require().NoError(os.MkdirAll(filepath.Join(providerDir, "repos"), 0755))
		s.Require().NoError(os.MkdirAll(filepath.Join(providerDir, "attachments"), 0755))
	}

	// Run IPFS nodes
	for i := 0; i < 2; i++ {
		runOpts := &dockertest.RunOptions{
			Name:       fmt.Sprintf("ipfs%d", i),
			NetworkID:  s.dkrNet.Network.ID,
			Repository: "ipfs/kubo",
			Tag:        "release",
			Mounts: []string{
				fmt.Sprintf("%s/provider%d/ipfs:/data/ipfs", tmpDir, i),
			},
			PortBindings: map[docker.Port][]docker.PortBinding{
				"4001/tcp": {{HostIP: "", HostPort: fmt.Sprintf("%d", 4001+i)}},
				"5001/tcp": {{HostIP: "", HostPort: fmt.Sprintf("%d", 5003+i)}},
				"8080/tcp": {{HostIP: "", HostPort: fmt.Sprintf("%d", 8080+i)}},
			},
		}

		resource, err := s.dkrPool.RunWithOptions(runOpts, noRestart)
		s.Require().NoError(err)
		s.valResources["storage"][i] = resource
	}

	// Run IPFS Cluster nodes
	for i := 0; i < 2; i++ {
		runOpts := &dockertest.RunOptions{
			Name:       fmt.Sprintf("cluster%d", i),
			NetworkID:  s.dkrNet.Network.ID,
			Repository: "ipfs/ipfs-cluster",
			Tag:        "latest",
			Mounts: []string{
				fmt.Sprintf("%s/provider%d/cluster:/data/ipfs-cluster", tmpDir, i),
			},
			Env: []string{
				fmt.Sprintf("CLUSTER_PEERNAME=cluster%d", i),
				"CLUSTER_SECRET=1056f496539989fb653b6721a45cbedb438124db6e9bbedd83acf21418f5cc79",
				fmt.Sprintf("CLUSTER_IPFSHTTP_NODEMULTIADDRESS=/dns4/ipfs%d/tcp/5001", i),
				"CLUSTER_CRDT_TRUSTEDPEERS=*",
				"CLUSTER_RESTAPI_HTTPLISTENMULTIADDRESS=/ip4/0.0.0.0/tcp/9094",
				"CLUSTER_MONITORPINGINTERVAL=2s",
			},
			PortBindings: map[docker.Port][]docker.PortBinding{
				"9094/tcp": {{HostIP: "", HostPort: fmt.Sprintf("%d", 9094+i)}},
			},
		}

		resource, err := s.dkrPool.RunWithOptions(runOpts, noRestart)
		s.Require().NoError(err)
		s.valResources["storage"][i+2] = resource
	}

	// Run Git Server nodes
	for i := 0; i < 2; i++ {
		runOpts := &dockertest.RunOptions{
			Name:       fmt.Sprintf("git-server%d", i),
			NetworkID:  s.dkrNet.Network.ID,
			Repository: "gitopia/git-server",
			Tag:        "latest",
			Mounts: []string{
				fmt.Sprintf("%s/provider%d/repos:/var/repos", tmpDir, i),
				fmt.Sprintf("%s/provider%d/attachments:/var/attachments", tmpDir, i),
			},
			Env: []string{
				fmt.Sprintf("IPFS_CLUSTER_PEER_HOST=cluster%d", i),
				"IPFS_CLUSTER_PEER_PORT=9094",
				fmt.Sprintf("GIT_SERVER_ID=%d", i),
				fmt.Sprintf("IPFS_HOST=ipfs%d", i),
				"IPFS_PORT=5001",
				"ENABLE_EXTERNAL_PINNING=false",
				"PINATA_API_KEY=" + os.Getenv("PINATA_API_KEY"),
				"PINATA_SECRET_KEY=" + os.Getenv("PINATA_SECRET_KEY"),
				fmt.Sprintf("CHAIN_ID=%s", s.chainA.id),
			},
			PortBindings: map[docker.Port][]docker.PortBinding{
				"5000/tcp": {{HostIP: "", HostPort: fmt.Sprintf("%d", 5001+i)}},
			},
		}

		resource, err := s.dkrPool.RunWithOptions(runOpts, noRestart)
		s.Require().NoError(err)
		s.valResources["storage"][i+4] = resource
	}

	// Wait for services to be ready
	time.Sleep(10 * time.Second)
}
