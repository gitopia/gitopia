package keeper

import (
	"encoding/binary"
	"fmt"
	"time"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v5/x/storage/types"
)

// GetChallengeCount get the total number of challenges
func (k Keeper) GetChallengeCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChallengeCountKey))
	byteKey := types.KeyPrefix(types.ChallengeCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetChallengeCount set the total number of challenges
func (k Keeper) SetChallengeCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChallengeCountKey))
	byteKey := types.KeyPrefix(types.ChallengeCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendChallenge appends a challenge in the store with a new id and update the count
func (k Keeper) AppendChallenge(
	ctx sdk.Context,
	challenge types.Challenge,
) uint64 {
	// Create the challenge
	count := k.GetChallengeCount(ctx)

	// Set the ID of the appended value
	challenge.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChallengeKey))
	appendedValue := k.cdc.MustMarshal(&challenge)
	store.Set(GetChallengeIDBytes(challenge.Id), appendedValue)

	// Update challenge count
	k.SetChallengeCount(ctx, count+1)

	return count
}

// SetChallenge set a specific challenge in the store
func (k Keeper) SetChallenge(ctx sdk.Context, challenge types.Challenge) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChallengeKey))
	b := k.cdc.MustMarshal(&challenge)
	store.Set(GetChallengeIDBytes(challenge.Id), b)
}

// GetChallenge returns a challenge from its id
func (k Keeper) GetChallenge(ctx sdk.Context, id uint64) (val types.Challenge, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChallengeKey))
	b := store.Get(GetChallengeIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveChallenge removes a challenge from the store
func (k Keeper) RemoveChallenge(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChallengeKey))
	store.Delete(GetChallengeIDBytes(id))
}

// GetAllChallenge returns all challenges
func (k Keeper) GetAllChallenge(ctx sdk.Context) (list []types.Challenge) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChallengeKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Challenge
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetChallengeIDBytes returns the byte representation of the ID
func GetChallengeIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GenerateChallenge creates a new random challenge
func (k Keeper) GenerateChallenge(ctx sdk.Context) (*types.Challenge, error) {
	// Get all providers
	providers := k.GetAllProvider(ctx)
	if len(providers) == 0 {
		return nil, fmt.Errorf("no providers available")
	}

	packfilesCount := k.GetPackfileCount(ctx)
	if packfilesCount == 0 {
		return nil, fmt.Errorf("no packfiles available")
	}

	// Initialize random number generator
	prng := k.GetPseudoRand(ctx)

	providerIndex := uint64(prng.Int63n(int64(len(providers))))
	packfileID := uint64(prng.Int63n(int64(packfilesCount)))

	packfile, found := k.GetPackfile(ctx, packfileID)
	if !found {
		return nil, fmt.Errorf("packfile not found: %d", packfileID)
	}

	const chunkSize uint64 = 256 * 1024 // 256 KiB chunks
	maxChunks := packfile.Size / chunkSize
	if maxChunks == 0 {
		return nil, fmt.Errorf("packfile too small: %d bytes", packfile.Size)
	}

	chunkIndex := uint64(prng.Int63n(int64(maxChunks))) * chunkSize

	challenge := &types.Challenge{
		ProviderAddress: providers[providerIndex].Address,
		PackfileId:      packfileID,
		RootHash:        packfile.RootHash,
		ChunkIndex:      chunkIndex,
		CreatedAt:       ctx.BlockTime(),
		Deadline:        ctx.BlockTime().Add(time.Second * 5), // 5 seconds deadline
		Status:          types.ChallengeStatus_CHALLENGE_STATUS_PENDING,
	}

	return challenge, nil
}
