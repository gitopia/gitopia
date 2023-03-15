package keeper_test

import (
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/stretchr/testify/require"
)

func (suite *KeeperTestSuite) TestBountyMsgServerCreate() {
	suite.SetupValidator(stakingtypes.Bonded)
	suite.SetupTest()
	_, _, issueIid, _ := suite.setupPreBounty()

	for _, tc := range []struct {
		desc    string
		request *types.MsgCreateBounty
		err     error
	}{
		{
			desc: "Invalid repository id or issue iid",
			request: &types.MsgCreateBounty{Creator: string(suite.TestAccs[0]),
				Expiry: time.Now().Add(time.Hour * 24).Unix(),
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "Invalid expiry",
			request: &types.MsgCreateBounty{Creator: string(suite.TestAccs[0]),
				Amount:       []sdk.Coin{{Denom: "utlore", Amount: sdk.NewInt(1000)}},
				Expiry:       time.Time{}.Unix(),
				RepositoryId: 0,
			},
			err: sdkerrors.ErrInvalidRequest,
		},
		{
			desc: "Success",
			request: &types.MsgCreateBounty{Creator: string(suite.TestAccs[0]),
				Amount:    []sdk.Coin{{Denom: "utlore", Amount: sdk.NewInt(1000)}},
				Expiry:    time.Now().Add(time.Hour * 24).Unix(),
				ParentIid: issueIid,
			},
		},
	} {
		suite.Run(tc.desc, func() {
			_, err := suite.msgServer.CreateBounty(suite.Ctx, tc.request)
			if tc.err != nil {
				suite.Require().Error(err)
			} else {
				suite.Require().NoError(err)
			}
		})
	}
}

func TestBountyMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateBountyExpiry
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateBountyExpiry{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateBountyExpiry{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateBountyExpiry{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateBounty(ctx, &types.MsgCreateBounty{Creator: creator})
			require.NoError(t, err)

			_, err = srv.UpdateBountyExpiry(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestBountyMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteBounty
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteBounty{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteBounty{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteBounty{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)

			_, err := srv.CreateBounty(ctx, &types.MsgCreateBounty{Creator: creator})
			require.NoError(t, err)
			_, err = srv.DeleteBounty(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func (suite *KeeperTestSuite) setupPreBounty() (users []string, repositoryId types.RepositoryId, issueId uint64, pullRequestId uint64) {
	users = append(users,
		string(suite.TestAccs[0]),
		string(suite.TestAccs[1]))
	repositoryId = types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	branches := []string{"branch-X", "branch-Y"}

	for _, user := range users {
		_, err := suite.msgServer.CreateUser(suite.Ctx, &types.MsgCreateUser{Creator: user, Username: user})
		suite.Require().NoError(err)
	}

	_, err := suite.msgServer.CreateRepository(suite.Ctx, &types.MsgCreateRepository{Creator: users[0], Name: "repository", Owner: users[0]})
	suite.Require().NoError(err)

	for _, branch := range branches {
		_, err = suite.msgServer.SetBranch(suite.Ctx, &types.MsgSetBranch{
			Creator:      users[0],
			RepositoryId: repositoryId,
			Branch: types.MsgSetBranch_Branch{
				Name: branch,
			},
		})
		suite.Require().NoError(err)
	}

	issue, err := suite.msgServer.CreateIssue(suite.Ctx, &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId, Title: "issue"})
	suite.Require().NoError(err)

	pullRequest, err := suite.msgServer.CreatePullRequest(suite.Ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	suite.Require().NoError(err)

	return users, repositoryId, issue.Iid, pullRequest.Id
}
