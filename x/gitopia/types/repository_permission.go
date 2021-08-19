package types

type Permission int

const (
	Read Permission = iota
	Triage
	Write
	Maintain
	Admin
)

var permissions = [...]string{"Read", "Triage", "Write", "Maintain", "Admin"}
