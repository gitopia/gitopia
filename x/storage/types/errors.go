package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/storage module sentinel errors
var (
	ErrNoProviderRewards = sdkerrors.Register(ModuleName, 2, "no provider rewards to withdraw")
)
