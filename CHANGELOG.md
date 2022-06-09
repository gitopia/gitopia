# Change Log

All notable changes will be documented here.

## [Unreleased] - 20XX-XX-XX

### Fixes

- 

### Features

- Transaction to revoke git server permissions
- Transactions to authorize and revoke storage provider permissions
- Query to check whether storage provider has authorization

### Breaking Changes

- Decoupled Branch from Repository
- Decoupled Tag from Repository
- Decoupled Repository from User and Organization
- Rename Organization to Dao
- UpdateOrganizationMember() -> AddMember() and UpdateMemberRole()
- RemoveOrganizationMember() -> RemoveMember()
- For repository id, using type `RepositoryId` instead of `uint64` in transactions
- SetRepositoryBranch() -> SetBranch()
- SetRepositoryTag() -> SetTag()
- RepositoryOwnerType and WhoisOwnerType -> OwnerType

## [v0.13.0] - 2022-04-04

### Fixes

- Fix various audit issues

### Features

- Upgraded Cosmos SDK to v0.45.1
- Upgraded Starport to v0.19.2
- Enabled authz module
- Transaction to authorize git-server
- Query to check git-server authorization
- Input validations for various transactions
- Multi set and delete transaction for branches and tags
- Improved permissions for various transactions
- Add amino support

### Breaking Changes

- state migration: removed extension, email fields

## [v0.12.0] - 2022-02-03

### Fixes

- Fix release API
- Don't allow duplicate pullRequest
- Don't change state if Title/Description unchanged

### Features

- Transaction to toggle repository forking
- Tests for genesis, gitopia keeper and types
- Consume gas when creating user or repository
- System comments for PullRequest
- Script to migrate existing state to new genesis

### Breaking Changes

- denom units, tlore -> utlore.

## [0.11.0] - 2021-12-01

### Added

- Implemented tx to transfer user to new address
- Added API to get repository forks
- `/issue?option.state=CLOSED` : Returns open issues
- `/issue?option.state=OPEN` : Returns closed issues
- `/issue?option.labels=ANY/NONE` : ANY - Returns issues with any label, NONE - Returns issues with no label
- `/issue?option.createdBy={address}` : Returns issues created by address
- `/issue?option.search={string}` : Returns issues containing string in title
- `/issue?option.assignee={address}` : Returns issues assigned to address
- `/issue?option.sort=ASC/DESC` : Returns sorted issues in ascending and descending order. Default DESC .
- `/issue?option.updatedAfter={date}` : Returns issues created after date. Expected in UNIX format.
- `/issue?option.updatedBefore={date}` : Returns issues created before date. Expected in UNIX format.
- `/issue?option.labelIds={id}` : Returns issues containing ids.
- `/pull?option.state=CLOSED` : Returns open pullRequests
- `/pull?option.state=OPEN` : Returns closed pullRequests
- `/pull?option.state=MERGED` : Returns merged pullRequests
- `/pull?option.labels=ANY/NONE` : ANY - Returns pullRequests with any label, NONE - Returns pullRequests with no label
- `/pull?option.createdBy={address}` : Returns pullRequests created by address
- `/pull?option.search={string}` : Returns pullRequests containing string in title
- `/pull?option.assignee={address}` : Returns pullRequests assigned to address
- `/pull?option.reviewer={address}` : Returns pullRequests with reviewer address
- `/pull?option.sort=ASC/DESC` : Returns sorted pullRequests in ascending and descending order. Default DESC .
- `/pull?option.updatedAfter={date}` : Returns pullRequests created after date. Expected in UNIX format.
- `/pull?option.updatedBefore={date}` : Returns pullRequests created before date. Expected in UNIX format.
- `/pull?option.labelIds={id}` : Returns pullRequests containing ids.
- Added migration script to migrate user
- Added transaction to RenameOrganization
- Added name in user.proto
- Added transaction to UpdateUser
- Added transaction to Add/Remove PullRequest Labels
- Added LastUpdatedAt in branches and tags
- Added validations for attachment

### Changed

- Migration to ibc-go
- Use values instead of references in genesis
- Removed `Has{type}()` checks in favour of `Get{types}()`
- Upgraded to starport v0.18.0
- Rename s/CreateTag/SetRepositoryTag
- Rename s/CreateBranch/SetRepositoryBranch
- seperate message for head and base in pullRequest
- Allow reviewers, assignees and labels while creating PullRequest

### Fixed

- Fix pagination in repository issue and pull APIs
- Fix AddressRepository query API response
- Updating updatingAt for repository transactions
- Can't remove only owner
- Don't allow organization member to modify self role
- Don't allow collaborator to modify self role

## [0.10.1] - 2021-09-28

### Added

- Fix update release transaction
- Added Issue permissions
- Set version information in the binary

## [0.10.0] - 2021-09-19

### Added

- Implemented api to get latest repository release
- Implemented api to get repository release by tag
- Implemented api to get all repository releases
- Implemented transaction to Update/Edit Release
- Implemented transaction to Create Release

## [0.9.0] - 2021-09-13

### Added

- Added address field to Organization
- Added id field to User
- Organization address is deterministically generated using creater address and sequence number
- Added transaction to create and delete tag
- Added AddressRepository() and AddressRepositoryAll() api
- Issue transactions generates system comment
- Implemented transaction to UpdateRepositoryLabel
- Implemented transaction to RemoveIssueLabel
- Implemented transaction to AddIssueLabel
- Added checks in CreateIssue
- Implemented transaction to DeleteRepositoryLabel
- Implemented transaction to CreateRepositoryLabel
- Implemented transaction to RemoveIssueAssignees
- Implemented transaction to AddIssueAssignees

### Changed

- Organization key changed from id to address
- Removed UserRepository() and UserRepositoryAll() api
- Removed OrganizationRepositoryAll() api
- Using message for labels

### Fixed

## [0.7.0] - 2021-08-24

### Added

- Using slice instead of maps
- Added transaction to set pullRequest state
- Added transaction to update pullRequest description
- Added transaction to update pullRequest title
- Added transaction to Remove organization member
- Added transaction to Remove repository collaborator
- Added transaction to Add/Update repository collaborator
- Added api to get all user organizations (no pagination)
- Added api to get organization by name
- Added api to query Organization all repositories (with pagination)
- Added api to get organization repository
- Added api to get sha by branchName
- Implemented transaction to change ownership of a repository

### Changed

- Removed field `repositoryNames` and `repositories_archived` from User and Organization
- Fields `repositories` and `organizations` are changed to map

### Fixed

- Make timestamps deterministic

## [0.6.0] - 2021-08-11

### Added

- Added api to query all repository pullRequests with pagination enabled
- Added grpc endpoint to query repository pullRequests by Iid
- Added api to query all repository issue with pagination enabled
- Added grpc endpoint to query repository issue by Iid

### Changed

- Disable updating whois while creating user
- Allow empty username in CreateUser tx
- Updated responses of CreateRepository, CreateIssue and CreatePullRequest tx to include name and local Id
- Change field pulls from list to map in Repository
- Change field issues from list to map in Repository

### Fixed

- Allow CreateIssue tx with no Assignees
