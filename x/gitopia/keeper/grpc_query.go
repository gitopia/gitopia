package keeper

import (
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
)

var _ types.QueryServer = Keeper{}
