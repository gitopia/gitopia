package keeper

import (
	"github.com/gitopia/gitopia/v2/x/rewards/types"
)

var _ types.QueryServer = Keeper{}
