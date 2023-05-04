package types

import (
	"encoding/json"
	"strings"

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

func migrateIssue(store sdk.KVStore, cdc codec.BinaryCodec) error {
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

		// Migrate comments
		commentStore := prefix.NewStore(store, KeyPrefix(CommentKey))

		for _, commentId := range oldIssue.Comments {
			var oldComment v2.Comment
			cdc.MustUnmarshal(commentStore.Get(GetIDBytes(commentId)), &oldComment)

			var attachments []*Attachment

			for _, attachmentStr := range oldComment.Attachments {
				var attachment Attachment
				if err := json.Unmarshal([]byte(attachmentStr), &attachment); err != nil {
					return err
				}

				attachments = append(attachments, &attachment)
			}

			commentType := CommentTypeNone

			// Set comment type in case of system comment
			if oldComment.System {
				if strings.Contains(oldComment.Body, "assigned to") {
					commentType = CommentTypeAddAssignees
				} else if strings.Contains(oldComment.Body, "unassigned") {
					commentType = CommentTypeRemoveAssignees
				} else if strings.Contains(oldComment.Body, "added") {
					commentType = CommentTypeAddLabels
				} else if strings.Contains(oldComment.Body, "remove") {
					commentType = CommentTypeRemoveLabels
				} else if strings.Contains(oldComment.Body, "changed title from") {
					commentType = CommentTypeModifiedTitle
				} else if strings.Contains(oldComment.Body, "changed the description") {
					commentType = CommentTypeModifiedDescription
				} else if strings.Contains(oldComment.Body, "reopened") {
					commentType = CommentTypeIssueOpened
				} else if strings.Contains(oldComment.Body, "closed") {
					commentType = CommentTypeIssueClosed
				}
			} else {
				commentType = CommentTypeReply
			}

			comment := Comment{
				Creator:           oldComment.Creator,
				Id:                oldComment.Id,
				RepositoryId:      issue.RepositoryId,
				ParentIid:         issue.Iid,
				Parent:            CommentParentIssue,
				CommentIid:        oldComment.CommentIid,
				Body:              oldComment.Body,
				Attachments:       attachments,
				DiffHunk:          oldComment.DiffHunk,
				Path:              oldComment.Path,
				System:            oldComment.System,
				AuthorAssociation: oldComment.AuthorAssociation,
				CreatedAt:         oldComment.CreatedAt,
				UpdatedAt:         oldComment.UpdatedAt,
				CommentType:       commentType,
			}

			// Set the new comment key
			commentStore.Set(CreateNewIssueCommentKey(comment.RepositoryId, comment.ParentIid, comment.CommentIid), cdc.MustMarshal(&comment))

			// Delete the old comment key
			commentStore.Delete(GetIDBytes(oldComment.Id))
		}

		// Set the new issue key
		issueStore.Set(CreateNewIssueKey(issue.RepositoryId, issue.Iid), cdc.MustMarshal(&issue))
		// Delete the old issue key
		issueStore.Delete(issueKey)
	}

	return nil
}

func migratePullRequest(store sdk.KVStore, cdc codec.BinaryCodec) error {
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

		// Migrate comments
		commentStore := prefix.NewStore(store, KeyPrefix(CommentKey))

		for _, commentId := range oldPullRequest.Comments {
			var oldComment v2.Comment
			cdc.MustUnmarshal(commentStore.Get(GetIDBytes(commentId)), &oldComment)

			var attachments []*Attachment

			for _, attachmentStr := range oldComment.Attachments {
				var attachment Attachment
				if err := json.Unmarshal([]byte(attachmentStr), &attachment); err != nil {
					return err
				}

				attachments = append(attachments, &attachment)
			}

			var commentType CommentType

			// Set comment type in case of system comment
			if oldComment.System {
				if strings.Contains(oldComment.Body, "assigned to") {
					commentType = CommentTypeAddAssignees
				} else if strings.Contains(oldComment.Body, "unassigned") {
					commentType = CommentTypeRemoveAssignees
				} else if strings.Contains(oldComment.Body, "added") {
					commentType = CommentTypeAddLabels
				} else if strings.Contains(oldComment.Body, "remove") {
					commentType = CommentTypeRemoveLabels
				} else if strings.Contains(oldComment.Body, "changed title from") {
					commentType = CommentTypeModifiedTitle
				} else if strings.Contains(oldComment.Body, "changed the description") {
					commentType = CommentTypeModifiedDescription
				} else if strings.Contains(oldComment.Body, "reopened") {
					commentType = CommentTypePullRequestOpened
				} else if strings.Contains(oldComment.Body, "closed") {
					commentType = CommentTypePullRequestClosed
				} else if strings.Contains(oldComment.Body, "merged") {
					commentType = CommentTypePullRequestMerged
				} else if strings.Contains(oldComment.Body, "requested review from") {
					commentType = CommentTypeAddReviewers
				} else if strings.Contains(oldComment.Body, "removed review request for") {
					commentType = CommentTypeRemoveReviewers
				}
			}

			comment := Comment{
				Creator:           oldComment.Creator,
				Id:                oldComment.Id,
				RepositoryId:      pullRequest.Base.RepositoryId,
				ParentIid:         pullRequest.Iid,
				Parent:            CommentParentPullRequest,
				CommentIid:        oldComment.CommentIid,
				Body:              oldComment.Body,
				Attachments:       attachments,
				DiffHunk:          oldComment.DiffHunk,
				Path:              oldComment.Path,
				System:            oldComment.System,
				AuthorAssociation: oldComment.AuthorAssociation,
				CreatedAt:         oldComment.CreatedAt,
				UpdatedAt:         oldComment.UpdatedAt,
				CommentType:       commentType,
			}

			// Set the new comment key
			commentStore.Set(CreateNewPullRequestCommentKey(comment.RepositoryId, comment.ParentIid, comment.CommentIid), cdc.MustMarshal(&comment))

			// Delete the old comment key
			commentStore.Delete(GetIDBytes(oldComment.Id))
		}

		// Set the new key
		pullRequestStore.Set(CreateNewPullRequestKey(pullRequest.Base.RepositoryId, pullRequest.Iid), cdc.MustMarshal(&pullRequest))
		// Delete the old key
		pullRequestStore.Delete(pullRequestKey)
	}

	return nil
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

	if err := migrateIssue(store, cdc); err != nil {
		return err
	}

	if err := migratePullRequest(store, cdc); err != nil {
		return err
	}

	return nil
}
