package keeper

import "github.com/gitopia/gitopia/v6/x/storage/types"

// ProviderLivenessInfoKey creates the key for a provider's liveness info.
func ProviderLivenessInfoKey(providerAddr string) []byte {
	return append(types.ProviderLivenessInfoPrefix, []byte(providerAddr)...)
}
