package types

import (
	"strings"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/gitopia/gitopia/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgCreatePullRequest_ValidateBasic(t *testing.T) {
	sampleAddr := sample.AccAddress()
	tests := []struct {
		name string
		msg  MsgCreatePullRequest
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgCreatePullRequest{
				Creator:     "invalid_address",
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid MsgCreatePullRequest",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
			},
		}, {
			name: "empty title",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "title exceeds limit",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       strings.Repeat("t", 256),
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "description exceeds limit",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: strings.Repeat("d", 20001),
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty headBranch",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				BaseBranch:  "base_branch",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "headBranch exceeds limit",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  strings.Repeat("h", 64),
				BaseBranch:  "base_branch",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "empty baseBranch",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "baseBranch exceeds limit",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  strings.Repeat("b", 64),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "reviewers exceeds limit",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
				Reviewers: []string{
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
			name: "valid reviewers",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
				Reviewers: []string{
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
		}, {
			name: "invalid reviewers",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
				Reviewers: []string{
					"invalid_reviewer",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "one valid and one invalid reviewer",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
				Reviewers: []string{
					sample.AccAddress(),
					"invalid_reviewer",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "duplicate reviewers",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
				Reviewers: []string{
					sampleAddr,
					sampleAddr,
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "assignees exceeds limit",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
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
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
				Assignees: []string{
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
		}, {
			name: "invalid assignees",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
				Assignees: []string{
					"invalid_assignee",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "one valid and one invalid assignee",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
				Assignees: []string{
					sample.AccAddress(),
					"invalid_assignees",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "duplicate assignees",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
				Assignees: []string{
					sampleAddr,
					sampleAddr,
				},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "labelIds exceeds limit",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
				LabelIds:    []uint64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid labelIds",
			msg: MsgCreatePullRequest{
				Creator:     sample.AccAddress(),
				Title:       "title",
				Description: "description",
				HeadBranch:  "head_branch",
				BaseBranch:  "base_branch",
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

func TestMsgUpdatePullRequest_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdatePullRequest
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdatePullRequest{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdatePullRequest{
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

func TestMsgUpdatePullRequestTitle_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdatePullRequestTitle
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdatePullRequestTitle{
				Creator: "invalid_address",
				Title:   "title",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdatePullRequestTitle{
				Creator: sample.AccAddress(),
				Title:   "title",
			},
		}, {
			name: "empty title",
			msg: MsgUpdatePullRequestTitle{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "title exceeds limit",
			msg: MsgUpdatePullRequestTitle{
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

func TestMsgUpdatePullRequestDescription_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdatePullRequestDescription
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdatePullRequestDescription{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdatePullRequestDescription{
				Creator: sample.AccAddress(),
			},
		}, {
			name: "empty description",
			msg: MsgUpdatePullRequestDescription{
				Creator: sample.AccAddress(),
			},
		}, {
			name: "description exceeds limit",
			msg: MsgUpdatePullRequestDescription{
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

func TestMsgSetPullRequestState_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgSetPullRequestState
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgSetPullRequestState{
				Creator: "invalid_address",
				State:   "OPEN",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgSetPullRequestState{
				Creator: sample.AccAddress(),
				State:   "OPEN",
			},
		}, {
			name: "invalid state",
			msg: MsgSetPullRequestState{
				Creator: sample.AccAddress(),
				State:   "invalid_state",
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

func TestMsgAddPullRequestReviewers_ValidateBasic(t *testing.T) {
	sampleAddr := sample.AccAddress()
	tests := []struct {
		name string
		msg  MsgAddPullRequestReviewers
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgAddPullRequestReviewers{
				Creator:   "invalid_address",
				Reviewers: []string{sample.AccAddress()},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid creator address",
			msg: MsgAddPullRequestReviewers{
				Creator:   sample.AccAddress(),
				Reviewers: []string{sample.AccAddress()},
			},
		}, {
			name: "empty reviewers list",
			msg: MsgAddPullRequestReviewers{
				Creator:   sample.AccAddress(),
				Reviewers: []string{},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "reviewers exceeds limit",
			msg: MsgAddPullRequestReviewers{
				Creator: sample.AccAddress(),
				Reviewers: []string{
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
			name: "valid reviewers",
			msg: MsgAddPullRequestReviewers{
				Creator: sample.AccAddress(),
				Reviewers: []string{
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
		}, {
			name: "invalid reviewers",
			msg: MsgAddPullRequestReviewers{
				Creator: sample.AccAddress(),
				Reviewers: []string{
					"invalid_reviewer",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "one valid and one invalid reviewer",
			msg: MsgAddPullRequestReviewers{
				Creator: sample.AccAddress(),
				Reviewers: []string{
					sample.AccAddress(),
					"invalid_reviewer",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "duplicate reviewers",
			msg: MsgAddPullRequestReviewers{
				Creator: sample.AccAddress(),
				Reviewers: []string{
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

func TestMsgRemovePullRequestReviewers_ValidateBasic(t *testing.T) {
	sampleAddr := sample.AccAddress()
	tests := []struct {
		name string
		msg  MsgRemovePullRequestReviewers
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgRemovePullRequestReviewers{
				Creator:   "invalid_address",
				Reviewers: []string{sample.AccAddress()},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid creator address",
			msg: MsgRemovePullRequestReviewers{
				Creator:   sample.AccAddress(),
				Reviewers: []string{sample.AccAddress()},
			},
		}, {
			name: "empty reviewers list",
			msg: MsgRemovePullRequestReviewers{
				Creator:   sample.AccAddress(),
				Reviewers: []string{},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "reviewers exceeds limit",
			msg: MsgRemovePullRequestReviewers{
				Creator: sample.AccAddress(),
				Reviewers: []string{
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
			name: "valid reviewers",
			msg: MsgRemovePullRequestReviewers{
				Creator: sample.AccAddress(),
				Reviewers: []string{
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
		}, {
			name: "invalid reviewers",
			msg: MsgRemovePullRequestReviewers{
				Creator: sample.AccAddress(),
				Reviewers: []string{
					"invalid_reviewer",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "one valid and one invalid reviewer",
			msg: MsgRemovePullRequestReviewers{
				Creator: sample.AccAddress(),
				Reviewers: []string{
					sample.AccAddress(),
					"invalid_reviewer",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "duplicate reviewers",
			msg: MsgRemovePullRequestReviewers{
				Creator: sample.AccAddress(),
				Reviewers: []string{
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

func TestMsgAddPullRequestAssignees_ValidateBasic(t *testing.T) {
	sampleAddr := sample.AccAddress()
	tests := []struct {
		name string
		msg  MsgAddPullRequestAssignees
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgAddPullRequestAssignees{
				Creator:   "invalid_address",
				Assignees: []string{sample.AccAddress()},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid creator address",
			msg: MsgAddPullRequestAssignees{
				Creator:   sample.AccAddress(),
				Assignees: []string{sample.AccAddress()},
			},
		}, {
			name: "empty assignees list",
			msg: MsgAddPullRequestAssignees{
				Creator:   sample.AccAddress(),
				Assignees: []string{},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "assignees exceeds limit",
			msg: MsgAddPullRequestAssignees{
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
			msg: MsgAddPullRequestAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
		}, {
			name: "invalid assignees",
			msg: MsgAddPullRequestAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					"invalid_assignee",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "one valid and one invalid assignee",
			msg: MsgAddPullRequestAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sample.AccAddress(),
					"invalid_assignee",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "duplicate assignees",
			msg: MsgAddPullRequestAssignees{
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

func TestMsgRemovePullRequestAssignees_ValidateBasic(t *testing.T) {
	sampleAddr := sample.AccAddress()
	tests := []struct {
		name string
		msg  MsgRemovePullRequestAssignees
		err  error
	}{
		{
			name: "invalid creator address",
			msg: MsgRemovePullRequestAssignees{
				Creator:   "invalid_address",
				Assignees: []string{sample.AccAddress()},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid creator address",
			msg: MsgRemovePullRequestAssignees{
				Creator:   sample.AccAddress(),
				Assignees: []string{sample.AccAddress()},
			},
		}, {
			name: "empty assignees list",
			msg: MsgRemovePullRequestAssignees{
				Creator:   sample.AccAddress(),
				Assignees: []string{},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "assignees exceeds limit",
			msg: MsgRemovePullRequestAssignees{
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
			msg: MsgRemovePullRequestAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sample.AccAddress(),
					sample.AccAddress(),
				},
			},
		}, {
			name: "invalid assignees",
			msg: MsgRemovePullRequestAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					"invalid_assignee",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "one valid and one invalid assignee",
			msg: MsgRemovePullRequestAssignees{
				Creator: sample.AccAddress(),
				Assignees: []string{
					sample.AccAddress(),
					"invalid_assignee",
				},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "duplicate assignees",
			msg: MsgRemovePullRequestAssignees{
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

func TestMsgAddPullRequestLabels_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAddPullRequestLabels
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgAddPullRequestLabels{
				Creator:  "invalid_address",
				LabelIds: []uint64{0, 1},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgAddPullRequestLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 1},
			},
		}, {
			name: "empty labelIds ",
			msg: MsgAddPullRequestLabels{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "labelIds exceeds limit",
			msg: MsgAddPullRequestLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "duplicate labelIds",
			msg: MsgAddPullRequestLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 0},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid labelIds",
			msg: MsgAddPullRequestLabels{
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

func TestMsgRemovePullRequestLabels_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgRemovePullRequestLabels
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgRemovePullRequestLabels{
				Creator:  "invalid_address",
				LabelIds: []uint64{0, 1},
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgRemovePullRequestLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 1},
			},
		}, {
			name: "empty labelIds ",
			msg: MsgRemovePullRequestLabels{
				Creator: sample.AccAddress(),
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "labelIds exceeds limit",
			msg: MsgRemovePullRequestLabels{
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
			msg: MsgRemovePullRequestLabels{
				Creator:  sample.AccAddress(),
				LabelIds: []uint64{0, 0},
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid labelIds",
			msg: MsgRemovePullRequestLabels{
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

func TestMsgDeletePullRequest_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgDeletePullRequest
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgDeletePullRequest{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgDeletePullRequest{
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
