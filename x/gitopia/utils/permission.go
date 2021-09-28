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
