package types

import (
	"fmt"
	"regexp"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func ValidateRepositoryId(repositoryId RepositoryId) error {
	_, err := sdk.AccAddressFromBech32(repositoryId.Id)
	if err != nil {
		if len(repositoryId.Id) < 3 {
			return fmt.Errorf("id must consist minimum 3 chars")
		} else if len(repositoryId.Id) > 39 {
			return fmt.Errorf("id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", repositoryId.Id)
		if err != nil {
			return fmt.Errorf(err.Error())
		}
		if !valid {
			return fmt.Errorf("invalid id (%v)", repositoryId.Id)
		}
	}

	if len(repositoryId.Name) < 3 {
		return fmt.Errorf("Repository name must be at least 3 characters long")
	} else if len(repositoryId.Name) > 100 {
		return fmt.Errorf("Repository name exceeds limit: 100")
	}
	sanitized := IsNameSanitized(repositoryId.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "repository name is not sanitized")
	}

	return nil
}
