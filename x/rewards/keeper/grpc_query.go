package keeper

import (
	"github.com/gitopia/gitopia/v5/x/rewards/types"
)

var _ types.QueryServer = Keeper{}
