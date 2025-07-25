package e2e

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"time"

	"github.com/cosmos/cosmos-sdk/client/flags"
	gitopiatypes "github.com/gitopia/gitopia/v6/x/gitopia/types"
)

type PinataListResponse struct {
	Data struct {
		Files []struct {
			ID            string      `json:"id"`
			Name          string      `json:"name"`
			Cid           string      `json:"cid"`
			Size          int         `json:"size"`
			NumberOfFiles int         `json:"number_of_files"`
			MimeType      string      `json:"mime_type"`
			GroupID       interface{} `json:"group_id"`
			KeyValues     interface{} `json:"keyvalues"`
			CreatedAt     string      `json:"created_at"`
		} `json:"files"`
		NextPageToken string `json:"next_page_token"`
	} `json:"data"`
}

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
		aliceWalletJSON := fmt.Sprintf(`{"name":"test123","mnemonic":"%s","HDpath":"m/44'/118'/0'/0/","prefix":"gitopia","pathIncrement":0,"accounts":[{"address":"%s","pathIncrement":0}]}`, c.genesisAccounts[1].mnemonic, alice.String())
		bobWalletJSON := fmt.Sprintf(`{"name":"test123","mnemonic":"%s","HDpath":"m/44'/118'/0'/0/","prefix":"gitopia","pathIncrement":0,"accounts":[{"address":"%s","pathIncrement":0}]}`, c.genesisAccounts[2].mnemonic, bob.String())
		os.Setenv("GITOPIA_WALLET", aliceWalletJSON)

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

		// Clone Gitopia repository
		cmd := exec.Command("git", "clone", "https://github.com/gitopia/gitopia.git", tempDir)
		err = cmd.Run()
		s.Require().NoError(err)

		// Use README.md as our test file
		testFile := filepath.Join(tempDir, "README.md")
		content, err := os.ReadFile(testFile)
		s.Require().NoError(err)
		err = os.WriteFile(testFile, append(content, []byte("\nnew content")...), 0644)
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
		cmd = exec.Command("git", "remote", "add", "gitopia", remoteURL)
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		cmd = exec.Command("git", "push", "-u", "gitopia", "master")
		cmd.Dir = tempDir
		cmd.Run()
		s.Require().NoError(err)

		// query packfile
		packfile, err := queryGitopiaRepositoryPackfile(api, 0)
		s.T().Logf("packfile: %+v", packfile)
		s.Require().NoError(err)
		s.Require().NotEmpty(packfile.Packfile.Cid)
		s.Require().Greater(packfile.Packfile.Size_, uint64(0))

		// Push via different git server
		cmd = exec.Command("git", "config", "--global", "gitopia.gitServerHost", "http://localhost:5002")
		err = cmd.Run()
		s.Require().NoError(err)

		// Append new content to test.txt
		err = os.WriteFile(testFile, []byte("test content\nnew content"), 0644)
		s.Require().NoError(err)

		cmd = exec.Command("git", "add", ".")
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		cmd = exec.Command("git", "commit", "-m", "New commit")
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		cmd = exec.Command("git", "push", "-u", "gitopia", "master")
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		// query updated packfile and check if cid is different
		newPackfile, err := queryGitopiaRepositoryPackfile(api, 0)
		s.T().Logf("new packfile: %+v", newPackfile)
		s.Require().NoError(err)
		s.Require().NotEmpty(newPackfile.Packfile.Cid)
		s.Require().Greater(newPackfile.Packfile.Size_, uint64(0))
		s.Require().NotEqual(packfile.Packfile.Size_, newPackfile.Packfile.Size_)
		s.Require().NotEqual(packfile.Packfile.RootHash, newPackfile.Packfile.RootHash)
		s.Require().NotEqual(packfile.Packfile.Name, newPackfile.Packfile.Name)
		s.Require().NotEqual(packfile.Packfile.Cid, newPackfile.Packfile.Cid)

		// sleep 5 seconds
		time.Sleep(5 * time.Second)

		// Toggle repository forking
		s.execGitopiaToggleRepositoryForking(c, valIdx, alice.String(), "alice", repoName)

		// Fork repository using bob
		forkRepoName := "forked-repo"
		s.execGitopiaForkRepository(c, valIdx, bob.String(), "alice", repoName, forkRepoName, "forked repository", "master", "bob")

		// Clone forked repository
		tempDir2, err := os.MkdirTemp("", "gitopia-test-*")
		s.Require().NoError(err)
		defer os.RemoveAll(tempDir2)

		// Set bob's wallet
		os.Setenv("GITOPIA_WALLET", bobWalletJSON)

		forkRemoteURL := fmt.Sprintf("gitopia://bob/%s", forkRepoName)
		cmd = exec.Command("git", "clone", forkRemoteURL, tempDir2)
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

		// query packfile
		packfile, err = queryGitopiaRepositoryPackfile(api, 1)
		s.T().Logf("packfile of forked repository: %+v", packfile)
		s.Require().NoError(err)
		s.Require().NotEmpty(packfile.Packfile.Cid)
		s.Require().Greater(packfile.Packfile.Size_, uint64(0))

		// Sleep 5 seconds
		time.Sleep(5 * time.Second)

		// Create pull request
		prTitle := "Test PR"
		prDescription := "Test PR description"
		s.execGitopiaCreatePullRequest(
			c,
			valIdx,
			bob.String(),
			prTitle,
			prDescription,
			"new-branch",
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
		s.execGitopiaInvokeMergePullRequest(c, valIdx, alice.String(), "0", "1", "gitopia1yp9um722xlywmjc0mc0x9jv06vw9t7l4lkgj8v")

		// query packfile
		packfile, err = queryGitopiaRepositoryPackfile(api, 0)
		s.T().Logf("packfile after merge: %+v", packfile)
		s.Require().NoError(err)
		s.Require().NotEqual(packfile.Packfile.Name, newPackfile.Packfile.Name)
		s.Require().NotEqual(packfile.Packfile.Cid, newPackfile.Packfile.Cid)
		s.Require().NotEqual(packfile.Packfile.RootHash, newPackfile.Packfile.RootHash)
		s.Require().NotEqual(packfile.Packfile.Size_, newPackfile.Packfile.Size_)
		s.Require().Greater(packfile.Packfile.Size_, uint64(0))

		// Sleep 5 seconds to allow time for file upload
		time.Sleep(5 * time.Second)

		// List files to verify upload
		req, err := http.NewRequest("GET", fmt.Sprintf("https://api.pinata.cloud/v3/files/public?name=%s", packfile.Packfile.Name), nil)
		s.Require().NoError(err)

		req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", os.Getenv("PINATA_JWT")))

		resp, err := http.DefaultClient.Do(req)
		s.Require().NoError(err)
		defer resp.Body.Close()

		s.Require().Equal(http.StatusOK, resp.StatusCode)

		var listResp PinataListResponse
		err = json.NewDecoder(resp.Body).Decode(&listResp)
		s.Require().NoError(err)

		s.T().Logf("listResp: %+v", listResp)

		// Verify file exists in Pinata
		s.Require().Greater(len(listResp.Data.Files), 0)
		s.Require().Equal(packfile.Packfile.Name, listResp.Data.Files[0].Name)
		s.Require().NotEmpty(listResp.Data.Files[0].Cid)

		// Set alice's wallet
		os.Setenv("GITOPIA_WALLET", aliceWalletJSON)

		// Pull the latest changes
		cmd = exec.Command("git", "pull", "gitopia", "master")
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		// check test.txt content
		testFile = filepath.Join(tempDir, "README.md")
		content, err = os.ReadFile(testFile)
		s.Require().NoError(err)
		s.Require().Contains(string(content), "new content")

		// check new-file.txt content
		newFile = filepath.Join(tempDir, "new-file.txt")
		err = os.WriteFile(newFile, []byte("new content"), 0644)
		s.Require().NoError(err)

		// Create tag
		cmd = exec.Command("git", "tag", "v1.0.0")
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		// Push tag
		cmd = exec.Command("git", "push", "gitopia", "v1.0.0")
		cmd.Dir = tempDir
		err = cmd.Run()
		s.Require().NoError(err)

		// Test uploading attachment
		s.T().Log("Testing release asset upload")

		// Create test release assets to upload
		testFile = filepath.Join(tempDir2, "test-release-asset.txt")
		err = os.WriteFile(testFile, []byte("test release asset content"), 0644)
		s.Require().NoError(err)

		// Create multipart form with file
		file, err := os.Open(testFile)
		s.Require().NoError(err)
		defer file.Close()

		body := &bytes.Buffer{}
		writer := multipart.NewWriter(body)
		part, err := writer.CreateFormFile("file", filepath.Base(testFile))
		s.Require().NoError(err)

		_, err = io.Copy(part, file)
		s.Require().NoError(err)
		writer.Close()

		// Make request to upload endpoint
		req, err = http.NewRequest("POST", "http://localhost:5002/upload", body)
		s.Require().NoError(err)
		req.Header.Set("Content-Type", writer.FormDataContentType())

		client := &http.Client{}
		resp, err = client.Do(req)
		s.Require().NoError(err)
		defer resp.Body.Close()

		s.Require().Equal(http.StatusOK, resp.StatusCode)

		// Parse response
		var uploadResp struct {
			Sha  string `json:"sha"`
			Size int64  `json:"size"`
		}
		err = json.NewDecoder(resp.Body).Decode(&uploadResp)
		s.Require().NoError(err)

		s.T().Logf("Uploaded file with sha: %s and size: %d", uploadResp.Sha, uploadResp.Size)
		s.Require().NotEmpty(uploadResp.Sha)
		s.Require().Greater(uploadResp.Size, int64(0))

		attachments := []gitopiatypes.Attachment{{
			Sha:      uploadResp.Sha,
			Size_:    uint64(uploadResp.Size),
			Uploader: bob.String(),
			Name:     "test-release-asset.txt",
		}}

		attachmentsJSON, _ := json.Marshal(attachments)

		// sleep 5 seconds
		time.Sleep(5 * time.Second)

		// Create release
		s.execGitopiaCreateRelease(
			c,
			valIdx,
			alice.String(),
			alice.String(),
			repoName,
			"v1.0.0",
			"master",
			"test release",
			"test release description",
			string(attachmentsJSON),
			false,
			false,
			false,
			"gitopia1yp9um722xlywmjc0mc0x9jv06vw9t7l4lkgj8v",
		)

		// query release asset
		releaseAsset, err := queryGitopiaRepositoryReleaseAsset(api, 0, "v1.0.0", "test-release-asset.txt")
		s.Require().NoError(err)
		s.Require().NotEmpty(releaseAsset.ReleaseAsset.Cid)
		s.Require().Greater(releaseAsset.ReleaseAsset.Size_, uint64(0))

		// check if release asset is stored in pinata
		name := fmt.Sprintf("release-%d-%s-%s-%s", releaseAsset.ReleaseAsset.RepositoryId, releaseAsset.ReleaseAsset.Tag, releaseAsset.ReleaseAsset.Name, releaseAsset.ReleaseAsset.Sha256)
		req, err = http.NewRequest("GET", fmt.Sprintf("https://api.pinata.cloud/v3/files/public?name=%s", name), nil)
		s.Require().NoError(err)
		req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", os.Getenv("PINATA_JWT")))
		resp, err = http.DefaultClient.Do(req)
		s.Require().NoError(err)
		defer resp.Body.Close()
		s.Require().Equal(http.StatusOK, resp.StatusCode)

		var listResp2 PinataListResponse
		err = json.NewDecoder(resp.Body).Decode(&listResp2)
		s.Require().NoError(err)

		s.T().Logf("listResp: %+v", listResp2)
		s.Require().Greater(len(listResp2.Data.Files), 0)
		s.Require().Equal(name, listResp2.Data.Files[0].Name)
		s.Require().NotEmpty(listResp2.Data.Files[0].Cid)
	})
}

// Helper function to execute fork repository command
func (s *IntegrationTestSuite) execGitopiaForkRepository(
	c *chain,
	valIdx int,
	creator,
	ownerId,
	repoName,
	forkRepoName,
	forkRepoDescription,
	branch,
	forkOwnerId string,
) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()

	s.T().Logf("forking repository %s/%s to %s/%s on chain %s", ownerId, repoName, forkOwnerId, forkRepoName, c.id)

	gitopiaCommand := []string{
		gitopiadBinary,
		txCommand,
		gitopiatypes.ModuleName,
		"fork-repository",
		ownerId,
		repoName,
		forkRepoName,
		forkRepoDescription,
		branch,
		forkOwnerId,
		fmt.Sprintf("--%s=%s", flags.FlagFrom, creator),
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

// Helper function to execute toggle repository forking command
func (s *IntegrationTestSuite) execGitopiaToggleRepositoryForking(c *chain, valIdx int, creator, id, repositoryName string) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()

	s.T().Logf("toggling repository forking for %s/%s on chain %s", id, repositoryName, c.id)

	gitopiaCommand := []string{
		gitopiadBinary,
		txCommand,
		gitopiatypes.ModuleName,
		"toggle-repository-forking",
		id,
		repositoryName,
		fmt.Sprintf("--%s=%s", flags.FlagFrom, creator),
		fmt.Sprintf("--%s=%s", flags.FlagChainID, c.id),
		fmt.Sprintf("--%s=%s", flags.FlagFees, "2000ulore"),
		"--keyring-backend=test",
		"--output=json",
		"-y",
	}

	s.executeGitopiaTxCommand(ctx, c, gitopiaCommand, valIdx, s.defaultExecValidation(c, valIdx))
}

// Helper function to execute create release command
func (s *IntegrationTestSuite) execGitopiaCreateRelease(
	c *chain,
	valIdx int,
	creator,
	ownerId,
	repoName,
	tagName,
	target,
	name,
	description,
	attachments string,
	draft,
	preRelease,
	isTag bool,
	provider string,
) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()

	s.T().Logf("creating release %s for repository %s/%s on chain %s", tagName, ownerId, repoName, c.id)

	gitopiaCommand := []string{
		gitopiadBinary,
		txCommand,
		gitopiatypes.ModuleName,
		"create-release",
		ownerId,
		repoName,
		tagName,
		target,
		name,
		description,
		attachments,
		strconv.FormatBool(draft),
		strconv.FormatBool(preRelease),
		strconv.FormatBool(isTag),
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
