package utils

import "strconv"

var OneDay int64 = 86400

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

type UInt64Slice []uint64

func (r UInt64Slice) Len() int           { return len(r) }
func (r UInt64Slice) Less(i, j int) bool { return r[i] < r[j] }
func (r UInt64Slice) Swap(i, j int)      { r[i], r[j] = r[j], r[i] }
