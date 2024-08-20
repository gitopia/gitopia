package utils

import (
	"regexp"

	"github.com/gitopia/gitopia/v4/x/gitopia/types"
)

var max_pinned_repos = 6

func ValidateUsername(username string) (bool, error) {
	match, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[_.-]?[a-zA-Z0-9])*$", username)
	if err != nil {
		return match, err
	}
	return match, nil
}

func CheckPinnedRepositoryAllowMax(u types.User) bool {
	return (len(u.PinnedRepos) == max_pinned_repos)
}

func CheckRepositoryPinnedExists(u types.User, val uint64) bool {
	for _, v := range u.PinnedRepos {
		if v == val {
			return true
		}
	}
	return false
}
