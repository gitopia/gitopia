package types

import (
	fmt "fmt"
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/v3/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgCreateRelease_ValidateBasic(t *testing.T) {
	repositoryId := RepositoryId{
		Id:   sample.AccAddress(),
		Name: "repository",
	}

	tests := []struct {
		name string
		msg  MsgCreateRelease
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgCreateRelease{
				Creator:      "invalid_address",
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
				Name:         "name",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
				Name:         "name",
			},
		}, {
			name: "too short name",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "name exceeds limit",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
				Name:         strings.Repeat("t", 256),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "too short tag name",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				Target:       "target",
				Name:         "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "tag name exceeds limit",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      strings.Repeat("t", 64),
				Target:       "target",
				Name:         "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "too short target",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Name:         "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "target exceeds limit",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       strings.Repeat("t", 64),
				Name:         "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "description exceeds limit",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
				Name:         "name",
				Description:  strings.Repeat("t", 20001),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid attachments",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
				Name:         "name",
				Attachments:  "invalid_attachments",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid attachments",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
				Name:         "name",
				Attachments: fmt.Sprintf(
					`[{"name": "filename1", "size": 256, "sha": "sha","uploader":"%s"},
					 {"name": "filename2", "size": 256, "sha": "sha","uploader":"%s"}]`,
					sample.AccAddress(), sample.AccAddress(),
				),
			},
		}, {
			name: "invalid attachment name",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
				Name:         "name",
				Attachments: fmt.Sprintf(
					`[{"name": "", "size": 256, "sha": "sha","uploader":"%s"}]`,
					sample.AccAddress(),
				),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid attachment size",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
				Name:         "name",
				Attachments: fmt.Sprintf(
					`[{"name": "filename", "size": 0, "sha": "sha","uploader":"%s"}]`,
					sample.AccAddress(),
				),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid attachment sha",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
				Name:         "name",
				Attachments: fmt.Sprintf(
					`[{"name": "filename", "size": 256, "sha": "","uploader":"%s"}]`,
					sample.AccAddress(),
				),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid attachment uploader",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
				Name:         "name",
				Attachments: fmt.Sprintf(
					`[{"name": "filename", "size": 256, "sha": "","uploader":"invalid_uploader"}]`,
				),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "duplicate attachment name",
			msg: MsgCreateRelease{
				Creator:      sample.AccAddress(),
				RepositoryId: repositoryId,
				TagName:      "tag_name",
				Target:       "target",
				Name:         "name",
				Attachments: fmt.Sprintf(
					`[{"name": "filename", "size": 256, "sha": "sha","uploader":"%s"},
					 {"name": "filename", "size": 256, "sha": "sha","uploader":"%s"}]`,
					sample.AccAddress(), sample.AccAddress(),
				),
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

func TestMsgUpdateRelease_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateRelease
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateRelease{
				Creator: "invalid_address",
				TagName: "tag_name",
				Target:  "target",
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: "tag_name",
				Target:  "target",
				Name:    "name",
			},
		}, {
			name: "too short name",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: "tag_name",
				Target:  "target",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "name exceeds limit",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: "tag_name",
				Target:  "target",
				Name:    strings.Repeat("t", 256),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "too short tag name",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				Target:  "target",
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "tag name exceeds limit",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: strings.Repeat("t", 64),
				Target:  "target",
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "too short target",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: "tag_name",
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "target exceeds limit",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: "tag_name",
				Target:  strings.Repeat("t", 64),
				Name:    "name",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "description exceeds limit",
			msg: MsgUpdateRelease{
				Creator:     sample.AccAddress(),
				TagName:     "tag_name",
				Target:      "target",
				Name:        "name",
				Description: strings.Repeat("t", 20001),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid attachments",
			msg: MsgUpdateRelease{
				Creator:     sample.AccAddress(),
				TagName:     "tag_name",
				Target:      "target",
				Name:        "name",
				Attachments: "invalid_attachments",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid attachments",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: "tag_name",
				Target:  "target",
				Name:    "name",
				Attachments: fmt.Sprintf(
					`[{"name": "filename1", "size": 256, "sha": "sha","uploader":"%s"},
					 {"name": "filename2", "size": 256, "sha": "sha","uploader":"%s"}]`,
					sample.AccAddress(), sample.AccAddress(),
				),
			},
		}, {
			name: "invalid attachment name",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: "tag_name",
				Target:  "target",
				Name:    "name",
				Attachments: fmt.Sprintf(
					`[{"name": "", "size": 256, "sha": "sha","uploader":"%s"}]`,
					sample.AccAddress(),
				),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid attachment size",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: "tag_name",
				Target:  "target",
				Name:    "name",
				Attachments: fmt.Sprintf(
					`[{"name": "filename", "size": 0, "sha": "sha","uploader":"%s"}]`,
					sample.AccAddress(),
				),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid attachment sha",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: "tag_name",
				Target:  "target",
				Name:    "name",
				Attachments: fmt.Sprintf(
					`[{"name": "filename", "size": 256, "sha": "","uploader":"%s"}]`,
					sample.AccAddress(),
				),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid attachment uploader",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: "tag_name",
				Target:  "target",
				Name:    "name",
				Attachments: fmt.Sprintf(
					`[{"name": "filename", "size": 256, "sha": "","uploader":"invalid_uploader"}]`,
				),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "duplicate attachment name",
			msg: MsgUpdateRelease{
				Creator: sample.AccAddress(),
				TagName: "tag_name",
				Target:  "target",
				Name:    "name",
				Attachments: fmt.Sprintf(
					`[{"name": "filename", "size": 256, "sha": "sha","uploader":"%s"},
					 {"name": "filename", "size": 256, "sha": "sha","uploader":"%s"}]`,
					sample.AccAddress(), sample.AccAddress(),
				),
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

func TestMsgDeleteRelease_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteRelease
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteRelease{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgDeleteRelease{
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
