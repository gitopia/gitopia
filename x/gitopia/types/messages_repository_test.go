package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgCreateRepository_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgCreateRepository
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgCreateRepository{
				Creator:   "invalid_address",
				Name:      "repository",
				OwnerId:   sample.AccAddress(),
				OwnerType: "USER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid repository",
			msg: MsgCreateRepository{
				Creator:   sample.AccAddress(),
				Name:      "repository",
				OwnerId:   sample.AccAddress(),
				OwnerType: "USER",
			},
		}, {
			name: "empty name",
			msg: MsgCreateRepository{
				Creator:   sample.AccAddress(),
				OwnerId:   sample.AccAddress(),
				OwnerType: "USER",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "too short name",
			msg: MsgCreateRepository{
				Creator:   sample.AccAddress(),
				Name:      "r",
				OwnerId:   sample.AccAddress(),
				OwnerType: "USER",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "name exceeds limit",
			msg: MsgCreateRepository{
				Creator:   sample.AccAddress(),
				Name:      strings.Repeat("r", 101),
				OwnerId:   sample.AccAddress(),
				OwnerType: "USER",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid name",
			msg: MsgCreateRepository{
				Creator:   sample.AccAddress(),
				Name:      "!nva1id",
				OwnerId:   sample.AccAddress(),
				OwnerType: "USER",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid owner id",
			msg: MsgCreateRepository{
				Creator:   sample.AccAddress(),
				Name:      "repository",
				OwnerId:   "invalid_address",
				OwnerType: "USER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid owner type",
			msg: MsgCreateRepository{
				Creator:   sample.AccAddress(),
				Name:      "repository",
				OwnerId:   sample.AccAddress(),
				OwnerType: "INVALID_OWNER",
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

func TestMsgForkRepository_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgForkRepository
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgForkRepository{
				Creator:   "invalid_address",
				OwnerId:   sample.AccAddress(),
				OwnerType: "USER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgForkRepository",
			msg: MsgForkRepository{
				Creator:   sample.AccAddress(),
				OwnerId:   sample.AccAddress(),
				OwnerType: "USER",
			},
		}, {
			name: "invalid owner id",
			msg: MsgForkRepository{
				Creator:   sample.AccAddress(),
				OwnerId:   "invalid_address",
				OwnerType: "USER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid owner type",
			msg: MsgForkRepository{
				Creator:   sample.AccAddress(),
				OwnerId:   sample.AccAddress(),
				OwnerType: "INVALID_OWNER",
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

func TestMsgChangeOwner_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgChangeOwner
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgChangeOwner{
				Creator:   "invalid_address",
				OwnerId:   sample.AccAddress(),
				OwnerType: "USER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgChangeOwner",
			msg: MsgChangeOwner{
				Creator:   sample.AccAddress(),
				OwnerId:   sample.AccAddress(),
				OwnerType: "USER",
			},
		}, {
			name: "invalid owner id",
			msg: MsgChangeOwner{
				Creator:   sample.AccAddress(),
				OwnerId:   "invalid_address",
				OwnerType: "USER",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid owner type",
			msg: MsgChangeOwner{
				Creator:   sample.AccAddress(),
				OwnerId:   sample.AccAddress(),
				OwnerType: "INVALID_OWNER",
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

func TestMsgUpdateRepositoryCollaborator_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateRepositoryCollaborator
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgUpdateRepositoryCollaborator{
				Creator: "invalid_address",
				User:    sample.AccAddress(),
				Role:    "READ",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgUpdateRepositoryCollaborator",
			msg: MsgUpdateRepositoryCollaborator{
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
				Role:    "READ",
			},
		}, {
			name: "invalid user id",
			msg: MsgUpdateRepositoryCollaborator{
				Creator: sample.AccAddress(),
				User:    "invalid_address",
				Role:    "ADMIN",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid user role",
			msg: MsgUpdateRepositoryCollaborator{
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
				Role:    "INVALID_ROLE",
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

func TestMsgRemoveRepositoryCollaborator_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgRemoveRepositoryCollaborator
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgRemoveRepositoryCollaborator{
				Creator: "invalid_address",
				User:    sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgUpdateRepositoryCollaborator",
			msg: MsgRemoveRepositoryCollaborator{
				Creator: sample.AccAddress(),
				User:    sample.AccAddress(),
			},
		}, {
			name: "invalid user id",
			msg: MsgRemoveRepositoryCollaborator{
				Creator: sample.AccAddress(),
				User:    "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
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

func TestMsgCreateRepositoryLabel_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgCreateRepositoryLabel
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgCreateRepositoryLabel{
				Creator: "invalid_address",
				Name:    "label",
				Color:   "color",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgCreateRepositoryLabel",
			msg: MsgCreateRepositoryLabel{
				Creator:     sample.AccAddress(),
				Name:        "label",
				Color:       "color",
				Description: "description",
			},
		}, {
			name: "too short label name",
			msg: MsgCreateRepositoryLabel{
				Creator: sample.AccAddress(),
				Name:    "l",
				Color:   "color",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label name exceeds limit",
			msg: MsgCreateRepositoryLabel{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("l", 64),
				Color:   "color",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label description exceeds limit",
			msg: MsgCreateRepositoryLabel{
				Creator:     sample.AccAddress(),
				Name:        "name",
				Color:       "color",
				Description: strings.Repeat("d", 256),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty label color",
			msg: MsgCreateRepositoryLabel{
				Creator: sample.AccAddress(),
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label color exceeds limit",
			msg: MsgCreateRepositoryLabel{
				Creator: sample.AccAddress(),
				Name:    "name",
				Color:   strings.Repeat("c", 11),
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

func TestMsgUpdateRepositoryLabel_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateRepositoryLabel
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgUpdateRepositoryLabel{
				Creator: "invalid_address",
				Name:    "label",
				Color:   "color",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgUpdateRepositoryLabel",
			msg: MsgUpdateRepositoryLabel{
				Creator:     sample.AccAddress(),
				Name:        "label",
				Color:       "color",
				Description: "description",
			},
		}, {
			name: "too short label name",
			msg: MsgUpdateRepositoryLabel{
				Creator: sample.AccAddress(),
				Name:    "l",
				Color:   "color",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label name exceeds limit",
			msg: MsgUpdateRepositoryLabel{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("l", 64),
				Color:   "color",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label description exceeds limit",
			msg: MsgUpdateRepositoryLabel{
				Creator:     sample.AccAddress(),
				Name:        "name",
				Color:       "color",
				Description: strings.Repeat("d", 256),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty label color",
			msg: MsgUpdateRepositoryLabel{
				Creator: sample.AccAddress(),
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label color exceeds limit",
			msg: MsgUpdateRepositoryLabel{
				Creator: sample.AccAddress(),
				Name:    "name",
				Color:   strings.Repeat("c", 11),
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

func TestMsgDeleteRepositoryLabel_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteRepositoryLabel
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteRepositoryLabel{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgDeleteRepositoryLabel{
				Creator: sample.AccAddress(),
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

func TestMsgSetRepositoryBranch_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgSetRepositoryBranch
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgSetRepositoryBranch{
				Creator:   "invalid_address",
				Name:      "branch",
				CommitSHA: "commit_sha",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgSetRepositoryBranch",
			msg: MsgSetRepositoryBranch{
				Creator:   sample.AccAddress(),
				Name:      "branch",
				CommitSHA: "56e05fced214c44a37759efa2dfc25a65d8ae98d",
			},
		}, {
			name: "empty branch name",
			msg: MsgSetRepositoryBranch{
				Creator:   sample.AccAddress(),
				CommitSHA: "commit_sha",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "branch nameexceeds limit",
			msg: MsgSetRepositoryBranch{
				Creator:   sample.AccAddress(),
				Name:      strings.Repeat("b", 256),
				CommitSHA: "commit_sha",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty commitSha",
			msg: MsgSetRepositoryBranch{
				Creator: sample.AccAddress(),
				Name:    "branch",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid commitSha",
			msg: MsgSetRepositoryBranch{
				Creator:   sample.AccAddress(),
				Name:      "branch",
				CommitSHA: "commit_sha",
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

func TestMsgSetDefaultBranch_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgSetDefaultBranch
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgSetDefaultBranch{
				Creator: "invalid_address",
				Name:    "branch",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgSetDefaultBranch",
			msg: MsgSetDefaultBranch{
				Creator: sample.AccAddress(),
				Name:    "branch",
			},
		}, {
			name: "empty branch name",
			msg: MsgSetDefaultBranch{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "branch nameexceeds limit",
			msg: MsgSetDefaultBranch{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("b", 256),
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

func TestMsgDeleteBranch_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteBranch
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteBranch{
				Creator: "invalid_address",
				Name:    "branch",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgDeleteBranch",
			msg: MsgDeleteBranch{
				Creator: sample.AccAddress(),
				Name:    "branch",
			},
		}, {
			name: "empty branch name",
			msg: MsgDeleteBranch{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "branch nameexceeds limit",
			msg: MsgDeleteBranch{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("b", 256),
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

func TestMsgSetRepositoryTag_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgSetRepositoryTag
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgSetRepositoryTag{
				Creator: "invalid_address",
				Name:    "tag",
				Sha:     "commit_sha",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgSetRepositoryTag",
			msg: MsgSetRepositoryTag{
				Creator: sample.AccAddress(),
				Name:    "tag",
				Sha:     "56e05fced214c44a37759efa2dfc25a65d8ae98d",
			},
		}, {
			name: "empty tag name",
			msg: MsgSetRepositoryTag{
				Creator: sample.AccAddress(),
				Sha:     "Sha",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "tag name exceeds limit",
			msg: MsgSetRepositoryTag{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("b", 256),
				Sha:     "Sha",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty Sha",
			msg: MsgSetRepositoryTag{
				Creator: sample.AccAddress(),
				Name:    "tag",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid Sha",
			msg: MsgSetRepositoryTag{
				Creator: sample.AccAddress(),
				Name:    "tag",
				Sha:     "sha",
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
	tests := []struct {
		name string
		msg  MsgDeleteTag
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteTag{
				Creator: "invalid_address",
				Name:    "branch",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgDeleteTag",
			msg: MsgDeleteTag{
				Creator: sample.AccAddress(),
				Name:    "branch",
			},
		}, {
			name: "empty tag name",
			msg: MsgDeleteTag{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "tag name exceeds limit",
			msg: MsgDeleteTag{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("b", 256),
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

func TestMsgToggleRepositoryForking_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgToggleRepositoryForking
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgToggleRepositoryForking{
				Creator: "invalid_address",
				Id:      0,
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgToggleRepositoryForking",
			msg: MsgToggleRepositoryForking{
				Creator: sample.AccAddress(),
				Id:      0,
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

func TestMsgRenameRepository_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgRenameRepository
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgRenameRepository{
				Creator: "invalid_address",
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgRenameRepository",
			msg: MsgRenameRepository{
				Creator: sample.AccAddress(),
				Name:    "name",
			},
		}, {
			name: "empty name",
			msg: MsgRenameRepository{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "too short name",
			msg: MsgRenameRepository{
				Creator: sample.AccAddress(),
				Name:    "r",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "name exceeds limit",
			msg: MsgRenameRepository{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("r", 101),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid name",
			msg: MsgRenameRepository{
				Creator: sample.AccAddress(),
				Name:    "!nva1id",
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

func TestMsgDeleteRepository_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteRepository
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteRepository{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgDeleteRepository{
				Creator: sample.AccAddress(),
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
