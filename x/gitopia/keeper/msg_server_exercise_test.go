package keeper_test

import (
	"testing"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/app/params"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func TestExerciseSuccess(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	addr := sample.AccAddress()

	srv.Exercise(ctx, types.NewMsgExercise(addr, sdk.NewCoin(params.BaseCoinUnit, math.NewInt(10)), addr))
}
