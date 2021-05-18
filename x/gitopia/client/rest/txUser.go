package rest

import (
	"net/http"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/rest"
	"github.com/gitopia/gitopia/x/gitopia/types"
	"github.com/gorilla/mux"
)

type createUserRequest struct {
	BaseReq               rest.BaseReq `json:"base_req"`
	Creator               string       `json:"creator"`
	Username              string       `json:"username"`
	UsernameGithub        string       `json:"usernameGithub"`
	AvatarUrl             string       `json:"avatarUrl"`
	Followers             string       `json:"followers"`
	Following             string       `json:"following"`
	Repositories          string       `json:"repositories"`
	Repositories_archived string       `json:"repositories_archived"`
	Organizations         string       `json:"organizations"`
	Starred_repos         string       `json:"starred_repos"`
	Subscriptions         string       `json:"subscriptions"`
	Email                 string       `json:"email"`
	Bio                   string       `json:"bio"`
	CreatedAt             string       `json:"createdAt"`
	UpdatedAt             string       `json:"updatedAt"`
	Extensions            string       `json:"extensions"`
}

func createUserHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req createUserRequest
		if !rest.ReadRESTReq(w, r, clientCtx.LegacyAmino, &req) {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "failed to parse request")
			return
		}

		baseReq := req.BaseReq.Sanitize()
		if !baseReq.ValidateBasic(w) {
			return
		}

		_, err := sdk.AccAddressFromBech32(req.Creator)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		parsedUsername := req.Username

		parsedUsernameGithub := req.UsernameGithub

		parsedAvatarUrl := req.AvatarUrl

		parsedFollowers := req.Followers

		parsedFollowing := req.Following

		parsedRepositories := req.Repositories

		parsedRepositories_archived := req.Repositories_archived

		parsedOrganizations := req.Organizations

		parsedStarred_repos := req.Starred_repos

		parsedSubscriptions := req.Subscriptions

		parsedEmail := req.Email

		parsedBio := req.Bio

		parsedCreatedAt := req.CreatedAt

		parsedUpdatedAt := req.UpdatedAt

		parsedExtensions := req.Extensions

		msg := types.NewMsgCreateUser(
			req.Creator,
			parsedUsername,
			parsedUsernameGithub,
			parsedAvatarUrl,
			parsedFollowers,
			parsedFollowing,
			parsedRepositories,
			parsedRepositories_archived,
			parsedOrganizations,
			parsedStarred_repos,
			parsedSubscriptions,
			parsedEmail,
			parsedBio,
			parsedCreatedAt,
			parsedUpdatedAt,
			parsedExtensions,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}

type updateUserRequest struct {
	BaseReq               rest.BaseReq `json:"base_req"`
	Creator               string       `json:"creator"`
	Username              string       `json:"username"`
	UsernameGithub        string       `json:"usernameGithub"`
	AvatarUrl             string       `json:"avatarUrl"`
	Followers             string       `json:"followers"`
	Following             string       `json:"following"`
	Repositories          string       `json:"repositories"`
	Repositories_archived string       `json:"repositories_archived"`
	Organizations         string       `json:"organizations"`
	Starred_repos         string       `json:"starred_repos"`
	Subscriptions         string       `json:"subscriptions"`
	Email                 string       `json:"email"`
	Bio                   string       `json:"bio"`
	CreatedAt             string       `json:"createdAt"`
	UpdatedAt             string       `json:"updatedAt"`
	Extensions            string       `json:"extensions"`
}

func updateUserHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseUint(mux.Vars(r)["id"], 10, 64)
		if err != nil {
			return
		}

		var req updateUserRequest
		if !rest.ReadRESTReq(w, r, clientCtx.LegacyAmino, &req) {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "failed to parse request")
			return
		}

		baseReq := req.BaseReq.Sanitize()
		if !baseReq.ValidateBasic(w) {
			return
		}

		_, err = sdk.AccAddressFromBech32(req.Creator)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		parsedUsername := req.Username

		parsedUsernameGithub := req.UsernameGithub

		parsedAvatarUrl := req.AvatarUrl

		parsedFollowers := req.Followers

		parsedFollowing := req.Following

		parsedRepositories := req.Repositories

		parsedRepositories_archived := req.Repositories_archived

		parsedOrganizations := req.Organizations

		parsedStarred_repos := req.Starred_repos

		parsedSubscriptions := req.Subscriptions

		parsedEmail := req.Email

		parsedBio := req.Bio

		parsedCreatedAt := req.CreatedAt

		parsedUpdatedAt := req.UpdatedAt

		parsedExtensions := req.Extensions

		msg := types.NewMsgUpdateUser(
			req.Creator,
			id,
			parsedUsername,
			parsedUsernameGithub,
			parsedAvatarUrl,
			parsedFollowers,
			parsedFollowing,
			parsedRepositories,
			parsedRepositories_archived,
			parsedOrganizations,
			parsedStarred_repos,
			parsedSubscriptions,
			parsedEmail,
			parsedBio,
			parsedCreatedAt,
			parsedUpdatedAt,
			parsedExtensions,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}

type deleteUserRequest struct {
	BaseReq rest.BaseReq `json:"base_req"`
	Creator string       `json:"creator"`
}

func deleteUserHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseUint(mux.Vars(r)["id"], 10, 64)
		if err != nil {
			return
		}

		var req deleteUserRequest
		if !rest.ReadRESTReq(w, r, clientCtx.LegacyAmino, &req) {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "failed to parse request")
			return
		}

		baseReq := req.BaseReq.Sanitize()
		if !baseReq.ValidateBasic(w) {
			return
		}

		_, err = sdk.AccAddressFromBech32(req.Creator)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		msg := types.NewMsgDeleteUser(
			req.Creator,
			id,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}
