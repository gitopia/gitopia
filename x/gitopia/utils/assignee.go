package utils

import "fmt"

func AssigneeExists(a []string, val string) (int, bool) {
	for i, v := range a {
		if v == val {
			return i, true
		}
	}
	return 0, false
}

func JoinAssignees(assignees []string) string {
	res := ""
	len := len(assignees)
	for i, a := range assignees {
		res += fmt.Sprintf(" @%s", a)
		if i == len-2 && len > 1 {
			res += " and"
		}
	}
	return res
}

func AddAssigneesCommentBody(creator string, assignees []string) string {
	return fmt.Sprintf("@%v assigned to"+JoinAssignees(assignees), creator)
}

func RemoveAssigneesCommentBody(creator string, assignees []string) string {
	return fmt.Sprintf("@%v unassigned"+JoinAssignees(assignees), creator)
}
