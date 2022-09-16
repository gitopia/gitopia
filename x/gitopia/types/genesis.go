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
		// this line is used by starport scaffolding # genesis/types/default
		TaskList:              []Task{},
		BranchList:            []Branch{},
		TagList:               []Tag{},
		MemberList:            []Member{},
		ReleaseList:           []Release{},
		PullRequestList:       []PullRequest{},
		DaoList:               []Dao{},
		CommentList:           []Comment{},
		IssueList:             []Issue{},
		RepositoryList:        []Repository{},
		BaseRepositoryKeyList: []BaseRepositoryKey{},
		UserList:              []User{},
		UserDaoList:           []UserDao{},
		WhoisList:             []Whois{},
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
	// Check for duplicated ID in branch
	branchIdMap := make(map[uint64]bool)
	branchMap := make(map[string]bool)
	branchCount := gs.GetBranchCount()
	for _, elem := range gs.BranchList {
		if _, ok := branchIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for branch")
		}
		if elem.Id >= branchCount {
			return fmt.Errorf("branch id should be lower or equal than the last id")
		}
		k := fmt.Sprintf("%v", elem.RepositoryId) + elem.Name
		if _, ok := branchMap[k]; ok {
			return fmt.Errorf("duplicated branch")
		}
		branchMap[k] = true
		branchIdMap[elem.Id] = true
	}
	// Check for duplicated ID in tag
	tagIdMap := make(map[uint64]bool)
	tagMap := make(map[string]bool)
	tagCount := gs.GetTagCount()
	for _, elem := range gs.TagList {
		if _, ok := tagIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for tag")
		}
		if elem.Id >= tagCount {
			return fmt.Errorf("tag id should be lower or equal than the last id")
		}
		k := fmt.Sprintf("%v", elem.RepositoryId) + elem.Name
		if _, ok := tagMap[k]; ok {
			return fmt.Errorf("duplicated tag")
		}
		tagMap[k] = true
		tagIdMap[elem.Id] = true
	}
	// Check for duplicated ID in member
	memberMap := make(map[string]bool)
	memberIdMap := make(map[uint64]bool)
	memberCount := gs.GetMemberCount()
	for _, elem := range gs.MemberList {
		k := elem.Address + elem.DaoAddress
		if _, ok := memberMap[k]; ok {
			return fmt.Errorf("duplicated member")
		}
		if _, ok := memberIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for member")
		}
		if elem.Id >= memberCount {
			return fmt.Errorf("member id should be lower or equal than the last id")
		}
		memberMap[k] = false
		memberIdMap[elem.Id] = true
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
	// Check for duplicated ID in dao
	daoIdMap := make(map[uint64]bool)
	daoCount := gs.GetDaoCount()

	for _, elem := range gs.DaoList {
		if _, ok := daoIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for dao")
		}
		if elem.Id >= daoCount {
			return fmt.Errorf("dao id should be lower or equal than the last id")
		}
		daoIdMap[elem.Id] = true
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
	repositoryMap := make(map[string]uint64)
	repositoryCount := gs.GetRepositoryCount()

	for _, elem := range gs.RepositoryList {
		if _, ok := repositoryIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for repository")
		}
		k := elem.Owner.Id + elem.Name
		if _, ok := repositoryMap[k]; ok {
			return fmt.Errorf("duplicated repository")
		}
		if elem.Id >= repositoryCount {
			return fmt.Errorf("repository id should be lower or equal than the last id")
		}
		repositoryMap[k] = elem.Id
		repositoryIdMap[elem.Id] = true
	}

	for _, elem := range gs.BaseRepositoryKeyList {
		k := elem.Address + elem.Name
		id, found := repositoryMap[k]
		if !found {
			return fmt.Errorf("missing baseRepositoryKey")
		}
		if id != elem.Id {
			return fmt.Errorf("mismatch baseRepositoryKey id")
		}
	}

	for _, elem := range gs.UserDaoList {
		k := elem.UserAddress + elem.DaoAddress
		visited, ok := memberMap[k]
		if !ok {
			return fmt.Errorf("missing userDao entry")
		}
		if visited {
			return fmt.Errorf("duplicated userDao entry")
		}
		memberMap[k] = true
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
