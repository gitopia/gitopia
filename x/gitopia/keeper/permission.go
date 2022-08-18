package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gitopia/gitopia/x/gitopia/utils"
)

func (k Keeper) HavePermission(ctx sdk.Context, creator string, repository types.Repository, minAllowedPermission types.RepositoryCollaborator_Permission) (havePermission bool) {
	if repository.Owner.Type == types.RepositoryOwner_USER {
		if creator == repository.Owner.Id {
			havePermission = true
		}
	} else if repository.Owner.Type == types.RepositoryOwner_DAO {
		member, found := k.GetDaoMember(ctx, repository.Owner.Id, creator)
		if found && member.Role == types.MemberRole_OWNER {
			havePermission = true
		}
	}

	if !havePermission {
		if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, creator); exists {
			if repository.Collaborators[i].Permission >= minAllowedPermission {
				havePermission = true
			}
		}
	}

	return havePermission
}
