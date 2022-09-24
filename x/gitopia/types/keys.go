package types

import "strconv"

const (
	// ModuleName defines the module name
	ModuleName = "gitopia"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route for slashing
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_gitopia"

	// this line is used by starport scaffolding # ibc/keys/name
)

// this line is used by starport scaffolding # ibc/keys/port

func KeyPrefix(p string) []byte {
	return []byte(p)
}

const (
	WhoisKey      = "Whois-value-"
	WhoisCountKey = "Whois-count-"
)

const (
	UserKey      = "User-value-"
	UserDaoKey   = "User-dao-value-"
	UserCountKey = "User-count-"
)

const (
	BaseRepositoryKeyKey = "Base-repository-key-value-"
	RepositoryKey        = "Repository-value-"
	RepositoryCountKey   = "Repository-count-"
)

const (
	IssueKey      = "Issue-value-"
	IssueCountKey = "Issue-count-"
)

const (
	CommentKey      = "Comment-value-"
	CommentCountKey = "Comment-count-"
)

const (
	DaoKey      = "Dao-value-"
	DaoCountKey = "Dao-count-"
)

const (
	PullRequestKey      = "PullRequest-value-"
	PullRequestCountKey = "PullRequest-count-"
)

const (
	ReleaseKey      = "Release-value-"
	ReleaseCountKey = "Release-count-"
)

const (
	InvokeForkRepositoryEventKey         = "InvokeForkRepository"
	ForkRepositoryEventKey               = "ForkRepository"
	InvokeMergePullRequestEventKey       = "InvokeMergePullRequest"
	SetPullRequestStateEventKey          = "SetPullRequestState"
	SetRepositoryBranchEventKey          = "SetRepositoryBranch"
	SetRepositoryTagEventKey             = "SetRepositoryTag"
	MultiSetRepositoryBranchEventKey     = "MultiSetRepositoryBranch"
	MultiSetRepositoryTagEventKey        = "MultiSetRepositoryTag"
	CreateRepositoryEventKey             = "CreateRepository"
	ChangeOwnerEventKey                  = "ChangeOwner"
	RenameRepositoryEventKey             = "RenameRepository"
	UpdateRepositoryDescriptionEventKey  = "UpdateRepositoryDescription"
	UpdateRepositoryCollaboratorEventKey = "UpdateRepositoryCollaborator"
	RemoveRepositoryCollaboratorEventKey = "RemoveRepositoryCollaborator"
	CreateRepositoryLabelEventKey        = "CreateRepositoryLabel"
	UpdateRepositoryLabelEventKey        = "UpdateRepositoryLabel"
	DeleteRepositoryLabelEventKey        = "DeleteRepositoryLabel"
	ToggleRepositoryForkingEventKey      = "ToggleRepositoryForking"
	ToggleArweaveBackupEventKey          = "ToggleArweaveBackup"
	DeleteRepositoryEventKey             = "DeleteRepository"
	CreateIssueEventKey                  = "CreateIssue"
)

const (
	EventAttributeIsGitRefUpdatedKey           = "GitRefUpdated"
	EventAttributeCreatorKey                   = "Creator"
	EventAttributePullRequestIdKey             = "PullRequestId"
	EventAttributePullRequestStateKey          = "PullRequestState"
	EventAttributePullRequestMergeCommitShaKey = "PullRequestMergeCommitSha"
	EventAttributeTaskIdKey                    = "TaskId"
	EventAttributeTaskStateKey                 = "TaskState"
	EventAttributeMessageKey                   = "Message"
	EventAttributeParentRepoId                 = "ParentRepositoryId"
	EventAttributeEnableArweaveBackupKey       = "EnableArweaveBackup"
	EventAttributeCreatedAtKey                 = "CreatedAt"
	EventAttributeUpdatedAtKey                 = "UpdatedAt"
	EventAttributeClosedAtKey                  = "ClosedAt"
)

const (
	EventAttributeRepoNameKey             = "RepositoryName"
	EventAttributeRepoIdKey               = "RepositoryId"
	EventAttributeRepoOwnerIdKey          = "RepositoryOwnerId"
	EventAttributeRepoOwnerTypeKey        = "RepositoryOwnerType"
	EventAttributeRepoCollaboratorKey     = "RepositoryCollaboratorKey"
	EventAttributeRepoLabelIdKey          = "RepositoryLabelId"
	EventAttributeRepoLabelNameKey        = "RepositoryLabelName"
	EventAttributeRepoLabelColorKey       = "RepositoryLabelColor"
	EventAttributeRepoAllowForkingKey     = "RepositoryAllowForking"
	EventAttributeRepoEnableArweaveBackup = "RepositoryEnableArweaveBackup"
	EventAttributeForkRepoOwnerIdKey      = "ForkRepositoryOwnerId"
)

const (
	EventAttributeIssueIdKey        = "IssueId"
	EventAttributeIssueIIdKey       = "IssueIId"
	EventAttributeIssueTitleKey     = "IssueTitle"
	EventAttributeIssueStateKey     = "IssueState"
	EventAttributeIssueAssigneesKey = "IssueAssignees"
	EventAttributeIssueLablesKey    = "IssueLabels"
)

const (
	TaskKey      = "Task-value-"
	TaskCountKey = "Task-count-"
)

const (
	StorageProviderKey      = "StorageProvider-value-"
	StorageProviderCountKey = "StorageProvider-count-"
)

const (
	BranchKey      = "Branch-value-"
	BranchCountKey = "Branch-count-"
)

const (
	TagKey      = "Tag-value-"
	TagCountKey = "Tag-count-"
)

const (
	MemberKey      = "Member-value-"
	MemberCountKey = "Member-count-"
)

// GetRepositoryKeyForAddress returns Key from address
func GetRepositoryKeyForAddress(address string) string {
	return RepositoryKey + address + "-"
}

// GetBranchKeyFromRepositoryId returns Key from repository-id
func GetBranchKeyForRepositoryId(repositoryId uint64) string {
	return BranchKey + strconv.FormatUint(repositoryId, 10) + "-"
}

// GetTagKeyForRepositoryId returns Key from repository-id
func GetTagKeyForRepositoryId(repositoryId uint64) string {
	return TagKey + strconv.FormatUint(repositoryId, 10) + "-"
}

// GetMemberKeyForDaoAddress returns Key from dao-address
func GetMemberKeyForDaoAddress(daoAddress string) string {
	return MemberKey + daoAddress + "-"
}

// GetDaoKeyForUserAddress returns Key from dao-address
func GetUserDaoKeyForUserAddress(userAddress string) string {
	return UserDaoKey + userAddress + "-"
}
