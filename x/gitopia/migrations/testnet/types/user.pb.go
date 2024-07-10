// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: gitopia/user.proto

package types

import (
	fmt "fmt"
	_ "github.com/cosmos/gogoproto/gogoproto"
	proto "github.com/cosmos/gogoproto/proto"
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

type User struct {
	Creator        string   `protobuf:"bytes,1,opt,name=creator,proto3" json:"creator,omitempty"`
	Id             uint64   `protobuf:"varint,2,opt,name=id,proto3" json:"id,omitempty"`
	Name           string   `protobuf:"bytes,3,opt,name=name,proto3" json:"name,omitempty"`
	Username       string   `protobuf:"bytes,4,opt,name=username,proto3" json:"username,omitempty"`
	UsernameGithub string   `protobuf:"bytes,5,opt,name=usernameGithub,proto3" json:"usernameGithub,omitempty"`
	AvatarUrl      string   `protobuf:"bytes,6,opt,name=avatarUrl,proto3" json:"avatarUrl,omitempty"`
	Followers      []string `protobuf:"bytes,7,rep,name=followers,proto3" json:"followers,omitempty"`
	Following      []string `protobuf:"bytes,8,rep,name=following,proto3" json:"following,omitempty"`
	StarredRepos   []uint64 `protobuf:"varint,9,rep,packed,name=starred_repos,json=starredRepos,proto3" json:"starred_repos,omitempty"`
	Subscriptions  string   `protobuf:"bytes,10,opt,name=subscriptions,proto3" json:"subscriptions,omitempty"`
	Bio            string   `protobuf:"bytes,11,opt,name=bio,proto3" json:"bio,omitempty"`
	CreatedAt      int64    `protobuf:"varint,12,opt,name=createdAt,proto3" json:"createdAt,omitempty"`
	UpdatedAt      int64    `protobuf:"varint,13,opt,name=updatedAt,proto3" json:"updatedAt,omitempty"`
	Verified       bool     `protobuf:"varint,14,opt,name=verified,proto3" json:"verified,omitempty"`
}

func (m *User) Reset()         { *m = User{} }
func (m *User) String() string { return proto.CompactTextString(m) }
func (*User) ProtoMessage()    {}
func (*User) Descriptor() ([]byte, []int) {
	return fileDescriptor_bf7f4b301dc3d162, []int{0}
}
func (m *User) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *User) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_User.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *User) XXX_Merge(src proto.Message) {
	xxx_messageInfo_User.Merge(m, src)
}
func (m *User) XXX_Size() int {
	return m.Size()
}
func (m *User) XXX_DiscardUnknown() {
	xxx_messageInfo_User.DiscardUnknown(m)
}

var xxx_messageInfo_User proto.InternalMessageInfo

func (m *User) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *User) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

func (m *User) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *User) GetUsername() string {
	if m != nil {
		return m.Username
	}
	return ""
}

func (m *User) GetUsernameGithub() string {
	if m != nil {
		return m.UsernameGithub
	}
	return ""
}

func (m *User) GetAvatarUrl() string {
	if m != nil {
		return m.AvatarUrl
	}
	return ""
}

func (m *User) GetFollowers() []string {
	if m != nil {
		return m.Followers
	}
	return nil
}

func (m *User) GetFollowing() []string {
	if m != nil {
		return m.Following
	}
	return nil
}

func (m *User) GetStarredRepos() []uint64 {
	if m != nil {
		return m.StarredRepos
	}
	return nil
}

func (m *User) GetSubscriptions() string {
	if m != nil {
		return m.Subscriptions
	}
	return ""
}

func (m *User) GetBio() string {
	if m != nil {
		return m.Bio
	}
	return ""
}

func (m *User) GetCreatedAt() int64 {
	if m != nil {
		return m.CreatedAt
	}
	return 0
}

func (m *User) GetUpdatedAt() int64 {
	if m != nil {
		return m.UpdatedAt
	}
	return 0
}

func (m *User) GetVerified() bool {
	if m != nil {
		return m.Verified
	}
	return false
}

type UserDao struct {
	UserAddress string `protobuf:"bytes,1,opt,name=userAddress,proto3" json:"userAddress,omitempty"`
	DaoAddress  string `protobuf:"bytes,2,opt,name=daoAddress,proto3" json:"daoAddress,omitempty"`
}

func (m *UserDao) Reset()         { *m = UserDao{} }
func (m *UserDao) String() string { return proto.CompactTextString(m) }
func (*UserDao) ProtoMessage()    {}
func (*UserDao) Descriptor() ([]byte, []int) {
	return fileDescriptor_bf7f4b301dc3d162, []int{1}
}
func (m *UserDao) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *UserDao) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_UserDao.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *UserDao) XXX_Merge(src proto.Message) {
	xxx_messageInfo_UserDao.Merge(m, src)
}
func (m *UserDao) XXX_Size() int {
	return m.Size()
}
func (m *UserDao) XXX_DiscardUnknown() {
	xxx_messageInfo_UserDao.DiscardUnknown(m)
}

var xxx_messageInfo_UserDao proto.InternalMessageInfo

func (m *UserDao) GetUserAddress() string {
	if m != nil {
		return m.UserAddress
	}
	return ""
}

func (m *UserDao) GetDaoAddress() string {
	if m != nil {
		return m.DaoAddress
	}
	return ""
}

func init() {
	proto.RegisterType((*User)(nil), "gitopia.gitopia.gitopia.testnet.User")
	proto.RegisterType((*UserDao)(nil), "gitopia.gitopia.gitopia.testnet.UserDao")
}

func init() { proto.RegisterFile("gitopia/user.proto", fileDescriptor_bf7f4b301dc3d162) }

var fileDescriptor_bf7f4b301dc3d162 = []byte{
	// 402 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x5c, 0x92, 0x3f, 0x8b, 0xdb, 0x30,
	0x18, 0xc6, 0x23, 0xdb, 0xcd, 0x9f, 0x37, 0x7f, 0x28, 0xa2, 0x83, 0x08, 0xc5, 0x35, 0x69, 0x29,
	0x9e, 0xe2, 0xa1, 0x63, 0xa7, 0xb4, 0x85, 0x0e, 0xdd, 0x0c, 0x59, 0x0a, 0xa5, 0xc8, 0x91, 0xe2,
	0x13, 0x24, 0x96, 0x91, 0xe4, 0xdc, 0xdd, 0xb7, 0xb8, 0xed, 0xbe, 0xd2, 0x8d, 0x19, 0x6f, 0x3c,
	0x92, 0x2f, 0x72, 0x48, 0xb1, 0x9d, 0x5c, 0x96, 0xe8, 0x79, 0x7f, 0xcf, 0x13, 0x2c, 0x1e, 0xbd,
	0x80, 0x73, 0x61, 0x64, 0x29, 0x68, 0x52, 0x69, 0xae, 0xe6, 0xa5, 0x92, 0x46, 0xe2, 0x4f, 0x35,
	0x9b, 0x5f, 0x9f, 0x86, 0x6b, 0x53, 0x70, 0x33, 0xfd, 0x90, 0xcb, 0x5c, 0xba, 0x6c, 0x62, 0xd5,
	0xe9, 0x6f, 0xb3, 0x47, 0x1f, 0x82, 0xa5, 0xe6, 0x0a, 0x13, 0xe8, 0xad, 0x14, 0xa7, 0x46, 0x2a,
	0x82, 0x22, 0x14, 0x0f, 0xd2, 0x66, 0xc4, 0x13, 0xf0, 0x04, 0x23, 0x5e, 0x84, 0xe2, 0x20, 0xf5,
	0x04, 0xc3, 0x18, 0x82, 0x82, 0x6e, 0x39, 0xf1, 0x5d, 0xcc, 0x69, 0x3c, 0x85, 0xbe, 0xbd, 0x8b,
	0xe3, 0x81, 0xe3, 0xed, 0x8c, 0xbf, 0xc2, 0xa4, 0xd1, 0xbf, 0x85, 0xb9, 0xa9, 0x32, 0xf2, 0xce,
	0x25, 0xae, 0x28, 0xfe, 0x08, 0x03, 0xba, 0xa3, 0x86, 0xaa, 0xa5, 0xda, 0x90, 0xae, 0x8b, 0x9c,
	0x81, 0x75, 0xd7, 0x72, 0xb3, 0x91, 0xb7, 0x5c, 0x69, 0xd2, 0x8b, 0x7c, 0xeb, 0xb6, 0xe0, 0xec,
	0x8a, 0x22, 0x27, 0xfd, 0x4b, 0x57, 0x14, 0x39, 0xfe, 0x0c, 0x63, 0x6d, 0xa8, 0x52, 0x9c, 0xfd,
	0x57, 0xbc, 0x94, 0x9a, 0x0c, 0x22, 0x3f, 0x0e, 0xd2, 0x51, 0x0d, 0x53, 0xcb, 0xf0, 0x17, 0x18,
	0xeb, 0x2a, 0xd3, 0x2b, 0x25, 0x4a, 0x23, 0x64, 0xa1, 0x09, 0xb8, 0x2b, 0xbc, 0x85, 0xf8, 0x3d,
	0xf8, 0x99, 0x90, 0x64, 0xe8, 0x3c, 0x2b, 0xed, 0xa7, 0x5d, 0x53, 0x9c, 0x2d, 0x0c, 0x19, 0x45,
	0x28, 0xf6, 0xd3, 0x33, 0xb0, 0x6e, 0x55, 0xb2, 0xda, 0x1d, 0x9f, 0xdc, 0x16, 0xd8, 0xda, 0x76,
	0x5c, 0x89, 0xb5, 0xe0, 0x8c, 0x4c, 0x22, 0x14, 0xf7, 0xd3, 0x76, 0x9e, 0xfd, 0x81, 0x9e, 0x7d,
	0x98, 0x5f, 0x54, 0xe2, 0x08, 0x86, 0xb6, 0xab, 0x05, 0x63, 0x8a, 0x6b, 0x5d, 0xbf, 0xcf, 0x25,
	0xc2, 0x21, 0x00, 0xa3, 0xb2, 0x09, 0x78, 0x2e, 0x70, 0x41, 0x7e, 0xfc, 0x7b, 0x3a, 0x84, 0x68,
	0x7f, 0x08, 0xd1, 0xcb, 0x21, 0x44, 0x0f, 0xc7, 0xb0, 0xb3, 0x3f, 0x86, 0x9d, 0xe7, 0x63, 0xd8,
	0xf9, 0xfb, 0x33, 0x77, 0xed, 0xcf, 0x57, 0x72, 0x9b, 0x34, 0x6b, 0xd5, 0x9c, 0x77, 0xad, 0xda,
	0x8a, 0x5c, 0x51, 0xd7, 0x40, 0x52, 0xef, 0x53, 0x62, 0xee, 0x4b, 0xae, 0xbf, 0xbb, 0xdf, 0xac,
	0xeb, 0x96, 0xe9, 0xdb, 0x6b, 0x00, 0x00, 0x00, 0xff, 0xff, 0xb4, 0x66, 0xcc, 0x32, 0x99, 0x02,
	0x00, 0x00,
}

func (m *User) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *User) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *User) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Verified {
		i--
		if m.Verified {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x70
	}
	if m.UpdatedAt != 0 {
		i = encodeVarintUser(dAtA, i, uint64(m.UpdatedAt))
		i--
		dAtA[i] = 0x68
	}
	if m.CreatedAt != 0 {
		i = encodeVarintUser(dAtA, i, uint64(m.CreatedAt))
		i--
		dAtA[i] = 0x60
	}
	if len(m.Bio) > 0 {
		i -= len(m.Bio)
		copy(dAtA[i:], m.Bio)
		i = encodeVarintUser(dAtA, i, uint64(len(m.Bio)))
		i--
		dAtA[i] = 0x5a
	}
	if len(m.Subscriptions) > 0 {
		i -= len(m.Subscriptions)
		copy(dAtA[i:], m.Subscriptions)
		i = encodeVarintUser(dAtA, i, uint64(len(m.Subscriptions)))
		i--
		dAtA[i] = 0x52
	}
	if len(m.StarredRepos) > 0 {
		dAtA2 := make([]byte, len(m.StarredRepos)*10)
		var j1 int
		for _, num := range m.StarredRepos {
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
		i = encodeVarintUser(dAtA, i, uint64(j1))
		i--
		dAtA[i] = 0x4a
	}
	if len(m.Following) > 0 {
		for iNdEx := len(m.Following) - 1; iNdEx >= 0; iNdEx-- {
			i -= len(m.Following[iNdEx])
			copy(dAtA[i:], m.Following[iNdEx])
			i = encodeVarintUser(dAtA, i, uint64(len(m.Following[iNdEx])))
			i--
			dAtA[i] = 0x42
		}
	}
	if len(m.Followers) > 0 {
		for iNdEx := len(m.Followers) - 1; iNdEx >= 0; iNdEx-- {
			i -= len(m.Followers[iNdEx])
			copy(dAtA[i:], m.Followers[iNdEx])
			i = encodeVarintUser(dAtA, i, uint64(len(m.Followers[iNdEx])))
			i--
			dAtA[i] = 0x3a
		}
	}
	if len(m.AvatarUrl) > 0 {
		i -= len(m.AvatarUrl)
		copy(dAtA[i:], m.AvatarUrl)
		i = encodeVarintUser(dAtA, i, uint64(len(m.AvatarUrl)))
		i--
		dAtA[i] = 0x32
	}
	if len(m.UsernameGithub) > 0 {
		i -= len(m.UsernameGithub)
		copy(dAtA[i:], m.UsernameGithub)
		i = encodeVarintUser(dAtA, i, uint64(len(m.UsernameGithub)))
		i--
		dAtA[i] = 0x2a
	}
	if len(m.Username) > 0 {
		i -= len(m.Username)
		copy(dAtA[i:], m.Username)
		i = encodeVarintUser(dAtA, i, uint64(len(m.Username)))
		i--
		dAtA[i] = 0x22
	}
	if len(m.Name) > 0 {
		i -= len(m.Name)
		copy(dAtA[i:], m.Name)
		i = encodeVarintUser(dAtA, i, uint64(len(m.Name)))
		i--
		dAtA[i] = 0x1a
	}
	if m.Id != 0 {
		i = encodeVarintUser(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x10
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintUser(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *UserDao) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *UserDao) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *UserDao) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.DaoAddress) > 0 {
		i -= len(m.DaoAddress)
		copy(dAtA[i:], m.DaoAddress)
		i = encodeVarintUser(dAtA, i, uint64(len(m.DaoAddress)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.UserAddress) > 0 {
		i -= len(m.UserAddress)
		copy(dAtA[i:], m.UserAddress)
		i = encodeVarintUser(dAtA, i, uint64(len(m.UserAddress)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintUser(dAtA []byte, offset int, v uint64) int {
	offset -= sovUser(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *User) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovUser(uint64(l))
	}
	if m.Id != 0 {
		n += 1 + sovUser(uint64(m.Id))
	}
	l = len(m.Name)
	if l > 0 {
		n += 1 + l + sovUser(uint64(l))
	}
	l = len(m.Username)
	if l > 0 {
		n += 1 + l + sovUser(uint64(l))
	}
	l = len(m.UsernameGithub)
	if l > 0 {
		n += 1 + l + sovUser(uint64(l))
	}
	l = len(m.AvatarUrl)
	if l > 0 {
		n += 1 + l + sovUser(uint64(l))
	}
	if len(m.Followers) > 0 {
		for _, s := range m.Followers {
			l = len(s)
			n += 1 + l + sovUser(uint64(l))
		}
	}
	if len(m.Following) > 0 {
		for _, s := range m.Following {
			l = len(s)
			n += 1 + l + sovUser(uint64(l))
		}
	}
	if len(m.StarredRepos) > 0 {
		l = 0
		for _, e := range m.StarredRepos {
			l += sovUser(uint64(e))
		}
		n += 1 + sovUser(uint64(l)) + l
	}
	l = len(m.Subscriptions)
	if l > 0 {
		n += 1 + l + sovUser(uint64(l))
	}
	l = len(m.Bio)
	if l > 0 {
		n += 1 + l + sovUser(uint64(l))
	}
	if m.CreatedAt != 0 {
		n += 1 + sovUser(uint64(m.CreatedAt))
	}
	if m.UpdatedAt != 0 {
		n += 1 + sovUser(uint64(m.UpdatedAt))
	}
	if m.Verified {
		n += 2
	}
	return n
}

func (m *UserDao) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.UserAddress)
	if l > 0 {
		n += 1 + l + sovUser(uint64(l))
	}
	l = len(m.DaoAddress)
	if l > 0 {
		n += 1 + l + sovUser(uint64(l))
	}
	return n
}

func sovUser(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozUser(x uint64) (n int) {
	return sovUser(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *User) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowUser
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
			return fmt.Errorf("proto: User: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: User: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
				return ErrInvalidLengthUser
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthUser
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
					return ErrIntOverflowUser
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
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Name", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
				return ErrInvalidLengthUser
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthUser
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Name = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Username", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
				return ErrInvalidLengthUser
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthUser
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Username = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field UsernameGithub", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
				return ErrInvalidLengthUser
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthUser
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.UsernameGithub = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 6:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field AvatarUrl", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
				return ErrInvalidLengthUser
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthUser
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.AvatarUrl = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 7:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Followers", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
				return ErrInvalidLengthUser
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthUser
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Followers = append(m.Followers, string(dAtA[iNdEx:postIndex]))
			iNdEx = postIndex
		case 8:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Following", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
				return ErrInvalidLengthUser
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthUser
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Following = append(m.Following, string(dAtA[iNdEx:postIndex]))
			iNdEx = postIndex
		case 9:
			if wireType == 0 {
				var v uint64
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowUser
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
				m.StarredRepos = append(m.StarredRepos, v)
			} else if wireType == 2 {
				var packedLen int
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowUser
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
					return ErrInvalidLengthUser
				}
				postIndex := iNdEx + packedLen
				if postIndex < 0 {
					return ErrInvalidLengthUser
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
				if elementCount != 0 && len(m.StarredRepos) == 0 {
					m.StarredRepos = make([]uint64, 0, elementCount)
				}
				for iNdEx < postIndex {
					var v uint64
					for shift := uint(0); ; shift += 7 {
						if shift >= 64 {
							return ErrIntOverflowUser
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
					m.StarredRepos = append(m.StarredRepos, v)
				}
			} else {
				return fmt.Errorf("proto: wrong wireType = %d for field StarredRepos", wireType)
			}
		case 10:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Subscriptions", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
				return ErrInvalidLengthUser
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthUser
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Subscriptions = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 11:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Bio", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
				return ErrInvalidLengthUser
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthUser
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Bio = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 12:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field CreatedAt", wireType)
			}
			m.CreatedAt = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
		case 13:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field UpdatedAt", wireType)
			}
			m.UpdatedAt = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
		case 14:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Verified", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
			m.Verified = bool(v != 0)
		default:
			iNdEx = preIndex
			skippy, err := skipUser(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthUser
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
func (m *UserDao) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowUser
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
			return fmt.Errorf("proto: UserDao: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: UserDao: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field UserAddress", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
				return ErrInvalidLengthUser
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthUser
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.UserAddress = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field DaoAddress", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowUser
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
				return ErrInvalidLengthUser
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthUser
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.DaoAddress = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipUser(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthUser
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
func skipUser(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowUser
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
					return 0, ErrIntOverflowUser
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
					return 0, ErrIntOverflowUser
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
				return 0, ErrInvalidLengthUser
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupUser
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthUser
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthUser        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowUser          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupUser = fmt.Errorf("proto: unexpected end of group")
)
