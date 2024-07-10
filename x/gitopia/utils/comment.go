package utils

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v4/x/gitopia/types"
)

func AddAssigneesCommentBody(creator string, assignees []string) string {
	return fmt.Sprintf("@%v assigned to"+JoinAssignees(assignees), creator)
}

func RemoveAssigneesCommentBody(creator string, assignees []string) string {
	return fmt.Sprintf("@%v unassigned"+JoinAssignees(assignees), creator)
}

func AddLabelsCommentBody(creator string, labels []string) string {
	return fmt.Sprintf("@%v added"+JoinLabels(labels)+" label", creator)
}

func RemoveLabelsCommentBody(creator string, labels []string) string {
	return fmt.Sprintf("@%v removed"+JoinLabels(labels)+" label", creator)
}

func UpdateTitleCommentBody(creator string, oldTitle string, newTitle string) string {
	return fmt.Sprintf("@%v changed title from **~~%v~~** to **%v**", creator, oldTitle, newTitle)
}

func UpdateDescriptionCommentBody(creator string) string {
	return fmt.Sprintf("@%v changed the description", creator)
}

func IssueToggleStateCommentBody(creator string, state types.Issue_State) string {
	if state == types.Issue_OPEN {
		return fmt.Sprintf("@%v reopened", creator)
	} else {
		return fmt.Sprintf("@%v closed", creator)
	}
}

func PullRequestToggleStateCommentBody(creator string, state types.PullRequest_State) string {
	if state == types.PullRequest_OPEN {
		return fmt.Sprintf("@%v reopened", creator)
	} else if state == types.PullRequest_CLOSED {
		return fmt.Sprintf("@%v closed", creator)
	} else if state == types.PullRequest_MERGED {
		return fmt.Sprintf("@%v merged", creator)
	}
	return "undefined"
}

func AddReviewersCommentBody(creator string, reviewers []string) string {
	return fmt.Sprintf("@%v requested review from"+JoinReviewers(reviewers), creator)
}

func RemoveReviewersCommentBody(creator string, reviewers []string) string {
	return fmt.Sprintf("@%v removed review request for"+JoinReviewers(reviewers), creator)
}

func CreateBountyCommentBody(creator string, amount sdk.Coins) string {
	return fmt.Sprintf("@%v created bounty of %v", creator, amount.String())
}

func UpdateBountyExpiryCommentBody(creator string) string {
	return fmt.Sprintf("@%v changed bounty expiry", creator)
}

func CloseBountyCommentBody(creator string) string {
	return fmt.Sprintf("@%v closed bounty", creator)
}

func DeleteBountyCommentBody(creator string) string {
	return fmt.Sprintf("@%v deleted bounty", creator)
}

func LinkIssueCommentBody(creator string, iid uint64) string {
	return fmt.Sprintf("@%v linked issue #%v", creator, iid)
}

func UnlinkIssueCommentBody(creator string, iid uint64) string {
	return fmt.Sprintf("@%v unlinked issue #%v", creator, iid)
}

func LinkPullRequestCommentBody(creator string, iid uint64) string {
	return fmt.Sprintf("@%v linked pull request #%v", creator, iid)
}

func UnlinkPullRequestCommentBody(creator string, iid uint64) string {
	return fmt.Sprintf("@%v unlinked pull request #%v", creator, iid)
}
