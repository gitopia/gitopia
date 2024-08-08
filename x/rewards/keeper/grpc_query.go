package keeper

import (
	"github.com/gitopia/gitopia/v4/x/rewards/types"
)

var _ types.QueryServer = Keeper{}
