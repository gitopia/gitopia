## Tx Permissions

| Tx | Read | Triage | Write | Maintain | Admin |
|:---|:---:|:---:|:---:|:---:|:---:|
| `ChangeOwner()` | | | | | **X** |
| `RenameRepository()` | | | | | **X** |
| `UpdateRepositoryCollaborator()` | | | | | **X** |
| `RemoveRepositoryCollaborator()` | | | | | **X** |
| `CreateRepositoryLabel()` | | | **X** | **X** | **X** |
| `UpdateRepositoryLabel()` | | | **X** | **X** | **X** |
| `DeleteRepositoryLabel()` | | | **X** | **X** | **X** |
| `SetRepositoryBranch()` | | | **X** | **X** | **X** |
| `SetDefaultBranch()` | | | | | **X** |
| `DeleteBranch()` | | | **X** | **X** | **X** |
| `SetRepositoryTag()` | | | **X** | **X** | **X** |
| `DeleteTag()` | | | **X** | **X** | **X** |
| `ToggleRepositoryForking()` | | | | | **X** |
| `ToggleIssueState()` | | **X** | **X** | **X** | **X** |
| `AddIssueAssignees()` | | **X** | **X** | **X** | **X** |
| `RemoveIssueAssignees()` | | **X** | **X** | **X** | **X** |
| `AddIssueLabels()` | | **X** | **X** | **X** | **X** |
| `RemoveIssueLabels()` | | **X** | **X** | **X** | **X** |
| `CreateRelease()` | | | **X** | **X** | **X** |
| `UpdateRelease()` | | | **X** | **X** | **X** |
| `CreatePullRequest()` (Head) | | | **X** | **X** | **X** |
