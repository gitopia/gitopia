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

func UserOrganizationIdExists(r []*types.UserOrganization, val string) (int, bool) {
	for i, v := range r {
		if v.Id == val {
			return i, true
		}
	}
	return 0, false
}

func UserRequestIdExists(r []uint64, val uint64) (int, bool) {
	for i, v := range r {
		if v == val {
			return i, true
		}
	}
	return 0, false
}
