package keeper

import (
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
)

var _ types.QueryServer = Keeper{}
