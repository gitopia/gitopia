package types

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v6/testutil/sample"
	"github.com/stretchr/testify/require"
)

const (
	ipfsCid            = "Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z"
	invalidIpfsCid     = "Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC+/" // +,/ are invalid base58 characters
	arweaveTxId        = "drYsyF85HcvC7LM1hkzPPgTj3_zp3amcNVNobBmOxvc"
	invalidArweaveTxId = "drYsyF85HcvC7LM1hkzPPgTj3_zp3amcNVNobBmOx+/" // +,/ are invalid base64url characters
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
			name: "valid message",
			msg: MsgAddRepositoryBackupRef{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Store:        RepositoryBackup_ARWEAVE,
				Ref:          arweaveTxId,
			},
		}, {
			name: "invalid arweave tx id",
			msg: MsgAddRepositoryBackupRef{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Store:        RepositoryBackup_ARWEAVE,
				Ref:          invalidArweaveTxId,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid store type",
			msg: MsgAddRepositoryBackupRef{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Store:        9,
				Ref:          arweaveTxId,
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
			name: "valid message",
			msg: MsgUpdateRepositoryBackupRef{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Store:        RepositoryBackup_IPFS,
				Ref:          ipfsCid,
			},
		}, {
			name: "invalid ipfs cid",
			msg: MsgUpdateRepositoryBackupRef{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Store:        RepositoryBackup_IPFS,
				Ref:          invalidIpfsCid,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid store type",
			msg: MsgUpdateRepositoryBackupRef{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Store:        9,
				Ref:          arweaveTxId,
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
