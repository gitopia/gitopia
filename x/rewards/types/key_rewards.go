package types

import "encoding/binary"

var _ binary.ByteOrder

const (
    // RewardsKeyPrefix is the prefix to retrieve all Rewards
	RewardsKeyPrefix = "Rewards/value/"
)

// RewardsKey returns the store key to retrieve a Rewards from the index fields
func RewardsKey(
recipient string,
) []byte {
	var key []byte
    
    recipientBytes := []byte(recipient)
    key = append(key, recipientBytes...)
    key = append(key, []byte("/")...)
    
	return key
}