package types

// NewParams creates a new Params instance
func NewParams(airdropAddress string) Params {
	return Params{
		AirdropAddress: airdropAddress,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams("gitopia1rrad3vleav3svu7tutqp9sqqv9mh4gex62vjvm")
}