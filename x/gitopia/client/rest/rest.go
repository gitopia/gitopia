package rest

import (
	"github.com/gorilla/mux"

	"github.com/cosmos/cosmos-sdk/client"
	// this line is used by starport scaffolding # 1
)

const (
	MethodGet = "GET"
)

// RegisterRoutes registers gitopia-related REST handlers to a router
func RegisterRoutes(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 2
	registerQueryRoutes(clientCtx, r)
	registerTxHandlers(clientCtx, r)

	registerQueryRoutes(clientCtx, r)
	registerTxHandlers(clientCtx, r)

	registerQueryRoutes(clientCtx, r)
	registerTxHandlers(clientCtx, r)

	registerQueryRoutes(clientCtx, r)
	registerTxHandlers(clientCtx, r)

	registerQueryRoutes(clientCtx, r)
	registerTxHandlers(clientCtx, r)

}

func registerQueryRoutes(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 3
	r.HandleFunc("/gitopia/comments/{id}", getCommentHandler(clientCtx)).Methods("GET")
	r.HandleFunc("/gitopia/comments", listCommentHandler(clientCtx)).Methods("GET")

	r.HandleFunc("/gitopia/issues/{id}", getIssueHandler(clientCtx)).Methods("GET")
	r.HandleFunc("/gitopia/issues", listIssueHandler(clientCtx)).Methods("GET")

	r.HandleFunc("/gitopia/repositories/{id}", getRepositoryHandler(clientCtx)).Methods("GET")
	r.HandleFunc("/gitopia/repositories", listRepositoryHandler(clientCtx)).Methods("GET")

	r.HandleFunc("/gitopia/users/{id}", getUserHandler(clientCtx)).Methods("GET")
	r.HandleFunc("/gitopia/users", listUserHandler(clientCtx)).Methods("GET")

	r.HandleFunc("/gitopia/whois/{name}", getWhoisHandler(clientCtx)).Methods("GET")
	r.HandleFunc("/gitopia/whois", listWhoisHandler(clientCtx)).Methods("GET")

}

func registerTxHandlers(clientCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding # 4
	r.HandleFunc("/gitopia/comments", createCommentHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/gitopia/comments/{id}", updateCommentHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/gitopia/comments/{id}", deleteCommentHandler(clientCtx)).Methods("POST")

	r.HandleFunc("/gitopia/issues", createIssueHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/gitopia/issues/{id}", updateIssueHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/gitopia/issues/{id}", deleteIssueHandler(clientCtx)).Methods("POST")

	r.HandleFunc("/gitopia/repositories", createRepositoryHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/gitopia/repositories/{id}", updateRepositoryHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/gitopia/repositories/{id}", deleteRepositoryHandler(clientCtx)).Methods("POST")

	r.HandleFunc("/gitopia/users", createUserHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/gitopia/users/{id}", updateUserHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/gitopia/users/{id}", deleteUserHandler(clientCtx)).Methods("POST")

	r.HandleFunc("/gitopia/whois", setWhoisHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/gitopia/whois/{name}", updateWhoisHandler(clientCtx)).Methods("POST")
	r.HandleFunc("/gitopia/whois/{name}", deleteWhoisHandler(clientCtx)).Methods("POST")

}
