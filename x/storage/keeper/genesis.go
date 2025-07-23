package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// InitGenesis initializes the module's state from a provided genesis state.
func InitGenesis(ctx sdk.Context, k Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)

	// Set to genesis block height and time
	k.SetPreviousBlockInfo(ctx, &types.BlockInfo{
		Height:    uint32(ctx.BlockHeight()),
		Timestamp: ctx.BlockTime(),
	})

	// check if the bonded, fee and slash pools accounts exists
	bondedPool := k.GetBondedPool(ctx)
	if bondedPool == nil {
		panic(fmt.Sprintf("%s module account has not been set", types.StorageBondedPoolName))
	}

	bondedPoolBalance := k.bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress())
	if bondedPoolBalance.IsZero() {
		k.accountKeeper.SetModuleAccount(ctx, bondedPool)
	}

	feePool := k.GetFeePool(ctx)
	if feePool == nil {
		panic(fmt.Sprintf("%s module account has not been set", types.StorageFeePoolName))
	}

	feePoolBalance := k.bankKeeper.GetAllBalances(ctx, feePool.GetAddress())
	if feePoolBalance.IsZero() {
		k.accountKeeper.SetModuleAccount(ctx, feePool)
	}

	challengeSlashPool := k.GetChallengeSlashPool(ctx)
	if challengeSlashPool == nil {
		panic(fmt.Sprintf("%s module account has not been set", types.ChallengeSlashPoolName))
	}

	challengeSlashPoolBalance := k.bankKeeper.GetAllBalances(ctx, challengeSlashPool.GetAddress())
	if challengeSlashPoolBalance.IsZero() {
		k.accountKeeper.SetModuleAccount(ctx, challengeSlashPool)
	}
}

// ExportGenesis returns the module's exported genesis
func ExportGenesis(ctx sdk.Context, k Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
