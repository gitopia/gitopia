package utils

import (
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func UserRepositoryExists(r []*types.UserRepository, val string) (int, bool) {
	for i, v := range r {
		if v.Name == val {
			return i, true
		}
	}
	return 0, false
}

func UserOrganizationExists(r []*types.UserOrganization, val string) (int, bool) {
	for i, v := range r {
		if v.Name == val {
			return i, true
		}
	}
	return 0, false
}
