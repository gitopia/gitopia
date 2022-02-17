package utils

import (
	"fmt"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func PullRequestCommentExists(c []uint64, val uint64) (int, bool) {
	for i, v := range c {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func ReviewerExists(a []string, val string) (int, bool) {
	for i, v := range a {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func JoinReviewers(reviewers []string) string {
	res := ""
	len := len(reviewers)
	for i, a := range reviewers {
		res += fmt.Sprintf(" @%s", a)
		if i == len-2 && len > 1 {
			res += " and"
		}
	}
	return res
}

func HavePullRequestMergePermission(repository types.Repository, creator string, o interface{}) bool {
	ownerId := repository.Owner.Id
	ownerType := repository.Owner.Type
	allowed := []types.RepositoryCollaborator_Permission{
		types.RepositoryCollaborator_WRITE,
		types.RepositoryCollaborator_MAINTAIN,
		types.RepositoryCollaborator_ADMIN,
	}

	var havePermission bool = false

	if ownerType == types.RepositoryOwner_USER {
		if creator == ownerId {
			havePermission = true
		}
	} else if ownerType == types.RepositoryOwner_ORGANIZATION {
		organization := o.(types.Organization)
		if i, exists := OrganizationMemberExists(organization.Members, creator); exists {
			if organization.Members[i].Role == types.OrganizationMember_OWNER {
				havePermission = true
			}
		}
	}

	if !havePermission {
		if i, exists := RepositoryCollaboratorExists(repository.Collaborators, creator); exists {
			if _, exists := HaveRepositoryCollaboratorPermission(allowed, repository.Collaborators[i].Permission); exists {
				havePermission = true
			}
		}
	}

	return havePermission
}
