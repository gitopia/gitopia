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

type createCommentRequest struct {
	BaseReq           rest.BaseReq `json:"base_req"`
	Creator           string       `json:"creator"`
	ParentId          uint64       `json:"parent_id"`
	Body              string       `json:"body"`
	Attachments       []string     `json:"attachments"`
	DiffHunk          string       `json:"diff_hunk"`
	Path              string       `json:"path"`
	System            bool         `json:"system"`
	AuthorId          uint64       `json:"author_id"`
	AuthorAssociation string       `json:"author_association"`
	CommentType       string       `json:"comment_type"`
}

func createCommentHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req createCommentRequest
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

		parsedParentId := req.ParentId

		parsedBody := req.Body

		parsedAttachments := req.Attachments

		parsedDiffHunk := req.DiffHunk

		parsedPath := req.Path

		parsedSystem := req.System

		parsedAuthorId := req.AuthorId

		parsedAuthorAssociation := req.AuthorAssociation

		parsedCommentType := req.CommentType

		msg := types.NewMsgCreateComment(
			req.Creator,
			parsedParentId,
			parsedBody,
			parsedAttachments,
			parsedDiffHunk,
			parsedPath,
			parsedSystem,
			parsedAuthorId,
			parsedAuthorAssociation,
			parsedCommentType,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}

type updateCommentRequest struct {
	BaseReq     rest.BaseReq `json:"base_req"`
	Creator     string       `json:"creator"`
	Body        string       `json:"body"`
	Attachments []string     `json:"attachments"`
}

func updateCommentHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseUint(mux.Vars(r)["id"], 10, 64)
		if err != nil {
			return
		}

		var req updateCommentRequest
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

		parsedBody := req.Body

		parsedAttachments := req.Attachments

		msg := types.NewMsgUpdateComment(
			req.Creator,
			id,
			parsedBody,
			parsedAttachments,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}

type deleteCommentRequest struct {
	BaseReq rest.BaseReq `json:"base_req"`
	Creator string       `json:"creator"`
}

func deleteCommentHandler(clientCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseUint(mux.Vars(r)["id"], 10, 64)
		if err != nil {
			return
		}

		var req deleteCommentRequest
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

		msg := types.NewMsgDeleteComment(
			req.Creator,
			id,
		)

		tx.WriteGeneratedTxResponse(clientCtx, w, req.BaseReq, msg)
	}
}
