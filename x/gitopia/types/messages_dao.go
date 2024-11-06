package types

import (
	"net/url"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/group"
)

var _ sdk.Msg = &MsgCreateDao{}

func NewMsgCreateDao(creator string, name string, description string, avatarUrl string, location string, website string, members []group.MemberRequest, votingPeriod string, percentage string) *MsgCreateDao {
	return &MsgCreateDao{
		Creator:      creator,
		Name:         name,
		Description:  description,
		AvatarUrl:    avatarUrl,
		Location:     location,
		Website:      website,
		Members:      members,
		VotingPeriod: votingPeriod,
		Percentage:   percentage,
	}
}

func (msg *MsgCreateDao) Route() string {
	return RouterKey
}

func (msg *MsgCreateDao) Type() string {
	return "CreateDao"
}

func (msg *MsgCreateDao) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateDao) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateDao) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	if err := ValidateDaoName(msg.Name); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Description) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "description length exceeds limit: 255")
	}

	if len(msg.Location) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "location exceeds limit: 255")
	}

	if len(msg.AvatarUrl) > 2048 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "avatar url exceeds limit: 2048")
	}
	if msg.AvatarUrl != "" {
		url, err := url.ParseRequestURI(msg.AvatarUrl)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid url (%s)", msg.AvatarUrl)
		}
		if url.Scheme != "https" {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "only https URL scheme is allowed")
		}
	}

	if len(msg.Website) > 2048 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "website url exceeds limit: 2048")
	}
	if msg.Website != "" {
		url, err := url.ParseRequestURI(msg.Website)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid url (%s)", msg.Website)
		}
		if url.Scheme != "https" && url.Scheme != "http" {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "only https and http URL scheme is allowed in Website")
		}
	}

	// Validate members
	if len(msg.Members) == 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "group must have at least one member")
	}

	for _, member := range msg.Members {
		// Validate member address
		_, err := sdk.AccAddressFromBech32(member.Address)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid member address (%s)", err)
		}

		// Validate member weight (must be positive)
		weight, err := math.LegacyNewDecFromStr(member.Weight)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid member weight: %s", err)
		}
		if !weight.IsPositive() {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "member weight must be positive")
		}

		// Validate metadata length if needed (optional, adjust limit as needed)
		if len(member.Metadata) > 255 {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "member metadata exceeds limit: 255")
		}
	}

	// Validate voting period
	_, err = sdk.NewDecFromStr(msg.VotingPeriod)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid voting period format: %s", err)
	}

	// Validate percentage
	percentage, err := math.NewPositiveDecFromString(msg.Percentage)
	if err != nil {
		return sdkerrors.Wrapf(err, "invalid percentage threshold")
	}
	if percentage.IsNegative() || percentage.Cmp(math.NewDecFromInt64(1)) == 1 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "percentage must be > 0 and <= 1")
	}

	return nil
}

var _ sdk.Msg = &MsgRenameDao{}

func NewMsgRenameDao(admin string, id string, name string) *MsgRenameDao {
	return &MsgRenameDao{
		Admin: admin,
		Id:    id,
		Name:  name,
	}
}

func (msg *MsgRenameDao) Route() string {
	return sdk.MsgTypeURL(msg)
}

func (msg *MsgRenameDao) Type() string { return sdk.MsgTypeURL(msg) }

func (msg *MsgRenameDao) GetSigners() []sdk.AccAddress {
	admin := sdk.MustAccAddressFromBech32(msg.Admin)

	return []sdk.AccAddress{admin}
}

func (msg *MsgRenameDao) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRenameDao) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrap(err, "admin")
	}

	if err := ValidateDaoId(msg.Id); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if err := ValidateDaoName(msg.Name); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateDaoDescription{}

func NewMsgUpdateDaoDescription(admin string, id string, description string) *MsgUpdateDaoDescription {
	return &MsgUpdateDaoDescription{
		Admin:       admin,
		Id:          id,
		Description: description,
	}
}

func (msg *MsgUpdateDaoDescription) Route() string {
	return sdk.MsgTypeURL(msg)
}

func (msg *MsgUpdateDaoDescription) Type() string { return sdk.MsgTypeURL(msg) }

func (msg *MsgUpdateDaoDescription) GetSigners() []sdk.AccAddress {
	admin := sdk.MustAccAddressFromBech32(msg.Admin)

	return []sdk.AccAddress{admin}
}

func (msg *MsgUpdateDaoDescription) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDaoDescription) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrap(err, "admin")
	}

	if err := ValidateDaoId(msg.Id); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Description) < 3 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Minimum character required: 3")
	}

	if len(msg.Description) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Description exceeds limit: 255")
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateDaoWebsite{}

func NewMsgUpdateDaoWebsite(admin string, id string, url string) *MsgUpdateDaoWebsite {
	return &MsgUpdateDaoWebsite{
		Admin: admin,
		Id:    id,
		Url:   url,
	}
}

func (msg *MsgUpdateDaoWebsite) Route() string {
	return sdk.MsgTypeURL(msg)
}

func (msg *MsgUpdateDaoWebsite) Type() string { return sdk.MsgTypeURL(msg) }

func (msg *MsgUpdateDaoWebsite) GetSigners() []sdk.AccAddress {
	admin := sdk.MustAccAddressFromBech32(msg.Admin)

	return []sdk.AccAddress{admin}
}

func (msg *MsgUpdateDaoWebsite) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDaoWebsite) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrap(err, "admin")
	}

	if err := ValidateDaoId(msg.Id); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Url) > 2048 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "website url exceeds limit: 2048")
	}
	if msg.Url != "" {
		url, err := url.ParseRequestURI(msg.Url)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid url (%s)", msg.Url)
		}
		if url.Scheme != "https" && url.Scheme != "http" {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "only https and http URL scheme is allowed in Website")
		}
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateDaoLocation{}

func NewMsgUpdateDaoLocation(admin string, id string, location string) *MsgUpdateDaoLocation {
	return &MsgUpdateDaoLocation{
		Admin:    admin,
		Id:       id,
		Location: location,
	}
}

func (msg *MsgUpdateDaoLocation) Route() string {
	return sdk.MsgTypeURL(msg)
}

func (msg *MsgUpdateDaoLocation) Type() string { return sdk.MsgTypeURL(msg) }

func (msg *MsgUpdateDaoLocation) GetSigners() []sdk.AccAddress {
	admin := sdk.MustAccAddressFromBech32(msg.Admin)

	return []sdk.AccAddress{admin}
}

func (msg *MsgUpdateDaoLocation) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDaoLocation) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrap(err, "admin")
	}

	if err := ValidateDaoId(msg.Id); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Location) > 255 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "Location exceeds limit: 255")

	}
	return nil
}

var _ sdk.Msg = &MsgUpdateDaoAvatar{}

func NewMsgUpdateDaoAvatar(admin string, id string, url string) *MsgUpdateDaoAvatar {
	return &MsgUpdateDaoAvatar{
		Admin: admin,
		Id:    id,
		Url:   url,
	}
}

func (msg *MsgUpdateDaoAvatar) Route() string {
	return sdk.MsgTypeURL(msg)
}

func (msg *MsgUpdateDaoAvatar) Type() string { return sdk.MsgTypeURL(msg) }

func (msg *MsgUpdateDaoAvatar) GetSigners() []sdk.AccAddress {
	admin := sdk.MustAccAddressFromBech32(msg.Admin)

	return []sdk.AccAddress{admin}
}

func (msg *MsgUpdateDaoAvatar) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDaoAvatar) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrap(err, "admin")
	}

	if err := ValidateDaoId(msg.Id); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	if len(msg.Url) > 2048 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "avatar url exceeds limit: 2048")
	}
	if msg.Url != "" {
		url, err := url.ParseRequestURI(msg.Url)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "invalid url (%s)", msg.Url)
		}
		if url.Scheme != "https" {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, "only https URL scheme is allowed")
		}
	}

	return nil
}

var _ sdk.Msg = &MsgUpdateDaoPinnedRepositories{}

func NewMsgUpdateDaoPinnedRepositories(admin, id string, repositoryId uint64) *MsgUpdateDaoPinnedRepositories {
	return &MsgUpdateDaoPinnedRepositories{
		Admin:        admin,
		Id:           id,
		RepositoryId: repositoryId,
	}
}

func (msg *MsgUpdateDaoPinnedRepositories) Route() string {
	return sdk.MsgTypeURL(msg)
}

func (msg *MsgUpdateDaoPinnedRepositories) Type() string { return sdk.MsgTypeURL(msg) }

func (msg *MsgUpdateDaoPinnedRepositories) GetSigners() []sdk.AccAddress {
	admin := sdk.MustAccAddressFromBech32(msg.Admin)

	return []sdk.AccAddress{admin}
}

func (msg *MsgUpdateDaoPinnedRepositories) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDaoPinnedRepositories) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrap(err, "admin")
	}

	if err := ValidateDaoId(msg.Id); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}

var _ sdk.Msg = &MsgDaoTreasurySpend{}

func NewMsgDaoTreasurySpend(admin string, recipient string, amount []sdk.Coin) *MsgDaoTreasurySpend {
	return &MsgDaoTreasurySpend{
		Admin:     admin,
		Recipient: recipient,
		Amount:    amount,
	}
}

func (msg *MsgDaoTreasurySpend) Route() string {
	return sdk.MsgTypeURL(msg)
}

func (msg *MsgDaoTreasurySpend) Type() string { return sdk.MsgTypeURL(msg) }

func (msg *MsgDaoTreasurySpend) GetSigners() []sdk.AccAddress {
	admin := sdk.MustAccAddressFromBech32(msg.Admin)

	return []sdk.AccAddress{admin}
}

func (msg *MsgDaoTreasurySpend) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDaoTreasurySpend) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrap(err, "admin")
	}

	if err := ValidateDaoId(msg.Id); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	_, err = sdk.AccAddressFromBech32(msg.Recipient)
	if err != nil {
		return sdkerrors.Wrap(err, "recipient")
	}

	return msg.Amount.Validate()
}

var _ sdk.Msg = &MsgUpdateDaoConfig{}

func NewMsgUpdateDaoConfig(admin string, id string, config DaoConfig) *MsgUpdateDaoConfig {
	return &MsgUpdateDaoConfig{
		Admin:  admin,
		Id:     id,
		Config: config,
	}
}

func (msg *MsgUpdateDaoConfig) Route() string {
	return sdk.MsgTypeURL(msg)
}

func (msg *MsgUpdateDaoConfig) Type() string { return sdk.MsgTypeURL(msg) }

func (msg *MsgUpdateDaoConfig) GetSigners() []sdk.AccAddress {
	admin := sdk.MustAccAddressFromBech32(msg.Admin)

	return []sdk.AccAddress{admin}
}

func (msg *MsgUpdateDaoConfig) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDaoConfig) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Admin)
	if err != nil {
		return sdkerrors.Wrap(err, "admin")
	}

	if err := ValidateDaoId(msg.Id); err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidRequest, err.Error())
	}

	return nil
}

var _ sdk.Msg = &MsgDeleteDao{}

func NewMsgDeleteDao(admin string, id string) *MsgDeleteDao {
	return &MsgDeleteDao{
		Admin: admin,
		Id:    id,
	}
}
func (msg *MsgDeleteDao) Route() string {
	return sdk.MsgTypeURL(msg)
}

func (msg *MsgDeleteDao) Type() string { return sdk.MsgTypeURL(msg) }

func (msg *MsgDeleteDao) GetSigners() []sdk.AccAddress {
	admin := sdk.MustAccAddressFromBech32(msg.Admin)

	return []sdk.AccAddress{admin}
}

func (msg *MsgDeleteDao) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteDao) ValidateBasic() error {
	return sdkerrors.Wrapf(sdkerrors.ErrNotSupported, "tx WIP")
}
