package types

import (
	"encoding/base64"
	"fmt"
	"regexp"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ipfs/go-cid"
)

func ValidateRepositoryName(name string) error {
	if len(name) < 3 {
		return fmt.Errorf("Repository name must be at least 3 characters long")
	} else if len(name) > 100 {
		return fmt.Errorf("Repository name exceeds limit: 100")
	}
	sanitized := IsNameSanitized(name)
	if !sanitized {
		return fmt.Errorf("repository name is not sanitized")
	}

	return nil
}

func ValidateRepositoryDescription(description string) error {
	if len(description) > 255 {
		return fmt.Errorf("description length exceeds limit: 255")
	}

	return nil
}

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

	if err := ValidateRepositoryName(repositoryId.Name); err != nil {
		return err
	}

	return nil
}

func ValidateBranchName(name string) error {
	if len(name) > 255 {
		return fmt.Errorf("branch length exceeds limit: 255")
	} else if len(name) < 1 {
		return fmt.Errorf("branch name can't be empty")
	}
	if valid, err := IsValidRefname(name); !valid {
		return err
	}

	return nil
}

func ValidateCommentBody(body string) error {
	if len(body) < 1 {
		return fmt.Errorf("empty comment not allowed")
	} else if len(body) > 20000 {
		return fmt.Errorf("comment exceeds limit: 20000")
	}

	return nil
}

func ValidateIpfsCid(ipfsCid string) error {
	// if len(ipfsCid) != 46 {
	// 	return fmt.Errorf("invalid IPFS cid (%s)", ipfsCid)
	// }

	if _, err := cid.Decode(ipfsCid); err != nil {
		return fmt.Errorf("invalid IPFS cid (%s)", ipfsCid)
	}

	return nil
}

func ValidateArweaveTxId(arweaveTxId string) error {
	if len(arweaveTxId) != 43 {
		return fmt.Errorf("invalid arweave transaction id (%s)", arweaveTxId)
	}

	if _, err := base64.URLEncoding.WithPadding(base64.NoPadding).DecodeString(arweaveTxId); err != nil {
		return fmt.Errorf("invalid arweave transaction id (%s)", arweaveTxId)
	}

	return nil
}
