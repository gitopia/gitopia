package keeper

import (
	"github.com/gitopia/gitopia/v3/x/rewards/types"
)

var _ types.QueryServer = Keeper{}
