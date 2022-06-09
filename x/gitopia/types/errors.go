package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/gitopia module sentinel errors
var (
	ErrInvalidBackupStore = sdkerrors.Register(ModuleName, 1100, "invalid backup store")
	// this line is used by starport scaffolding # ibc/errors
)
