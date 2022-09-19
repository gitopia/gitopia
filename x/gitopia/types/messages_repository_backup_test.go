package types

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgAddRepositoryBackupRef_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgAddRepositoryBackupRef
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgAddRepositoryBackupRef{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid storage provider address",
			msg: MsgAddRepositoryBackupRef{
				Creator:                sample.AccAddress(),
				RepositoryId:           repositoryId,
				StorageProviderAddress: "invalid_address",
				Store:                  StorageProvider_IPFS,
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid store",
			msg: MsgAddRepositoryBackupRef{
				Creator:                sample.AccAddress(),
				RepositoryId:           repositoryId,
				StorageProviderAddress: sample.AccAddress(),
				Store:                  9,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid message",
			msg: MsgAddRepositoryBackupRef{
				Creator:                sample.AccAddress(),
				RepositoryId:           repositoryId,
				StorageProviderAddress: sample.AccAddress(),
				Store:                  StorageProvider_IPFS,
			},
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

func TestMsgUpdateRepositoryBackupRef_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgUpdateRepositoryBackupRef
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateRepositoryBackupRef{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid storage provider address",
			msg: MsgUpdateRepositoryBackupRef{
				Creator:                sample.AccAddress(),
				RepositoryId:           repositoryId,
				StorageProviderAddress: "invalid_address",
				Store:                  StorageProvider_IPFS,
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid store",
			msg: MsgUpdateRepositoryBackupRef{
				Creator:                sample.AccAddress(),
				RepositoryId:           repositoryId,
				StorageProviderAddress: sample.AccAddress(),
				Store:                  9,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid message",
			msg: MsgUpdateRepositoryBackupRef{
				Creator:                sample.AccAddress(),
				RepositoryId:           repositoryId,
				StorageProviderAddress: sample.AccAddress(),
				Store:                  StorageProvider_IPFS,
			},
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
