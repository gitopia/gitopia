package utils

import (
	"github.com/gitopia/gitopia/v3/x/gitopia/types"
)

func RepositoryCollaboratorExists(r []*types.RepositoryCollaborator, val string) (int, bool) {
	for i, v := range r {
		if v.Id == val {
			return i, true
		}
	}
	return 0, false
}

func IssueIidExists(r []*types.IssueIid, val uint64) (int, bool) {
	for i, v := range r {
		if v.Iid == val {
			return i, true
		}
	}
	return 0, false
}

func PullRequestIidExists(r []*types.PullRequestIid, val uint64) (int, bool) {
	for i, v := range r {
		if v.Iid == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryLabelExists(l []*types.RepositoryLabel, val string) (int, bool) {
	for i, v := range l {
		if v.Name == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryLabelIdExists(l []*types.RepositoryLabel, val uint64) (int, bool) {
	for i, v := range l {
		if v.Id == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryReleaseTagExists(r []*types.RepositoryRelease, val string) (int, bool) {
	for i, v := range r {
		if v.TagName == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryReleaseIdExists(r []*types.RepositoryRelease, val uint64) (int, bool) {
	for i, v := range r {
		if v.Id == val {
			return i, true
		}
	}
	return 0, false
}

// CLEANUP
func RepositoryBackupExists(r []*types.RepositoryBackup, val types.RepositoryBackup_Store) (int, bool) {
	for i, v := range r {
		if v.Store == val {
			return i, true
		}
	}
	return 0, false
}
