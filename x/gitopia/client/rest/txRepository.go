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

type createRepositoryRequest struct {
	BaseReq     rest.BaseReq `json:"base_req"`
	Creator     string       `json:"creator"`
	Name        string       `json:"name"`
	Owner       string       `json:"owner"`
	Description string       `json:"description"`
}

func createRepositoryHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req createRepositoryRequest
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

		parsedName := req.Name

		parsedOwner := req.Owner

		parsedDescription := req.Description

		msg := types.NewMsgCreateRepository(
			req.Creator,
			parsedName,
			parsedOwner,
			parsedDescription,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}

type updateRepositoryRequest struct {
	BaseReq       rest.BaseReq `json:"base_req"`
	Creator       string       `json:"creator"`
	Name          string       `json:"name"`
	Owner         string       `json:"owner"`
	Description   string       `json:"description"`
	Forks         string       `json:"forks"`
	Branches      string       `json:"branches"`
	Tags          string       `json:"tags"`
	Subscribers   string       `json:"subscribers"`
	Commits       string       `json:"commits"`
	IssuesOpen    string       `json:"issuesOpen"`
	IssuesClosed  string       `json:"issuesClosed"`
	Pulls         string       `json:"pulls"`
	Labels        string       `json:"labels"`
	Releases      string       `json:"releases"`
	CreatedAt     string       `json:"createdAt"`
	UpdatedAt     string       `json:"updatedAt"`
	PushedAt      string       `json:"pushedAt"`
	Stargazers    string       `json:"stargazers"`
	Archived      string       `json:"archived"`
	License       string       `json:"license"`
	DefaultBranch string       `json:"defaultBranch"`
	Extensions    string       `json:"extensions"`
}

func updateRepositoryHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseUint(mux.Vars(r)["id"], 10, 64)
		if err != nil {
			return
		}

		var req updateRepositoryRequest
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

		parsedName := req.Name

		parsedOwner := req.Owner

		parsedDescription := req.Description

		parsedForks := req.Forks

		parsedBranches := req.Branches

		parsedTags := req.Tags

		parsedSubscribers := req.Subscribers

		parsedCommits := req.Commits

		parsedIssuesOpen := req.IssuesOpen

		parsedIssuesClosed := req.IssuesClosed

		parsedPulls := req.Pulls

		parsedLabels := req.Labels

		parsedReleases := req.Releases

		parsedCreatedAt := req.CreatedAt

		parsedUpdatedAt := req.UpdatedAt

		parsedPushedAt := req.PushedAt

		parsedStargazers := req.Stargazers

		parsedArchived := req.Archived

		parsedLicense := req.License

		parsedDefaultBranch := req.DefaultBranch

		parsedExtensions := req.Extensions

		msg := types.NewMsgUpdateRepository(
			req.Creator,
			id,
			parsedName,
			parsedOwner,
			parsedDescription,
			parsedForks,
			parsedBranches,
			parsedTags,
			parsedSubscribers,
			parsedCommits,
			parsedIssuesOpen,
			parsedIssuesClosed,
			parsedPulls,
			parsedLabels,
			parsedReleases,
			parsedCreatedAt,
			parsedUpdatedAt,
			parsedPushedAt,
			parsedStargazers,
			parsedArchived,
			parsedLicense,
			parsedDefaultBranch,
			parsedExtensions,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}

type deleteRepositoryRequest struct {
	BaseReq rest.BaseReq `json:"base_req"`
	Creator string       `json:"creator"`
}

func deleteRepositoryHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseUint(mux.Vars(r)["id"], 10, 64)
		if err != nil {
			return
		}

		var req deleteRepositoryRequest
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

		msg := types.NewMsgDeleteRepository(
			req.Creator,
			id,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}
