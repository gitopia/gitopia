package keeper

import (
	"fmt"

	"github.com/cometbft/cometbft/libs/log"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	authzkeeper "github.com/cosmos/cosmos-sdk/x/authz/keeper"
	bankKeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	distrkeeper "github.com/cosmos/cosmos-sdk/x/distribution/keeper"
	groupkeeper "github.com/cosmos/cosmos-sdk/x/group/keeper"
	mintkeeper "github.com/cosmos/cosmos-sdk/x/mint/keeper"
	"github.com/gitopia/gitopia/v6/x/gitopia/types"
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
		mintKeeper    *mintkeeper.Keeper
		distrKeeper   *distrkeeper.Keeper
		groupKeeper   *groupkeeper.Keeper
		storageKeeper types.StorageKeeper

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority string
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
	mintKeeper *mintkeeper.Keeper,
	distrKeeper *distrkeeper.Keeper,
	groupKeeper *groupkeeper.Keeper,
	storageKeeper types.StorageKeeper,
	authority string,
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
		distrKeeper:   distrKeeper,
		groupKeeper:   groupKeeper,
		storageKeeper: storageKeeper,
		authority:     authority,
	}
}

// GetAuthority returns the x/gitopia module's authority.
func (k *Keeper) GetAuthority() string {
	return k.authority
}

func (k *Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) createModuleAccount(ctx sdk.Context, name string, amount sdk.Coin) error {
	if amount.IsNil() || amount.Amount.IsZero() {
		return sdkerrors.Wrap(sdkerrors.ErrLogic, "amount cannot be nil or zero")
	}

	moduleAcc := authtypes.NewEmptyModuleAccount(
		name, authtypes.Minter)
	k.accountKeeper.SetModuleAccount(ctx, moduleAcc)

	err := k.bankKeeper.MintCoins(ctx, name, sdk.NewCoins(amount))
	if err != nil {
		return err
	}
	return nil
}

func (k *Keeper) SetStorageKeeper(storageKeeper types.StorageKeeper) {
	k.storageKeeper = storageKeeper
}
