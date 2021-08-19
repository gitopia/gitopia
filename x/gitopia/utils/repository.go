package utils

import (
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func RepositoryCollaboratorExists(r []*types.RepositoryCollaborator, val string) (int, bool) {
	for i, v := range r {
		if v.Id == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryBranchExists(r []*types.RepositoryBranch, val string) (int, bool) {
	for i, v := range r {
		if v.Name == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryIssueExists(r []*types.RepositoryIssue, val uint64) (int, bool) {
	for i, v := range r {
		if v.Iid == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryPullRequestExists(r []*types.RepositoryPullRequest, val uint64) (int, bool) {
	for i, v := range r {
		if v.Iid == val {
			return i, true
		}
	}
	return 0, false
}
