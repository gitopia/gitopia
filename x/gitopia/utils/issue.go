package utils

import (
	"fmt"

	"github.com/gitopia/gitopia/x/gitopia/types"
)

func JoinAssignees(assignees []string) string {
	res := ""
	len := len(assignees)
	for i, a := range assignees {
		res += " "
		res += "@"
		res += a
		if i == len-2 && len > 1 {
			res += " "
			res += "and"
		}
	}
	return res
}

func IssueCommentExists(c []uint64, val uint64) (int, bool) {
	for i, v := range c {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func IssueAssigneeExists(a []string, val string) (int, bool) {
	for i, v := range a {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func IssueUpdateTitleCommentBody(creator string, oldTitle string, newTitle string) string {
	return fmt.Sprintf("@%v changed title from **~~%v~~** to **%v**", creator, oldTitle, newTitle)
}

func IssueUpdateDescriptionCommentBody(creator string) string {
	return fmt.Sprintf("@%v changed the description", creator)
}

func IssueAddAssigneesCommentBody(creator string, assignees []string) string {
	return fmt.Sprintf("@%v assigned to"+JoinAssignees(assignees), creator)
}

func IssueRemoveAssigneesCommentBody(creator string, assignees []string) string {
	return fmt.Sprintf("@%v unassigned"+JoinAssignees(assignees), creator)
}

func IssueToggleStateCommentBody(creator string, state types.Issue_State) string {
	if state == types.Issue_OPEN {
		return fmt.Sprintf("@%v reopened", creator)
	} else {
		return fmt.Sprintf("@%v closed", creator)
	}
}
