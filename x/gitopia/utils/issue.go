package utils

import "fmt"

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
	return fmt.Sprintf("@%v changed title from **{-%v-}** to **{+%v+}**", creator, oldTitle, newTitle)
}

func IssueUpdateDescriptionCommentBody(creator string) string {
	return fmt.Sprintf("@%v changed the description", creator)
}
