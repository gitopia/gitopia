package v2

import (
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v2/app/params"
	"github.com/gitopia/gitopia/v2/x/rewards/keeper"
	"github.com/gitopia/gitopia/v2/x/rewards/types"

	// confusing!? v1types is the old proto in migrations/v2 dir
	// rewards module was never used. its okay to have breaking change!
	// hence a copy of old proto is maintained for migrations.
	// ideally, you wouldnt need this setup since there cannot be breaking changes.
	v1types "github.com/gitopia/gitopia/v2/x/rewards/migrations/v2/types"
	v2types "github.com/gitopia/gitopia/v2/x/rewards/types"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
)

type Migrator struct {
	keeper keeper.Keeper
}

func NewMigrator(keeper keeper.Keeper) Migrator {
	return Migrator{
		keeper: keeper,
	}
}

// migrate module from v2 to v3
// support granting rewards from multiple pools
func (m Migrator) Migrate(ctx sdk.Context) error {
	var oldParams v1types.Params
	m.keeper.GetParamsOfType(ctx, &oldParams)

	newParams := v2types.Params{}
	newParams.EvaluatorAddress = oldParams.EvaluatorAddress
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesOne))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesTwo))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesThree))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesFour))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesFive))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesSix))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesSeven))

	newParams.RewardSeries = append(newParams.RewardSeries, &v2types.RewardPool{
		TotalAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(6000000)),
		StartTime:   time.Date(2023, 8, 10, 0, 0, 0, 0, nil),
		EndTime:     time.Date(2023, 9, 10, 0, 0, 0, 0, nil),
		Series:      types.Series_COSMOS,
	})
	m.keeper.SetParams(ctx, newParams)

	m.keeper.CreateModuleAccount(ctx, types.SeriesModuleAccount(types.Series_COSMOS), authtypes.Minter)

	return nil
}

func getV2Params(from *v1types.RewardPool) *v2types.RewardPool {
	return &v2types.RewardPool{
		TotalAmount:   from.TotalAmount,
		ClaimedAmount: from.ClaimedAmount,
		StartTime:     from.StartTime,
		EndTime:       from.EndTime,
	}
}
