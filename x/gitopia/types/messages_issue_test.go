package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgCreateIssue_ValidateBasic(t *testing.T) {
	sampleAddr := sample.AccAddress()
	tests := []struct {
		name string
		msg  MsgCreateIssue
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgCreateIssue{
				Creator:     "invalid_address",
				Title:       "title",
				Description: "description",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgCreateIssue",
			msg: MsgCreateIssue{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
			},
		}, {
			name: "empty title",
			msg: MsgCreateIssue{
				Creator:     sample.AccAddress(),
				Description: "description",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "title exceeds limit",
			msg: MsgCreateIssue{
				Creator:     sample.AccAddress(),
				Title:       strings.Repeat("t", 256),
				Description: "description",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "description exceeds limit",
			msg: MsgCreateIssue{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: strings.Repeat("d", 20001),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "assignees exceeds limit",
			msg: MsgCreateIssue{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				Assignees: []string{
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid assignees",
			msg: MsgCreateIssue{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				Assignees: []string{
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
		}, {
			name: "invalid assignees",
			msg: MsgCreateIssue{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				Assignees: []string{
					"invalid_assignee",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "one valid and one invalid assignee",
			msg: MsgCreateIssue{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				Assignees: []string{
					sample.AccAddress(),
					"invalid_assignees",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "duplicate assignees",
			msg: MsgCreateIssue{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				Assignees: []string{
					sampleAddr,
					sampleAddr,
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "labelIds exceeds limit",
			msg: MsgCreateIssue{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				LabelIds:    []uint64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid labelIds",
			msg: MsgCreateIssue{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				LabelIds:    []uint64{0, 1},
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

func TestMsgUpdateIssueTitle_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateIssueTitle
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateIssueTitle{
				Creator: "invalid_address",
				Title:   "title",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateIssueTitle{
				Creator: sample.AccAddress(),
				Title:   "title",
			},
		}, {
			name: "empty title",
			msg: MsgUpdateIssueTitle{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "title exceeds limit",
			msg: MsgUpdateIssueTitle{
				Creator: sample.AccAddress(),
				Title:   strings.Repeat("t", 256),
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

func TestMsgUpdateIssueDescription_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateIssueDescription
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateIssueDescription{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateIssueDescription{
				Creator: sample.AccAddress(),
			},
		}, {
			name: "empty description",
			msg: MsgUpdateIssueDescription{
				Creator: sample.AccAddress(),
			},
		}, {
			name: "description exceeds limit",
			msg: MsgUpdateIssueDescription{
				Creator:     sample.AccAddress(),
				Description: strings.Repeat("t", 20001),
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

func TestMsgToggleIssueState_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgToggleIssueState
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgToggleIssueState{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgToggleIssueState{
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

func TestMsgAddIssueAssignees_ValidateBasic(t *testing.T) {
	sampleAddr := sample.AccAddress()
	tests := []struct {
		name string
		msg  MsgAddIssueAssignees
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgAddIssueAssignees{
				Creator:   "invalid_address",
				Assignees: []string{sample.AccAddress()},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid creator address",
			msg: MsgAddIssueAssignees{
				Creator:   sample.AccAddress(),
				Assignees: []string{sample.AccAddress()},
			},
		}, {
			name: "empty assignees list",
			msg: MsgAddIssueAssignees{
				Creator:   sample.AccAddress(),
				Assignees: []string{},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "assignees exceeds limit",
			msg: MsgAddIssueAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid assignees",
			msg: MsgAddIssueAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
		}, {
			name: "invalid assignees",
			msg: MsgAddIssueAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					"invalid_assignee",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "one valid and one invalid assignee",
			msg: MsgAddIssueAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sample.AccAddress(),
					"invalid_assignee",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "duplicate assignees",
			msg: MsgAddIssueAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sampleAddr,
					sampleAddr,
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

func TestMsgRemoveIssueAssignees_ValidateBasic(t *testing.T) {
	sampleAddr := sample.AccAddress()
	tests := []struct {
		name string
		msg  MsgRemoveIssueAssignees
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgRemoveIssueAssignees{
				Creator:   "invalid_address",
				Assignees: []string{sample.AccAddress()},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid creator address",
			msg: MsgRemoveIssueAssignees{
				Creator:   sample.AccAddress(),
				Assignees: []string{sample.AccAddress()},
			},
		}, {
			name: "empty assignees list",
			msg: MsgRemoveIssueAssignees{
				Creator:   sample.AccAddress(),
				Assignees: []string{},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "assignees exceeds limit",
			msg: MsgRemoveIssueAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid assignees",
			msg: MsgRemoveIssueAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
		}, {
			name: "invalid assignees",
			msg: MsgRemoveIssueAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					"invalid_assignee",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "one valid and one invalid assignee",
			msg: MsgRemoveIssueAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sample.AccAddress(),
					"invalid_assignee",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "duplicate assignees",
			msg: MsgRemoveIssueAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sampleAddr,
					sampleAddr,
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

func TestMsgAddIssueLabels_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAddIssueLabels
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgAddIssueLabels{
				Creator:  "invalid_address",
				LabelIds: []uint64{0, 1},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgAddIssueLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 1},
			},
		}, {
			name: "empty labelIds ",
			msg: MsgAddIssueLabels{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "labelIds exceeds limit",
			msg: MsgAddIssueLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "duplicate labelIds",
			msg: MsgAddIssueLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 0},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid labelIds",
			msg: MsgAddIssueLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 1},
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

func TestMsgRemoveIssueLabels_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgRemoveIssueLabels
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgRemoveIssueLabels{
				Creator:  "invalid_address",
				LabelIds: []uint64{0, 1},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgRemoveIssueLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 1},
			},
		}, {
			name: "empty labelIds ",
			msg: MsgRemoveIssueLabels{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "labelIds exceeds limit",
			msg: MsgRemoveIssueLabels{
				Creator: sample.AccAddress(),
				LabelIds: []uint64{
					0,
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
					11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
					31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
					41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
					51,
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "duplicate labelIds",
			msg: MsgRemoveIssueLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 0},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid labelIds",
			msg: MsgRemoveIssueLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 1},
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

func TestMsgDeleteIssue_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeleteIssue
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeleteIssue{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgDeleteIssue{
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
