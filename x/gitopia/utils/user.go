package utils

import "regexp"

func ValidateUsername(username string) (bool, error) {
	match, err := regexp.MatchString("^[a-zA-Z0-9]+(?:[_.-]?[a-zA-Z0-9])*$", username)
	if err != nil {
		return match, err
	}
	return match, nil
}
