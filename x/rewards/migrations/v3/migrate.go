package v3

import (
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v3/x/rewards/keeper"
	"github.com/gitopia/gitopia/v3/x/rewards/types"
)

var (
	AIRDROP_START_TIME = time.Date(2023, 9, 23, 17, 0, 0, 0, time.UTC)
	AIRDROP_END_TIME   = time.Date(2023, 11, 23, 17, 0, 0, 0, time.UTC)
)

type Migrator struct {
	keeper keeper.Keeper
}

func NewMigrator(keeper keeper.Keeper) Migrator {
	return Migrator{
		keeper: keeper,
	}
}

// update ecosystem airdrop time
func (m Migrator) Migrate(ctx sdk.Context) error {
	params := m.keeper.GetParams(ctx)

	for i := 0; i < len(params.RewardSeries); i++ {
		if params.RewardSeries[i].Series == types.Series_COSMOS {
			params.RewardSeries[i].StartTime = AIRDROP_START_TIME
			params.RewardSeries[i].EndTime = AIRDROP_END_TIME
		}
	}

	m.keeper.SetParams(ctx, params)

	return nil
}
