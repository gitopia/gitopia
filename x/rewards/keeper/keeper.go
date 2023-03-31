package keeper

import (
	"fmt"

	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/rewards/types"
	"github.com/tendermint/tendermint/libs/log"

	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	govkeeper "github.com/cosmos/cosmos-sdk/x/gov/keeper"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	gitopiakeeper "github.com/gitopia/gitopia/x/gitopia/keeper"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
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
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) GetTotalClaimableAmount(ctx sdk.Context, addr string, totalReward sdk.Coins) (sdk.Coins, error) {
	tasks, err := k.getTasks(ctx, addr)
	if err != nil {
		return nil, err
	}

	totalClaimablePercent := int64(0)
	for _, task := range tasks {
		if task.IsComplete {
			totalClaimablePercent += (int64)(task.Weight)
			if totalClaimablePercent > 100 {
				return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "cannot reward more than 100 percent!")
			}
		}
	}

	// rounded
	totalClaimableAmount := totalReward.MulInt(math.NewInt(totalClaimablePercent)).QuoInt(math.NewInt(100))
	return totalClaimableAmount, nil
}
