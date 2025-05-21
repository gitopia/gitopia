package e2e

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	"github.com/cosmos/cosmos-sdk/client/flags"
	gitopiatypes "github.com/gitopia/gitopia/v5/x/gitopia/types"
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

// TestGitopiaRepositoryWorkflow tests the complete repository workflow including:
// 1. Creating a repository
// 2. Pushing code to the repository
// 3. Forking the repository
// 4. Cloning the forked repository
// 5. Pushing changes to the forked repository
// 6. Creating and merging a pull request
func (s *IntegrationTestSuite) TestGitopiaRepositoryWorkflow() {
	s.Run("test gitopia repository workflow", func() {
		var (
			valIdx = 0
			c      = s.chainA
			api    = fmt.Sprintf("http://%s", s.valResources[c.id][valIdx].GetHostPort("1317/tcp"))
		)

		alice, _ := c.genesisAccounts[1].keyInfo.GetAddress()
		bob, _ := c.genesisAccounts[2].keyInfo.GetAddress()

		// Set required environment variables
		os.Setenv("GITHUB_ACTIONS", "true")
		address, err := c.genesisAccounts[1].keyInfo.GetAddress()
		s.Require().NoError(err)
		walletJSON := fmt.Sprintf(`{"name":"test123","mnemonic":"%s","HDpath":"m/44'/118'/0'/0/","prefix":"gitopia","pathIncrement":0,"accounts":[{"address":"%s","pathIncrement":0}]}`, c.genesisAccounts[1].mnemonic, address.String())
		os.Setenv("GITOPIA_WALLET", walletJSON)

		// Configure git
		gitConfigs := []struct {
			key   string
			value string
		}{
			{"gitopia.tmAddr", "http://localhost:26667"},
			{"gitopia.grpcHost", "localhost:9100"},
			{"gitopia.gitServerHost", "http://localhost:5001"},
			{"gitopia.chainId", c.id},
		}

		for _, config := range gitConfigs {
			cmd := exec.Command("git", "config", "--global", config.key, config.value)
			err := cmd.Run()
			s.Require().NoError(err)
		}

		// Cleanup function to remove git configs
		defer func() {
			for _, config := range gitConfigs {
				cmd := exec.Command("git", "config", "--unset", "--global", config.key)
				_ = cmd.Run()
			}
		}()

		// Create users
		s.execGitopiaCreateUser(c, valIdx, alice.String(), "alice")
		s.execGitopiaCreateUser(c, valIdx, bob.String(), "bob")

		// Create repository
		repoName := "test-repo"
		s.execGitopiaCreateRepository(c, valIdx, alice.String(), repoName)

		// Verify repository creation
		repository, err := queryGitopiaRepository(api, alice.String(), repoName)
		s.Require().NoError(err)
		s.Require().Equal(repoName, repository.Repository.Name)

		// Create and push test content
		tempDir, err := os.MkdirTemp("", "gitopia-test-*")
		s.Require().NoError(err)
		defer os.RemoveAll(tempDir)

		// Initialize git repository
		cmd := exec.Command("git", "init")
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		// Create test file
		testFile := filepath.Join(tempDir, "test.txt")
		err = os.WriteFile(testFile, []byte("test content"), 0644)
		s.Require().NoError(err)

		// Add and commit
		cmd = exec.Command("git", "add", ".")
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		cmd = exec.Command("git", "commit", "-m", "Initial commit")
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		// Add remote and push
		remoteURL := fmt.Sprintf("gitopia://alice/%s", repoName)
		cmd = exec.Command("git", "remote", "add", "origin", remoteURL)
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		cmd = exec.Command("git", "push", "-u", "origin", "master")
		cmd.Dir = tempDir
		cmd.Run()
		s.Require().NoError(err)

		// Push via different git server
		cmd = exec.Command("git", "config", "--global", "gitopia.gitServerHost", "http://localhost:5002")
		err = cmd.Run()
		s.Require().NoError(err)

		// Make new commit
		err = os.WriteFile(testFile, []byte("new content"), 0644)
		s.Require().NoError(err)

		cmd = exec.Command("git", "add", ".")
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		cmd = exec.Command("git", "push", "-u", "origin", "master")
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)
		// Fork repository
		forkRepoName := "forked-repo"
		s.execGitopiaForkRepository(c, valIdx, alice.String(), repoName, forkRepoName, bob.String())

		// Clone forked repository
		tempDir2, err := os.MkdirTemp("", "gitopia-test-*")
		s.Require().NoError(err)
		defer os.RemoveAll(tempDir2)

		cmd = exec.Command("git", "clone", remoteURL, tempDir2)
		cmd.Dir = tempDir2
		err = cmd.Run()
		s.Require().NoError(err)

		// Checkout a new branch and do some changes
		cmd = exec.Command("git", "checkout", "-b", "new-branch")
		cmd.Dir = tempDir2
		err = cmd.Run()
		s.Require().NoError(err)

		// Create a new file and add some content
		newFile := filepath.Join(tempDir2, "new-file.txt")
		err = os.WriteFile(newFile, []byte("new content"), 0644)
		s.Require().NoError(err)

		cmd = exec.Command("git", "add", ".")
		cmd.Dir = tempDir2
		err = cmd.Run()
		s.Require().NoError(err)

		cmd = exec.Command("git", "commit", "-m", "Add new file")
		cmd.Dir = tempDir2
		err = cmd.Run()
		s.Require().NoError(err)

		// Push changes to forked repository
		cmd = exec.Command("git", "push", "origin", "new-branch")
		cmd.Dir = tempDir2
		err = cmd.Run()
		s.Require().NoError(err)

		// Create pull request
		prTitle := "Test PR"
		prDescription := "Test PR description"
		s.execGitopiaCreatePullRequest(
			c,
			valIdx,
			bob.String(),
			prTitle,
			prDescription,
			"master",
			bob.String(),
			forkRepoName,
			"master",
			alice.String(),
			repoName,
			"",
			"",
			"",
			"",
		)

		// Merge pull request
		s.execGitopiaInvokeMergePullRequest(c, valIdx, alice.String(), "1", "1", "gitopia")
	})
}

// Helper function to execute fork repository command
func (s *IntegrationTestSuite) execGitopiaForkRepository(c *chain, valIdx int, ownerId, repoName, forkRepoName, forkOwnerId string) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()

	s.T().Logf("forking repository %s to %s on chain %s", repoName, forkRepoName, c.id)

	gitopiaCommand := []string{
		gitopiadBinary,
		txCommand,
		gitopiatypes.ModuleName,
		"invoke-fork-repository",
		ownerId,
		repoName,
		forkRepoName,
		"forked repository",
		"master",
		forkOwnerId,
		"gitopia1jnq4pk0ene8xne4a43p2a2xpdhf3jqgsgu04n9",
		fmt.Sprintf("--%s=%s", flags.FlagFrom, forkOwnerId),
		fmt.Sprintf("--%s=%s", flags.FlagChainID, c.id),
		fmt.Sprintf("--%s=%s", flags.FlagFees, "2000ulore"),
		"--keyring-backend=test",
		"--output=json",
		"-y",
	}

	s.executeGitopiaTxCommand(ctx, c, gitopiaCommand, valIdx, s.defaultExecValidation(c, valIdx))
}

// Helper function to execute create pull request command
func (s *IntegrationTestSuite) execGitopiaCreatePullRequest(
	c *chain,
	valIdx int,
	creator,
	title,
	description,
	headBranch,
	headId,
	headRepoName,
	baseBranch,
	baseId,
	baseRepoName,
	reviewers,
	assignees,
	labels,
	issueIids string,
) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()

	s.T().Logf("creating pull request from %s to %s on chain %s", headRepoName, baseRepoName, c.id)

	gitopiaCommand := []string{
		gitopiadBinary,
		txCommand,
		gitopiatypes.ModuleName,
		"create-pullRequest",
		title,
		description,
		headBranch,
		headId,
		headRepoName,
		baseBranch,
		baseId,
		baseRepoName,
		reviewers,
		assignees,
		labels,
		issueIids,
		fmt.Sprintf("--%s=%s", flags.FlagFrom, creator),
		fmt.Sprintf("--%s=%s", flags.FlagChainID, c.id),
		fmt.Sprintf("--%s=%s", flags.FlagFees, "2000ulore"),
		"--keyring-backend=test",
		"--output=json",
		"-y",
	}

	s.executeGitopiaTxCommand(ctx, c, gitopiaCommand, valIdx, s.defaultExecValidation(c, valIdx))
}

// Helper function to execute merge pull request command
func (s *IntegrationTestSuite) execGitopiaInvokeMergePullRequest(c *chain, valIdx int, creator, repositoryId, iid, provider string) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()

	s.T().Logf("merging pull request %s on chain %s", iid, c.id)

	gitopiaCommand := []string{
		gitopiadBinary,
		txCommand,
		gitopiatypes.ModuleName,
		"invoke-merge-pullrequest",
		repositoryId,
		iid,
		provider,
		fmt.Sprintf("--%s=%s", flags.FlagFrom, creator),
		fmt.Sprintf("--%s=%s", flags.FlagChainID, c.id),
		fmt.Sprintf("--%s=%s", flags.FlagFees, "2000ulore"),
		"--keyring-backend=test",
		"--output=json",
		"-y",
	}

	s.executeGitopiaTxCommand(ctx, c, gitopiaCommand, valIdx, s.defaultExecValidation(c, valIdx))
}
