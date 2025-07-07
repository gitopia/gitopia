package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	storagetypes "github.com/gitopia/gitopia/v6/x/storage/types"
)

type StorageKeeper interface {
	GetPackfile(ctx sdk.Context, repositoryId uint64) (val storagetypes.Packfile, found bool)
	RemovePackfile(ctx sdk.Context, repositoryId uint64)
	GetReleaseAssets(ctx sdk.Context, repositoryId uint64, tag string) (list []storagetypes.ReleaseAsset)
	RemoveReleaseAsset(ctx sdk.Context, repositoryId uint64, tag string, name string)
}
