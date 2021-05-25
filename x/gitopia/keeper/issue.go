package keeper

import (
	"encoding/binary"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"strconv"
)

// GetIssueCount get the total number of issue
func (k Keeper) GetIssueCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueCountKey))
	byteKey := types.KeyPrefix(types.IssueCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	count, err := strconv.ParseUint(string(bz), 10, 64)
	if err != nil {
		// Panic because the count should be always formattable to iint64
		panic("cannot decode count")
	}

	return count
}

// SetIssueCount set the total number of issue
func (k Keeper) SetIssueCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueCountKey))
	byteKey := types.KeyPrefix(types.IssueCountKey)
	bz := []byte(strconv.FormatUint(count, 10))
	store.Set(byteKey, bz)
}

// AppendIssue appends a issue in the store with a new id and update the count
func (k Keeper) AppendIssue(
	ctx sdk.Context,
	creator string,
	iid string,
	title string,
	state string,
	description string,
	authorId string,
	comments string,
	pullRequests string,
	repositoryId string,
	labels string,
	weight string,
	assigneesId string,
	createdAt string,
	updatedAt string,
	closedAt string,
	closedBy string,
	extensions string,
) uint64 {
	// Create the issue
	count := k.GetIssueCount(ctx)
	var issue = types.Issue{
		Creator:      creator,
		Id:           count,
		Iid:          iid,
		Title:        title,
		State:        state,
		Description:  description,
		AuthorId:     authorId,
		Comments:     comments,
		PullRequests: pullRequests,
		RepositoryId: repositoryId,
		Labels:       labels,
		Weight:       weight,
		AssigneesId:  assigneesId,
		CreatedAt:    createdAt,
		UpdatedAt:    updatedAt,
		ClosedAt:     closedAt,
		ClosedBy:     closedBy,
		Extensions:   extensions,
	}

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
	value := k.cdc.MustMarshalBinaryBare(&issue)
	store.Set(GetIssueIDBytes(issue.Id), value)

	// Update issue count
	k.SetIssueCount(ctx, count+1)

	return count
}

// SetIssue set a specific issue in the store
func (k Keeper) SetIssue(ctx sdk.Context, issue types.Issue) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
	b := k.cdc.MustMarshalBinaryBare(&issue)
	store.Set(GetIssueIDBytes(issue.Id), b)
}

// GetIssue returns a issue from its id
func (k Keeper) GetIssue(ctx sdk.Context, id uint64) types.Issue {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
	var issue types.Issue
	k.cdc.MustUnmarshalBinaryBare(store.Get(GetIssueIDBytes(id)), &issue)
	return issue
}

// HasIssue checks if the issue exists in the store
func (k Keeper) HasIssue(ctx sdk.Context, id uint64) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
	return store.Has(GetIssueIDBytes(id))
}

// GetIssueOwner returns the creator of the issue
func (k Keeper) GetIssueOwner(ctx sdk.Context, id uint64) string {
	return k.GetIssue(ctx, id).Creator
}

// RemoveIssue removes a issue from the store
func (k Keeper) RemoveIssue(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
	store.Delete(GetIssueIDBytes(id))
}

// GetAllIssue returns all issue
func (k Keeper) GetAllIssue(ctx sdk.Context) (list []types.Issue) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.IssueKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Issue
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetIssueIDBytes returns the byte representation of the ID
func GetIssueIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetIssueIDFromBytes returns ID in uint64 format from a byte array
func GetIssueIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
