package keeper

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authzkeeper "github.com/cosmos/cosmos-sdk/x/authz/keeper"
	bankKeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	mintkeeper "github.com/cosmos/cosmos-sdk/x/mint/keeper"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/tendermint/tendermint/libs/log"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type (
	Keeper struct {
		cdc                 codec.BinaryCodec
		storeKey            storetypes.StoreKey
		memKey              storetypes.StoreKey
		minterAccountName   string
		feeCollectorAccount string

		accountKeeper authkeeper.AccountKeeper
		authzKeeper   *authzkeeper.Keeper
		bankKeeper    bankKeeper.Keeper
		mintKeeper    mintkeeper.Keeper
		// this line is used by starport scaffolding # ibc/keeper/attribute
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey storetypes.StoreKey,
	minterAccountName string,
	feeCollectorAccount string,
	ak authkeeper.AccountKeeper,
	authzKeeper *authzkeeper.Keeper,
	bankKeeper bankKeeper.Keeper,
	mintKeeper mintkeeper.Keeper,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *Keeper {
	return &Keeper{
		cdc:                 cdc,
		storeKey:            storeKey,
		memKey:              memKey,
		minterAccountName:   minterAccountName,
		feeCollectorAccount: feeCollectorAccount,

		accountKeeper: ak,
		authzKeeper:   authzKeeper,
		bankKeeper:    bankKeeper,
		mintKeeper:    mintKeeper,
		// this line is used by starport scaffolding # ibc/keeper/return
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
