// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: gitopia/dao.proto

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

type Dao struct {
	Creator     string   `protobuf:"bytes,1,opt,name=creator,proto3" json:"creator,omitempty"`
	Id          uint64   `protobuf:"varint,2,opt,name=id,proto3" json:"id,omitempty"`
	Address     string   `protobuf:"bytes,3,opt,name=address,proto3" json:"address,omitempty"`
	Name        string   `protobuf:"bytes,4,opt,name=name,proto3" json:"name,omitempty"`
	AvatarUrl   string   `protobuf:"bytes,5,opt,name=avatarUrl,proto3" json:"avatarUrl,omitempty"`
	Followers   []string `protobuf:"bytes,6,rep,name=followers,proto3" json:"followers,omitempty"`
	Following   []string `protobuf:"bytes,7,rep,name=following,proto3" json:"following,omitempty"`
	Teams       []uint64 `protobuf:"varint,8,rep,packed,name=teams,proto3" json:"teams,omitempty"`
	Location    string   `protobuf:"bytes,9,opt,name=location,proto3" json:"location,omitempty"`
	Website     string   `protobuf:"bytes,10,opt,name=website,proto3" json:"website,omitempty"`
	Verified    bool     `protobuf:"varint,11,opt,name=verified,proto3" json:"verified,omitempty"`
	Description string   `protobuf:"bytes,12,opt,name=description,proto3" json:"description,omitempty"`
	CreatedAt   int64    `protobuf:"varint,13,opt,name=createdAt,proto3" json:"createdAt,omitempty"`
	UpdatedAt   int64    `protobuf:"varint,14,opt,name=updatedAt,proto3" json:"updatedAt,omitempty"`
	PinnedRepos []uint64 `protobuf:"varint,15,rep,packed,name=pinned_repos,json=pinnedRepos,proto3" json:"pinned_repos,omitempty"`
}

func (m *Dao) Reset()         { *m = Dao{} }
func (m *Dao) String() string { return proto.CompactTextString(m) }
func (*Dao) ProtoMessage()    {}
func (*Dao) Descriptor() ([]byte, []int) {
	return fileDescriptor_bbacb5867cc9ed90, []int{0}
}
func (m *Dao) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Dao) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Dao.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Dao) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Dao.Merge(m, src)
}
func (m *Dao) XXX_Size() int {
	return m.Size()
}
func (m *Dao) XXX_DiscardUnknown() {
	xxx_messageInfo_Dao.DiscardUnknown(m)
}

var xxx_messageInfo_Dao proto.InternalMessageInfo

func (m *Dao) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *Dao) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

func (m *Dao) GetAddress() string {
	if m != nil {
		return m.Address
	}
	return ""
}

func (m *Dao) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *Dao) GetAvatarUrl() string {
	if m != nil {
		return m.AvatarUrl
	}
	return ""
}

func (m *Dao) GetFollowers() []string {
	if m != nil {
		return m.Followers
	}
	return nil
}

func (m *Dao) GetFollowing() []string {
	if m != nil {
		return m.Following
	}
	return nil
}

func (m *Dao) GetTeams() []uint64 {
	if m != nil {
		return m.Teams
	}
	return nil
}

func (m *Dao) GetLocation() string {
	if m != nil {
		return m.Location
	}
	return ""
}

func (m *Dao) GetWebsite() string {
	if m != nil {
		return m.Website
	}
	return ""
}

func (m *Dao) GetVerified() bool {
	if m != nil {
		return m.Verified
	}
	return false
}

func (m *Dao) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

func (m *Dao) GetCreatedAt() int64 {
	if m != nil {
		return m.CreatedAt
	}
	return 0
}

func (m *Dao) GetUpdatedAt() int64 {
	if m != nil {
		return m.UpdatedAt
	}
	return 0
}

func (m *Dao) GetPinnedRepos() []uint64 {
	if m != nil {
		return m.PinnedRepos
	}
	return nil
}

func init() {
	proto.RegisterType((*Dao)(nil), "gitopia.gitopia.gitopia.Dao")
}

func init() { proto.RegisterFile("gitopia/dao.proto", fileDescriptor_bbacb5867cc9ed90) }

var fileDescriptor_bbacb5867cc9ed90 = []byte{
	// 361 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x5c, 0x92, 0xbb, 0x4e, 0xf3, 0x30,
	0x18, 0x86, 0xeb, 0x26, 0x3d, 0xb9, 0xfd, 0xfb, 0x0b, 0xab, 0x12, 0x56, 0x85, 0xa2, 0xc0, 0x94,
	0x85, 0x66, 0xe8, 0x15, 0x80, 0x90, 0xd8, 0x23, 0xb1, 0xb0, 0x20, 0x37, 0x76, 0x83, 0xa5, 0x34,
	0x5f, 0x64, 0xbb, 0x2d, 0xdc, 0x05, 0x97, 0xc0, 0xe5, 0x30, 0x76, 0x64, 0x44, 0xed, 0x8d, 0x20,
	0x3b, 0x69, 0x5a, 0x31, 0xd9, 0xef, 0xf3, 0xbc, 0x4e, 0xbe, 0x1c, 0xf0, 0x45, 0x26, 0x0d, 0x94,
	0x92, 0xc5, 0x9c, 0xc1, 0xac, 0x54, 0x60, 0x80, 0x5c, 0xd6, 0x68, 0xf6, 0x67, 0x9d, 0x4e, 0x32,
	0xc8, 0xc0, 0x75, 0x62, 0xbb, 0xab, 0xea, 0x37, 0x9f, 0x1e, 0xf6, 0x1e, 0x18, 0x10, 0x8a, 0x7b,
	0xa9, 0x12, 0xcc, 0x80, 0xa2, 0x28, 0x44, 0xd1, 0x20, 0x39, 0x46, 0x32, 0xc6, 0x6d, 0xc9, 0x69,
	0x3b, 0x44, 0x91, 0x9f, 0xb4, 0x25, 0xb7, 0x4d, 0xc6, 0xb9, 0x12, 0x5a, 0x53, 0xaf, 0x6a, 0xd6,
	0x91, 0x10, 0xec, 0x17, 0x6c, 0x25, 0xa8, 0xef, 0xb0, 0xdb, 0x93, 0x2b, 0x3c, 0x60, 0x1b, 0x66,
	0x98, 0x7a, 0x52, 0x39, 0xed, 0x38, 0x71, 0x02, 0xd6, 0x2e, 0x21, 0xcf, 0x61, 0x2b, 0x94, 0xa6,
	0xdd, 0xd0, 0xb3, 0xb6, 0x01, 0x27, 0x2b, 0x8b, 0x8c, 0xf6, 0xce, 0xad, 0x2c, 0x32, 0x32, 0xc1,
	0x1d, 0x23, 0xd8, 0x4a, 0xd3, 0x7e, 0xe8, 0x45, 0x7e, 0x52, 0x05, 0x32, 0xc5, 0xfd, 0x1c, 0x52,
	0x66, 0x24, 0x14, 0x74, 0xe0, 0x6e, 0xd7, 0x64, 0x3b, 0xf9, 0x56, 0x2c, 0xb4, 0x34, 0x82, 0xe2,
	0x6a, 0xf2, 0x3a, 0xda, 0x53, 0x1b, 0xa1, 0xe4, 0x52, 0x0a, 0x4e, 0x87, 0x21, 0x8a, 0xfa, 0x49,
	0x93, 0x49, 0x88, 0x87, 0x5c, 0xe8, 0x54, 0xc9, 0xd2, 0x5d, 0x74, 0xe4, 0x4e, 0x9e, 0x23, 0x3b,
	0xa7, 0x7b, 0x59, 0x82, 0xdf, 0x19, 0xfa, 0x2f, 0x44, 0x91, 0x97, 0x9c, 0x80, 0xb5, 0xeb, 0x92,
	0xd7, 0x76, 0x5c, 0xd9, 0x06, 0x90, 0x6b, 0x3c, 0x2a, 0x65, 0x51, 0x08, 0xfe, 0xa2, 0x44, 0x09,
	0x9a, 0xfe, 0x77, 0x0f, 0x33, 0xac, 0x58, 0x62, 0xd1, 0xfd, 0xe3, 0xd7, 0x3e, 0x40, 0xbb, 0x7d,
	0x80, 0x7e, 0xf6, 0x01, 0xfa, 0x38, 0x04, 0xad, 0xdd, 0x21, 0x68, 0x7d, 0x1f, 0x82, 0xd6, 0xf3,
	0x6d, 0x26, 0xcd, 0xeb, 0x7a, 0x31, 0x4b, 0x61, 0x15, 0x1f, 0xff, 0x84, 0xe3, 0xba, 0x99, 0xc7,
	0x6f, 0x4d, 0x30, 0xef, 0xa5, 0xd0, 0x8b, 0xae, 0xfb, 0xe4, 0xf3, 0xdf, 0x00, 0x00, 0x00, 0xff,
	0xff, 0x2c, 0x7f, 0x99, 0xcb, 0x36, 0x02, 0x00, 0x00,
}

func (m *Dao) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Dao) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Dao) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.PinnedRepos) > 0 {
		dAtA2 := make([]byte, len(m.PinnedRepos)*10)
		var j1 int
		for _, num := range m.PinnedRepos {
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
		i = encodeVarintDao(dAtA, i, uint64(j1))
		i--
		dAtA[i] = 0x7a
	}
	if m.UpdatedAt != 0 {
		i = encodeVarintDao(dAtA, i, uint64(m.UpdatedAt))
		i--
		dAtA[i] = 0x70
	}
	if m.CreatedAt != 0 {
		i = encodeVarintDao(dAtA, i, uint64(m.CreatedAt))
		i--
		dAtA[i] = 0x68
	}
	if len(m.Description) > 0 {
		i -= len(m.Description)
		copy(dAtA[i:], m.Description)
		i = encodeVarintDao(dAtA, i, uint64(len(m.Description)))
		i--
		dAtA[i] = 0x62
	}
	if m.Verified {
		i--
		if m.Verified {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x58
	}
	if len(m.Website) > 0 {
		i -= len(m.Website)
		copy(dAtA[i:], m.Website)
		i = encodeVarintDao(dAtA, i, uint64(len(m.Website)))
		i--
		dAtA[i] = 0x52
	}
	if len(m.Location) > 0 {
		i -= len(m.Location)
		copy(dAtA[i:], m.Location)
		i = encodeVarintDao(dAtA, i, uint64(len(m.Location)))
		i--
		dAtA[i] = 0x4a
	}
	if len(m.Teams) > 0 {
		dAtA4 := make([]byte, len(m.Teams)*10)
		var j3 int
		for _, num := range m.Teams {
			for num >= 1<<7 {
				dAtA4[j3] = uint8(uint64(num)&0x7f | 0x80)
				num >>= 7
				j3++
			}
			dAtA4[j3] = uint8(num)
			j3++
		}
		i -= j3
		copy(dAtA[i:], dAtA4[:j3])
		i = encodeVarintDao(dAtA, i, uint64(j3))
		i--
		dAtA[i] = 0x42
	}
	if len(m.Following) > 0 {
		for iNdEx := len(m.Following) - 1; iNdEx >= 0; iNdEx-- {
			i -= len(m.Following[iNdEx])
			copy(dAtA[i:], m.Following[iNdEx])
			i = encodeVarintDao(dAtA, i, uint64(len(m.Following[iNdEx])))
			i--
			dAtA[i] = 0x3a
		}
	}
	if len(m.Followers) > 0 {
		for iNdEx := len(m.Followers) - 1; iNdEx >= 0; iNdEx-- {
			i -= len(m.Followers[iNdEx])
			copy(dAtA[i:], m.Followers[iNdEx])
			i = encodeVarintDao(dAtA, i, uint64(len(m.Followers[iNdEx])))
			i--
			dAtA[i] = 0x32
		}
	}
	if len(m.AvatarUrl) > 0 {
		i -= len(m.AvatarUrl)
		copy(dAtA[i:], m.AvatarUrl)
		i = encodeVarintDao(dAtA, i, uint64(len(m.AvatarUrl)))
		i--
		dAtA[i] = 0x2a
	}
	if len(m.Name) > 0 {
		i -= len(m.Name)
		copy(dAtA[i:], m.Name)
		i = encodeVarintDao(dAtA, i, uint64(len(m.Name)))
		i--
		dAtA[i] = 0x22
	}
	if len(m.Address) > 0 {
		i -= len(m.Address)
		copy(dAtA[i:], m.Address)
		i = encodeVarintDao(dAtA, i, uint64(len(m.Address)))
		i--
		dAtA[i] = 0x1a
	}
	if m.Id != 0 {
		i = encodeVarintDao(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x10
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintDao(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintDao(dAtA []byte, offset int, v uint64) int {
	offset -= sovDao(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Dao) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovDao(uint64(l))
	}
	if m.Id != 0 {
		n += 1 + sovDao(uint64(m.Id))
	}
	l = len(m.Address)
	if l > 0 {
		n += 1 + l + sovDao(uint64(l))
	}
	l = len(m.Name)
	if l > 0 {
		n += 1 + l + sovDao(uint64(l))
	}
	l = len(m.AvatarUrl)
	if l > 0 {
		n += 1 + l + sovDao(uint64(l))
	}
	if len(m.Followers) > 0 {
		for _, s := range m.Followers {
			l = len(s)
			n += 1 + l + sovDao(uint64(l))
		}
	}
	if len(m.Following) > 0 {
		for _, s := range m.Following {
			l = len(s)
			n += 1 + l + sovDao(uint64(l))
		}
	}
	if len(m.Teams) > 0 {
		l = 0
		for _, e := range m.Teams {
			l += sovDao(uint64(e))
		}
		n += 1 + sovDao(uint64(l)) + l
	}
	l = len(m.Location)
	if l > 0 {
		n += 1 + l + sovDao(uint64(l))
	}
	l = len(m.Website)
	if l > 0 {
		n += 1 + l + sovDao(uint64(l))
	}
	if m.Verified {
		n += 2
	}
	l = len(m.Description)
	if l > 0 {
		n += 1 + l + sovDao(uint64(l))
	}
	if m.CreatedAt != 0 {
		n += 1 + sovDao(uint64(m.CreatedAt))
	}
	if m.UpdatedAt != 0 {
		n += 1 + sovDao(uint64(m.UpdatedAt))
	}
	if len(m.PinnedRepos) > 0 {
		l = 0
		for _, e := range m.PinnedRepos {
			l += sovDao(uint64(e))
		}
		n += 1 + sovDao(uint64(l)) + l
	}
	return n
}

func sovDao(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozDao(x uint64) (n int) {
	return sovDao(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Dao) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowDao
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
			return fmt.Errorf("proto: Dao: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Dao: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
				return ErrInvalidLengthDao
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthDao
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
					return ErrIntOverflowDao
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
				return fmt.Errorf("proto: wrong wireType = %d for field Address", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
				return ErrInvalidLengthDao
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthDao
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Address = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Name", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
				return ErrInvalidLengthDao
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthDao
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Name = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field AvatarUrl", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
				return ErrInvalidLengthDao
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthDao
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.AvatarUrl = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 6:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Followers", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
				return ErrInvalidLengthDao
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthDao
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Followers = append(m.Followers, string(dAtA[iNdEx:postIndex]))
			iNdEx = postIndex
		case 7:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Following", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
				return ErrInvalidLengthDao
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthDao
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Following = append(m.Following, string(dAtA[iNdEx:postIndex]))
			iNdEx = postIndex
		case 8:
			if wireType == 0 {
				var v uint64
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowDao
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
				m.Teams = append(m.Teams, v)
			} else if wireType == 2 {
				var packedLen int
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowDao
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
					return ErrInvalidLengthDao
				}
				postIndex := iNdEx + packedLen
				if postIndex < 0 {
					return ErrInvalidLengthDao
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
				if elementCount != 0 && len(m.Teams) == 0 {
					m.Teams = make([]uint64, 0, elementCount)
				}
				for iNdEx < postIndex {
					var v uint64
					for shift := uint(0); ; shift += 7 {
						if shift >= 64 {
							return ErrIntOverflowDao
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
					m.Teams = append(m.Teams, v)
				}
			} else {
				return fmt.Errorf("proto: wrong wireType = %d for field Teams", wireType)
			}
		case 9:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Location", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
				return ErrInvalidLengthDao
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthDao
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Location = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 10:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Website", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
				return ErrInvalidLengthDao
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthDao
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Website = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 11:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Verified", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
		case 12:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Description", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
				return ErrInvalidLengthDao
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthDao
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Description = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 13:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field CreatedAt", wireType)
			}
			m.CreatedAt = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
		case 14:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field UpdatedAt", wireType)
			}
			m.UpdatedAt = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowDao
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
		case 15:
			if wireType == 0 {
				var v uint64
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowDao
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
				m.PinnedRepos = append(m.PinnedRepos, v)
			} else if wireType == 2 {
				var packedLen int
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowDao
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
					return ErrInvalidLengthDao
				}
				postIndex := iNdEx + packedLen
				if postIndex < 0 {
					return ErrInvalidLengthDao
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
				if elementCount != 0 && len(m.PinnedRepos) == 0 {
					m.PinnedRepos = make([]uint64, 0, elementCount)
				}
				for iNdEx < postIndex {
					var v uint64
					for shift := uint(0); ; shift += 7 {
						if shift >= 64 {
							return ErrIntOverflowDao
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
					m.PinnedRepos = append(m.PinnedRepos, v)
				}
			} else {
				return fmt.Errorf("proto: wrong wireType = %d for field PinnedRepos", wireType)
			}
		default:
			iNdEx = preIndex
			skippy, err := skipDao(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthDao
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
func skipDao(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowDao
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
					return 0, ErrIntOverflowDao
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
					return 0, ErrIntOverflowDao
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
				return 0, ErrInvalidLengthDao
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupDao
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthDao
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthDao        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowDao          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupDao = fmt.Errorf("proto: unexpected end of group")
)
