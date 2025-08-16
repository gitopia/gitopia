package keeper

import (
	"encoding/binary"
	"time"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// GetProposalCount get the total number of proposals
func (k Keeper) GetProposalCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedPackfileUpdateCountKey))
	byteKey := types.KeyPrefix(types.ProposedPackfileUpdateCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetProposalCount set the total number of proposals
func (k Keeper) SetProposalCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedPackfileUpdateCountKey))
	byteKey := types.KeyPrefix(types.ProposedPackfileUpdateCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendProposedPackfileUpdate creates a new proposal and returns its ID
func (k Keeper) AppendProposedPackfileUpdate(
	ctx sdk.Context,
	proposal types.ProposedPackfileUpdate,
) uint64 {
	// Get and increment proposal count
	count := k.GetProposalCount(ctx)
	proposal.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedPackfileUpdateKey))
	appendedValue := k.cdc.MustMarshal(&proposal)
	store.Set(GetProposalIdBytes(proposal.Id), appendedValue)

	// Update count
	k.SetProposalCount(ctx, count+1)

	return count
}

// GetProposedPackfileUpdate returns a proposal by ID
func (k Keeper) GetProposedPackfileUpdate(ctx sdk.Context, id uint64) (val types.ProposedPackfileUpdate, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedPackfileUpdateKey))

	b := store.Get(GetProposalIdBytes(id))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// SetProposedPackfileUpdate sets a proposal
func (k Keeper) SetProposedPackfileUpdate(ctx sdk.Context, proposal types.ProposedPackfileUpdate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedPackfileUpdateKey))
	b := k.cdc.MustMarshal(&proposal)
	store.Set(GetProposalIdBytes(proposal.Id), b)
}

// RemoveProposedPackfileUpdate removes a proposal from the store
func (k Keeper) RemoveProposedPackfileUpdate(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedPackfileUpdateKey))
	store.Delete(GetProposalIdBytes(id))
}

// GetAllProposedPackfileUpdates returns all proposals
func (k Keeper) GetAllProposedPackfileUpdates(ctx sdk.Context) (list []types.ProposedPackfileUpdate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedPackfileUpdateKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.ProposedPackfileUpdate
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetPendingProposalsForRepository returns all pending proposals for a repository
func (k Keeper) GetPendingProposalsForRepository(ctx sdk.Context, repositoryId uint64) []types.ProposedPackfileUpdate {
	allProposals := k.GetAllProposedPackfileUpdates(ctx)
	var pending []types.ProposedPackfileUpdate

	for _, proposal := range allProposals {
		if proposal.RepositoryId == repositoryId && proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING {
			pending = append(pending, proposal)
		}
	}

	return pending
}

// GetPendingProposalsForUser returns all pending proposals where the user is the repository owner
func (k Keeper) GetPendingProposalsForUser(ctx sdk.Context, userAddress string) []types.ProposedPackfileUpdate {
	allProposals := k.GetAllProposedPackfileUpdates(ctx)
	var pending []types.ProposedPackfileUpdate

	for _, proposal := range allProposals {
		if proposal.User == userAddress && proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING {
			pending = append(pending, proposal)
		}
	}

	return pending
}

// GetPendingPackfileUpdateProposalForRepository returns all pending packfile update proposals where the repository id and user address match
func (k Keeper) GetPendingPackfileUpdateProposalForRepositoryUser(ctx sdk.Context, repositoryId uint64, userAddress string) (types.ProposedPackfileUpdate, bool) {
	allProposals := k.GetAllProposedPackfileUpdates(ctx)

	for _, proposal := range allProposals {
		if proposal.RepositoryId == repositoryId && proposal.User == userAddress && proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING {
			return proposal, true
		}
	}

	return types.ProposedPackfileUpdate{}, false
}

// ExpireOldProposals removes expired proposals
func (k Keeper) ExpireOldProposals(ctx sdk.Context) {
	allProposals := k.GetAllProposedPackfileUpdates(ctx)
	currentTime := ctx.BlockTime()

	for _, proposal := range allProposals {
		if proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING && currentTime.After(proposal.ExpiresAt) {
			if !proposal.Delete {
				ctx.EventManager().EmitTypedEvent(&types.EventProposalTimeout{
					Provider: proposal.Provider,
					Cids:     []string{proposal.Cid},
				})
			}
			k.RemoveProposedPackfileUpdate(ctx, proposal.Id)
		}
	}
}

// GetProposalIdBytes returns the byte representation of the proposal ID
func GetProposalIdBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetProposalIdFromBytes returns proposal ID in uint64 format from a byte array
func GetProposalIdFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}

// CreatePackfileUpdateProposal creates a new packfile update proposal
func (k Keeper) CreatePackfileUpdateProposal(
	ctx sdk.Context,
	provider string,
	repositoryId uint64,
	user string,
	name string,
	cid string,
	rootHash []byte,
	size uint64,
	oldCid string,
	mergeCommitSha string,
	expirationSeconds uint64,
	deleteFlag bool,
) uint64 {
	proposal := types.ProposedPackfileUpdate{
		Provider:       provider,
		RepositoryId:   repositoryId,
		User:           user,
		Name:           name,
		Cid:            cid,
		RootHash:       rootHash,
		Size_:          size,
		OldCid:         oldCid,
		MergeCommitSha: mergeCommitSha,
		Status:         types.ProposalStatus_PROPOSAL_STATUS_PENDING,
		ProposedAt:     ctx.BlockTime(),
		ExpiresAt:      ctx.BlockTime().Add(time.Duration(expirationSeconds) * time.Second),
		Delete:         deleteFlag,
	}

	return k.AppendProposedPackfileUpdate(ctx, proposal)
}

// Release Asset Update Proposal Methods

// GetReleaseAssetsProposalCount get the total number of release asset proposals
func (k Keeper) GetReleaseAssetsProposalCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedReleaseAssetsUpdateCountKey))
	byteKey := types.KeyPrefix(types.ProposedReleaseAssetsUpdateCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetReleaseAssetsProposalCount set the total number of release asset proposals
func (k Keeper) SetReleaseAssetsProposalCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedReleaseAssetsUpdateCountKey))
	byteKey := types.KeyPrefix(types.ProposedReleaseAssetsUpdateCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendProposedReleaseAssetsUpdate creates a new release asset proposal and returns its ID
func (k Keeper) AppendProposedReleaseAssetsUpdate(
	ctx sdk.Context,
	proposal types.ProposedReleaseAssetsUpdate,
) uint64 {
	// Get and increment proposal count
	count := k.GetReleaseAssetsProposalCount(ctx)
	proposal.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedReleaseAssetsUpdateKey))
	appendedValue := k.cdc.MustMarshal(&proposal)
	store.Set(GetProposalIdBytes(proposal.Id), appendedValue)

	// Update count
	k.SetReleaseAssetsProposalCount(ctx, count+1)

	return count
}

// GetProposedReleaseAssetsUpdate returns a release asset proposal by ID
func (k Keeper) GetProposedReleaseAssetsUpdate(ctx sdk.Context, id uint64) (val types.ProposedReleaseAssetsUpdate, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedReleaseAssetsUpdateKey))

	b := store.Get(GetProposalIdBytes(id))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// SetProposedReleaseAssetsUpdate sets a release asset proposal
func (k Keeper) SetProposedReleaseAssetsUpdate(ctx sdk.Context, proposal types.ProposedReleaseAssetsUpdate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedReleaseAssetsUpdateKey))
	b := k.cdc.MustMarshal(&proposal)
	store.Set(GetProposalIdBytes(proposal.Id), b)
}

// RemoveProposedReleaseAssetsUpdate removes a release asset proposal from the store
func (k Keeper) RemoveProposedReleaseAssetsUpdate(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedReleaseAssetsUpdateKey))
	store.Delete(GetProposalIdBytes(id))
}

// GetAllProposedReleaseAssetsUpdates returns all release asset proposals
func (k Keeper) GetAllProposedReleaseAssetsUpdates(ctx sdk.Context) (list []types.ProposedReleaseAssetsUpdate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedReleaseAssetsUpdateKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.ProposedReleaseAssetsUpdate
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetPendingReleaseAssetsProposalsForRepository returns all pending release asset proposals for a repository
func (k Keeper) GetPendingReleaseAssetsProposalsForRepository(ctx sdk.Context, repositoryId uint64) []types.ProposedReleaseAssetsUpdate {
	allProposals := k.GetAllProposedReleaseAssetsUpdates(ctx)
	var pending []types.ProposedReleaseAssetsUpdate

	for _, proposal := range allProposals {
		if proposal.RepositoryId == repositoryId && proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING {
			pending = append(pending, proposal)
		}
	}

	return pending
}

// GetPendingReleaseAssetsProposalsForUser returns all pending release asset proposals where the user is the repository owner
func (k Keeper) GetPendingReleaseAssetsProposalsForUser(ctx sdk.Context, userAddress string) []types.ProposedReleaseAssetsUpdate {
	allProposals := k.GetAllProposedReleaseAssetsUpdates(ctx)
	var pending []types.ProposedReleaseAssetsUpdate

	for _, proposal := range allProposals {
		if proposal.User == userAddress && proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING {
			pending = append(pending, proposal)
		}
	}

	return pending
}

// GetPendingReleaseAssetsUpdateProposalForRepositoryTagUser returns all pending release asset proposals where the repository id, tag and user address match
func (k Keeper) GetPendingReleaseAssetsUpdateProposalForRepositoryTagUser(ctx sdk.Context, repositoryId uint64, tag string, userAddress string) (types.ProposedReleaseAssetsUpdate, bool) {
	allProposals := k.GetAllProposedReleaseAssetsUpdates(ctx)

	for _, proposal := range allProposals {
		if proposal.RepositoryId == repositoryId && proposal.Tag == tag && proposal.User == userAddress && proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING {
			return proposal, true
		}
	}

	return types.ProposedReleaseAssetsUpdate{}, false
}

// ExpireOldReleaseAssetsProposals removes expired release asset proposals
func (k Keeper) ExpireOldReleaseAssetsProposals(ctx sdk.Context) {
	allProposals := k.GetAllProposedReleaseAssetsUpdates(ctx)
	currentTime := ctx.BlockTime()

	for _, proposal := range allProposals {
		if proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING && currentTime.After(proposal.ExpiresAt) {
			var cids []string
			for _, asset := range proposal.Assets {
				if !asset.Delete {
					cids = append(cids, asset.Cid)
				}
			}
			if len(cids) > 0 {
				ctx.EventManager().EmitTypedEvent(&types.EventProposalTimeout{
					Provider: proposal.Provider,
					Cids:     cids,
				})
			}
			k.RemoveProposedReleaseAssetsUpdate(ctx, proposal.Id)
		}
	}
}

// CreateReleaseAssetsUpdateProposal creates a new release asset update proposal
func (k Keeper) CreateReleaseAssetsUpdateProposal(
	ctx sdk.Context,
	provider string,
	repositoryId uint64,
	user string,
	tag string,
	assets []*types.ReleaseAssetUpdate,
	expirationSeconds uint64,
) uint64 {
	proposal := types.ProposedReleaseAssetsUpdate{
		Provider:     provider,
		RepositoryId: repositoryId,
		User:         user,
		Tag:          tag,
		Assets:       assets,
		Status:       types.ProposalStatus_PROPOSAL_STATUS_PENDING,
		ProposedAt:   ctx.BlockTime(),
		ExpiresAt:    ctx.BlockTime().Add(time.Duration(expirationSeconds) * time.Second),
	}

	return k.AppendProposedReleaseAssetsUpdate(ctx, proposal)
}

// LFS Object Update Proposal Methods

// GetLFSObjectProposalCount get the total number of LFS object proposals
func (k Keeper) GetLFSObjectProposalCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedLFSObjectUpdateCountKey))
	byteKey := types.KeyPrefix(types.ProposedLFSObjectUpdateCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetLFSObjectProposalCount set the total number of LFS object proposals
func (k Keeper) SetLFSObjectProposalCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedLFSObjectUpdateCountKey))
	byteKey := types.KeyPrefix(types.ProposedLFSObjectUpdateCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendProposedLFSObjectUpdate creates a new LFS object proposal and returns its ID
func (k Keeper) AppendProposedLFSObjectUpdate(
	ctx sdk.Context,
	proposal types.ProposedLFSObjectUpdate,
) uint64 {
	// Get and increment proposal count
	count := k.GetLFSObjectProposalCount(ctx)
	proposal.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedLFSObjectUpdateKey))
	appendedValue := k.cdc.MustMarshal(&proposal)
	store.Set(GetProposalIdBytes(proposal.Id), appendedValue)

	// Update count
	k.SetLFSObjectProposalCount(ctx, count+1)

	return count
}

// GetProposedLFSObjectUpdate returns an LFS object proposal by ID
func (k Keeper) GetProposedLFSObjectUpdate(ctx sdk.Context, id uint64) (val types.ProposedLFSObjectUpdate, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedLFSObjectUpdateKey))

	b := store.Get(GetProposalIdBytes(id))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// SetProposedLFSObjectUpdate sets an LFS object proposal
func (k Keeper) SetProposedLFSObjectUpdate(ctx sdk.Context, proposal types.ProposedLFSObjectUpdate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedLFSObjectUpdateKey))
	b := k.cdc.MustMarshal(&proposal)
	store.Set(GetProposalIdBytes(proposal.Id), b)
}

// RemoveProposedLFSObjectUpdate removes an LFS object proposal from the store
func (k Keeper) RemoveProposedLFSObjectUpdate(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedLFSObjectUpdateKey))
	store.Delete(GetProposalIdBytes(id))
}

// GetAllProposedLFSObjectUpdates returns all LFS object proposals
func (k Keeper) GetAllProposedLFSObjectUpdates(ctx sdk.Context) (list []types.ProposedLFSObjectUpdate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedLFSObjectUpdateKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.ProposedLFSObjectUpdate
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetPendingLFSObjectProposalsForRepository returns all pending LFS object proposals for a repository
func (k Keeper) GetPendingLFSObjectProposalsForRepository(ctx sdk.Context, repositoryId uint64) []types.ProposedLFSObjectUpdate {
	allProposals := k.GetAllProposedLFSObjectUpdates(ctx)
	var pending []types.ProposedLFSObjectUpdate

	for _, proposal := range allProposals {
		if proposal.RepositoryId == repositoryId && proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING {
			pending = append(pending, proposal)
		}
	}

	return pending
}

// GetPendingLFSObjectProposalsForUser returns all pending LFS object proposals where the user is the repository owner
func (k Keeper) GetPendingLFSObjectProposalsForUser(ctx sdk.Context, userAddress string) []types.ProposedLFSObjectUpdate {
	allProposals := k.GetAllProposedLFSObjectUpdates(ctx)
	var pending []types.ProposedLFSObjectUpdate

	for _, proposal := range allProposals {
		if proposal.User == userAddress && proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING {
			pending = append(pending, proposal)
		}
	}

	return pending
}

// GetPendingLFSObjectProposalsForRepositoryOid returns all pending LFS object proposals for a repository
func (k Keeper) GetPendingLFSObjectProposalsForRepositoryOid(ctx sdk.Context, repositoryId uint64, oid string, userAddress string) (types.ProposedLFSObjectUpdate, bool) {
	allProposals := k.GetAllProposedLFSObjectUpdates(ctx)

	for _, proposal := range allProposals {
		if proposal.RepositoryId == repositoryId && proposal.Oid == oid && proposal.User == userAddress && proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING {
			return proposal, true
		}
	}

	return types.ProposedLFSObjectUpdate{}, false
}

// GetPendingLFSObjectProposalsForRepositoryUser returns all pending LFS object proposal where the repository id and user address match
func (k Keeper) GetPendingLFSObjectProposalsForRepositoryUser(ctx sdk.Context, repositoryId uint64, userAddress string) []types.ProposedLFSObjectUpdate {
	allProposals := k.GetAllProposedLFSObjectUpdates(ctx)
	var pending []types.ProposedLFSObjectUpdate

	for _, proposal := range allProposals {
		if proposal.RepositoryId == repositoryId && proposal.User == userAddress && proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING {
			pending = append(pending, proposal)
		}
	}

	return pending
}

// ExpireOldLFSObjectProposals removes expired LFS object proposals
func (k Keeper) ExpireOldLFSObjectProposals(ctx sdk.Context) {
	allProposals := k.GetAllProposedLFSObjectUpdates(ctx)
	currentTime := ctx.BlockTime()

	for _, proposal := range allProposals {
		if proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING && currentTime.After(proposal.ExpiresAt) {
			if !proposal.Delete {
				ctx.EventManager().EmitTypedEvent(&types.EventProposalTimeout{
					Provider: proposal.Provider,
					Cids:     []string{proposal.Cid},
				})
			}
			k.RemoveProposedLFSObjectUpdate(ctx, proposal.Id)
		}
	}
}

// CreateLFSObjectUpdateProposal creates a new LFS object update proposal
func (k Keeper) CreateLFSObjectUpdateProposal(
	ctx sdk.Context,
	provider string,
	repositoryId uint64,
	user string,
	oid string,
	size uint64,
	cid string,
	rootHash []byte,
	expirationSeconds uint64,
	deleteFlag bool,
) uint64 {
	proposal := types.ProposedLFSObjectUpdate{
		Provider:     provider,
		RepositoryId: repositoryId,
		User:         user,
		Oid:          oid,
		Size_:        size,
		Cid:          cid,
		RootHash:     rootHash,
		Status:       types.ProposalStatus_PROPOSAL_STATUS_PENDING,
		ProposedAt:   ctx.BlockTime(),
		ExpiresAt:    ctx.BlockTime().Add(time.Duration(expirationSeconds) * time.Second),
		Delete:       deleteFlag,
	}

	return k.AppendProposedLFSObjectUpdate(ctx, proposal)
}

// Repository Delete Proposal Methods

// GetRepositoryDeleteProposalCount get the total number of repository delete proposals
func (k Keeper) GetRepositoryDeleteProposalCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedRepositoryDeleteCountKey))
	byteKey := types.KeyPrefix(types.ProposedRepositoryDeleteCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetRepositoryDeleteProposalCount set the total number of repository delete proposals
func (k Keeper) SetRepositoryDeleteProposalCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedRepositoryDeleteCountKey))
	byteKey := types.KeyPrefix(types.ProposedRepositoryDeleteCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendProposedRepositoryDelete creates a new repository delete proposal and returns its ID
func (k Keeper) AppendProposedRepositoryDelete(
	ctx sdk.Context,
	proposal types.ProposedRepositoryDelete,
) uint64 {
	// Get and increment proposal count
	count := k.GetRepositoryDeleteProposalCount(ctx)
	proposal.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedRepositoryDeleteKey))
	appendedValue := k.cdc.MustMarshal(&proposal)
	store.Set(GetProposalIdBytes(proposal.Id), appendedValue)

	// Update count
	k.SetRepositoryDeleteProposalCount(ctx, count+1)

	return count
}

// GetProposedRepositoryDelete returns a repository delete proposal by ID
func (k Keeper) GetProposedRepositoryDelete(ctx sdk.Context, id uint64) (val types.ProposedRepositoryDelete, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedRepositoryDeleteKey))

	b := store.Get(GetProposalIdBytes(id))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// GetAllProposedRepositoryDeletes returns all repository delete proposals
func (k Keeper) GetAllProposedRepositoryDeletes(ctx sdk.Context) (list []types.ProposedRepositoryDelete) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedRepositoryDeleteKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.ProposedRepositoryDelete
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetPendingRepositoryDeleteProposalByRepositoryIdUser returns a pending repository delete proposal by repository ID and user
func (k Keeper) GetPendingRepositoryDeleteProposalByRepositoryIdUser(ctx sdk.Context, repositoryId uint64, user string) (val types.ProposedRepositoryDelete, found bool) {
	proposals := k.GetAllProposedRepositoryDeletes(ctx)
	for _, proposal := range proposals {
		if proposal.RepositoryId == repositoryId && proposal.User == user && proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING {
			return proposal, true
		}
	}
	return val, false
}

// SetProposedRepositoryDelete sets a repository delete proposal
func (k Keeper) SetProposedRepositoryDelete(ctx sdk.Context, proposal types.ProposedRepositoryDelete) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedRepositoryDeleteKey))
	b := k.cdc.MustMarshal(&proposal)
	store.Set(GetProposalIdBytes(proposal.Id), b)
}

// RemoveProposedRepositoryDelete removes a repository delete proposal from the store
func (k Keeper) RemoveProposedRepositoryDelete(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ProposedRepositoryDeleteKey))
	store.Delete(GetProposalIdBytes(id))
}

// CreateRepositoryDeleteProposal creates a new repository delete proposal
func (k Keeper) CreateRepositoryDeleteProposal(
	ctx sdk.Context,
	provider string,
	repositoryId uint64,
	user string,
	expirationSeconds uint64,
) uint64 {
	proposal := types.ProposedRepositoryDelete{
		Provider:     provider,
		RepositoryId: repositoryId,
		User:         user,
		Status:       types.ProposalStatus_PROPOSAL_STATUS_PENDING,
		ProposedAt:   ctx.BlockTime(),
		ExpiresAt:    ctx.BlockTime().Add(time.Duration(expirationSeconds) * time.Second),
	}

	return k.AppendProposedRepositoryDelete(ctx, proposal)
}

// ExpireOldRepositoryDeleteProposals removes expired proposals
func (k Keeper) ExpireOldRepositoryDeleteProposals(ctx sdk.Context) {
	allProposals := k.GetAllProposedRepositoryDeletes(ctx)
	currentTime := ctx.BlockTime()

	for _, proposal := range allProposals {
		if proposal.Status == types.ProposalStatus_PROPOSAL_STATUS_PENDING && currentTime.After(proposal.ExpiresAt) {
			// Reset repository archive status
			repository, found := k.gitopiaKeeper.GetRepositoryById(ctx, proposal.RepositoryId)
			if found {
				repository.Archived = false
				k.gitopiaKeeper.SetRepository(ctx, repository)
			}

			k.RemoveProposedRepositoryDelete(ctx, proposal.Id)
		}
	}
}
