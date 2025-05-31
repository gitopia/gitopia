package utils

import (
	"fmt"

	"github.com/gitopia/gitopia/v6/x/gitopia/types"
)

func PullRequestToggleStateCommentBody(creator string, state types.PullRequest_State) string {
	switch state {
	case types.PullRequest_OPEN:
		return fmt.Sprintf("@%s reopened this pull request", creator)
	case types.PullRequest_CLOSED:
		return fmt.Sprintf("@%s closed this pull request", creator)
	case types.PullRequest_MERGED:
		return fmt.Sprintf("@%s merged this pull request", creator)
	default:
		return fmt.Sprintf("@%s changed the state of this pull request to %s", creator, state.String())
	}
}
