package utils

import "fmt"

func PullRequestCommentExists(c []uint64, val uint64) (int, bool) {
	for i, v := range c {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func ReviewerExists(a []string, val string) (int, bool) {
	for i, v := range a {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func JoinReviewers(reviewers []string) string {
	res := ""
	len := len(reviewers)
	for i, a := range reviewers {
		res += fmt.Sprintf(" @%s", a)
		if i == len-2 && len > 1 {
			res += " and"
		}
	}
	return res
}
