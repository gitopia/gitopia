package utils

import "strconv"

func SliceAtoi(str []string) ([]uint64, error) {
	si := make([]uint64, 0, len(str))
	for _, a := range str {
		i, err := strconv.ParseUint(a, 10, 64)
		if err != nil {
			return si, err
		}
		si = append(si, i)
	}
	return si, nil
}
