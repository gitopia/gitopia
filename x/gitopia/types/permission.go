package types

/* Minimum Allowed Permissions */
const (
	AssignPermission                             = RepositoryCollaborator_TRIAGE
	DefaultBranchPermission                      = RepositoryCollaborator_ADMIN
	DeleteIssuePermission                        = RepositoryCollaborator_ADMIN
	DeleteRepositoryPermission                   = RepositoryCollaborator_ADMIN
	LabelPermission                              = RepositoryCollaborator_TRIAGE
	LinkPullRequestIssuePermission               = RepositoryCollaborator_TRIAGE
	PullRequestCreatePermission                  = RepositoryCollaborator_WRITE
	PullRequestMergePermission                   = RepositoryCollaborator_WRITE
	PushBranchPermission                         = RepositoryCollaborator_WRITE
	PushProtectedBranchPermission                = RepositoryCollaborator_ADMIN
	PushTagPermission                            = RepositoryCollaborator_WRITE
	ReleasePermission                            = RepositoryCollaborator_WRITE
	RepositoryCollaboratorPermission             = RepositoryCollaborator_ADMIN
	RepositoryLabelPermission                    = RepositoryCollaborator_WRITE
	RepositoryRenamePermission                   = RepositoryCollaborator_ADMIN
	RepositoryTransferOwnershipPermission        = RepositoryCollaborator_ADMIN
	RepositoryUpdateDescriptionPermission        = RepositoryCollaborator_MAINTAIN
	RepositoryToggleRepositoryArchivedPermission = RepositoryCollaborator_MAINTAIN
	ToggleRepositoryForkingPermission            = RepositoryCollaborator_ADMIN
	ToggleIssueStatePermission                   = RepositoryCollaborator_TRIAGE
	RepositoryBackupPermission                   = RepositoryCollaborator_ADMIN
	ToggleForcePushToBranchPermission            = RepositoryCollaborator_ADMIN
	ToggleCommentResolvedPermission              = RepositoryCollaborator_TRIAGE
)
