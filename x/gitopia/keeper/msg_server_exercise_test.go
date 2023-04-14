package keeper_test

import (
	"testing"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/bank/testutil"
	"github.com/gitopia/gitopia/app/params"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/assert"
)

func TestExerciseSuccess(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	addr := sample.AccAddress()

	testutil.FundModuleAccount(keepers.BankKeeper, ctx, types.TeamAccountName,
		[]sdk.Coin{{Denom: params.BaseCoinUnit, Amount: math.NewInt(1000)}})
	_, err := srv.Exercise(ctx, types.NewMsgExercise(addr, sdk.NewCoin(params.BaseCoinUnit, math.NewInt(10)), addr))
	assert.NoError(t, err)
}
