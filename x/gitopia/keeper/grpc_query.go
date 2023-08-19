package keeper

import (
	"github.com/gitopia/gitopia/v3/x/gitopia/types"
)

var _ types.QueryServer = Keeper{}
