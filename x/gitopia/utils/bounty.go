package utils

func BountyIdExists(b []uint64, val uint64) (int, bool) {
	for i, v := range b {
		if v == val {
			return i, true
		}
	}
	return 0, false
}
