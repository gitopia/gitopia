package utils

import (
	"github.com/gitopia/gitopia/x/gitopia/types"
)

func RepositoryCollaboratorExists(r []*types.RepositoryCollaborator, val string) (int, bool) {
	for i, v := range r {
		if v.Id == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryBranchExists(r []*types.RepositoryBranch, val string) (int, bool) {
	for i, v := range r {
		if v.Name == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryTagExists(r []*types.RepositoryTag, val string) (int, bool) {
	for i, v := range r {
		if v.Name == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryIssueExists(r []*types.RepositoryIssue, val uint64) (int, bool) {
	for i, v := range r {
		if v.Iid == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryPullRequestExists(r []*types.RepositoryPullRequest, val uint64) (int, bool) {
	for i, v := range r {
		if v.Iid == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryLabelExists(l []*types.RepositoryLabel, val string) (int, bool) {
	for i, v := range l {
		if v.Name == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryLabelIdExists(l []*types.RepositoryLabel, val uint64) (int, bool) {
	for i, v := range l {
		if v.Id == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryReleaseExists(r []*types.RepositoryRelease, val string) (int, bool) {
	for i, v := range r {
		if v.Name == val {
			return i, true
		}
	}
	return 0, false
}

func RepositoryReleaseIdExists(r []*types.RepositoryRelease, val uint64) (int, bool) {
	for i, v := range r {
		if v.Id == val {
			return i, true
		}
	}
	return 0, false
}

func HaveRepositoryPermission(repository types.Repository, creator string, o interface{}) bool {
	ownerId := repository.Owner.Id
	ownerType := repository.Owner.Type

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
			if repository.Collaborators[i].Permission == types.RepositoryCollaborator_ADMIN {
				havePermission = true
			}
		}
	}

	return havePermission
}

func HaveBranchPermission(repository types.Repository, creator string, o interface{}) bool {
	ownerId := repository.Owner.Id
	ownerType := repository.Owner.Type

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
			if repository.Collaborators[i].Permission == types.RepositoryCollaborator_ADMIN {
				havePermission = true
			}
		}
	}

	return havePermission
}

func HaveTagPermission(repository types.Repository, creator string, o interface{}) bool {
	ownerId := repository.Owner.Id
	ownerType := repository.Owner.Type

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
			if repository.Collaborators[i].Permission == types.RepositoryCollaborator_ADMIN {
				havePermission = true
			}
		}
	}

	return havePermission
}
