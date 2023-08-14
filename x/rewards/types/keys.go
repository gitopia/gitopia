package types

import (
	"fmt"
	"strings"
)

const (
	// ModuleName defines the module name
	ModuleName = "rewards"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_rewards"
)

var (
	ParamsKey = []byte{0x00}
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

// module accounts for reward series
func SeriesModuleAccount(series Series) string {
	return fmt.Sprintf("rewards_series_%s_account", strings.ToLower(Series_name[int32(series)]))
}	