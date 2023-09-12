package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v3/testutil/sample"
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
				Creator: "invalid_address",
				Name:    "repository",
				Owner:   sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid repository",
			msg: MsgCreateRepository{
				Creator: sample.AccAddress(),
				Name:    "repository",
				Owner:   sample.AccAddress(),
			},
		}, {
			name: "empty name",
			msg: MsgCreateRepository{
				Creator: sample.AccAddress(),
				Owner:   sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "too short name",
			msg: MsgCreateRepository{
				Creator: sample.AccAddress(),
				Name:    "r",
				Owner:   sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "name exceeds limit",
			msg: MsgCreateRepository{
				Creator: sample.AccAddress(),
				Name:    strings.Repeat("r", 101),
				Owner:   sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid name",
			msg: MsgCreateRepository{
				Creator: sample.AccAddress(),
				Name:    "!nva1id",
				Owner:   sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid owner id",
			msg: MsgCreateRepository{
				Creator: sample.AccAddress(),
				Name:    "repository",
				Owner:   "invalid_address",
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
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgForkRepository
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgForkRepository{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				Owner:        sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgForkRepository",
			msg: MsgForkRepository{
				Creator:            sample.AccAddress(),
				RepositoryId:       repositoryId,
				ForkRepositoryName: "repo-name",
				Owner:              sample.AccAddress(),
			},
		}, {
			name: "invalid owner id",
			msg: MsgForkRepository{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Owner:        "invalid_address",
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
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgChangeOwner
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgChangeOwner{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				Owner:        sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgChangeOwner",
			msg: MsgChangeOwner{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Owner:        sample.AccAddress(),
			},
		}, {
			name: "invalid owner id",
			msg: MsgChangeOwner{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Owner:        "invalid_address",
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
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgUpdateRepositoryCollaborator
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgUpdateRepositoryCollaborator{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				User:         sample.AccAddress(),
				Role:         "READ",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgUpdateRepositoryCollaborator",
			msg: MsgUpdateRepositoryCollaborator{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				User:         sample.AccAddress(),
				Role:         "READ",
			},
		}, {
			name: "invalid user id",
			msg: MsgUpdateRepositoryCollaborator{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				User:         "invalid_address",
				Role:         "ADMIN",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid user role",
			msg: MsgUpdateRepositoryCollaborator{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				User:         sample.AccAddress(),
				Role:         "INVALID_ROLE",
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

func TestMsgToggleRepositoryArchived_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgToggleRepositoryArchived
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgToggleRepositoryArchived{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgToggleRepositoryArchived",
			msg: MsgToggleRepositoryArchived{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
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

func TestMsgRemoveRepositoryCollaborator_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgRemoveRepositoryCollaborator
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgRemoveRepositoryCollaborator{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				User:         sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgUpdateRepositoryCollaborator",
			msg: MsgRemoveRepositoryCollaborator{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				User:         sample.AccAddress(),
			},
		}, {
			name: "invalid user id",
			msg: MsgRemoveRepositoryCollaborator{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				User:         "invalid_address",
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

func TestMsgCreateRepositoryLabel_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgCreateRepositoryLabel
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgCreateRepositoryLabel{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				Name:         "label",
				Color:        "color",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgCreateRepositoryLabel",
			msg: MsgCreateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "label",
				Color:        "color",
				Description:  "description",
			},
		}, {
			name: "too short label name",
			msg: MsgCreateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "l",
				Color:        "color",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label name exceeds limit",
			msg: MsgCreateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         strings.Repeat("l", 64),
				Color:        "color",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label description exceeds limit",
			msg: MsgCreateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "name",
				Color:        "color",
				Description:  strings.Repeat("d", 256),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty label color",
			msg: MsgCreateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label color exceeds limit",
			msg: MsgCreateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "name",
				Color:        strings.Repeat("c", 11),
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
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgUpdateRepositoryLabel
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgUpdateRepositoryLabel{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				Name:         "label",
				Color:        "color",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgUpdateRepositoryLabel",
			msg: MsgUpdateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "label",
				Color:        "color",
				Description:  "description",
			},
		}, {
			name: "too short label name",
			msg: MsgUpdateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "l",
				Color:        "color",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label name exceeds limit",
			msg: MsgUpdateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         strings.Repeat("l", 64),
				Color:        "color",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label description exceeds limit",
			msg: MsgUpdateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "name",
				Color:        "color",
				Description:  strings.Repeat("d", 256),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty label color",
			msg: MsgUpdateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "label color exceeds limit",
			msg: MsgUpdateRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "name",
				Color:        strings.Repeat("c", 11),
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
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgDeleteRepositoryLabel
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteRepositoryLabel{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgDeleteRepositoryLabel{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
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

func TestMsgToggleRepositoryForking_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgToggleRepositoryForking
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgToggleRepositoryForking{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgToggleRepositoryForking",
			msg: MsgToggleRepositoryForking{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
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
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgRenameRepository
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgRenameRepository{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				Name:         "name",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgRenameRepository",
			msg: MsgRenameRepository{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "name",
			},
		}, {
			name: "empty name",
			msg: MsgRenameRepository{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "too short name",
			msg: MsgRenameRepository{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "r",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "name exceeds limit",
			msg: MsgRenameRepository{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         strings.Repeat("r", 101),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid name",
			msg: MsgRenameRepository{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Name:         "!nva1id",
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
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgDeleteRepository
		err  error
	}{
		{
			name: "WIP",
			msg: MsgDeleteRepository{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
			},
			err: sdkerrors.ErrNotSupported,
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
