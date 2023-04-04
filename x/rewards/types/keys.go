package types

const (
	// ModuleName defines the module name
	ModuleName = "rewards"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_rewards"

	RewardsSeriesOneAccount   = "rewards_series_one_account"
	RewardsSeriesTwoAccount   = "rewards_series_two_account"
	RewardsSeriesThreeAccount = "rewards_series_three_account"
	RewardsSeriesFourAccount  = "rewards_series_four_account"
	RewardsSeriesFiveAccount  = "rewards_series_five_account"
	RewardsSeriesSixAccount   = "rewards_series_six_account"
	RewardsSeriesSevenAccount = "rewards_series_seven_account"
)

var (
	ParamsKey = []byte{0x00}
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
