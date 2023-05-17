package keeper

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v2/x/rewards/types"
	"github.com/tendermint/tendermint/libs/log"

	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	distrkeeper "github.com/cosmos/cosmos-sdk/x/distribution/keeper"
	govkeeper "github.com/cosmos/cosmos-sdk/x/gov/keeper"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	gitopiakeeper "github.com/gitopia/gitopia/v2/x/gitopia/keeper"
)

type (
	Keeper struct {
		// these fields are unused and maybe uninitialized
		// the auto generated code is left behind for future!
		cdc      codec.BinaryCodec
		storeKey storetypes.StoreKey
		memKey   storetypes.StoreKey

		gitopiaKeeper *gitopiakeeper.Keeper
		stakingKeeper stakingkeeper.Keeper
		GovKeeper     govkeeper.Keeper
		bankKeeper    bankkeeper.Keeper
		accountKeeper authkeeper.AccountKeeper
		distrKeeper   *distrkeeper.Keeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey storetypes.StoreKey,
	gk *gitopiakeeper.Keeper,
	sk stakingkeeper.Keeper,
	gok govkeeper.Keeper,
	bk bankkeeper.Keeper,
	ak authkeeper.AccountKeeper,
	dk *distrkeeper.Keeper,
) *Keeper {

	return &Keeper{

		cdc:           cdc,
		storeKey:      storeKey,
		memKey:        memKey,
		gitopiaKeeper: gk,
		stakingKeeper: sk,
		GovKeeper:     gok,
		bankKeeper:    bk,
		accountKeeper: ak,
		distrKeeper:   dk,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
