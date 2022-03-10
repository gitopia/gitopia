package utils

import "github.com/gitopia/gitopia/x/gitopia/types"

func HavePermission(repository types.Repository, creator string, minAllowedPermission types.RepositoryCollaborator_Permission, o interface{}) bool {
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
			if repository.Collaborators[i].Permission >= minAllowedPermission {
				havePermission = true
			}
		}
	}

	return havePermission
}

/* Minimum Allowed Permissions */
const (
	AssignPermission                      = types.RepositoryCollaborator_TRIAGE
	DefaultBranchPermission               = types.RepositoryCollaborator_ADMIN
	DeleteIssuePermission                 = types.RepositoryCollaborator_ADMIN
	LabelPermission                       = types.RepositoryCollaborator_TRIAGE
	PullRequestMergePermission            = types.RepositoryCollaborator_WRITE
	PushBranchPermission                  = types.RepositoryCollaborator_WRITE
	PushProtectedBranchPermission         = types.RepositoryCollaborator_ADMIN
	PushTagPermission                     = types.RepositoryCollaborator_WRITE
	ReleasePermission                     = types.RepositoryCollaborator_WRITE
	RepositoryCollaboratorPermission      = types.RepositoryCollaborator_ADMIN
	RepositoryLabelPermission             = types.RepositoryCollaborator_WRITE
	RepositoryRenamePermission            = types.RepositoryCollaborator_ADMIN
	RepositoryTransferOwnershipPermission = types.RepositoryCollaborator_ADMIN
	ToggleRepositoryForkingPermission     = types.RepositoryCollaborator_ADMIN
	ToggleIssueStatePermission            = types.RepositoryCollaborator_TRIAGE
)
