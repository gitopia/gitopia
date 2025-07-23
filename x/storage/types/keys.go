package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/cosmos/cosmos-sdk/types/address"
	"github.com/cosmos/cosmos-sdk/types/kv"
)

const (
	// ModuleName defines the module name
	ModuleName = "storage"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_storage"

	// StorageBondedPoolName defines the name of the storage bonded pool
	StorageBondedPoolName = "storage_bonded_tokens_pool"

	// StorageFeePoolName defines the name of the storage fee pool
	StorageFeePoolName = "storage_fee_pool"

	// ChallengeSlashPoolName defines the name of the challenge slash pool
	ChallengeSlashPoolName = "challenge_slash_pool"
)

var (
	ParamsKey = []byte{0x00}

	ProviderStakePrefix   = []byte{0x01}
	ProviderRewardsPrefix = []byte{0x02}
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

const (
	// PreviousBlockInfoKey defines the key for PreviousBlockInfo
	PreviousBlockInfoKey = "PreviousBlockInfo"

	ProviderKey                      = "Provider-value-"
	ProviderCountKey                 = "Provider-count-"
	PackfileKey                      = "Packfile-value-"
	PackfileCountKey                 = "Packfile-count-"
	PackfileRepositoryMappingKey     = "PackfileRepositoryMapping-value-"
	ReleaseAssetKey                  = "ReleaseAsset-value-"
	ReleaseAssetCountKey             = "ReleaseAsset-count-"
	ReleaseAssetRepositoryMappingKey = "ReleaseAssetRepositoryMapping-value-"
	ChallengeKey                     = "Challenge-value-"
	ChallengeCountKey                = "Challenge-count-"
	LFSObjectKey                     = "LFSObject-value-"
	LFSObjectCountKey                = "LFSObject-count-"
	LFSObjectRepositoryMappingKey    = "LFSObjectRepositoryMapping-value-"

	StorageStatsKey = "StorageStats"

	CidReferenceCountKey = "CidReferenceCount-"
)

// GetProviderStakeKey creates the key for a provider's stake.
func GetProviderStakeKey(p sdk.AccAddress) []byte {
	return append(ProviderStakePrefix, address.MustLengthPrefix(p.Bytes())...)
}

// GetProviderRewardsKey creates the key for a provider's rewards.
func GetProviderRewardsKey(p sdk.AccAddress) []byte {
	return append(ProviderRewardsPrefix, address.MustLengthPrefix(p.Bytes())...)
}

// GetProviderStakeAddress creates the address from a provider's stake key.
func GetProviderStakeAddress(key []byte) sdk.AccAddress {
	// key is in the format:
	// 0x01<valAddrLen (1 Byte)><valAddr_Bytes>: ProviderStake

	// Remove prefix and address length.
	kv.AssertKeyAtLeastLength(key, 3)
	addr := key[2:]
	kv.AssertKeyLength(addr, int(key[1]))

	return sdk.AccAddress(addr)
}

// GetProviderRewardsAddress creates the address from a provider's rewards key.
func GetProviderRewardsAddress(key []byte) sdk.AccAddress {
	// key is in the format:
	// 0x02<valAddrLen (1 Byte)><valAddr_Bytes>: ProviderRewards

	// Remove prefix and address length.
	kv.AssertKeyAtLeastLength(key, 3)
	addr := key[2:]
	kv.AssertKeyLength(addr, int(key[1]))

	return sdk.AccAddress(addr)
}
