import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgToggleArweaveBackup } from "./types/gitopia/tx";
import { MsgToggleRepositoryForking } from "./types/gitopia/tx";
import { MsgAddPullRequestLabels } from "./types/gitopia/tx";
import { MsgMultiSetBranch } from "./types/gitopia/tx";
import { MsgUpdatePullRequestTitle } from "./types/gitopia/tx";
import { MsgRemoveIssueAssignees } from "./types/gitopia/tx";
import { MsgUpdateRepositoryDescription } from "./types/gitopia/tx";
import { MsgUpdateBountyExpiry } from "./types/gitopia/tx";
import { MsgChangeOwner } from "./types/gitopia/tx";
import { MsgSetTag } from "./types/gitopia/tx";
import { MsgUpdateDaoDescription } from "./types/gitopia/tx";
import { MsgUpdateIssueDescription } from "./types/gitopia/tx";
import { MsgRemovePullRequestReviewers } from "./types/gitopia/tx";
import { MsgRemovePullRequestLabels } from "./types/gitopia/tx";
import { MsgSetBranch } from "./types/gitopia/tx";
import { MsgUpdateTask } from "./types/gitopia/tx";
import { MsgRemoveMember } from "./types/gitopia/tx";
import { MsgRenameRepository } from "./types/gitopia/tx";
import { MsgUpdateRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgSetPullRequestState } from "./types/gitopia/tx";
import { MsgDeleteDao } from "./types/gitopia/tx";
import { MsgUpdateDaoAvatar } from "./types/gitopia/tx";
import { MsgMultiDeleteTag } from "./types/gitopia/tx";
import { MsgDeleteTask } from "./types/gitopia/tx";
import { MsgRemoveRepositoryCollaborator } from "./types/gitopia/tx";
import { MsgUpdateUserAvatar } from "./types/gitopia/tx";
import { MsgCreateIssue } from "./types/gitopia/tx";
import { MsgRemoveIssueLabels } from "./types/gitopia/tx";
import { MsgCreateBounty } from "./types/gitopia/tx";
import { MsgAuthorizeProvider } from "./types/gitopia/tx";
import { MsgLinkPullRequestIssueByIid } from "./types/gitopia/tx";
import { MsgDeletePullRequest } from "./types/gitopia/tx";
import { MsgCreateComment } from "./types/gitopia/tx";
import { MsgDeleteTag } from "./types/gitopia/tx";
import { MsgAddPullRequestReviewers } from "./types/gitopia/tx";
import { MsgForkRepositorySuccess } from "./types/gitopia/tx";
import { MsgUpdateRelease } from "./types/gitopia/tx";
import { MsgRemovePullRequestAssignees } from "./types/gitopia/tx";
import { MsgToggleIssueState } from "./types/gitopia/tx";
import { MsgUpdateUserName } from "./types/gitopia/tx";
import { MsgMultiDeleteBranch } from "./types/gitopia/tx";
import { MsgDeleteIssue } from "./types/gitopia/tx";
import { MsgDeleteRepositoryLabel } from "./types/gitopia/tx";
import { MsgDeleteBounty } from "./types/gitopia/tx";
import { MsgAddIssueAssignees } from "./types/gitopia/tx";
import { MsgDeleteRepository } from "./types/gitopia/tx";
import { MsgCreateRelease } from "./types/gitopia/tx";
import { MsgDeleteRelease } from "./types/gitopia/tx";
import { MsgCreateDao } from "./types/gitopia/tx";
import { MsgUpdateMemberRole } from "./types/gitopia/tx";
import { MsgUpdateUserUsername } from "./types/gitopia/tx";
import { MsgSetDefaultBranch } from "./types/gitopia/tx";
import { MsgAddIssueLabels } from "./types/gitopia/tx";
import { MsgAddRepositoryBackupRef } from "./types/gitopia/tx";
import { MsgInvokeMergePullRequest } from "./types/gitopia/tx";
import { MsgUpdateIssueTitle } from "./types/gitopia/tx";
import { MsgCreateRepository } from "./types/gitopia/tx";
import { MsgCreateRepositoryLabel } from "./types/gitopia/tx";
import { MsgDeleteComment } from "./types/gitopia/tx";
import { MsgUpdateUserBio } from "./types/gitopia/tx";
import { MsgAddMember } from "./types/gitopia/tx";
import { MsgAddPullRequestAssignees } from "./types/gitopia/tx";
import { MsgMultiSetTag } from "./types/gitopia/tx";
import { MsgCreateTask } from "./types/gitopia/tx";
import { MsgRenameDao } from "./types/gitopia/tx";
import { MsgCreateUser } from "./types/gitopia/tx";
import { MsgInvokeForkRepository } from "./types/gitopia/tx";
import { MsgUpdateRepositoryLabel } from "./types/gitopia/tx";
import { MsgCreatePullRequest } from "./types/gitopia/tx";
import { MsgUpdatePullRequestDescription } from "./types/gitopia/tx";
import { MsgUpdateDaoWebsite } from "./types/gitopia/tx";
import { MsgDeleteUser } from "./types/gitopia/tx";
import { MsgUpdateDaoLocation } from "./types/gitopia/tx";
import { MsgForkRepository } from "./types/gitopia/tx";
import { MsgDeleteBranch } from "./types/gitopia/tx";
import { MsgUpdateRepositoryBackupRef } from "./types/gitopia/tx";
import { MsgUpdateComment } from "./types/gitopia/tx";
import { MsgCloseBounty } from "./types/gitopia/tx";
import { MsgRevokeProviderPermission } from "./types/gitopia/tx";
import { MsgUnlinkPullRequestIssueByIid } from "./types/gitopia/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/gitopia.gitopia.gitopia.MsgToggleArweaveBackup", MsgToggleArweaveBackup],
    ["/gitopia.gitopia.gitopia.MsgToggleRepositoryForking", MsgToggleRepositoryForking],
    ["/gitopia.gitopia.gitopia.MsgAddPullRequestLabels", MsgAddPullRequestLabels],
    ["/gitopia.gitopia.gitopia.MsgMultiSetBranch", MsgMultiSetBranch],
    ["/gitopia.gitopia.gitopia.MsgUpdatePullRequestTitle", MsgUpdatePullRequestTitle],
    ["/gitopia.gitopia.gitopia.MsgRemoveIssueAssignees", MsgRemoveIssueAssignees],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryDescription", MsgUpdateRepositoryDescription],
    ["/gitopia.gitopia.gitopia.MsgUpdateBountyExpiry", MsgUpdateBountyExpiry],
    ["/gitopia.gitopia.gitopia.MsgChangeOwner", MsgChangeOwner],
    ["/gitopia.gitopia.gitopia.MsgSetTag", MsgSetTag],
    ["/gitopia.gitopia.gitopia.MsgUpdateDaoDescription", MsgUpdateDaoDescription],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssueDescription", MsgUpdateIssueDescription],
    ["/gitopia.gitopia.gitopia.MsgRemovePullRequestReviewers", MsgRemovePullRequestReviewers],
    ["/gitopia.gitopia.gitopia.MsgRemovePullRequestLabels", MsgRemovePullRequestLabels],
    ["/gitopia.gitopia.gitopia.MsgSetBranch", MsgSetBranch],
    ["/gitopia.gitopia.gitopia.MsgUpdateTask", MsgUpdateTask],
    ["/gitopia.gitopia.gitopia.MsgRemoveMember", MsgRemoveMember],
    ["/gitopia.gitopia.gitopia.MsgRenameRepository", MsgRenameRepository],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryCollaborator", MsgUpdateRepositoryCollaborator],
    ["/gitopia.gitopia.gitopia.MsgSetPullRequestState", MsgSetPullRequestState],
    ["/gitopia.gitopia.gitopia.MsgDeleteDao", MsgDeleteDao],
    ["/gitopia.gitopia.gitopia.MsgUpdateDaoAvatar", MsgUpdateDaoAvatar],
    ["/gitopia.gitopia.gitopia.MsgMultiDeleteTag", MsgMultiDeleteTag],
    ["/gitopia.gitopia.gitopia.MsgDeleteTask", MsgDeleteTask],
    ["/gitopia.gitopia.gitopia.MsgRemoveRepositoryCollaborator", MsgRemoveRepositoryCollaborator],
    ["/gitopia.gitopia.gitopia.MsgUpdateUserAvatar", MsgUpdateUserAvatar],
    ["/gitopia.gitopia.gitopia.MsgCreateIssue", MsgCreateIssue],
    ["/gitopia.gitopia.gitopia.MsgRemoveIssueLabels", MsgRemoveIssueLabels],
    ["/gitopia.gitopia.gitopia.MsgCreateBounty", MsgCreateBounty],
    ["/gitopia.gitopia.gitopia.MsgAuthorizeProvider", MsgAuthorizeProvider],
    ["/gitopia.gitopia.gitopia.MsgLinkPullRequestIssueByIid", MsgLinkPullRequestIssueByIid],
    ["/gitopia.gitopia.gitopia.MsgDeletePullRequest", MsgDeletePullRequest],
    ["/gitopia.gitopia.gitopia.MsgCreateComment", MsgCreateComment],
    ["/gitopia.gitopia.gitopia.MsgDeleteTag", MsgDeleteTag],
    ["/gitopia.gitopia.gitopia.MsgAddPullRequestReviewers", MsgAddPullRequestReviewers],
    ["/gitopia.gitopia.gitopia.MsgForkRepositorySuccess", MsgForkRepositorySuccess],
    ["/gitopia.gitopia.gitopia.MsgUpdateRelease", MsgUpdateRelease],
    ["/gitopia.gitopia.gitopia.MsgRemovePullRequestAssignees", MsgRemovePullRequestAssignees],
    ["/gitopia.gitopia.gitopia.MsgToggleIssueState", MsgToggleIssueState],
    ["/gitopia.gitopia.gitopia.MsgUpdateUserName", MsgUpdateUserName],
    ["/gitopia.gitopia.gitopia.MsgMultiDeleteBranch", MsgMultiDeleteBranch],
    ["/gitopia.gitopia.gitopia.MsgDeleteIssue", MsgDeleteIssue],
    ["/gitopia.gitopia.gitopia.MsgDeleteRepositoryLabel", MsgDeleteRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgDeleteBounty", MsgDeleteBounty],
    ["/gitopia.gitopia.gitopia.MsgAddIssueAssignees", MsgAddIssueAssignees],
    ["/gitopia.gitopia.gitopia.MsgDeleteRepository", MsgDeleteRepository],
    ["/gitopia.gitopia.gitopia.MsgCreateRelease", MsgCreateRelease],
    ["/gitopia.gitopia.gitopia.MsgDeleteRelease", MsgDeleteRelease],
    ["/gitopia.gitopia.gitopia.MsgCreateDao", MsgCreateDao],
    ["/gitopia.gitopia.gitopia.MsgUpdateMemberRole", MsgUpdateMemberRole],
    ["/gitopia.gitopia.gitopia.MsgUpdateUserUsername", MsgUpdateUserUsername],
    ["/gitopia.gitopia.gitopia.MsgSetDefaultBranch", MsgSetDefaultBranch],
    ["/gitopia.gitopia.gitopia.MsgAddIssueLabels", MsgAddIssueLabels],
    ["/gitopia.gitopia.gitopia.MsgAddRepositoryBackupRef", MsgAddRepositoryBackupRef],
    ["/gitopia.gitopia.gitopia.MsgInvokeMergePullRequest", MsgInvokeMergePullRequest],
    ["/gitopia.gitopia.gitopia.MsgUpdateIssueTitle", MsgUpdateIssueTitle],
    ["/gitopia.gitopia.gitopia.MsgCreateRepository", MsgCreateRepository],
    ["/gitopia.gitopia.gitopia.MsgCreateRepositoryLabel", MsgCreateRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgDeleteComment", MsgDeleteComment],
    ["/gitopia.gitopia.gitopia.MsgUpdateUserBio", MsgUpdateUserBio],
    ["/gitopia.gitopia.gitopia.MsgAddMember", MsgAddMember],
    ["/gitopia.gitopia.gitopia.MsgAddPullRequestAssignees", MsgAddPullRequestAssignees],
    ["/gitopia.gitopia.gitopia.MsgMultiSetTag", MsgMultiSetTag],
    ["/gitopia.gitopia.gitopia.MsgCreateTask", MsgCreateTask],
    ["/gitopia.gitopia.gitopia.MsgRenameDao", MsgRenameDao],
    ["/gitopia.gitopia.gitopia.MsgCreateUser", MsgCreateUser],
    ["/gitopia.gitopia.gitopia.MsgInvokeForkRepository", MsgInvokeForkRepository],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryLabel", MsgUpdateRepositoryLabel],
    ["/gitopia.gitopia.gitopia.MsgCreatePullRequest", MsgCreatePullRequest],
    ["/gitopia.gitopia.gitopia.MsgUpdatePullRequestDescription", MsgUpdatePullRequestDescription],
    ["/gitopia.gitopia.gitopia.MsgUpdateDaoWebsite", MsgUpdateDaoWebsite],
    ["/gitopia.gitopia.gitopia.MsgDeleteUser", MsgDeleteUser],
    ["/gitopia.gitopia.gitopia.MsgUpdateDaoLocation", MsgUpdateDaoLocation],
    ["/gitopia.gitopia.gitopia.MsgForkRepository", MsgForkRepository],
    ["/gitopia.gitopia.gitopia.MsgDeleteBranch", MsgDeleteBranch],
    ["/gitopia.gitopia.gitopia.MsgUpdateRepositoryBackupRef", MsgUpdateRepositoryBackupRef],
    ["/gitopia.gitopia.gitopia.MsgUpdateComment", MsgUpdateComment],
    ["/gitopia.gitopia.gitopia.MsgCloseBounty", MsgCloseBounty],
    ["/gitopia.gitopia.gitopia.MsgRevokeProviderPermission", MsgRevokeProviderPermission],
    ["/gitopia.gitopia.gitopia.MsgUnlinkPullRequestIssueByIid", MsgUnlinkPullRequestIssueByIid],
    
];

export { msgTypes }