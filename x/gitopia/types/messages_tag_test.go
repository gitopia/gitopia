package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v6/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgSetTag_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgSetTag
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgSetTag{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				Tag: MsgSetTag_Tag{
					Name: "tag",
					Sha:  "commit_sha",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgSetTag",
			msg: MsgSetTag{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Tag: MsgSetTag_Tag{
					Name: "tag",
					Sha:  "56e05fced214c44a37759efa2dfc25a65d8ae98d",
				},
			},
		}, {
			name: "empty tag name",
			msg: MsgSetTag{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Tag:          MsgSetTag_Tag{Sha: "Sha"},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "tag name exceeds limit",
			msg: MsgSetTag{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Tag: MsgSetTag_Tag{
					Name: strings.Repeat("b", 256),
					Sha:  "Sha",
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty Sha",
			msg: MsgSetTag{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Tag:          MsgSetTag_Tag{Name: "tag"},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid Sha",
			msg: MsgSetTag{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Tag: MsgSetTag_Tag{
					Name: "tag",
					Sha:  "sha",
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}

func TestMsgDeleteTag_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgDeleteTag
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteTag{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				Tag:          "tag",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgDeleteTag",
			msg: MsgDeleteTag{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Tag:          "tag",
			},
		}, {
			name: "empty tag name",
			msg: MsgDeleteTag{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "tag name exceeds limit",
			msg: MsgDeleteTag{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Tag:          strings.Repeat("b", 256),
			},
			err: sdkerrors.ErrInvalidRequest,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}
