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
	CreateUserEventKey         = "CreateUser"
	UpdateUserUsernameEventKey = "UpdateUserUsername"
	UpdateUserNameEventKey     = "UpdateUserName"
	UpdateUserBioEventKey      = "UpdateUserBio"
	UpdateUserAvatarEventKey   = "UpdateUserAvatar"
	DeleteUserEventKey         = "DeleteUser"
)

const (
	CreateDaoEventKey            = "CreateDao"
	RenameDaoEventKey            = "RenameDao"
	UpdateDaoDescriptionEventKey = "UpdateDaoDescription"
	UpdateDaoWebsiteEventKey     = "UpdateDaoWebsite"
	UpdateDaoLocationEventKey    = "UpdateDaoLocation"
	UpdateDaoAvatarEventKey      = "UpdateDaoAvatar"
	DeleteDaoEventKey            = "DeleteDao"
)

const (
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
	InvokeForkRepositoryEventKey         = "InvokeForkRepository"
	ForkRepositoryEventKey               = "ForkRepository"
	SetRepositoryBranchEventKey          = "SetRepositoryBranch"
	SetRepositoryTagEventKey             = "SetRepositoryTag"
	MultiSetRepositoryBranchEventKey     = "MultiSetRepositoryBranch"
	MultiSetRepositoryTagEventKey        = "MultiSetRepositoryTag"
	SetRepositoryDefaultBranchEventKey   = "SetRepositoryDefaultBranch"
	DeleteRepositoryBranchEventKey       = "DeleteRepositoryBranch"
	MultiDeleteRepositoryBranchEventKey  = "MultiDeleteRepositoryBranch"
	DeleteRepositoryTagEventKey          = "DeleteRepositoryTag"
	MultiDeleteRepositoryTagEventKey     = "MultiDeleteRepositoryTag"
)

const (
	CreateIssueEventKey            = "CreateIssue"
	UpdateIssueTitleEventKey       = "UpdateIssueTitle"
	UpdateIssueDescriptionEventKey = "UpdateIssueDescription"
	ToggleIssueStateEventKey       = "ToggleIssueState"
	AddIssueAssigneesEventKey      = "AddIssueAssignees"
	RemoveIssueAssigneesEventKey   = "RemoveIssueAssignees"
	AddIssueLabelsEventKey         = "AddIssueLabels"
	RemoveIssueLabelsEventKey      = "RemoveIssueLabels"
	DeleteIssueEventKey            = "DeleteIssue"
)

const (
	CreatePullRequestEventKey            = "CreatePullRequest"
	UpdatePullRequestTitleEventKey       = "UpdatePullRequestTitle"
	UpdatePullRequestDescriptionEventKey = "UpdatePullRequestDescription"
	InvokeMergePullRequestEventKey       = "InvokeMergePullRequest"
	SetPullRequestStateEventKey          = "SetPullRequestState"
	AddPullRequestReviewersEventKey      = "AddPullRequestReviewers"
	RemovePullRequestReviewersEventKey   = "RemovePullRequestReviewers"
	AddPullRequestAssigneesEventKey      = "AddPullRequestAssignees"
	RemovePullRequestAssigneesEventKey   = "RemovePullRequestAssignees"
	AddPullRequestLabelsEventKey         = "AddPullRequestLabels"
	RemovePullRequestLabelsEventKey      = "RemovePullRequestLabels"
	DeletePullRequestEventKey            = "DeletePullRequest"
)

const (
	CreateReleaseEventKey = "CreateRelease"
	UpdateReleaseEventKey = "UpdateRelease"
	DeleteReleaseEventKey = "DeleteRelease"
)

const (
	EventAttributeIsGitRefUpdatedKey = "GitRefUpdated"
	EventAttributeCreatorKey         = "Creator"
	EventAttributeTaskIdKey          = "TaskId"
	EventAttributeTaskStateKey       = "TaskState"
	EventAttributeMessageKey         = "Message"
	EventAttributeParentRepoId       = "ParentRepositoryId"
	EventAttributeCreatedAtKey       = "CreatedAt"
	EventAttributeUpdatedAtKey       = "UpdatedAt"
	EventAttributeClosedAtKey        = "ClosedAt"
	EventAttributePublishedAtKey     = "PublishedAt"
	EventAttributeAssigneesKey       = "Assignees"
	EventAttributeLabelsKey          = "Labels"
)

const (
	EventAttributeUserIdKey       = "UserId"
	EventAttributeUserUsernameKey = "UserUsername"
	EventAttributeUserNameKey     = "UserName"
)

const (
	EventAttributeDaoIdKey      = "DaoId"
	EventAttributeDaoAddressKey = "DaoAddress"
	EventAttributeDaoNameKey    = "DaoName"
)

const (
	EventAttributeRepoNameKey                = "RepositoryName"
	EventAttributeRepoIdKey                  = "RepositoryId"
	EventAttributeRepoOwnerIdKey             = "RepositoryOwnerId"
	EventAttributeRepoOwnerTypeKey           = "RepositoryOwnerType"
	EventAttributeRepoCollaboratorKey        = "RepositoryCollaboratorKey"
	EventAttributeRepoLabelIdKey             = "RepositoryLabelId"
	EventAttributeRepoLabelNameKey           = "RepositoryLabelName"
	EventAttributeRepoLabelColorKey          = "RepositoryLabelColor"
	EventAttributeRepoAllowForkingKey        = "RepositoryAllowForking"
	EventAttributeRepoEnableArweaveBackupKey = "RepositoryEnableArweaveBackup"
	EventAttributeForkRepoOwnerIdKey         = "ForkRepositoryOwnerId"
	EventAttributeRepoBranchKey              = "RepositoryBranch"
	EventAttributeRepoTagKey                 = "RepositoryTag"
	EventAttributeRepoDefaultBranchKey       = "RepositoryDefaultBranch"
)

const (
	EventAttributeIssueIdKey    = "IssueId"
	EventAttributeIssueIidKey   = "IssueIid"
	EventAttributeIssueTitleKey = "IssueTitle"
	EventAttributeIssueStateKey = "IssueState"
	EventAttributeClosedByKey   = "ClosedBy"
)

const (
	EventAttributePullRequestIdKey             = "PullRequestId"
	EventAttributePullRequestStateKey          = "PullRequestState"
	EventAttributePullRequestIidKey            = "PullRequestIid"
	EventAttributePullRequestTitleKey          = "PullRequestTitle"
	EventAttributePullRequestDraftKey          = "PullRequestDraft"
	EventAttributePullRequestHeadKey           = "PullRequestHead"
	EventAttributePullRequestBaseKey           = "PullRequestBase"
	EventAttributePullRequestMergeCommitShaKey = "PullRequestMergeCommitSha"
	EventAttributePullRequestMergedByKey       = "PullRequestMergedBy"
	EventAttributePullRequestMergedAtKey       = "PullRequestMergedAt"
	EventAttributePullRequestReviewersKey      = "PullRequestReviewers"
)

const (
	EventAttributeReleaseIdKey         = "ReleaseId"
	EventAttributeReleaseTagNameKey    = "ReleaseTagName"
	EventAttributeReleaseNameKey       = "ReleaseName"
	EventAttributeReleaseDraftKey      = "ReleaseDraft"
	EventAttributeReleasePreReleaseKey = "ReleasePreRelease"
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
