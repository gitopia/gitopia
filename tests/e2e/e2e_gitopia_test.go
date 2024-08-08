package e2e

import (
	"fmt"
)

// /*
// TestGitopiaCreateRepository creates a test to ensure that
//
// */
func (s *IntegrationTestSuite) testGitopiaCreateRepository() {
	s.Run("test gitopia module", func() {
		var (
			valIdx = 0
			c      = s.chainA
			api    = fmt.Sprintf("http://%s", s.valResources[c.id][valIdx].GetHostPort("1317/tcp"))
		)

		alice, _ := c.genesisAccounts[1].keyInfo.GetAddress()

		s.execGitopiaCreateUser(c, valIdx, alice.String(), "alice")

		s.execGitopiaCreateRepository(
			c,
			valIdx,
			alice.String(),
			"repository-name",
		)

		repository, err := queryGitopiaRepository(api, alice.String(), "repository-name")
		s.Require().NoError(err)
		s.Require().Equal("repository-name", repository.Repository.Name)
	})
}
