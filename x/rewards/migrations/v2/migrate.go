package v2

import (
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v4/app/params"
	"github.com/gitopia/gitopia/v4/x/rewards/keeper"
	"github.com/gitopia/gitopia/v4/x/rewards/types"

	// confusing!? v1types is the old proto in migrations/v2 dir
	// rewards module was never used. its okay to have breaking change!
	// hence a copy of old proto is maintained for migrations.
	// ideally, you wouldnt need this setup since there cannot be breaking changes.
	v1types "github.com/gitopia/gitopia/v4/x/rewards/migrations/v2/types"
	v2types "github.com/gitopia/gitopia/v4/x/rewards/types"
)

var (
	AIRDROP_START_TIME = time.Date(2023, 9, 16, 0, 0, 0, 0, time.UTC)
	AIRDROP_END_TIME   = time.Date(2023, 11, 16, 0, 0, 0, 0, time.UTC)
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

	seriesOne := getV2Params(oldParams.RewardSeries.SeriesOne)
	seriesOne.Series = types.Series_ONE

	newParams.RewardSeries = append(newParams.RewardSeries, seriesOne)
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesTwo))
	newParams.RewardSeries[len(newParams.RewardSeries)-1].Series = types.Series_TWO
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesThree))
	newParams.RewardSeries[len(newParams.RewardSeries)-1].Series = types.Series_THREE
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesFour))
	newParams.RewardSeries[len(newParams.RewardSeries)-1].Series = types.Series_FOUR
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesFive))
	newParams.RewardSeries[len(newParams.RewardSeries)-1].Series = types.Series_FIVE
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesSix))
	newParams.RewardSeries[len(newParams.RewardSeries)-1].Series = types.Series_SIX
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(oldParams.RewardSeries.SeriesSeven))
	newParams.RewardSeries[len(newParams.RewardSeries)-1].Series = types.Series_SEVEN

	newParams.RewardSeries = append(newParams.RewardSeries, &v2types.RewardPool{
		TotalAmount:   sdk.NewCoin(params.BaseCoinUnit, math.NewInt(6000000000000)),
		ClaimedAmount: sdk.NewCoin(params.BaseCoinUnit, math.NewInt(0)),
		StartTime:     AIRDROP_START_TIME,
		EndTime:       AIRDROP_END_TIME,
		Series:        types.Series_COSMOS,
	})
	m.keeper.SetParams(ctx, newParams)

	m.keeper.CreateModuleAccount(ctx, types.SeriesModuleAccount(types.Series_COSMOS))

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
