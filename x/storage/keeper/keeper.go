package keeper

import (
	"fmt"

	"github.com/cometbft/cometbft/libs/log"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	gitopiakeeper "github.com/gitopia/gitopia/v6/x/gitopia/keeper"
	gitopiatypes "github.com/gitopia/gitopia/v6/x/gitopia/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

type (
	Keeper struct {
		cdc           codec.BinaryCodec
		storeKey      storetypes.StoreKey
		memKey        storetypes.StoreKey
		bankKeeper    bankkeeper.Keeper
		gitopiaKeeper *gitopiakeeper.Keeper
		accountKeeper types.AccountKeeper

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority string
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey storetypes.StoreKey,
	accountKeeper types.AccountKeeper,
	bankKeeper bankkeeper.Keeper,
	gitopiaKeeper *gitopiakeeper.Keeper,
	authority string,
) Keeper {

	if addr := accountKeeper.GetModuleAddress(types.StorageBondedPoolName); addr == nil {
		panic(fmt.Sprintf("%s module account has not been set", types.StorageBondedPoolName))
	}

	if addr := accountKeeper.GetModuleAddress(types.StorageFeePoolName); addr == nil {
		panic(fmt.Sprintf("%s module account has not been set", types.StorageFeePoolName))
	}

	if addr := accountKeeper.GetModuleAddress(types.ChallengeSlashPoolName); addr == nil {
		panic(fmt.Sprintf("%s module account has not been set", types.ChallengeSlashPoolName))
	}

	// ensure that authority is a valid AccAddress
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic("authority is not a valid acc address")
	}

	return Keeper{
		cdc:           cdc,
		storeKey:      storeKey,
		memKey:        memKey,
		bankKeeper:    bankKeeper,
		gitopiaKeeper: gitopiaKeeper,
		authority:     authority,
	}
}

// GetAuthority returns the x/storage module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) GetPreviousBlockInfo(ctx sdk.Context) types.BlockInfo {
	store := ctx.KVStore(k.storeKey)
	bytes := store.Get([]byte(types.PreviousBlockInfoKey))

	if bytes == nil {
		return types.BlockInfo{}
	}

	var info types.BlockInfo
	k.cdc.MustUnmarshal(bytes, &info)
	return info
}

func (k Keeper) SetPreviousBlockInfo(ctx sdk.Context, info *types.BlockInfo) {
	store := ctx.KVStore(k.storeKey)
	b := k.cdc.MustMarshal(info)
	store.Set([]byte(types.PreviousBlockInfoKey), b)
}

// withdraw provider rewards
func (k Keeper) WithdrawProviderRewards(ctx sdk.Context, provider sdk.AccAddress) (sdk.Coins, error) {
	// fetch provider rewards
	rewards := k.GetProviderRewards(ctx, provider)
	if rewards.Rewards.IsZero() {
		return nil, types.ErrNoProviderRewards
	}

	amount, remainder := rewards.Rewards.TruncateDecimal()
	k.SetProviderRewards(ctx, provider, types.ProviderRewards{Rewards: remainder}) // leave remainder to withdraw later

	if !amount.IsZero() {
		err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, gitopiatypes.EcosystemIncentivesAccountName, provider, amount)
		if err != nil {
			return nil, err
		}
	}

	return amount, nil
}
