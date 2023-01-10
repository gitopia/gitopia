package v3

import (
	"encoding/binary"
	"strconv"
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

const (
	RepositoryKey  = "Repository-value-"
	IssueKey       = "Issue-value-"
	PullRequestKey = "PullRequest-value-"
	CommentKey     = "Comment-value-"
)

// GetIDBytes returns the byte representation of the ID
func GetIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

func CreateNewKey(repositoryId uint64, iid uint64) []byte {
	repositoryPrefix := strconv.FormatUint(repositoryId, 10) + "-"
	return append([]byte(repositoryPrefix), GetIDBytes(iid)...)
}
