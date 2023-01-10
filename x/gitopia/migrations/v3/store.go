package v3

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	v2 "github.com/gitopia/gitopia/x/gitopia/migrations/v2"
)

func migrateRepository(store sdk.KVStore, cdc codec.BinaryCodec) {
	repositoryStore := prefix.NewStore(store, KeyPrefix(RepositoryKey))

	repositoryStoreIter := repositoryStore.Iterator(nil, nil)
	defer repositoryStoreIter.Close()

	for ; repositoryStoreIter.Valid(); repositoryStoreIter.Next() {
		var oldRepository v2.Repository
		repositoryKey := repositoryStoreIter.Key()
		cdc.MustUnmarshal(repositoryStore.Get(repositoryKey), &oldRepository)

		var labels []*RepositoryLabel
		var releases []*RepositoryRelease
		var collaborators []*RepositoryCollaborator
		var backups []*RepositoryBackup

		for _, oldLabel := range oldRepository.Labels {
			labels = append(labels, &RepositoryLabel{
				Id:          oldLabel.Id,
				Name:        oldLabel.Name,
				Color:       oldLabel.Color,
				Description: oldLabel.Description,
			})
		}

		for _, oldRelease := range oldRepository.Releases {
			releases = append(releases, &RepositoryRelease{
				Id:      oldRelease.Id,
				TagName: oldRelease.TagName,
			})
		}

		for _, oldCollaborator := range oldRepository.Collaborators {
			collaborators = append(collaborators, &RepositoryCollaborator{
				Id:         oldCollaborator.Id,
				Permission: RepositoryCollaborator_Permission(oldCollaborator.Permission),
			})
		}

		for _, oldBackup := range oldRepository.Backups {
			backups = append(backups, &RepositoryBackup{
				Store: RepositoryBackup_Store(oldBackup.Store),
				Refs:  oldBackup.Refs,
			})
		}

		repository := Repository{
			Creator: oldRepository.Creator,
			Id:      oldRepository.Id,
			Name:    oldRepository.Name,
			Owner: &RepositoryOwner{
				Id:   oldRepository.Owner.Id,
				Type: OwnerType(oldRepository.Owner.Type),
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

func migrateIssue(store sdk.KVStore, cdc codec.BinaryCodec) {
	issueStore := prefix.NewStore(store, KeyPrefix(IssueKey))

	issueStoreIter := issueStore.Iterator(nil, nil)
	defer issueStoreIter.Close()

	for ; issueStoreIter.Valid(); issueStoreIter.Next() {
		var oldIssue v2.Issue
		issueKey := issueStoreIter.Key()
		cdc.MustUnmarshal(issueStore.Get(issueKey), &oldIssue)

		issue := Issue{
			Creator:       oldIssue.Creator,
			Id:            oldIssue.Id,
			Iid:           oldIssue.Iid,
			Title:         oldIssue.Title,
			State:         Issue_State(oldIssue.State),
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
		issueStore.Set(CreateNewKey(issue.RepositoryId, issue.Iid), cdc.MustMarshal(&issue))
		// Delete the old key
		issueStore.Delete(issueKey)
	}
}

func migratePullRequest(store sdk.KVStore, cdc codec.BinaryCodec) {
	pullRequestStore := prefix.NewStore(store, KeyPrefix(PullRequestKey))

	pullRequestStoreIter := pullRequestStore.Iterator(nil, nil)
	defer pullRequestStoreIter.Close()

	for ; pullRequestStoreIter.Valid(); pullRequestStoreIter.Next() {
		var oldPullRequest v2.PullRequest
		pullRequestKey := pullRequestStoreIter.Key()
		cdc.MustUnmarshal(pullRequestStore.Get(pullRequestKey), &oldPullRequest)

		pullRequest := PullRequest{
			Creator:             oldPullRequest.Creator,
			Id:                  oldPullRequest.Id,
			Iid:                 oldPullRequest.Iid,
			Title:               oldPullRequest.Title,
			State:               PullRequest_State(oldPullRequest.State),
			Description:         oldPullRequest.Description,
			Locked:              oldPullRequest.Locked,
			CommentsCount:       oldPullRequest.CommentsCount,
			Labels:              oldPullRequest.Labels,
			Assignees:           oldPullRequest.Assignees,
			Reviewers:           oldPullRequest.Reviewers,
			Draft:               oldPullRequest.Draft,
			CreatedAt:           oldPullRequest.CreatedAt,
			UpdatedAt:           oldPullRequest.UpdatedAt,
			ClosedAt:            oldPullRequest.ClosedAt,
			ClosedBy:            oldPullRequest.ClosedBy,
			MergedAt:            oldPullRequest.MergedAt,
			MergedBy:            oldPullRequest.MergedBy,
			MergeCommitSha:      oldPullRequest.MergeCommitSha,
			MaintainerCanModify: oldPullRequest.MaintainerCanModify,
			Head:                (*PullRequestHead)(oldPullRequest.Head),
			Base:                (*PullRequestBase)(oldPullRequest.Base),
		}

		// Set the new key
		pullRequestStore.Set(CreateNewKey(pullRequest.Base.RepositoryId, pullRequest.Iid), cdc.MustMarshal(&pullRequest))
		// Delete the old key
		pullRequestStore.Delete(pullRequestKey)
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

	migratePullRequest(store, cdc)

	return nil
}
