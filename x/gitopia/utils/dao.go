package utils

import (
	"github.com/gitopia/gitopia/v2/x/gitopia/types"
)

var max_dao_pinned_repos = 6

func CheckDaoPinnedRepositoryAllowMax(dao types.Dao) bool {
	return (len(dao.PinnedRepos) == max_dao_pinned_repos)
}
