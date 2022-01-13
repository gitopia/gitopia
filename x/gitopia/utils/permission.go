package utils

import "github.com/gitopia/gitopia/x/gitopia/types"

func HaveRepositoryCollaboratorPermission(p []types.RepositoryCollaborator_Permission, val types.RepositoryCollaborator_Permission) (int, bool) {
	for i, v := range p {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func HavePermission(repository types.Repository, allowedPermissions []types.RepositoryCollaborator_Permission, creator string, o interface{}) bool {
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
			if _, exists := HaveRepositoryCollaboratorPermission(allowedPermissions, repository.Collaborators[i].Permission); exists {
				havePermission = true
			}
		}
	}

	return havePermission
}
