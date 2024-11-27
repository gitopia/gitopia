package keeper_test

import (
	"testing"
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/bank/testutil"
	"github.com/gitopia/gitopia/v5/app/params"
	"github.com/gitopia/gitopia/v5/testutil/sample"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
	"github.com/stretchr/testify/assert"
)

func TestBountyMsgServerCreate(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	user := sample.AccAddress()
	userAddr, err := sdk.AccAddressFromBech32(user)
	assert.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: user, Username: user})
	assert.NoError(t, err)
	testutil.FundAccount(keepers.BankKeeper, ctx, userAddr, sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000))))

	rRes, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: user, Name: "repository", Owner: user})
	assert.NoError(t, err)

	iRes, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: user, RepositoryId: rRes.RepositoryId, Title: "issue"})
	assert.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateBounty
		err     error
	}{
		{
			desc: "Invalid repository id or issue iid",
			request: &types.MsgCreateBounty{
				Creator: user,
				Expiry:  time.Now().Add(time.Hour * 24).Unix(),
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "Invalid expiry",
			request: &types.MsgCreateBounty{
				Creator:      user,
				Amount:       []sdk.Coin{{Denom: params.BaseCoinUnit, Amount: sdk.NewInt(1000)}},
				Expiry:       time.Time{}.Unix(),
				RepositoryId: 0,
			},
			err: sdkerrors.ErrInvalidRequest,
		},
		{
			desc: "Success",
			request: &types.MsgCreateBounty{
				Creator:   user,
				Amount:    []sdk.Coin{{Denom: params.BaseCoinUnit, Amount: sdk.NewInt(1000)}},
				Expiry:    time.Now().Add(time.Hour * 24).Unix(),
				ParentIid: iRes.Iid,
			},
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err := srv.CreateBounty(ctx, tc.request)
			if tc.err != nil {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}

func TestBountyMsgServerUpdate(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	user := sample.AccAddress()
	userAddr, err := sdk.AccAddressFromBech32(user)
	assert.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: user, Username: user})
	assert.NoError(t, err)
	testutil.FundAccount(keepers.BankKeeper, ctx, userAddr, sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, math.NewInt(1000))))
	user2 := sample.AccAddress()
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: user2, Username: user2})
	assert.NoError(t, err)

	rRes, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: user, Name: "repository", Owner: user})
	assert.NoError(t, err)

	iRes, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: user, RepositoryId: rRes.RepositoryId, Title: "issue"})
	assert.NoError(t, err)

	bRes, err := srv.CreateBounty(ctx, &types.MsgCreateBounty{
		Creator:   user,
		Amount:    []sdk.Coin{{Denom: params.BaseCoinUnit, Amount: sdk.NewInt(1000)}},
		Expiry:    time.Now().Add(time.Hour * 24).Unix(),
		ParentIid: iRes.Iid,
	})
	assert.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateBountyExpiry
		err     error
	}{
		{
			desc: "Success",
			request: &types.MsgUpdateBountyExpiry{
				Creator: user,
				Id:      bRes.Id,
				Expiry:  time.Now().Add(time.Hour * 24 * 2).Unix(),
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgUpdateBountyExpiry{
				Creator: user2,
				Id:      bRes.Id,
				Expiry:  time.Now().Add(time.Hour * 24 * 2).Unix(),
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "not found",
			request: &types.MsgUpdateBountyExpiry{
				Creator: sample.AccAddress(),
				Id:      10,
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "past expiry",
			request: &types.MsgUpdateBountyExpiry{
				Creator: user,
				Id:      bRes.Id,
				Expiry:  time.Now().Add(time.Hour * -24).Unix(),
			},
			err: sdkerrors.ErrInvalidRequest,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.UpdateBountyExpiry(ctx, tc.request)
			if tc.err != nil {
				assert.ErrorIs(t, err, tc.err)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}

func TestBountyMsgServerDelete(t *testing.T) {
	srv, context, keepers := setupMsgServerWithKeepers(t)
	ctx := sdk.UnwrapSDKContext(context)
	user := sample.AccAddress()
	userAddr, err := sdk.AccAddressFromBech32(user)
	assert.NoError(t, err)
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: user, Username: user})
	assert.NoError(t, err)
	testutil.FundAccount(keepers.BankKeeper, ctx, userAddr, sdk.NewCoins(sdk.NewCoin(params.BaseCoinUnit, math.NewInt(10000))))
	user2 := sample.AccAddress()
	_, err = srv.CreateUser(ctx, &types.MsgCreateUser{Creator: user2, Username: user2})
	assert.NoError(t, err)

	rRes, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: user, Name: "repository", Owner: user})
	assert.NoError(t, err)

	iRes, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: user, RepositoryId: rRes.RepositoryId, Title: "issue"})
	assert.NoError(t, err)

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteBounty
		err     error
	}{
		{
			desc: "Success",
			request: &types.MsgDeleteBounty{
				Creator: user,
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgDeleteBounty{
				Creator: user2,
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "KeyNotFound",
			request: &types.MsgDeleteBounty{
				Creator: user,
				Id:      10,
			},
			err: sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			bRes, err := srv.CreateBounty(ctx, &types.MsgCreateBounty{
				Creator:   user,
				Amount:    []sdk.Coin{{Denom: params.BaseCoinUnit, Amount: sdk.NewInt(1000)}},
				Expiry:    time.Now().Add(time.Hour * 24).Unix(),
				ParentIid: iRes.Iid,
			})
			assert.NoError(t, err)
			if tc.request.Id == 0 {
				tc.request.Id = bRes.Id
			}
			_, err = srv.DeleteBounty(ctx, tc.request)
			if tc.err != nil {
				assert.ErrorIs(t, err, tc.err)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}
