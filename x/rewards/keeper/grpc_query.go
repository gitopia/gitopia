package keeper

import (
	"github.com/gitopia/gitopia/v6/x/rewards/types"
)

var _ types.QueryServer = Keeper{}
