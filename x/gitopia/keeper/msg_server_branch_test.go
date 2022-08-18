package keeper_test

/*
func TestBranchMsgServerCreate(t *testing.T) {
	srv, ctx := setupMsgServer(t)
	creator := "A"
	for i := 0; i < 5; i++ {
		resp, err := srv.CreateBranch(ctx, &types.MsgCreateBranch{Creator: creator})
		require.NoError(t, err)
		require.Equal(t, i, int(resp.Id))
	}
}

func TestBranchMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateBranch
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgUpdateBranch{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateBranch{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgUpdateBranch{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)
			_, err := srv.CreateBranch(ctx, &types.MsgCreateBranch{Creator: creator})
			require.NoError(t, err)

			_, err = srv.UpdateBranch(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestBranchMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteBranch
		err     error
	}{
		{
			desc:    "Completed",
			request: &types.MsgDeleteBranch{Creator: creator},
		},
		{
			desc:    "Unauthorized",
			request: &types.MsgDeleteBranch{Creator: "B"},
			err:     sdkerrors.ErrUnauthorized,
		},
		{
			desc:    "KeyNotFound",
			request: &types.MsgDeleteBranch{Creator: creator, Id: 10},
			err:     sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			srv, ctx := setupMsgServer(t)

			_, err := srv.CreateBranch(ctx, &types.MsgCreateBranch{Creator: creator})
			require.NoError(t, err)
			_, err = srv.DeleteBranch(ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
*/
