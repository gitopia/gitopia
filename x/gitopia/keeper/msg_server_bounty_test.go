package keeper_test

/* Needs Fix

func TestBountyMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"
	for i := 0; i < 5; i++ {
		resp, err := srv.CreateBounty(ctx, &types.MsgCreateBounty{Creator: creator})
		require.NoError(t, err)
		require.Equal(t, i, int(resp.Id))
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

func setupPreBounty(ctx context.Context, t *testing.T, srv types.MsgServer) (users []string, repositoryId types.RepositoryId, issueId uint64, pullRequestId uint64) {
	users = append(users, "A", "B")
	repositoryId = types.RepositoryId{
		Id:   users[0],
		Name: "repository",
	}
	branches := []string{"branch-X", "branch-Y"}

	for _, user := range users {
		_, err := srv.CreateUser(ctx, &types.MsgCreateUser{Creator: user, Username: user})
		require.NoError(t, err)

	}

	_, err := srv.CreateRepository(ctx, &types.MsgCreateRepository{Creator: users[0], Name: "repository", Owner: users[0]})
	require.NoError(t, err)

	for _, branch := range branches {
		_, err = srv.SetBranch(ctx, &types.MsgSetBranch{
			Creator:      users[0],
			RepositoryId: repositoryId,
			Branch: types.MsgSetBranch_Branch{
				Name: branch,
			},
		})
		require.NoError(t, err)
	}

	issue, err := srv.CreateIssue(ctx, &types.MsgCreateIssue{Creator: users[0], RepositoryId: repositoryId})
	require.NoError(t, err)

	pullRequest, err := srv.CreatePullRequest(ctx, &types.MsgCreatePullRequest{Creator: users[0], HeadRepositoryId: repositoryId, HeadBranch: branches[0], BaseRepositoryId: repositoryId, BaseBranch: branches[1]})
	require.NoError(t, err)

	return users, repositoryId, issue.Id, pullRequest.Id
}
*/
