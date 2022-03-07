package types

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
	UserCountKey = "User-count-"
)

const (
	RepositoryKey      = "Repository-value-"
	RepositoryCountKey = "Repository-count-"
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
	OrganizationKey      = "Organization-value-"
	OrganizationCountKey = "Organization-count-"
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
	InvokeForkRepositoryEventKey               = "InvokeForkRepository"
	ForkRepositoryEventKey                     = "ForkRepository"
	InvokeMergePullRequestEventKey             = "InvokeMergePullRequest"
	SetPullRequestStateEventKey                = "SetPullRequestState"
	EventAttributeCreatorKey                   = "Creator"
	EventAttributeRepoNameKey                  = "RepositoryName"
	EventAttributeRepoIdKey                    = "RepositoryId"
	EventAttributeStorageProviderKey           = "StorageProvider"
	EventAttributeOwnerIdKey                   = "OwnerId"
	EventAttributeOwnerTypeKey                 = "OwnerType"
	EventAttributePullRequestIdKey             = "PullRequestId"
	EventAttributePullRequestStateKey          = "PullRequestState"
	EventAttributePullRequestMergeCommitShaKey = "PullRequestMergeCommitSha"
	EventAttributeTaskIdKey                    = "TaskId"
	EventAttributeTaskStateKey                 = "TaskState"
	EventAttributeMessageKey                   = "Message"
	EventAttributeParentRepoId                 = "ParentRepositoryId"
)

const (
	TaskKey      = "Task-value-"
	TaskCountKey = "Task-count-"
)
