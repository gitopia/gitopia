package keeper

import (
	"github.com/gitopia/gitopia/x/rewards/types"
)

var _ types.QueryServer = Keeper{}
