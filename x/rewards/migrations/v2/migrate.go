package v2

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v2/x/rewards/keeper"
	v1types "github.com/gitopia/gitopia/v2/x/rewards/migrations/v2/types"
	v2types "github.com/gitopia/gitopia/v2/x/rewards/types"
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
	var params v1types.Params
	m.keeper.GetParamsOfType(ctx, &params)

	newParams := v2types.Params{}
	newParams.EvaluatorAddress = params.EvaluatorAddress
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(params.RewardSeries.SeriesOne))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(params.RewardSeries.SeriesTwo))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(params.RewardSeries.SeriesThree))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(params.RewardSeries.SeriesFour))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(params.RewardSeries.SeriesFive))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(params.RewardSeries.SeriesSix))
	newParams.RewardSeries = append(newParams.RewardSeries, getV2Params(params.RewardSeries.SeriesSeven))

	m.keeper.SetParams(ctx, newParams)
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
