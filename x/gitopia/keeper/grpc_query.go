package keeper

import (
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
)

var _ types.QueryServer = Keeper{}
