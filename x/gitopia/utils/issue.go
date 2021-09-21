package utils

import (
	"fmt"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func JoinLabels(labels []string) string {
	res := ""
	len := len(labels)
	for i, l := range labels {
		res += fmt.Sprintf(" **%s**", l)
		if i == len-2 && len > 1 {
			res += " and"
		}
	}
	return res
}

func IssueCommentExists(c []uint64, val uint64) (int, bool) {
	for i, v := range c {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func IssueLabelExists(l []uint64, val uint64) (int, bool) {
	for i, v := range l {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func IssueUpdateTitleCommentBody(creator string, oldTitle string, newTitle string) string {
	return fmt.Sprintf("@%v changed title from **~~%v~~** to **%v**", creator, oldTitle, newTitle)
}

func IssueUpdateDescriptionCommentBody(creator string) string {
	return fmt.Sprintf("@%v changed the description", creator)
}

func IssueAddLabelsCommentBody(creator string, labels []string) string {
	return fmt.Sprintf("@%v added"+JoinLabels(labels)+" label", creator)
}

func IssueRemoveLabelsCommentBody(creator string, labels []string) string {
	return fmt.Sprintf("@%v removed"+JoinLabels(labels)+" label", creator)
}

func IssueToggleStateCommentBody(creator string, state types.Issue_State) string {
	if state == types.Issue_OPEN {
		return fmt.Sprintf("@%v reopened", creator)
	} else {
		return fmt.Sprintf("@%v closed", creator)
	}
}

func HaveIssuePermission(repository types.Repository, creator string, o interface{}) bool {
	ownerId := repository.Owner.Id
	ownerType := repository.Owner.Type
	allowed := []types.RepositoryCollaborator_Permission{
		types.RepositoryCollaborator_TRIAGE,
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
