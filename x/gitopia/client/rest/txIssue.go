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

type createIssueRequest struct {
	BaseReq      rest.BaseReq `json:"base_req"`
	Creator      string       `json:"creator"`
	Iid          string       `json:"iid"`
	Title        string       `json:"title"`
	State        string       `json:"state"`
	Description  string       `json:"description"`
	AuthorId     string       `json:"authorId"`
	Comments     string       `json:"comments"`
	PullRequests string       `json:"pullRequests"`
	RepositoryId string       `json:"repositoryId"`
	Labels       string       `json:"labels"`
	Weight       string       `json:"weight"`
	AssigneesId  string       `json:"assigneesId"`
	CreatedAt    string       `json:"createdAt"`
	UpdatedAt    string       `json:"updatedAt"`
	ClosedAt     string       `json:"closedAt"`
	ClosedBy     string       `json:"closedBy"`
	Extensions   string       `json:"extensions"`
}

func createIssueHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req createIssueRequest
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

		parsedIid := req.Iid

		parsedTitle := req.Title

		parsedState := req.State

		parsedDescription := req.Description

		parsedAuthorId := req.AuthorId

		parsedComments := req.Comments

		parsedPullRequests := req.PullRequests

		parsedRepositoryId := req.RepositoryId

		parsedLabels := req.Labels

		parsedWeight := req.Weight

		parsedAssigneesId := req.AssigneesId

		parsedCreatedAt := req.CreatedAt

		parsedUpdatedAt := req.UpdatedAt

		parsedClosedAt := req.ClosedAt

		parsedClosedBy := req.ClosedBy

		parsedExtensions := req.Extensions

		msg := types.NewMsgCreateIssue(
			req.Creator,
			parsedIid,
			parsedTitle,
			parsedState,
			parsedDescription,
			parsedAuthorId,
			parsedComments,
			parsedPullRequests,
			parsedRepositoryId,
			parsedLabels,
			parsedWeight,
			parsedAssigneesId,
			parsedCreatedAt,
			parsedUpdatedAt,
			parsedClosedAt,
			parsedClosedBy,
			parsedExtensions,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}

type updateIssueRequest struct {
	BaseReq      rest.BaseReq `json:"base_req"`
	Creator      string       `json:"creator"`
	Iid          string       `json:"iid"`
	Title        string       `json:"title"`
	State        string       `json:"state"`
	Description  string       `json:"description"`
	AuthorId     string       `json:"authorId"`
	Comments     string       `json:"comments"`
	PullRequests string       `json:"pullRequests"`
	RepositoryId string       `json:"repositoryId"`
	Labels       string       `json:"labels"`
	Weight       string       `json:"weight"`
	AssigneesId  string       `json:"assigneesId"`
	CreatedAt    string       `json:"createdAt"`
	UpdatedAt    string       `json:"updatedAt"`
	ClosedAt     string       `json:"closedAt"`
	ClosedBy     string       `json:"closedBy"`
	Extensions   string       `json:"extensions"`
}

func updateIssueHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseUint(mux.Vars(r)["id"], 10, 64)
		if err != nil {
			return
		}

		var req updateIssueRequest
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

		parsedIid := req.Iid

		parsedTitle := req.Title

		parsedState := req.State

		parsedDescription := req.Description

		parsedAuthorId := req.AuthorId

		parsedComments := req.Comments

		parsedPullRequests := req.PullRequests

		parsedRepositoryId := req.RepositoryId

		parsedLabels := req.Labels

		parsedWeight := req.Weight

		parsedAssigneesId := req.AssigneesId

		parsedCreatedAt := req.CreatedAt

		parsedUpdatedAt := req.UpdatedAt

		parsedClosedAt := req.ClosedAt

		parsedClosedBy := req.ClosedBy

		parsedExtensions := req.Extensions

		msg := types.NewMsgUpdateIssue(
			req.Creator,
			id,
			parsedIid,
			parsedTitle,
			parsedState,
			parsedDescription,
			parsedAuthorId,
			parsedComments,
			parsedPullRequests,
			parsedRepositoryId,
			parsedLabels,
			parsedWeight,
			parsedAssigneesId,
			parsedCreatedAt,
			parsedUpdatedAt,
			parsedClosedAt,
			parsedClosedBy,
			parsedExtensions,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}

type deleteIssueRequest struct {
	BaseReq rest.BaseReq `json:"base_req"`
	Creator string       `json:"creator"`
}

func deleteIssueHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseUint(mux.Vars(r)["id"], 10, 64)
		if err != nil {
			return
		}

		var req deleteIssueRequest
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

		msg := types.NewMsgDeleteIssue(
			req.Creator,
			id,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}
