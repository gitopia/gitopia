package utils

import (
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func OrganizationRepositoryExists(r []*types.OrganizationRepository, val string) (int, bool) {
	for i, v := range r {
		if v.Name == val {
			return i, true
		}
	}
	return 0, false
}

func OrganizationMemberExists(r []*types.OrganizationMember, val string) (int, bool) {
	for i, v := range r {
		if v.Id == val {
			return i, true
		}
	}
	return 0, false
}
