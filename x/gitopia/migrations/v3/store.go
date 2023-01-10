package v3

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	v2 "github.com/gitopia/gitopia/x/gitopia/migrations/v2"
	gitopiatypes "github.com/gitopia/gitopia/x/gitopia/types"
)

// migrateRepository migrates
func migrateRepository(store sdk.KVStore, cdc codec.BinaryCodec) {
	repositoryStore := prefix.NewStore(store, gitopiatypes.KeyPrefix(gitopiatypes.RepositoryKey))

	repositoryStoreIter := repositoryStore.Iterator(nil, nil)
	defer repositoryStoreIter.Close()

	for ; repositoryStoreIter.Valid(); repositoryStoreIter.Next() {
		var oldRepository v2.Repository
		repositoryKey := repositoryStoreIter.Key()
		cdc.MustUnmarshal(repositoryStore.Get(repositoryKey), &oldRepository)

		var labels []*gitopiatypes.RepositoryLabel
		var releases []*gitopiatypes.RepositoryRelease
		var collaborators []*gitopiatypes.RepositoryCollaborator
		var backups []*gitopiatypes.RepositoryBackup

		for _, oldLabel := range oldRepository.Labels {
			labels = append(labels, &gitopiatypes.RepositoryLabel{
				Id:          oldLabel.Id,
				Name:        oldLabel.Name,
				Color:       oldLabel.Color,
				Description: oldLabel.Description,
			})
		}

		for _, oldRelease := range oldRepository.Releases {
			releases = append(releases, &gitopiatypes.RepositoryRelease{
				Id:      oldRelease.Id,
				TagName: oldRelease.TagName,
			})
		}

		for _, oldCollaborator := range oldRepository.Collaborators {
			collaborators = append(collaborators, &gitopiatypes.RepositoryCollaborator{
				Id:         oldCollaborator.Id,
				Permission: gitopiatypes.RepositoryCollaborator_Permission(oldCollaborator.Permission),
			})
		}

		for _, oldBackup := range oldRepository.Backups {
			backups = append(backups, &gitopiatypes.RepositoryBackup{
				Store: gitopiatypes.RepositoryBackup_Store(oldBackup.Store),
				Refs:  oldBackup.Refs,
			})
		}

		repository := gitopiatypes.Repository{
			Creator: oldRepository.Creator,
			Id:      oldRepository.Id,
			Name:    oldRepository.Name,
			Owner: &gitopiatypes.RepositoryOwner{
				Id:   oldRepository.Owner.Id,
				Type: gitopiatypes.OwnerType(oldRepository.Owner.Type),
			},
			Description:         oldRepository.Description,
			Forks:               oldRepository.Forks,
			Subscribers:         oldRepository.Subscribers,
			Commits:             oldRepository.Commits,
			IssuesCount:         oldRepository.IssuesCount,
			PullsCount:          oldRepository.PullsCount,
			Labels:              labels,
			LabelsCount:         oldRepository.LabelsCount,
			Releases:            releases,
			CreatedAt:           oldRepository.CreatedAt,
			UpdatedAt:           oldRepository.UpdatedAt,
			PushedAt:            oldRepository.PushedAt,
			Stargazers:          oldRepository.Stargazers,
			Archived:            oldRepository.Archived,
			License:             oldRepository.License,
			DefaultBranch:       oldRepository.DefaultBranch,
			Parent:              oldRepository.Parent,
			Fork:                oldRepository.Fork,
			Collaborators:       collaborators,
			AllowForking:        oldRepository.AllowForking,
			Backups:             backups,
			EnableArweaveBackup: oldRepository.EnableArweaveBackup,
		}

		// Set new value on store. Key is same.
		repositoryStore.Set(repositoryKey, cdc.MustMarshal(&repository))
	}
}

// migrateIssue migrates
func migrateIssue(store sdk.KVStore, cdc codec.BinaryCodec) {
	issueStore := prefix.NewStore(store, gitopiatypes.KeyPrefix(gitopiatypes.IssueKey))

	issueStoreIter := issueStore.Iterator(nil, nil)
	defer issueStoreIter.Close()

	for ; issueStoreIter.Valid(); issueStoreIter.Next() {
		var oldIssue v2.Issue
		issueKey := issueStoreIter.Key()
		cdc.MustUnmarshal(issueStore.Get(issueKey), &oldIssue)

		issue := gitopiatypes.Issue{
			Creator:       oldIssue.Creator,
			Id:            oldIssue.Id,
			Iid:           oldIssue.Iid,
			Title:         oldIssue.Title,
			State:         gitopiatypes.Issue_State(oldIssue.State),
			Description:   oldIssue.Description,
			CommentsCount: oldIssue.CommentsCount,
			RepositoryId:  oldIssue.RepositoryId,
			Labels:        oldIssue.Labels,
			Weight:        oldIssue.Weight,
			Assignees:     oldIssue.Assignees,
			CreatedAt:     oldIssue.CreatedAt,
			UpdatedAt:     oldIssue.UpdatedAt,
			ClosedAt:      oldIssue.ClosedAt,
			ClosedBy:      oldIssue.ClosedBy,
		}

		// Set the new key
		issueStore.Set(CreateIssueKey(issue.RepositoryId, issue.Iid), cdc.MustMarshal(&issue))
		// Delete the old key
		issueStore.Delete(issueKey)
	}
}

// MigrateStore performs in-place store migrations from v1.2.0 to v2.0.0. The
// migration includes:
//
// - KV changes for issue, pullrequest and comment.
// - Removed `issues` and `pullRequests` from Repository.
// - Add `repositoryId` in Comment and Bounty.
// - Modified comment structure - Parent: issue and pull; various comment types like label, assignees etc; reactions; replies; resolved/unresolved
func MigrateStore(ctx sdk.Context, storeKey storetypes.StoreKey, cdc codec.BinaryCodec) error {
	store := ctx.KVStore(storeKey)

	migrateRepository(store, cdc)

	migrateIssue(store, cdc)

	return nil
}
