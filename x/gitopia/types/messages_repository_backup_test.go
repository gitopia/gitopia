package types

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgAddArweaveBackupRef_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}
	arweaveTxId := "drYsyF85HcvC7LM1hkzPPgTj3_zp3amcNVNobBmOxvc"
	invalidArweaveTxId := "drYsyF85HcvC7LM1hkzPPgTj3_zp3amcNVNobBmOx+/" // +,/ are invalid base64url characters

	tests := []struct {
		name string
		msg  MsgAddArweaveBackupRef
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgAddArweaveBackupRef{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid message",
			msg: MsgAddArweaveBackupRef{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Ref:          arweaveTxId,
			},
		}, {
			name: "invalid arweave tx id",
			msg: MsgAddArweaveBackupRef{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Ref:          invalidArweaveTxId,
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

func TestMsgUpdateIpfsBackupRef_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}
	ipfsCid := "Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z"
	invalidIpfsCid := "Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC+/" // +,/ are invalid base58 characters

	tests := []struct {
		name string
		msg  MsgUpdateIpfsBackupRef
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateIpfsBackupRef{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid message",
			msg: MsgUpdateIpfsBackupRef{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Ref:          ipfsCid,
			},
		}, {
			name: "invalid ipfs cid",
			msg: MsgUpdateIpfsBackupRef{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Ref:          invalidIpfsCid,
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
