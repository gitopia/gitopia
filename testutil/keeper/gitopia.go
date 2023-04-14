package keeper

import (
	"testing"
	"time"

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	authzkeeper "github.com/cosmos/cosmos-sdk/x/authz/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	mintkeeper "github.com/cosmos/cosmos-sdk/x/mint/keeper"
	typesparams "github.com/cosmos/cosmos-sdk/x/params/types"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	"github.com/gitopia/gitopia/app"
	"github.com/gitopia/gitopia/x/gitopia/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	gitopiatypes "github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmdb "github.com/tendermint/tm-db"
)



func GitopiaKeeper(t testing.TB) (*keeper.Keeper, sdk.Context) {
	logger := log.NewNopLogger()

	storeKey := sdk.NewKVStoreKey(gitopiatypes.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(gitopiatypes.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, storetypes.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, logger).WithBlockTime(time.Now())

	registry := codectypes.NewInterfaceRegistry()
	encConfig := app.MakeEncodingConfig()
	appCodec := encConfig.Codec

	amino := codec.NewLegacyAmino()
	ss := typesparams.NewSubspace(appCodec,
		amino,
		storeKey,
		memStoreKey,
		"GitopiaSubSpace",
	)

	ak := authkeeper.NewAccountKeeper(
		appCodec,
		storeKey,
		ss,
		nil,
		app.GetMaccPerms(),
		"gitopia",
	)

	authzKeeper := authzkeeper.NewKeeper(
		storeKey,
		appCodec,
		nil,
		ak,
	)

	bankParamsSubspace := typesparams.NewSubspace(appCodec,
		amino,
		storeKey,
		memStoreKey,
		"bank",
	)
	bankKeeper := bankkeeper.NewBaseKeeper(
		appCodec,
		storeKey,
		ak,
		bankParamsSubspace,
		nil,
	)
	bankKeeper.SetParams(ctx, banktypes.DefaultParams())

	stakingKeeper := stakingkeeper.NewKeeper(
		appCodec,
		storeKey,
		ak,
		bankKeeper,
		ss,
	)

	mintKeeper := mintkeeper.NewKeeper(
		appCodec, storeKey, ss, stakingKeeper, ak,
		bankKeeper, types.MinterAccountName)

	k := keeper.NewKeeper(
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

	return k, ctx
}
