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

	// BurnAccountName defines the name of the account that will burn the slashed coins
	BurnAccountName = "burn"
)

var (
	ParamsKey = []byte{0x00}

	ProviderRewardsPrefix = []byte{0x01}
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
)

// GetProviderRewardsKey creates the key for a provider's rewards.
func GetProviderRewardsKey(p sdk.AccAddress) []byte {
	return append(ProviderRewardsPrefix, address.MustLengthPrefix(p.Bytes())...)
}

// GetProviderRewardsAddress creates the address from a provider's rewards key.
func GetProviderRewardsAddress(key []byte) sdk.AccAddress {
	// key is in the format:
	// 0x01<valAddrLen (1 Byte)><valAddr_Bytes>: ProviderRewards

	// Remove prefix and address length.
	kv.AssertKeyAtLeastLength(key, 3)
	addr := key[2:]
	kv.AssertKeyLength(addr, int(key[1]))

	return sdk.AccAddress(addr)
}
