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

	MinterAccountName                     = "minter"
	TeamAccountName                       = "team"
	LiquidityBootstrappingPoolAccountName = "liquiditybootstrappingpool"
	EcosystemIncentivesAccountName        = "ecosystemincentives"
	CommunityPoolGenesisAccountName       = "communitypoolgenesis"
	PlatformAccountName                   = "platform"

	// this line is used by starport scaffolding # ibc/keys/name
)

// this line is used by starport scaffolding # ibc/keys/port

var (
	ParamsKey = []byte{0x00}
)

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
	CreateUserEventKey                   = "CreateUser"
	UpdateUserUsernameEventKey           = "UpdateUserUsername"
	UpdateUserNameEventKey               = "UpdateUserName"
	UpdateUserBioEventKey                = "UpdateUserBio"
	UpdateUserAvatarEventKey             = "UpdateUserAvatar"
	DeleteUserEventKey                   = "DeleteUser"
	UpdateUserPinnedRepositoriesEventKey = "UpdateUserPinnedRepositories"
)

const (
	CreateDaoEventKey                   = "CreateDao"
	RenameDaoEventKey                   = "RenameDao"
	UpdateDaoDescriptionEventKey        = "UpdateDaoDescription"
	UpdateDaoWebsiteEventKey            = "UpdateDaoWebsite"
	UpdateDaoLocationEventKey           = "UpdateDaoLocation"
	UpdateDaoAvatarEventKey             = "UpdateDaoAvatar"
	UpdateDaoMetadataEventKey           = "UpdateDaoMetadata"
	DeleteDaoEventKey                   = "DeleteDao"
	UpdateDaoPinnedRepositoriesEventKey = "UpdateDaoPinnedRepositories"
	DaoTreasurySpendEventKey            = "DaoTreasurySpend"
	UpdateDaoConfigEventKey             = "UpdateDaoConfig"
	DaoCreateReleaseEventKey            = "DaoCreateRelease"
)

const (
	CreateRepositoryEventKey                = "CreateRepository"
	ChangeOwnerEventKey                     = "ChangeOwner"
	RenameRepositoryEventKey                = "RenameRepository"
	UpdateRepositoryDescriptionEventKey     = "UpdateRepositoryDescription"
	ToggleRepositoryArchivedEventKey        = "ToggleRepositoryArchived"
	UpdateRepositoryCollaboratorEventKey    = "UpdateRepositoryCollaborator"
	UpdateDaoRepositoryCollaboratorEventKey = "UpdateDaoRepositoryCollaborator"
	RemoveRepositoryCollaboratorEventKey    = "RemoveRepositoryCollaborator"
	RemoveDaoRepositoryCollaboratorEventKey = "RemoveDaoRepositoryCollaborator"
	CreateRepositoryLabelEventKey           = "CreateRepositoryLabel"
	UpdateRepositoryLabelEventKey           = "UpdateRepositoryLabel"
	DeleteRepositoryLabelEventKey           = "DeleteRepositoryLabel"
	ToggleRepositoryForkingEventKey         = "ToggleRepositoryForking"
	ToggleArweaveBackupEventKey             = "ToggleArweaveBackup"
	DeleteRepositoryEventKey                = "DeleteRepository"
	ForkRepositoryEventKey                  = "ForkRepository"
	ForkRepositorySuccessEventKey           = "ForkRepositorySuccess"
	SetRepositoryBranchEventKey             = "SetRepositoryBranch"
	SetRepositoryTagEventKey                = "SetRepositoryTag"
	MultiSetRepositoryBranchEventKey        = "MultiSetRepositoryBranch"
	MultiSetRepositoryTagEventKey           = "MultiSetRepositoryTag"
	SetRepositoryDefaultBranchEventKey      = "SetRepositoryDefaultBranch"
	DeleteRepositoryBranchEventKey          = "DeleteRepositoryBranch"
	MultiDeleteRepositoryBranchEventKey     = "MultiDeleteRepositoryBranch"
	DeleteRepositoryTagEventKey             = "DeleteRepositoryTag"
	MultiDeleteRepositoryTagEventKey        = "MultiDeleteRepositoryTag"
	ToggleForcePushToBranchEventKey         = "ToggleForcePushToBranch"
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
	CreateCommentEventKey         = "CreateComment"
	UpdateCommentEventKey         = "UpdateComment"
	DeleteCommentEventKey         = "DeleteComment"
	ToggleCommentResolvedEventKey = "ToggleCommentResolved"
)

const (
	CreatePullRequestEventKey            = "CreatePullRequest"
	UpdatePullRequestTitleEventKey       = "UpdatePullRequestTitle"
	UpdatePullRequestDescriptionEventKey = "UpdatePullRequestDescription"
	InvokeMergePullRequestEventKey       = "InvokeMergePullRequest"
	InvokeDaoMergePullRequestEventKey    = "InvokeDaoMergePullRequest"
	SetPullRequestStateEventKey          = "SetPullRequestState"
	AddPullRequestReviewersEventKey      = "AddPullRequestReviewers"
	RemovePullRequestReviewersEventKey   = "RemovePullRequestReviewers"
	AddPullRequestAssigneesEventKey      = "AddPullRequestAssignees"
	RemovePullRequestAssigneesEventKey   = "RemovePullRequestAssignees"
	AddPullRequestLabelsEventKey         = "AddPullRequestLabels"
	RemovePullRequestLabelsEventKey      = "RemovePullRequestLabels"
	DeletePullRequestEventKey            = "DeletePullRequest"
	LinkPullRequestIssueByIidEventKey    = "LinkPullRequestIssueByIid"
	UnlinkPullRequestIssueByIidEventKey  = "UnlinkPullRequestIssueByIid"
)

const (
	CreateReleaseEventKey = "CreateRelease"
	UpdateReleaseEventKey = "UpdateRelease"
	DeleteReleaseEventKey = "DeleteRelease"
)

const (
	CreateBountyEventKey       = "CreateBounty"
	UpdateBountyExpiryEventKey = "UpdateBountyExpiry"
	CloseBountyEventKey        = "CloseBounty"
	DeleteBountyEventKey       = "DeleteBounty"
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
	EventAttributeProviderKey        = "Provider"
)

const (
	EventAttributeUserIdKey          = "UserId"
	EventAttributeUserUsernameKey    = "UserUsername"
	EventAttributeUserNameKey        = "UserName"
	EventAttributeUserBio            = "UserBio"
	EventAttributeAvatarUrl          = "AvatarUrl"
	EventAttributePinnedRepositories = "PinnedRepositories"
)

const (
	EventAttributeDaoIdKey              = "DaoId"
	EventAttributeDaoAddressKey         = "DaoAddress"
	EventAttributeDaoNameKey            = "DaoName"
	EventAttributeDaoDescription        = "DaoDescription"
	EventAttributeDaoLocation           = "DaoLocation"
	EventAttributeDaoWebsite            = "DaoWebsite"
	EventAttributeDaoMemberAddressKey   = "DaoMemberAddress"
	EventAttributeDaoMemberWeightKey    = "DaoMemberWeight"
	EventAttributeDaoPinnedRepositories = "DaoPinnedRepositories"
	EventAttributeDaoGroupIdKey         = "DaoGroupId"
	EventAttributeDaoGroupProposalIdKey = "DaoGroupProposalId"
	// DAO config update event keys
	EventAttributeDaoRequirePullRequestProposalKey        = "DaoRequirePullRequestProposal"
	EventAttributeDaoRequireRepositoryDeletionProposalKey = "DaoRequireRepositoryDeletionProposal"
	EventAttributeDaoRequireCollaboratorProposalKey       = "DaoRequireCollaboratorProposal"
	EventAttributeDaoRequireReleaseProposalKey            = "DaoRequireReleaseProposal"
)

const (
	EventAttributeRepoNameKey                = "RepositoryName"
	EventAttributeRepoIdKey                  = "RepositoryId"
	EventAttributeRepoOwnerIdKey             = "RepositoryOwnerId"
	EventAttributeRepoOwnerTypeKey           = "RepositoryOwnerType"
	EventAttributeRepoCollaboratorKey        = "RepositoryCollaborator"
	EventAttributeRepoLabelIdKey             = "RepositoryLabelId"
	EventAttributeRepoLabelNameKey           = "RepositoryLabelName"
	EventAttributeRepoLabelColorKey          = "RepositoryLabelColor"
	EventAttributeRepoAllowForkingKey        = "RepositoryAllowForking"
	EventAttributeRepoEnableArweaveBackupKey = "RepositoryEnableArweaveBackup"
	EventAttributeForkRepoNameKey            = "ForkRepositoryName"
	EventAttributeForkRepoDescriptionKey     = "ForkRepositoryDescription"
	EventAttributeForkRepoBranchKey          = "ForkRepositoryBranch"
	EventAttributeForkRepoOwnerIdKey         = "ForkRepositoryOwnerId"
	EventAttributeRepoBranchKey              = "RepositoryBranch"
	EventAttributeRepoTagKey                 = "RepositoryTag"
	EventAttributeRepoDefaultBranchKey       = "RepositoryDefaultBranch"
	EventAttributeToggleRepositoryArchived   = "ToggleRepositoryArchived"
)

const (
	EventAttributeIssueIdKey          = "IssueId"
	EventAttributeIssueIidKey         = "IssueIid"
	EventAttributeIssueTitleKey       = "IssueTitle"
	EventAttributeIssueStateKey       = "IssueState"
	EventAttributeIssueDescriptionKey = "IssueDescription"
	EventAttributeClosedByKey         = "ClosedBy"
)

const (
	EventAttributeCommentIdKey        = "CommentId"
	EventAttributeCommentIidKey       = "CommentIid"
	EventAttributeCommentParentIidKey = "CommentParentIid"
	EventAttributeCommentParentKey    = "CommentParent"
	EventAttributeCommentBodyKey      = "CommentBody"
	EventAttributeCommentDiffHunkKey  = "CommentDiffHunk"
	EventAttributeCommentPathKey      = "CommentPath"
	EventAttributeCommentPositionKey  = "CommentPosition"
	EventAttributeCommentTypeKey      = "CommentType"
	EventAttributeCommentResolvedKey  = "CommentResolved"
)

const (
	EventAttributePullRequestIdKey             = "PullRequestId"
	EventAttributePullRequestStateKey          = "PullRequestState"
	EventAttributePullRequestIidKey            = "PullRequestIid"
	EventAttributePullRequestTitleKey          = "PullRequestTitle"
	EventAttributePullRequestDescriptionKey    = "PullRequestDescription"
	EventAttributePullRequestDraftKey          = "PullRequestDraft"
	EventAttributePullRequestHeadKey           = "PullRequestHead"
	EventAttributePullRequestBaseKey           = "PullRequestBase"
	EventAttributePullRequestMergeCommitShaKey = "PullRequestMergeCommitSha"
	EventAttributePullRequestMergedByKey       = "PullRequestMergedBy"
	EventAttributePullRequestMergedAtKey       = "PullRequestMergedAt"
	EventAttributePullRequestReviewersKey      = "PullRequestReviewers"
)

const (
	EventAttributeReleaseIdKey          = "ReleaseId"
	EventAttributeReleaseTagNameKey     = "ReleaseTagName"
	EventAttributeReleaseNameKey        = "ReleaseName"
	EventAttributeReleaseDescriptionKey = "ReleaseDescription"
	EventAttributeReleaseDraftKey       = "ReleaseDraft"
	EventAttributeReleasePreReleaseKey  = "ReleasePreRelease"
	EventAttributeReleaseAttachmentsKey = "ReleaseAttachments"
)

const (
	EventAttributeBountyIdKey        = "BountyId"
	EventAttributeBountyAmountKey    = "BountyAmount"
	EventAttributeBountyStateKey     = "BountyState"
	EventAttributeBountyParentKey    = "BountyParent"
	EventAttributeBountyParentIidKey = "BountyParentIid"
	EventAttributeBountyExpiry       = "BountyExpiry"
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
	BountyKey      = "Bounty-value-"
	BountyCountKey = "Bounty-count-"
)

const (
	ExercisedAmountKey      = "ExercisedAmount-value-"
	ExercisedAmountCountKey = "ExercisedAmount-count-"
)

const (
	GroupDaoKey      = "GroupDao-value-"
	GroupDaoCountKey = "GroupDao-count-"
)

const (
	UserQuotaKey = "UserQuota-value-"
)

const (
	EventAttributeRecipientKey = "Receipient"
	EventAttributeAmountKey    = "Amount"
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

// GetIssueKeyForRepositoryId returns Key from repository-id
func GetIssueKeyForRepositoryId(repositoryId uint64) string {
	return IssueKey + strconv.FormatUint(repositoryId, 10) + "-"
}

// GetPullRequestKeyForRepositoryId returns Key from repository-id
func GetPullRequestKeyForRepositoryId(repositoryId uint64) string {
	return PullRequestKey + strconv.FormatUint(repositoryId, 10) + "-"
}

// GetCommentKeyForIssue returns Key for repository issue
func GetCommentKeyForIssue(repositoryId uint64, issueIid uint64) string {
	return CommentKey + strconv.FormatUint(repositoryId, 10) + "-issue-" + strconv.FormatUint(issueIid, 10) + "-"
}

// GetCommentKeyForPullRequest returns Key for repository pull request
func GetCommentKeyForPullRequest(repositoryId uint64, pullRequestIid uint64) string {
	return CommentKey + strconv.FormatUint(repositoryId, 10) + "-pr-" + strconv.FormatUint(pullRequestIid, 10) + "-"
}
