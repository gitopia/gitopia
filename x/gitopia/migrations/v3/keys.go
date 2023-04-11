package types

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

func CreateNewIssueKey(repositoryId, issueIid uint64) []byte {
	repositoryPrefix := strconv.FormatUint(repositoryId, 10) + "-"
	return append([]byte(repositoryPrefix), GetIDBytes(issueIid)...)
}

func CreateNewPullRequestKey(repositoryId, pullRequestIid uint64) []byte {
	repositoryPrefix := strconv.FormatUint(repositoryId, 10) + "-"
	return append([]byte(repositoryPrefix), GetIDBytes(pullRequestIid)...)
}

func CreateNewIssueCommentKey(repositoryId, issueIid, commentIid uint64) []byte {
	repositoryIssuePrefix := strconv.FormatUint(repositoryId, 10) + "-issue-" + strconv.FormatUint(issueIid, 10) + "-"
	return append([]byte(repositoryIssuePrefix), GetIDBytes(commentIid)...)
}

func CreateNewPullRequestCommentKey(repositoryId, pullRequestIid, commentIid uint64) []byte {
	repositoryPullRequestPrefix := strconv.FormatUint(repositoryId, 10) + "-pr-" + strconv.FormatUint(pullRequestIid, 10) + "-"
	return append([]byte(repositoryPullRequestPrefix), GetIDBytes(commentIid)...)
}
