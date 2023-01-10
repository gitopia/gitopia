package v3

import (
	"encoding/binary"
	"strconv"
)

// GetIDBytes returns the byte representation of the ID
func GetIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

func CreateIssueKey(repositoryId uint64, issueIid uint64) []byte {
	repositoryPrefix := strconv.FormatUint(repositoryId, 10) + "-"
	return append([]byte(repositoryPrefix), GetIDBytes(issueIid)...)
}
