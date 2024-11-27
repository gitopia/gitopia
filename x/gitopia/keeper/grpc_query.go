package keeper

import (
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
)

var _ types.QueryServer = Keeper{}
