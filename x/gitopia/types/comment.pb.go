// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: gitopia/comment.proto

package types

import (
	fmt "fmt"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type CommentType int32

const (
	CommentTypeNone                CommentType = 0
	CommentTypeReply               CommentType = 1
	CommentTypeAddLabels           CommentType = 2
	CommentTypeRemoveLabels        CommentType = 3
	CommentTypeAddAssignees        CommentType = 4
	CommentTypeRemoveAssignees     CommentType = 5
	CommentTypeAddReviewers        CommentType = 6
	CommentTypeRemoveReviewers     CommentType = 7
	CommentTypeModifiedTitle       CommentType = 8
	CommentTypeModifiedDescription CommentType = 9
	CommentTypeIssueClosed         CommentType = 10
	CommentTypeIssueOpened         CommentType = 11
	CommentTypePullRequestClosed   CommentType = 12
	CommentTypePullRequestOpened   CommentType = 13
	CommentTypePullRequestMerged   CommentType = 14
	CommentTypeReview              CommentType = 15
	CommentTypeAddBounty           CommentType = 16
	CommentTypeModifiedBounty      CommentType = 17
	CommentTypeClosedBounty        CommentType = 18
)

var CommentType_name = map[int32]string{
	0:  "COMMENT_TYPE_NONE",
	1:  "COMMENT_TYPE_REPLY",
	2:  "COMMENT_TYPE_ADD_LABELS",
	3:  "COMMENT_TYPE_REMOVE_LABELS",
	4:  "COMMENT_TYPE_ADD_ASSIGNEES",
	5:  "COMMENT_TYPE_REMOVE_ASSIGNEES",
	6:  "COMMENT_TYPE_ADD_REVIEWERS",
	7:  "COMMENT_TYPE_REMOVE_REVIEWERS",
	8:  "COMMENT_TYPE_MODIFIED_TITLE",
	9:  "COMMENT_TYPE_MODIFIED_DESCRIPTION",
	10: "COMMENT_TYPE_ISSUE_CLOSED",
	11: "COMMENT_TYPE_ISSUE_OPENED",
	12: "COMMENT_TYPE_PULL_REQUEST_CLOSED",
	13: "COMMENT_TYPE_PULL_REQUEST_OPENED",
	14: "COMMENT_TYPE_PULL_REQUEST_MERGED",
	15: "COMMENT_TYPE_REVIEW",
	16: "COMMENT_TYPE_ADD_BOUNTY",
	17: "COMMENT_TYPE_MODIFIED_BOUNTY",
	18: "COMMENT_TYPE_CLOSED_BOUNTY",
}

var CommentType_value = map[string]int32{
	"COMMENT_TYPE_NONE":                 0,
	"COMMENT_TYPE_REPLY":                1,
	"COMMENT_TYPE_ADD_LABELS":           2,
	"COMMENT_TYPE_REMOVE_LABELS":        3,
	"COMMENT_TYPE_ADD_ASSIGNEES":        4,
	"COMMENT_TYPE_REMOVE_ASSIGNEES":     5,
	"COMMENT_TYPE_ADD_REVIEWERS":        6,
	"COMMENT_TYPE_REMOVE_REVIEWERS":     7,
	"COMMENT_TYPE_MODIFIED_TITLE":       8,
	"COMMENT_TYPE_MODIFIED_DESCRIPTION": 9,
	"COMMENT_TYPE_ISSUE_CLOSED":         10,
	"COMMENT_TYPE_ISSUE_OPENED":         11,
	"COMMENT_TYPE_PULL_REQUEST_CLOSED":  12,
	"COMMENT_TYPE_PULL_REQUEST_OPENED":  13,
	"COMMENT_TYPE_PULL_REQUEST_MERGED":  14,
	"COMMENT_TYPE_REVIEW":               15,
	"COMMENT_TYPE_ADD_BOUNTY":           16,
	"COMMENT_TYPE_MODIFIED_BOUNTY":      17,
	"COMMENT_TYPE_CLOSED_BOUNTY":        18,
}

func (x CommentType) String() string {
	return proto.EnumName(CommentType_name, int32(x))
}

func (CommentType) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_61a8a10ae7d09fb4, []int{0}
}

type CommentParent int32

const (
	CommentParentNone        CommentParent = 0
	CommentParentIssue       CommentParent = 1
	CommentParentPullRequest CommentParent = 2
)

var CommentParent_name = map[int32]string{
	0: "COMMENT_PARENT_NONE",
	1: "COMMENT_PARENT_ISSUE",
	2: "COMMENT_PARENT_PULL_REQUEST",
}

var CommentParent_value = map[string]int32{
	"COMMENT_PARENT_NONE":         0,
	"COMMENT_PARENT_ISSUE":        1,
	"COMMENT_PARENT_PULL_REQUEST": 2,
}

func (x CommentParent) String() string {
	return proto.EnumName(CommentParent_name, int32(x))
}

func (CommentParent) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_61a8a10ae7d09fb4, []int{1}
}

type Comment struct {
	Creator           string        `protobuf:"bytes,1,opt,name=creator,proto3" json:"creator,omitempty"`
	Id                uint64        `protobuf:"varint,2,opt,name=id,proto3" json:"id,omitempty"`
	RepositoryId      uint64        `protobuf:"varint,3,opt,name=repositoryId,proto3" json:"repositoryId,omitempty"`
	ParentIid         uint64        `protobuf:"varint,4,opt,name=parentIid,proto3" json:"parentIid,omitempty"`
	Parent            CommentParent `protobuf:"varint,5,opt,name=parent,proto3,enum=gitopia.gitopia.gitopia.CommentParent" json:"parent,omitempty"`
	CommentIid        uint64        `protobuf:"varint,6,opt,name=commentIid,proto3" json:"commentIid,omitempty"`
	Body              string        `protobuf:"bytes,7,opt,name=body,proto3" json:"body,omitempty"`
	Attachments       []*Attachment `protobuf:"bytes,8,rep,name=attachments,proto3" json:"attachments,omitempty"`
	DiffHunk          string        `protobuf:"bytes,9,opt,name=diffHunk,proto3" json:"diffHunk,omitempty"`
	Path              string        `protobuf:"bytes,10,opt,name=path,proto3" json:"path,omitempty"`
	Position          uint64        `protobuf:"varint,11,opt,name=position,proto3" json:"position,omitempty"`
	System            bool          `protobuf:"varint,12,opt,name=system,proto3" json:"system,omitempty"`
	AuthorAssociation string        `protobuf:"bytes,13,opt,name=authorAssociation,proto3" json:"authorAssociation,omitempty"`
	CreatedAt         int64         `protobuf:"varint,14,opt,name=createdAt,proto3" json:"createdAt,omitempty"`
	UpdatedAt         int64         `protobuf:"varint,15,opt,name=updatedAt,proto3" json:"updatedAt,omitempty"`
	CommentType       CommentType   `protobuf:"varint,16,opt,name=commentType,proto3,enum=gitopia.gitopia.gitopia.CommentType" json:"commentType,omitempty"`
	Resolved          bool          `protobuf:"varint,17,opt,name=resolved,proto3" json:"resolved,omitempty"`
	Replies           []uint64      `protobuf:"varint,18,rep,packed,name=replies,proto3" json:"replies,omitempty"`
	Reactions         []*Reaction   `protobuf:"bytes,19,rep,name=reactions,proto3" json:"reactions,omitempty"`
	Hidden            bool          `protobuf:"varint,20,opt,name=hidden,proto3" json:"hidden,omitempty"`
}

func (m *Comment) Reset()         { *m = Comment{} }
func (m *Comment) String() string { return proto.CompactTextString(m) }
func (*Comment) ProtoMessage()    {}
func (*Comment) Descriptor() ([]byte, []int) {
	return fileDescriptor_61a8a10ae7d09fb4, []int{0}
}
func (m *Comment) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Comment) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Comment.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Comment) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Comment.Merge(m, src)
}
func (m *Comment) XXX_Size() int {
	return m.Size()
}
func (m *Comment) XXX_DiscardUnknown() {
	xxx_messageInfo_Comment.DiscardUnknown(m)
}

var xxx_messageInfo_Comment proto.InternalMessageInfo

func (m *Comment) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *Comment) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

func (m *Comment) GetRepositoryId() uint64 {
	if m != nil {
		return m.RepositoryId
	}
	return 0
}

func (m *Comment) GetParentIid() uint64 {
	if m != nil {
		return m.ParentIid
	}
	return 0
}

func (m *Comment) GetParent() CommentParent {
	if m != nil {
		return m.Parent
	}
	return CommentParentNone
}

func (m *Comment) GetCommentIid() uint64 {
	if m != nil {
		return m.CommentIid
	}
	return 0
}

func (m *Comment) GetBody() string {
	if m != nil {
		return m.Body
	}
	return ""
}

func (m *Comment) GetAttachments() []*Attachment {
	if m != nil {
		return m.Attachments
	}
	return nil
}

func (m *Comment) GetDiffHunk() string {
	if m != nil {
		return m.DiffHunk
	}
	return ""
}

func (m *Comment) GetPath() string {
	if m != nil {
		return m.Path
	}
	return ""
}

func (m *Comment) GetPosition() uint64 {
	if m != nil {
		return m.Position
	}
	return 0
}

func (m *Comment) GetSystem() bool {
	if m != nil {
		return m.System
	}
	return false
}

func (m *Comment) GetAuthorAssociation() string {
	if m != nil {
		return m.AuthorAssociation
	}
	return ""
}

func (m *Comment) GetCreatedAt() int64 {
	if m != nil {
		return m.CreatedAt
	}
	return 0
}

func (m *Comment) GetUpdatedAt() int64 {
	if m != nil {
		return m.UpdatedAt
	}
	return 0
}

func (m *Comment) GetCommentType() CommentType {
	if m != nil {
		return m.CommentType
	}
	return CommentTypeNone
}

func (m *Comment) GetResolved() bool {
	if m != nil {
		return m.Resolved
	}
	return false
}

func (m *Comment) GetReplies() []uint64 {
	if m != nil {
		return m.Replies
	}
	return nil
}

func (m *Comment) GetReactions() []*Reaction {
	if m != nil {
		return m.Reactions
	}
	return nil
}

func (m *Comment) GetHidden() bool {
	if m != nil {
		return m.Hidden
	}
	return false
}

func init() {
	proto.RegisterEnum("gitopia.gitopia.gitopia.CommentType", CommentType_name, CommentType_value)
	proto.RegisterEnum("gitopia.gitopia.gitopia.CommentParent", CommentParent_name, CommentParent_value)
	proto.RegisterType((*Comment)(nil), "gitopia.gitopia.gitopia.Comment")
}

func init() { proto.RegisterFile("gitopia/comment.proto", fileDescriptor_61a8a10ae7d09fb4) }

var fileDescriptor_61a8a10ae7d09fb4 = []byte{
	// 1000 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x8c, 0x56, 0xdb, 0x6e, 0xe3, 0x44,
	0x18, 0xae, 0xdb, 0xf4, 0x90, 0x49, 0x0f, 0xee, 0xb4, 0xdb, 0xce, 0x7a, 0xbb, 0xd1, 0x6c, 0x41,
	0x28, 0xaa, 0x96, 0x14, 0xed, 0x8a, 0x0b, 0x84, 0x60, 0xe5, 0x36, 0xd3, 0x62, 0x29, 0x27, 0x9c,
	0x74, 0x51, 0xb9, 0x89, 0xdc, 0xcc, 0x34, 0xb5, 0x48, 0x3d, 0xc6, 0x76, 0x0a, 0x79, 0x03, 0xe4,
	0x2b, 0x5e, 0xc0, 0xdc, 0xf0, 0x0e, 0x3c, 0x03, 0x97, 0x7b, 0x83, 0xc4, 0x25, 0x6a, 0x5f, 0x04,
	0x79, 0x6c, 0x27, 0x76, 0xea, 0x14, 0xae, 0xec, 0xff, 0x9f, 0xff, 0xfb, 0xbe, 0xff, 0x34, 0x89,
	0xc1, 0xb3, 0x81, 0xe9, 0x71, 0xdb, 0x34, 0x8e, 0xfb, 0xfc, 0xf6, 0x96, 0x59, 0x5e, 0xd5, 0x76,
	0xb8, 0xc7, 0xe1, 0x7e, 0xec, 0xae, 0xce, 0x3c, 0x95, 0xdd, 0x01, 0x1f, 0x70, 0x11, 0x73, 0x1c,
	0xbe, 0x45, 0xe1, 0xca, 0x5e, 0xc2, 0xe2, 0x30, 0xa3, 0xef, 0x99, 0xdc, 0x8a, 0xfd, 0x28, 0xf1,
	0x1b, 0x9e, 0x67, 0xf4, 0x6f, 0xa6, 0x02, 0x87, 0x7f, 0x2d, 0x83, 0xd5, 0xd3, 0x48, 0x12, 0x22,
	0xb0, 0xda, 0x77, 0x98, 0xe1, 0x71, 0x07, 0x49, 0x58, 0xaa, 0x14, 0xf5, 0xc4, 0x84, 0x9b, 0x60,
	0xd1, 0xa4, 0x68, 0x11, 0x4b, 0x95, 0x82, 0xbe, 0x68, 0x52, 0x78, 0x08, 0xd6, 0x1d, 0x66, 0x73,
	0xd7, 0xf4, 0xb8, 0x33, 0xd6, 0x28, 0x5a, 0x12, 0x27, 0x19, 0x1f, 0x3c, 0x00, 0x45, 0xdb, 0x70,
	0x98, 0xe5, 0x69, 0x26, 0x45, 0x05, 0x11, 0x30, 0x75, 0xc0, 0xaf, 0xc1, 0x4a, 0x64, 0xa0, 0x65,
	0x2c, 0x55, 0x36, 0xdf, 0x7c, 0x52, 0x9d, 0x53, 0x69, 0x35, 0xce, 0xae, 0x2d, 0xa2, 0xf5, 0x18,
	0x05, 0xcb, 0x00, 0xc4, 0x9d, 0x0a, 0xe9, 0x57, 0x04, 0x7d, 0xca, 0x03, 0x21, 0x28, 0x5c, 0x71,
	0x3a, 0x46, 0xab, 0xa2, 0x10, 0xf1, 0x0e, 0x09, 0x28, 0x4d, 0xeb, 0x77, 0xd1, 0x1a, 0x5e, 0xaa,
	0x94, 0xde, 0x7c, 0x34, 0x57, 0x58, 0x9d, 0xc4, 0xea, 0x69, 0x1c, 0x54, 0xc0, 0x1a, 0x35, 0xaf,
	0xaf, 0xbf, 0x19, 0x59, 0x3f, 0xa0, 0xa2, 0xa0, 0x9f, 0xd8, 0xa1, 0xac, 0x6d, 0x78, 0x37, 0x08,
	0x44, 0xb2, 0xe1, 0x7b, 0x18, 0x2f, 0xda, 0x62, 0x72, 0x0b, 0x95, 0x44, 0xa2, 0x13, 0x1b, 0xee,
	0x81, 0x15, 0x77, 0xec, 0x7a, 0xec, 0x16, 0xad, 0x63, 0xa9, 0xb2, 0xa6, 0xc7, 0x16, 0x7c, 0x0d,
	0xb6, 0x8d, 0x91, 0x77, 0xc3, 0x1d, 0xd5, 0x75, 0x79, 0xdf, 0x34, 0x04, 0x78, 0x43, 0x90, 0x3e,
	0x3e, 0x08, 0x5b, 0x2d, 0x26, 0xc5, 0xa8, 0xea, 0xa1, 0x4d, 0x2c, 0x55, 0x96, 0xf4, 0xa9, 0x23,
	0x3c, 0x1d, 0xd9, 0x34, 0x3e, 0xdd, 0x8a, 0x4e, 0x27, 0x0e, 0x78, 0x06, 0x4a, 0x71, 0xdb, 0xba,
	0x63, 0x9b, 0x21, 0x59, 0x4c, 0xe3, 0xe3, 0xff, 0x9a, 0x46, 0x18, 0xab, 0xa7, 0x81, 0x61, 0x95,
	0x0e, 0x73, 0xf9, 0xf0, 0x8e, 0x51, 0xb4, 0x2d, 0x6a, 0x99, 0xd8, 0xe1, 0x62, 0x39, 0xcc, 0x1e,
	0x9a, 0xcc, 0x45, 0x10, 0x2f, 0x55, 0x0a, 0x7a, 0x62, 0xc2, 0x77, 0xa0, 0x98, 0xac, 0xaa, 0x8b,
	0x76, 0xc4, 0x40, 0x5e, 0xcd, 0xd5, 0xd6, 0xe3, 0x48, 0x7d, 0x8a, 0x09, 0x1b, 0x78, 0x63, 0x52,
	0xca, 0x2c, 0xb4, 0x1b, 0x35, 0x30, 0xb2, 0x8e, 0x7e, 0x2b, 0x82, 0x52, 0x2a, 0x57, 0x78, 0x04,
	0xb6, 0x4f, 0x5b, 0x8d, 0x06, 0x69, 0x76, 0x7b, 0xdd, 0xcb, 0x36, 0xe9, 0x35, 0x5b, 0x4d, 0x22,
	0x2f, 0x28, 0x3b, 0x7e, 0x80, 0xb7, 0x52, 0x71, 0x4d, 0x6e, 0x31, 0xf8, 0x1a, 0xc0, 0x4c, 0xac,
	0x4e, 0xda, 0xf5, 0x4b, 0x59, 0x52, 0x76, 0xfd, 0x00, 0xcb, 0xe9, 0x06, 0x30, 0x7b, 0x38, 0x86,
	0x9f, 0x83, 0xfd, 0x4c, 0xb4, 0x5a, 0xab, 0xf5, 0xea, 0xea, 0x09, 0xa9, 0x77, 0xe4, 0x45, 0x05,
	0xf9, 0x01, 0xde, 0x4d, 0x41, 0x54, 0x4a, 0xeb, 0xc6, 0x15, 0x1b, 0xba, 0xf0, 0x4b, 0xa0, 0xcc,
	0x88, 0x34, 0x5a, 0xef, 0x49, 0x82, 0x5c, 0x52, 0x5e, 0xf8, 0x01, 0xde, 0xcf, 0x88, 0xdd, 0xf2,
	0x3b, 0x36, 0x07, 0x1c, 0x6a, 0xaa, 0x9d, 0x8e, 0x76, 0xde, 0x24, 0xa4, 0x23, 0x17, 0x1e, 0x81,
	0x55, 0x4a, 0x55, 0xd7, 0x35, 0x07, 0x16, 0x63, 0x2e, 0x54, 0xc1, 0xcb, 0x3c, 0xe5, 0x29, 0x7e,
	0x59, 0x29, 0xfb, 0x01, 0x56, 0x1e, 0x89, 0x4f, 0x29, 0xf2, 0xf4, 0x75, 0xf2, 0x5e, 0x23, 0xdf,
	0x11, 0xbd, 0x23, 0xaf, 0xe4, 0xe9, 0xeb, 0xec, 0xce, 0x64, 0x3f, 0x31, 0x67, 0xae, 0xfe, 0x14,
	0xbf, 0x3a, 0x47, 0x7f, 0x4a, 0xf1, 0x15, 0x78, 0x91, 0xa1, 0x68, 0xb4, 0x6a, 0xda, 0x99, 0x46,
	0x6a, 0xbd, 0xae, 0xd6, 0xad, 0x13, 0x79, 0x4d, 0x39, 0xf0, 0x03, 0x8c, 0x52, 0x04, 0x0d, 0x4e,
	0xcd, 0x6b, 0x93, 0xd1, 0xae, 0xe9, 0x0d, 0x19, 0xd4, 0xc0, 0xab, 0x7c, 0x78, 0x8d, 0x74, 0x4e,
	0x75, 0xad, 0xdd, 0xd5, 0x5a, 0x4d, 0xb9, 0xa8, 0x1c, 0xfa, 0x01, 0x2e, 0xe7, 0x90, 0xd4, 0x98,
	0xdb, 0x77, 0x4c, 0x5b, 0x5c, 0xbd, 0x2f, 0xc0, 0xf3, 0x0c, 0x95, 0xd6, 0xe9, 0x5c, 0x90, 0xde,
	0x69, 0xbd, 0xd5, 0x21, 0x35, 0x19, 0x28, 0x8a, 0x1f, 0xe0, 0xbd, 0x14, 0x85, 0xe6, 0xba, 0x23,
	0x76, 0x3a, 0xe4, 0x2e, 0xa3, 0x73, 0xa0, 0xad, 0x36, 0x69, 0x92, 0x9a, 0x5c, 0xca, 0x87, 0xb6,
	0x6c, 0x66, 0x31, 0x0a, 0xcf, 0x00, 0xce, 0x40, 0xdb, 0x17, 0xf5, 0x7a, 0x4f, 0x27, 0xdf, 0x5e,
	0x90, 0x4e, 0x37, 0x11, 0x5f, 0x57, 0xb0, 0x1f, 0xe0, 0x83, 0x14, 0x43, 0x7b, 0x34, 0x1c, 0xea,
	0xec, 0xc7, 0x11, 0x73, 0xbd, 0x38, 0x85, 0x27, 0x79, 0xe2, 0x4c, 0x36, 0x9e, 0xe2, 0xf9, 0x3f,
	0xf9, 0x34, 0x88, 0x7e, 0x4e, 0x6a, 0xf2, 0xe6, 0x53, 0x3c, 0x0d, 0xe6, 0x0c, 0x18, 0x85, 0x55,
	0xb0, 0x33, 0xb3, 0x1a, 0xe1, 0x4e, 0xc8, 0x5b, 0xca, 0x33, 0x3f, 0xc0, 0xdb, 0x99, 0x85, 0x08,
	0x57, 0x21, 0xf7, 0xee, 0x9d, 0xb4, 0x2e, 0x9a, 0xdd, 0x4b, 0x59, 0xce, 0xbb, 0x7b, 0x27, 0x7c,
	0x64, 0x79, 0x63, 0xf8, 0x0e, 0x1c, 0xe4, 0xcf, 0x3f, 0xc6, 0x6e, 0x2b, 0x2f, 0xfd, 0x00, 0x3f,
	0xcf, 0x19, 0x7d, 0x4c, 0x30, 0xbb, 0xff, 0x51, 0xcb, 0x13, 0x38, 0x7c, 0xb4, 0xff, 0x51, 0xbb,
	0x23, 0xb0, 0x52, 0xf8, 0xe5, 0xf7, 0xf2, 0xc2, 0xd1, 0x1f, 0x12, 0xd8, 0xc8, 0xfc, 0xb5, 0xa5,
	0x8b, 0x6f, 0xab, 0x7a, 0xf8, 0x88, 0x7f, 0xa4, 0xd2, 0xc5, 0x47, 0xb1, 0xe2, 0x67, 0xea, 0x33,
	0xb0, 0x3b, 0x13, 0x2f, 0x36, 0x48, 0x96, 0x94, 0x3d, 0x3f, 0xc0, 0x30, 0x03, 0x10, 0xcb, 0x93,
	0xbe, 0x36, 0x31, 0x22, 0x3d, 0x28, 0x79, 0x31, 0x73, 0x6d, 0x22, 0x60, 0x6a, 0x46, 0x51, 0xe2,
	0x27, 0xe7, 0x7f, 0xde, 0x97, 0xa5, 0x0f, 0xf7, 0x65, 0xe9, 0x9f, 0xfb, 0xb2, 0xf4, 0xeb, 0x43,
	0x79, 0xe1, 0xc3, 0x43, 0x79, 0xe1, 0xef, 0x87, 0xf2, 0xc2, 0xf7, 0x9f, 0x0e, 0x4c, 0xef, 0x66,
	0x74, 0x55, 0xed, 0xf3, 0xdb, 0xe3, 0xe4, 0x83, 0x23, 0x79, 0xde, 0xbd, 0x3d, 0xfe, 0x79, 0x62,
	0x78, 0x63, 0x9b, 0xb9, 0x57, 0x2b, 0xe2, 0x0b, 0xe4, 0xed, 0xbf, 0x01, 0x00, 0x00, 0xff, 0xff,
	0xee, 0x7c, 0x94, 0xfc, 0xfb, 0x08, 0x00, 0x00,
}

func (m *Comment) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Comment) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Comment) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Hidden {
		i--
		if m.Hidden {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x1
		i--
		dAtA[i] = 0xa0
	}
	if len(m.Reactions) > 0 {
		for iNdEx := len(m.Reactions) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.Reactions[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintComment(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x1
			i--
			dAtA[i] = 0x9a
		}
	}
	if len(m.Replies) > 0 {
		dAtA2 := make([]byte, len(m.Replies)*10)
		var j1 int
		for _, num := range m.Replies {
			for num >= 1<<7 {
				dAtA2[j1] = uint8(uint64(num)&0x7f | 0x80)
				num >>= 7
				j1++
			}
			dAtA2[j1] = uint8(num)
			j1++
		}
		i -= j1
		copy(dAtA[i:], dAtA2[:j1])
		i = encodeVarintComment(dAtA, i, uint64(j1))
		i--
		dAtA[i] = 0x1
		i--
		dAtA[i] = 0x92
	}
	if m.Resolved {
		i--
		if m.Resolved {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x1
		i--
		dAtA[i] = 0x88
	}
	if m.CommentType != 0 {
		i = encodeVarintComment(dAtA, i, uint64(m.CommentType))
		i--
		dAtA[i] = 0x1
		i--
		dAtA[i] = 0x80
	}
	if m.UpdatedAt != 0 {
		i = encodeVarintComment(dAtA, i, uint64(m.UpdatedAt))
		i--
		dAtA[i] = 0x78
	}
	if m.CreatedAt != 0 {
		i = encodeVarintComment(dAtA, i, uint64(m.CreatedAt))
		i--
		dAtA[i] = 0x70
	}
	if len(m.AuthorAssociation) > 0 {
		i -= len(m.AuthorAssociation)
		copy(dAtA[i:], m.AuthorAssociation)
		i = encodeVarintComment(dAtA, i, uint64(len(m.AuthorAssociation)))
		i--
		dAtA[i] = 0x6a
	}
	if m.System {
		i--
		if m.System {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x60
	}
	if m.Position != 0 {
		i = encodeVarintComment(dAtA, i, uint64(m.Position))
		i--
		dAtA[i] = 0x58
	}
	if len(m.Path) > 0 {
		i -= len(m.Path)
		copy(dAtA[i:], m.Path)
		i = encodeVarintComment(dAtA, i, uint64(len(m.Path)))
		i--
		dAtA[i] = 0x52
	}
	if len(m.DiffHunk) > 0 {
		i -= len(m.DiffHunk)
		copy(dAtA[i:], m.DiffHunk)
		i = encodeVarintComment(dAtA, i, uint64(len(m.DiffHunk)))
		i--
		dAtA[i] = 0x4a
	}
	if len(m.Attachments) > 0 {
		for iNdEx := len(m.Attachments) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.Attachments[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintComment(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x42
		}
	}
	if len(m.Body) > 0 {
		i -= len(m.Body)
		copy(dAtA[i:], m.Body)
		i = encodeVarintComment(dAtA, i, uint64(len(m.Body)))
		i--
		dAtA[i] = 0x3a
	}
	if m.CommentIid != 0 {
		i = encodeVarintComment(dAtA, i, uint64(m.CommentIid))
		i--
		dAtA[i] = 0x30
	}
	if m.Parent != 0 {
		i = encodeVarintComment(dAtA, i, uint64(m.Parent))
		i--
		dAtA[i] = 0x28
	}
	if m.ParentIid != 0 {
		i = encodeVarintComment(dAtA, i, uint64(m.ParentIid))
		i--
		dAtA[i] = 0x20
	}
	if m.RepositoryId != 0 {
		i = encodeVarintComment(dAtA, i, uint64(m.RepositoryId))
		i--
		dAtA[i] = 0x18
	}
	if m.Id != 0 {
		i = encodeVarintComment(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x10
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintComment(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintComment(dAtA []byte, offset int, v uint64) int {
	offset -= sovComment(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Comment) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovComment(uint64(l))
	}
	if m.Id != 0 {
		n += 1 + sovComment(uint64(m.Id))
	}
	if m.RepositoryId != 0 {
		n += 1 + sovComment(uint64(m.RepositoryId))
	}
	if m.ParentIid != 0 {
		n += 1 + sovComment(uint64(m.ParentIid))
	}
	if m.Parent != 0 {
		n += 1 + sovComment(uint64(m.Parent))
	}
	if m.CommentIid != 0 {
		n += 1 + sovComment(uint64(m.CommentIid))
	}
	l = len(m.Body)
	if l > 0 {
		n += 1 + l + sovComment(uint64(l))
	}
	if len(m.Attachments) > 0 {
		for _, e := range m.Attachments {
			l = e.Size()
			n += 1 + l + sovComment(uint64(l))
		}
	}
	l = len(m.DiffHunk)
	if l > 0 {
		n += 1 + l + sovComment(uint64(l))
	}
	l = len(m.Path)
	if l > 0 {
		n += 1 + l + sovComment(uint64(l))
	}
	if m.Position != 0 {
		n += 1 + sovComment(uint64(m.Position))
	}
	if m.System {
		n += 2
	}
	l = len(m.AuthorAssociation)
	if l > 0 {
		n += 1 + l + sovComment(uint64(l))
	}
	if m.CreatedAt != 0 {
		n += 1 + sovComment(uint64(m.CreatedAt))
	}
	if m.UpdatedAt != 0 {
		n += 1 + sovComment(uint64(m.UpdatedAt))
	}
	if m.CommentType != 0 {
		n += 2 + sovComment(uint64(m.CommentType))
	}
	if m.Resolved {
		n += 3
	}
	if len(m.Replies) > 0 {
		l = 0
		for _, e := range m.Replies {
			l += sovComment(uint64(e))
		}
		n += 2 + sovComment(uint64(l)) + l
	}
	if len(m.Reactions) > 0 {
		for _, e := range m.Reactions {
			l = e.Size()
			n += 2 + l + sovComment(uint64(l))
		}
	}
	if m.Hidden {
		n += 3
	}
	return n
}

func sovComment(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozComment(x uint64) (n int) {
	return sovComment(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Comment) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowComment
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: Comment: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Comment: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthComment
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthComment
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			m.Id = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Id |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 3:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field RepositoryId", wireType)
			}
			m.RepositoryId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.RepositoryId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 4:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field ParentIid", wireType)
			}
			m.ParentIid = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.ParentIid |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 5:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Parent", wireType)
			}
			m.Parent = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Parent |= CommentParent(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 6:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field CommentIid", wireType)
			}
			m.CommentIid = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.CommentIid |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 7:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Body", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthComment
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthComment
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Body = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 8:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Attachments", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthComment
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthComment
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Attachments = append(m.Attachments, &Attachment{})
			if err := m.Attachments[len(m.Attachments)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 9:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field DiffHunk", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthComment
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthComment
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.DiffHunk = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 10:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Path", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthComment
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthComment
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Path = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 11:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Position", wireType)
			}
			m.Position = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Position |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 12:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field System", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				v |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			m.System = bool(v != 0)
		case 13:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field AuthorAssociation", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthComment
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthComment
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.AuthorAssociation = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 14:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field CreatedAt", wireType)
			}
			m.CreatedAt = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.CreatedAt |= int64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 15:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field UpdatedAt", wireType)
			}
			m.UpdatedAt = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.UpdatedAt |= int64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 16:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field CommentType", wireType)
			}
			m.CommentType = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.CommentType |= CommentType(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 17:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Resolved", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				v |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			m.Resolved = bool(v != 0)
		case 18:
			if wireType == 0 {
				var v uint64
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowComment
					}
					if iNdEx >= l {
						return io.ErrUnexpectedEOF
					}
					b := dAtA[iNdEx]
					iNdEx++
					v |= uint64(b&0x7F) << shift
					if b < 0x80 {
						break
					}
				}
				m.Replies = append(m.Replies, v)
			} else if wireType == 2 {
				var packedLen int
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowComment
					}
					if iNdEx >= l {
						return io.ErrUnexpectedEOF
					}
					b := dAtA[iNdEx]
					iNdEx++
					packedLen |= int(b&0x7F) << shift
					if b < 0x80 {
						break
					}
				}
				if packedLen < 0 {
					return ErrInvalidLengthComment
				}
				postIndex := iNdEx + packedLen
				if postIndex < 0 {
					return ErrInvalidLengthComment
				}
				if postIndex > l {
					return io.ErrUnexpectedEOF
				}
				var elementCount int
				var count int
				for _, integer := range dAtA[iNdEx:postIndex] {
					if integer < 128 {
						count++
					}
				}
				elementCount = count
				if elementCount != 0 && len(m.Replies) == 0 {
					m.Replies = make([]uint64, 0, elementCount)
				}
				for iNdEx < postIndex {
					var v uint64
					for shift := uint(0); ; shift += 7 {
						if shift >= 64 {
							return ErrIntOverflowComment
						}
						if iNdEx >= l {
							return io.ErrUnexpectedEOF
						}
						b := dAtA[iNdEx]
						iNdEx++
						v |= uint64(b&0x7F) << shift
						if b < 0x80 {
							break
						}
					}
					m.Replies = append(m.Replies, v)
				}
			} else {
				return fmt.Errorf("proto: wrong wireType = %d for field Replies", wireType)
			}
		case 19:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Reactions", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthComment
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthComment
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Reactions = append(m.Reactions, &Reaction{})
			if err := m.Reactions[len(m.Reactions)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 20:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Hidden", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowComment
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				v |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			m.Hidden = bool(v != 0)
		default:
			iNdEx = preIndex
			skippy, err := skipComment(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthComment
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipComment(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowComment
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowComment
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowComment
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthComment
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupComment
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthComment
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthComment        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowComment          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupComment = fmt.Errorf("proto: unexpected end of group")
)
