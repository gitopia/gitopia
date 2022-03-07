package types

import (
	"fmt"
	// this line is used by starport scaffolding # ibc/genesistype/import
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		// this line is used by starport scaffolding # ibc/genesistype/default
		TaskList: []Task{},
		// this line is used by starport scaffolding # genesis/types/default
		ReleaseList:      []Release{},
		PullRequestList:  []PullRequest{},
		OrganizationList: []Organization{},
		CommentList:      []Comment{},
		IssueList:        []Issue{},
		RepositoryList:   []Repository{},
		UserList:         []User{},
		WhoisList:        []Whois{},
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// this line is used by starport scaffolding # ibc/genesistype/validate

	// Check for duplicated ID in task
	taskIdMap := make(map[uint64]bool)
	taskCount := gs.GetTaskCount()
	for _, elem := range gs.TaskList {
		if _, ok := taskIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for task")
		}
		if elem.Id >= taskCount {
			return fmt.Errorf("task id should be lower or equal than the last id")
		}
		taskIdMap[elem.Id] = true
	}
	// this line is used by starport scaffolding # genesis/types/validate
	// Check for duplicated ID in release
	releaseIdMap := make(map[uint64]bool)
	releaseCount := gs.GetReleaseCount()

	for _, elem := range gs.ReleaseList {
		if _, ok := releaseIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for release")
		}
		if elem.Id >= releaseCount {
			return fmt.Errorf("release id should be lower or equal than the last id")
		}
		releaseIdMap[elem.Id] = true
	}
	// Check for duplicated ID in pullRequest
	pullRequestIdMap := make(map[uint64]bool)
	pullRequestCount := gs.GetPullRequestCount()

	for _, elem := range gs.PullRequestList {
		if _, ok := pullRequestIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for pullRequest")
		}
		if elem.Id >= pullRequestCount {
			return fmt.Errorf("pullRequest id should be lower or equal than the last id")
		}
		pullRequestIdMap[elem.Id] = true
	}
	// Check for duplicated ID in organization
	organizationIdMap := make(map[uint64]bool)
	organizationCount := gs.GetOrganizationCount()

	for _, elem := range gs.OrganizationList {
		if _, ok := organizationIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for organization")
		}
		if elem.Id >= organizationCount {
			return fmt.Errorf("organizaton id should be lower or equal than the last id")
		}
		organizationIdMap[elem.Id] = true
	}
	// Check for duplicated ID in comment
	commentIdMap := make(map[uint64]bool)
	commentCount := gs.GetCommentCount()

	for _, elem := range gs.CommentList {
		if _, ok := commentIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for comment")
		}
		if elem.Id >= commentCount {
			return fmt.Errorf("comment id should be lower or equal than the last id")
		}
		commentIdMap[elem.Id] = true
	}
	// Check for duplicated ID in issue
	issueIdMap := make(map[uint64]bool)
	issueCount := gs.GetIssueCount()

	for _, elem := range gs.IssueList {
		if _, ok := issueIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for issue")
		}
		if elem.Id >= issueCount {
			return fmt.Errorf("issue id should be lower or equal than the last id")
		}
		issueIdMap[elem.Id] = true
	}
	// Check for duplicated ID in repository
	repositoryIdMap := make(map[uint64]bool)
	repositoryCount := gs.GetRepositoryCount()

	for _, elem := range gs.RepositoryList {
		if _, ok := repositoryIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for repository")
		}
		if elem.Id >= repositoryCount {
			return fmt.Errorf("repository id should be lower or equal than the last id")
		}
		repositoryIdMap[elem.Id] = true
	}
	// Check for duplicated ID in user
	userIdMap := make(map[string]bool)
	userCount := gs.GetUserCount()

	for _, elem := range gs.UserList {
		if _, ok := userIdMap[elem.Creator]; ok {
			return fmt.Errorf("duplicated id for user")
		}
		if elem.Id >= userCount {
			return fmt.Errorf("user id should be lower or equal than the last id")
		}
		userIdMap[elem.Creator] = true
	}
	// Check for duplicated ID in whois
	whoisNameMap := make(map[string]bool)

	for _, elem := range gs.WhoisList {
		if _, ok := whoisNameMap[elem.Name]; ok {
			return fmt.Errorf("duplicated id for whois")
		}
		whoisNameMap[elem.Name] = true
	}

	return nil
}
