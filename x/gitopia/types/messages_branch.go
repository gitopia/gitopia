package types

import (
	"regexp"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgSetBranch         = "set_branch"
	TypeMsgMultiSetBranch    = "multi_set_branch"
	TypeMsgSetDefaultBranch  = "set_default_branch"
	TypeMsgDeleteBranch      = "delete_branch"
	TypeMsgMultiDeleteBranch = "multi_delete_branch"
)

var _ sdk.Msg = &MsgSetBranch{}

func NewMsgSetBranch(creator string, repositoryId RepositoryId, branch MsgSetBranch_Branch) *MsgSetBranch {
	return &MsgSetBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branch:       branch,
	}
}

func (msg *MsgSetBranch) Route() string {
	return RouterKey
}

func (msg *MsgSetBranch) Type() string {
	return TypeMsgSetBranch
}

func (msg *MsgSetBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.RepositoryId.Id)
	if err != nil {
		if len(msg.RepositoryId.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id must consist minimum 3 chars")
		} else if len(msg.RepositoryId.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.RepositoryId.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid id (%v)", msg.RepositoryId.Id)
		}
	}

	if len(msg.RepositoryId.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name must be at least 3 characters long")
	} else if len(msg.RepositoryId.Name) > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name exceeds limit: 100")
	}
	sanitized := IsNameSanitized(msg.RepositoryId.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "repository name is not sanitized")
	}

	if len(msg.Branch.Name) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch length exceeds limit: 255")
	} else if len(msg.Branch.Name) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch name can't be empty")
	}
	if valid, err := IsValidRefname(msg.Branch.Name); !valid {
		return err
	}
	isShaValid, _ := regexp.MatchString("^([0-9a-f]{40}|[0-9a-f]{64})$", msg.Branch.Sha)
	if !isShaValid {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid sha")
	}
	return nil
}

var _ sdk.Msg = &MsgSetDefaultBranch{}

func NewMsgSetDefaultBranch(creator string, repositoryId RepositoryId, branch string) *MsgSetDefaultBranch {
	return &MsgSetDefaultBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branch:       branch,
	}
}

func (msg *MsgSetDefaultBranch) Route() string {
	return RouterKey
}

func (msg *MsgSetDefaultBranch) Type() string {
	return TypeMsgSetDefaultBranch
}

func (msg *MsgSetDefaultBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetDefaultBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetDefaultBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.RepositoryId.Id)
	if err != nil {
		if len(msg.RepositoryId.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id must consist minimum 3 chars")
		} else if len(msg.RepositoryId.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.RepositoryId.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid id (%v)", msg.RepositoryId.Id)
		}
	}

	if len(msg.RepositoryId.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name must be at least 3 characters long")
	} else if len(msg.RepositoryId.Name) > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name exceeds limit: 100")
	}
	sanitized := IsNameSanitized(msg.RepositoryId.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "repository name is not sanitized")
	}

	if len(msg.Branch) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch length exceeds limit: 255")
	} else if len(msg.Branch) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch name can't be empty")
	}
	if valid, err := IsValidRefname(msg.Branch); !valid {
		return err
	}
	return nil
}

var _ sdk.Msg = &MsgMultiSetBranch{}

func NewMsgMultiSetRepositoryBranch(creator string, repositoryId RepositoryId, branches []MsgMultiSetBranch_Branch) *MsgMultiSetBranch {
	return &MsgMultiSetBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branches:     branches,
	}
}

func (msg *MsgMultiSetBranch) Route() string {
	return RouterKey
}

func (msg *MsgMultiSetBranch) Type() string {
	return TypeMsgMultiSetBranch
}

func (msg *MsgMultiSetBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMultiSetBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMultiSetBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.RepositoryId.Id)
	if err != nil {
		if len(msg.RepositoryId.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id must consist minimum 3 chars")
		} else if len(msg.RepositoryId.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.RepositoryId.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid id (%v)", msg.RepositoryId.Id)
		}
	}

	if len(msg.RepositoryId.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name must be at least 3 characters long")
	} else if len(msg.RepositoryId.Name) > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name exceeds limit: 100")
	}
	sanitized := IsNameSanitized(msg.RepositoryId.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "repository name is not sanitized")
	}

	for _, branch := range msg.Branches {
		if len(branch.Name) > 255 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch length exceeds limit: 255")
		} else if len(branch.Name) < 1 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch name can't be empty")
		}
		if valid, err := IsValidRefname(branch.Name); !valid {
			return err
		}
		isShaValid, _ := regexp.MatchString("^([0-9a-f]{40}|[0-9a-f]{64})$", branch.Sha)
		if !isShaValid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid sha")
		}
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteBranch{}

func NewMsgDeleteBranch(creator string, repositoryId RepositoryId, branch string) *MsgDeleteBranch {
	return &MsgDeleteBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branch:       branch,
	}
}

func (msg *MsgDeleteBranch) Route() string {
	return RouterKey
}

func (msg *MsgDeleteBranch) Type() string {
	return TypeMsgDeleteBranch
}

func (msg *MsgDeleteBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.RepositoryId.Id)
	if err != nil {
		if len(msg.RepositoryId.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id must consist minimum 3 chars")
		} else if len(msg.RepositoryId.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.RepositoryId.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid id (%v)", msg.RepositoryId.Id)
		}
	}

	if len(msg.RepositoryId.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name must be at least 3 characters long")
	} else if len(msg.RepositoryId.Name) > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name exceeds limit: 100")
	}
	sanitized := IsNameSanitized(msg.RepositoryId.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "repository name is not sanitized")
	}

	if len(msg.Branch) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch length exceeds limit: 255")
	} else if len(msg.Branch) < 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch name can't be empty")
	}
	if valid, err := IsValidRefname(msg.Branch); !valid {
		return err
	}
	return nil
}

var _ sdk.Msg = &MsgMultiDeleteBranch{}

func NewMsgMultiDeleteBranch(creator string, repositoryId RepositoryId, branches []string) *MsgMultiDeleteBranch {
	return &MsgMultiDeleteBranch{
		Creator:      creator,
		RepositoryId: repositoryId,
		Branches:     branches,
	}
}

func (msg *MsgMultiDeleteBranch) Route() string {
	return RouterKey
}

func (msg *MsgMultiDeleteBranch) Type() string {
	return TypeMsgMultiDeleteBranch
}

func (msg *MsgMultiDeleteBranch) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMultiDeleteBranch) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMultiDeleteBranch) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.RepositoryId.Id)
	if err != nil {
		if len(msg.RepositoryId.Id) < 3 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id must consist minimum 3 chars")
		} else if len(msg.RepositoryId.Id) > 39 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "id limit exceed: 39")
		}
		valid, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[-]?[a-zA-Z0-9])*$", msg.RepositoryId.Id)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
		}
		if !valid {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid id (%v)", msg.RepositoryId.Id)
		}
	}

	if len(msg.RepositoryId.Name) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name must be at least 3 characters long")
	} else if len(msg.RepositoryId.Name) > 100 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Repository name exceeds limit: 100")
	}
	sanitized := IsNameSanitized(msg.RepositoryId.Name)
	if !sanitized {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "repository name is not sanitized")
	}

	for _, branch := range msg.Branches {
		if len(branch) > 255 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch length exceeds limit: 255")
		} else if len(branch) < 1 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "branch name can't be empty")
		}
		if valid, err := IsValidRefname(branch); !valid {
			return err
		}
	}
	return nil
}
