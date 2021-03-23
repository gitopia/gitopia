package keeper

import (
	"github.com/gitopia/gitopia/x/gitopia/types"
)

var _ types.QueryServer = Keeper{}
