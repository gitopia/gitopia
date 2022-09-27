package utils

import (
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func MemberExists(m []types.Member, address string) (int, bool) {
	for i, v := range m {
		if v.Address == address {
			return i, true
		}
	}
	return 0, false
}
