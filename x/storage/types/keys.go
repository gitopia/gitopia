package types

const (
	// ModuleName defines the module name
	ModuleName = "storage"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_storage"
)

var (
	ParamsKey = []byte{0x00}
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

const (
	ProviderKey       = "Provider-value-"
	ProviderCountKey  = "Provider-count-"
	PackfileKey       = "Packfile-value-"
	PackfileCountKey  = "Packfile-count-"
	ChallengeKey      = "Challenge-value-"
	ChallengeCountKey = "Challenge-count-"
)
