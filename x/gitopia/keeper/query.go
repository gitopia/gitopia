package keeper

import (
	// this line is used by starport scaffolding # 1
	"github.com/gitopia/gitopia/x/gitopia/types"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	abci "github.com/tendermint/tendermint/abci/types"
)

func NewQuerier(k Keeper, legacyQuerierCdc *codec.LegacyAmino) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) ([]byte, error) {
		var (
			res []byte
			err error
		)

		switch path[0] {
		// this line is used by starport scaffolding # 2
		case types.QueryGetRepository:
			return getRepository(ctx, path[1], k, legacyQuerierCdc)

		case types.QueryListRepository:
			return listRepository(ctx, k, legacyQuerierCdc)

		case types.QueryGetUser:
			return getUser(ctx, path[1], k, legacyQuerierCdc)

		case types.QueryListUser:
			return listUser(ctx, k, legacyQuerierCdc)

		case types.QueryGetWhois:
			return getWhois(ctx, path[1], k, legacyQuerierCdc)

		case types.QueryListWhois:
			return listWhois(ctx, k, legacyQuerierCdc)

		default:
			err = sdkerrors.Wrapf(sdkerrors.ErrUnknownRequest, "unknown %s query endpoint: %s", types.ModuleName, path[0])
		}

		return res, err
	}
}
