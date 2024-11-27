package keeper

import (
	"math"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/cosmos/cosmos-sdk/x/group"
	"github.com/gitopia/gitopia/v5/x/gitopia/types"
	"github.com/gitopia/gitopia/v5/x/gitopia/utils"
)

func (k Keeper) HavePermission(ctx sdk.Context, creator string, repository types.Repository, minAllowedPermission types.RepositoryCollaborator_Permission) bool {
	if repository.Owner.Type == types.OwnerType_USER {
		if creator == repository.Owner.Id {
			return true
		}
	} else if repository.Owner.Type == types.OwnerType_DAO {
		dao, found := k.GetDao(ctx, repository.Owner.Id)
		if !found {
			return false
		}

		groupMembersReq := &group.QueryGroupMembersRequest{
			GroupId: dao.GroupId,
			Pagination: &query.PageRequest{
				Limit: math.MaxUint64,
			},
		}

		res, err := k.groupKeeper.GroupMembers(ctx, groupMembersReq)
		if err != nil {
			return false
		}

		for _, member := range res.Members {
			if member.Member.Address == creator {
				return true
			}
		}
	}

	if i, exists := utils.RepositoryCollaboratorExists(repository.Collaborators, creator); exists {
		if repository.Collaborators[i].Permission >= minAllowedPermission {
			return true
		}
	}

	return false
}
