// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: rewards/rewards.proto

package types

import (
	fmt "fmt"
	types "github.com/cosmos/cosmos-sdk/types"
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

type Reward struct {
	Recipient              string     `protobuf:"bytes,1,opt,name=recipient,proto3" json:"recipient,omitempty"`
	Amount                 types.Coin `protobuf:"bytes,2,opt,name=amount,proto3,castkey=github.com/cosmos/cosmos-sdk/types.Coin" json:"amount"`
	Creator                string     `protobuf:"bytes,3,opt,name=creator,proto3" json:"creator,omitempty"`
	ClaimedAmount          types.Coin `protobuf:"bytes,4,opt,name=claimed_amount,json=claimedAmount,proto3,castkey=github.com/cosmos/cosmos-sdk/types.Coin" json:"claimed_amount"`
	ClaimedAmountWithDecay types.Coin `protobuf:"bytes,5,opt,name=claimed_amount_with_decay,json=claimedAmountWithDecay,proto3,castkey=github.com/cosmos/cosmos-sdk/types.Coin" json:"claimed_amount_with_decay"`
}

func (m *Reward) Reset()         { *m = Reward{} }
func (m *Reward) String() string { return proto.CompactTextString(m) }
func (*Reward) ProtoMessage()    {}
func (*Reward) Descriptor() ([]byte, []int) {
	return fileDescriptor_35285a44c4c54379, []int{0}
}
func (m *Reward) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Reward) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Reward.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Reward) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Reward.Merge(m, src)
}
func (m *Reward) XXX_Size() int {
	return m.Size()
}
func (m *Reward) XXX_DiscardUnknown() {
	xxx_messageInfo_Reward.DiscardUnknown(m)
}

var xxx_messageInfo_Reward proto.InternalMessageInfo

func (m *Reward) GetRecipient() string {
	if m != nil {
		return m.Recipient
	}
	return ""
}

func (m *Reward) GetAmount() types.Coin {
	if m != nil {
		return m.Amount
	}
	return types.Coin{}
}

func (m *Reward) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *Reward) GetClaimedAmount() types.Coin {
	if m != nil {
		return m.ClaimedAmount
	}
	return types.Coin{}
}

func (m *Reward) GetClaimedAmountWithDecay() types.Coin {
	if m != nil {
		return m.ClaimedAmountWithDecay
	}
	return types.Coin{}
}

func init() {
	proto.RegisterType((*Reward)(nil), "gitopia.gitopia.rewards.v2.Reward")
}

func init() { proto.RegisterFile("rewards/rewards.proto", fileDescriptor_35285a44c4c54379) }

var fileDescriptor_35285a44c4c54379 = []byte{
	// 333 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xac, 0x92, 0xb1, 0x4e, 0xf3, 0x30,
	0x14, 0x85, 0xe3, 0xbf, 0x3f, 0x45, 0x35, 0x82, 0x21, 0x02, 0x94, 0x56, 0xc8, 0xad, 0x58, 0xe8,
	0x82, 0xad, 0x96, 0x11, 0x09, 0x89, 0xc2, 0x13, 0x74, 0x01, 0xb1, 0x54, 0x8e, 0x63, 0xa5, 0x16,
	0x24, 0x37, 0xd8, 0x6e, 0x4b, 0x57, 0x24, 0x76, 0xde, 0x80, 0xd7, 0xe9, 0xd8, 0x91, 0x09, 0x50,
	0xfb, 0x22, 0xa8, 0x89, 0x03, 0x74, 0xef, 0x92, 0x13, 0xfb, 0xfa, 0x9e, 0xef, 0x0c, 0x07, 0x1f,
	0x68, 0x39, 0xe1, 0x3a, 0x32, 0xcc, 0x29, 0xcd, 0x34, 0x58, 0xf0, 0x1b, 0xb1, 0xb2, 0x90, 0x29,
	0x4e, 0x4b, 0x2d, 0xc7, 0xe3, 0x6e, 0x63, 0x3f, 0x86, 0x18, 0xf2, 0x67, 0x6c, 0xf5, 0x57, 0x6c,
	0x34, 0x88, 0x00, 0x93, 0x80, 0x61, 0x21, 0x37, 0x92, 0x8d, 0x3b, 0xa1, 0xb4, 0xbc, 0xc3, 0x04,
	0xa8, 0xb4, 0x98, 0x1f, 0xbf, 0x55, 0x70, 0xb5, 0x9f, 0x9b, 0xf8, 0x47, 0xb8, 0xa6, 0xa5, 0x50,
	0x99, 0x92, 0xa9, 0x0d, 0x50, 0x0b, 0xb5, 0x6b, 0xfd, 0xdf, 0x0b, 0x3f, 0xc4, 0x55, 0x9e, 0xc0,
	0x28, 0xb5, 0xc1, 0xbf, 0x16, 0x6a, 0xef, 0x74, 0xeb, 0xb4, 0x70, 0xa6, 0x2b, 0x67, 0xea, 0x9c,
	0xe9, 0x15, 0xa8, 0xb4, 0xc7, 0x66, 0x1f, 0x4d, 0xef, 0xf9, 0xb3, 0x79, 0x12, 0x2b, 0x3b, 0x1c,
	0x85, 0x54, 0x40, 0xc2, 0x5c, 0x8c, 0x42, 0x4e, 0x4d, 0x74, 0xcf, 0xec, 0x34, 0x93, 0x26, 0x5f,
	0xe8, 0x3b, 0x67, 0x3f, 0xc0, 0xdb, 0x42, 0x4b, 0x6e, 0x41, 0x07, 0x95, 0x9c, 0x5f, 0x1e, 0xfd,
	0x47, 0xbc, 0x27, 0x1e, 0xb8, 0x4a, 0x64, 0x34, 0x70, 0x29, 0xfe, 0x6f, 0x3c, 0xc5, 0xae, 0x23,
	0x5c, 0x16, 0x61, 0x5e, 0x10, 0xae, 0xaf, 0x33, 0x07, 0x13, 0x65, 0x87, 0x83, 0x48, 0x0a, 0x3e,
	0x0d, 0xb6, 0x36, 0x8e, 0x3f, 0x5c, 0xc3, 0xdf, 0x28, 0x3b, 0xbc, 0x5e, 0x91, 0x7a, 0xb7, 0xb3,
	0x05, 0x41, 0xf3, 0x05, 0x41, 0x5f, 0x0b, 0x82, 0x5e, 0x97, 0xc4, 0x9b, 0x2f, 0x89, 0xf7, 0xbe,
	0x24, 0xde, 0xdd, 0xc5, 0x1f, 0x6b, 0x57, 0x88, 0x1f, 0x7d, 0x2a, 0x9b, 0xc3, 0x12, 0x15, 0x6b,
	0x6e, 0x15, 0xa4, 0x86, 0x8d, 0xbb, 0x05, 0xf0, 0x3c, 0xff, 0x86, 0xd5, 0xbc, 0x02, 0x67, 0xdf,
	0x01, 0x00, 0x00, 0xff, 0xff, 0xcc, 0x12, 0xdf, 0x08, 0x6d, 0x02, 0x00, 0x00,
}

func (m *Reward) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Reward) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Reward) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	{
		size, err := m.ClaimedAmountWithDecay.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintRewards(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x2a
	{
		size, err := m.ClaimedAmount.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintRewards(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x22
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintRewards(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0x1a
	}
	{
		size, err := m.Amount.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintRewards(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x12
	if len(m.Recipient) > 0 {
		i -= len(m.Recipient)
		copy(dAtA[i:], m.Recipient)
		i = encodeVarintRewards(dAtA, i, uint64(len(m.Recipient)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintRewards(dAtA []byte, offset int, v uint64) int {
	offset -= sovRewards(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Reward) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Recipient)
	if l > 0 {
		n += 1 + l + sovRewards(uint64(l))
	}
	l = m.Amount.Size()
	n += 1 + l + sovRewards(uint64(l))
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovRewards(uint64(l))
	}
	l = m.ClaimedAmount.Size()
	n += 1 + l + sovRewards(uint64(l))
	l = m.ClaimedAmountWithDecay.Size()
	n += 1 + l + sovRewards(uint64(l))
	return n
}

func sovRewards(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozRewards(x uint64) (n int) {
	return sovRewards(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Reward) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowRewards
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
			return fmt.Errorf("proto: Reward: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Reward: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Recipient", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowRewards
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
				return ErrInvalidLengthRewards
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthRewards
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Recipient = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Amount", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowRewards
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
				return ErrInvalidLengthRewards
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthRewards
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.Amount.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowRewards
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
				return ErrInvalidLengthRewards
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthRewards
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ClaimedAmount", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowRewards
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
				return ErrInvalidLengthRewards
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthRewards
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.ClaimedAmount.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ClaimedAmountWithDecay", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowRewards
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
				return ErrInvalidLengthRewards
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthRewards
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.ClaimedAmountWithDecay.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipRewards(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthRewards
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
func skipRewards(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowRewards
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
					return 0, ErrIntOverflowRewards
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
					return 0, ErrIntOverflowRewards
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
				return 0, ErrInvalidLengthRewards
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupRewards
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthRewards
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthRewards        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowRewards          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupRewards = fmt.Errorf("proto: unexpected end of group")
)