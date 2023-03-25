package keeper

import (
	"testing"

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	typesparams "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/gitopia/gitopia/x/rewards/keeper"
	gitopiakeeper "github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmdb "github.com/tendermint/tm-db"

	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	authzkeeper "github.com/cosmos/cosmos-sdk/x/authz/keeper"
	govkeeper "github.com/cosmos/cosmos-sdk/x/gov/keeper"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	mintkeeper "github.com/cosmos/cosmos-sdk/x/mint/keeper"
)

func RewardsKeeper(t testing.TB) (*keeper.Keeper, sdk.Context) {
	logger := log.NewNopLogger()
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, storetypes.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, logger)

	registry := codectypes.NewInterfaceRegistry()
	cdc := codec.NewProtoCodec(registry)

	amino := codec.NewLegacyAmino()
	ss := typesparams.NewSubspace(cdc,
		amino,
		storeKey,
		memStoreKey,
		"GitopiaSubSpace",
	)

	ak := authkeeper.NewAccountKeeper(
		cdc,
		storeKey,
		ss,
		nil,
		nil,
		"gitopia",
	)

	authzKeeper := authzkeeper.NewKeeper(
		storeKey,
		cdc,
		nil,
		ak,
	)

	bankParamsSubspace := typesparams.NewSubspace(cdc,
		amino,
		storeKey,
		memStoreKey,
		"bank",
	)
	bankKeeper := bankkeeper.NewBaseKeeper(
		cdc,
		storeKey,
		ak,
		bankParamsSubspace,
		nil,
	)
	bankKeeper.SetParams(ctx, banktypes.DefaultParams())

	stakingKeeper := stakingkeeper.NewKeeper(
		cdc,
		storeKey,
		ak,
		bankKeeper,
		ss,
	)

	mintKeeper := mintkeeper.NewKeeper(
		cdc, storeKey, ss, stakingKeeper, ak,
		bankKeeper, types.MinterAccountName)

	gitopiaKeeper := gitopiakeeper.NewKeeper(
		codec.NewProtoCodec(registry),
		storeKey,
		memStoreKey,
		types.MinterAccountName,
		authtypes.FeeCollectorName,
		ak,
		&authzKeeper,
		bankKeeper,
		mintKeeper,
	) 

	k := keeper.NewKeeper(
		cdc,
		storeKey,
		memStoreKey,
		gitopiaKeeper,
		stakingKeeper,
		govkeeper.Keeper{},
	)


	// Initialize params

	return k, ctx
}
