package keeper_test

import (
	"testing"
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/bank/testutil"
	"github.com/gitopia/gitopia/v4/app/params"
	"github.com/gitopia/gitopia/v4/testutil/sample"
	"github.com/gitopia/gitopia/v4/x/gitopia/keeper"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
	"github.com/stretchr/testify/assert"
)

func TestExerciseSuccess(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	addr := sample.AccAddress()
	accAddr := sdk.MustAccAddressFromBech32(addr)
	now := time.Now()

	keepers.GitopiaKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    addr,
			},
		},
		GenesisTime: now.AddDate(-11, 0, 0), // all tokens have vested
	})

	testutil.FundModuleAccount(keepers.BankKeeper, ctx, types.TeamAccountName,
		[]sdk.Coin{{Denom: params.BaseCoinUnit, Amount: math.NewInt(keeper.TEAM_VESTING_AMOUNT)}})
	_, err := srv.Exercise(ctx, types.NewMsgExercise(addr, sdk.NewCoin(params.BaseCoinUnit, math.NewInt(10)), addr))
	assert.NoError(t, err)
	assert.Equal(t, sdk.Coin{Denom: params.BaseCoinUnit, Amount: math.NewInt(10)},
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))
}

func TestExerciseSuccessMaxBalance(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	addr := sample.AccAddress()
	accAddr := sdk.MustAccAddressFromBech32(addr)
	now := time.Now()

	keepers.GitopiaKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    addr,
			},
		},
		GenesisTime: now.AddDate(-11, 0, 0), // all tokens have vested
	})

	testutil.FundModuleAccount(keepers.BankKeeper, ctx, types.TeamAccountName,
		[]sdk.Coin{{Denom: params.BaseCoinUnit, Amount: math.NewInt(keeper.TEAM_VESTING_AMOUNT)}})
	// 20%
	eligibleAmount := sdk.NewCoin(params.BaseCoinUnit, sdk.NewDecWithPrec(2, 1).MulInt64(keeper.TEAM_VESTING_AMOUNT).TruncateInt())
	_, err := srv.Exercise(ctx, types.NewMsgExercise(addr, eligibleAmount, addr))
	assert.NoError(t, err)
	assert.Equal(t, eligibleAmount,
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))
}

func TestExerciseFailsWithoutBalance(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	addr := sample.AccAddress()
	accAddr := sdk.MustAccAddressFromBech32(addr)
	now := time.Now()

	keepers.GitopiaKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    addr,
			},
		},
		GenesisTime: now.AddDate(-11, 0, 0), // all tokens have vested
	})

	testutil.FundModuleAccount(keepers.BankKeeper, ctx, types.TeamAccountName,
		[]sdk.Coin{{Denom: params.BaseCoinUnit, Amount: math.NewInt(keeper.TEAM_VESTING_AMOUNT)}})
	// 20%
	eligibleAmount := sdk.NewCoin(params.BaseCoinUnit, sdk.NewDecWithPrec(2, 1).MulInt64(keeper.TEAM_VESTING_AMOUNT).TruncateInt())
	// exercise more than eligible amount
	_, err := srv.Exercise(ctx, types.NewMsgExercise(addr, eligibleAmount.AddAmount(math.NewInt(1)), addr))
	assert.Error(t, err)
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))
}

func TestExerciseSuccessMultipleClaims(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	addr := sample.AccAddress()
	accAddr := sdk.MustAccAddressFromBech32(addr)
	now := time.Now()

	keepers.GitopiaKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    addr,
			},
		},
		GenesisTime: now.AddDate(-11, 0, 0), // all tokens have vested
	})

	testutil.FundModuleAccount(keepers.BankKeeper, ctx, types.TeamAccountName,
		[]sdk.Coin{{Denom: params.BaseCoinUnit, Amount: math.NewInt(keeper.TEAM_VESTING_AMOUNT)}})
	_, err := srv.Exercise(ctx, types.NewMsgExercise(addr, sdk.NewCoin(params.BaseCoinUnit, math.NewInt(20)), addr))
	assert.NoError(t, err)
	assert.Equal(t, sdk.Coin{Denom: params.BaseCoinUnit, Amount: math.NewInt(20)},
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))

	_, err = srv.Exercise(ctx, types.NewMsgExercise(addr, sdk.NewCoin(params.BaseCoinUnit, math.NewInt(20)), addr))
	assert.NoError(t, err)
	assert.Equal(t, sdk.Coin{Denom: params.BaseCoinUnit, Amount: math.NewInt(40)},
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))
}

func TestExerciseSuccessAllBalance(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	addr := sample.AccAddress()
	accAddr := sdk.MustAccAddressFromBech32(addr)
	now := time.Now()

	keepers.GitopiaKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    addr,
			},
		},
		GenesisTime: now.AddDate(-11, 0, 0), // all tokens have vested
	})

	testutil.FundModuleAccount(keepers.BankKeeper, ctx, types.TeamAccountName,
		[]sdk.Coin{{Denom: params.BaseCoinUnit, Amount: math.NewInt(keeper.TEAM_VESTING_AMOUNT)}})
	// 20%
	eligibleAmount := sdk.NewCoin(params.BaseCoinUnit, sdk.NewDecWithPrec(2, 1).MulInt64(keeper.TEAM_VESTING_AMOUNT).TruncateInt())
	_, err := srv.Exercise(ctx, types.NewMsgExercise(addr, eligibleAmount.SubAmount(math.NewInt(200)), addr))
	assert.NoError(t, err)
	assert.Equal(t, eligibleAmount.SubAmount(math.NewInt(200)),
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))

	_, err = srv.Exercise(ctx, types.NewMsgExercise(addr, sdk.NewCoin(params.BaseCoinUnit, sdk.NewInt(200)), addr))
	assert.NoError(t, err)
	assert.Equal(t, eligibleAmount,
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))
}

func TestExerciseSuccessOnlyVestedBalance(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	addr := sample.AccAddress()
	accAddr := sdk.MustAccAddressFromBech32(addr)
	now := time.Now()

	keepers.GitopiaKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    addr,
			},
		},
		GenesisTime: now.AddDate(-2, 0, 0), // one year tokens vested
	})

	testutil.FundModuleAccount(keepers.BankKeeper, ctx, types.TeamAccountName,
		[]sdk.Coin{{Denom: params.BaseCoinUnit, Amount: math.NewInt((int64)(VESTING_PER_MONTH * 12))}})
	// 20%
	eligibleAmount := sdk.NewCoin(params.BaseCoinUnit, sdk.NewDecWithPrec(2, 1).MulInt64((int64)(VESTING_PER_MONTH*12)).TruncateInt())
	_, err := srv.Exercise(ctx, types.NewMsgExercise(addr, eligibleAmount.AddAmount(math.NewInt(1)), addr))
	assert.Error(t, err)
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))

	_, err = srv.Exercise(ctx, types.NewMsgExercise(addr, eligibleAmount, addr))
	assert.NoError(t, err)
	assert.Equal(t, eligibleAmount,
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))
}

func TestExerciseFailsOnNoVestedBalance(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	addr := sample.AccAddress()
	accAddr := sdk.MustAccAddressFromBech32(addr)
	now := time.Now()

	keepers.GitopiaKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    addr,
			},
		},
		GenesisTime: now.AddDate(-1, 0, 0), // no tokens vested
	})
	_, err := srv.Exercise(ctx, types.NewMsgExercise(addr, sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1)), addr))
	assert.Error(t, err)
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))
}

func TestExerciseSuccessProportionately(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	addr1 := sample.AccAddress()
	accAddr1 := sdk.MustAccAddressFromBech32(addr1)
	addr2 := sample.AccAddress()
	accAddr2 := sdk.MustAccAddressFromBech32(addr2)
	now := time.Now()

	keepers.GitopiaKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    addr1,
			},
			{
				Proportion: sdk.NewDec(80),
				Address:    addr2,
			},
		},
		GenesisTime: now.AddDate(-1, 0, 0), // cliff period
	})

	testutil.FundModuleAccount(keepers.BankKeeper, ctx, types.TeamAccountName,
		[]sdk.Coin{{Denom: params.BaseCoinUnit, Amount: math.NewInt((int64)(VESTING_PER_MONTH * 2))}})

	ctx = ctx.WithBlockTime(now.AddDate(0, 1, 0)) // one month vesting
	amount := sdk.NewCoin(params.BaseCoinUnit,
		sdk.NewDecWithPrec(2, 1).MulInt64((int64)(VESTING_PER_MONTH)).TruncateInt())
	// exercise one month vested balance
	_, err := srv.Exercise(ctx, types.NewMsgExercise(addr1, amount, addr1))
	assert.NoError(t, err)
	assert.Equal(t, amount,
		keepers.BankKeeper.GetBalance(ctx, accAddr1, params.BaseCoinUnit))

	ctx = ctx.WithBlockTime(now.AddDate(0, 2, 0)) // two month vesting
	amount = sdk.NewCoin(params.BaseCoinUnit,
		sdk.NewDecWithPrec(2, 1).MulInt64((int64)(VESTING_PER_MONTH*2)).TruncateInt()).Sub(amount)
	// exercise two month vested balance
	_, err = srv.Exercise(ctx, types.NewMsgExercise(addr1, amount, addr1))
	assert.NoError(t, err)
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit,
		sdk.NewDecWithPrec(2, 1).MulInt64((int64)(VESTING_PER_MONTH*2)).TruncateInt()),
		keepers.BankKeeper.GetBalance(ctx, accAddr1, params.BaseCoinUnit))

	// all vested balance exercised already
	_, err = srv.Exercise(ctx, types.NewMsgExercise(addr1,
		sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1)), addr1))
	assert.Error(t, err)

	amount = sdk.NewCoin(params.BaseCoinUnit,
		sdk.NewDecWithPrec(8, 1).MulInt64((int64)(VESTING_PER_MONTH*2)).TruncateInt())
	_, err = srv.Exercise(ctx, types.NewMsgExercise(addr2, amount, addr2))
	assert.NoError(t, err)
	assert.Equal(t, amount,
		keepers.BankKeeper.GetBalance(ctx, accAddr2, params.BaseCoinUnit))

	_, err = srv.Exercise(ctx, types.NewMsgExercise(addr2,
		sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1)), addr2))
	assert.Error(t, err)
}

func TestExerciseToAnotherAdddress(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	addr := sample.AccAddress()
	accAddr := sdk.MustAccAddressFromBech32(addr)
	addr2 := sample.AccAddress()
	accAddr2 := sdk.MustAccAddressFromBech32(addr2)
	now := time.Now()

	keepers.GitopiaKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    addr,
			},
		},
		GenesisTime: now.AddDate(-11, 0, 0), // all tokens have vested
	})

	testutil.FundModuleAccount(keepers.BankKeeper, ctx, types.TeamAccountName,
		[]sdk.Coin{{Denom: params.BaseCoinUnit, Amount: math.NewInt(keeper.TEAM_VESTING_AMOUNT)}})
	_, err := srv.Exercise(ctx, types.NewMsgExercise(addr, sdk.NewCoin(params.BaseCoinUnit, math.NewInt(10)), addr2))
	assert.NoError(t, err)
	assert.Equal(t, sdk.Coin{Denom: params.BaseCoinUnit, Amount: math.NewInt(10)}.String(),
		keepers.BankKeeper.GetBalance(ctx, accAddr2, params.BaseCoinUnit).String())
	assert.Equal(t, sdk.Coin{Denom: params.BaseCoinUnit, Amount: math.NewInt(0)},
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))
}

// ideally, there should always be sufficient balance. see team vesting schedule TC
func TestExerciseFailsOnInsufficientBalance(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	addr := sample.AccAddress()
	accAddr := sdk.MustAccAddressFromBech32(addr)
	now := time.Now()

	keepers.GitopiaKeeper.SetParams(ctx, types.Params{
		TeamProportions: []types.DistributionProportion{
			{
				Proportion: sdk.NewDec(20),
				Address:    addr,
			},
		},
		GenesisTime: now.AddDate(-1, 0, 0), // cliff period
	})

	ctx = ctx.WithBlockTime(now.AddDate(0, 1, 0)) // one month vesting
	amount := sdk.NewCoin(params.BaseCoinUnit,
		sdk.NewDecWithPrec(2, 1).MulInt64((int64)(VESTING_PER_MONTH)).TruncateInt())
	// exercise one month vested balance
	_, err := srv.Exercise(ctx, types.NewMsgExercise(addr, amount, addr))
	assert.ErrorContains(t, err, "insufficient funds")
	assert.Equal(t, sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		keepers.BankKeeper.GetBalance(ctx, accAddr, params.BaseCoinUnit))
}
