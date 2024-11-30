# Change Log

All notable changes will be documented here.

## [5.1.0] - 2024-11-30

- fix errors in pull request merge messages
- set whois update in UpdateDaoMetadata proposal
- fix UpdateDaoConfig proposal
- update protobuf imports
- add the new v5.1.0 upgrade handler

## [5.0.1] - 2024-11-27

- update mocks and fix build error

## [5.0.0] - 2024-11-27

- Use cosmos-sdk fork for disabling pruning of proposals and votes in group proposals
- Implement Gitopia DAOs using the cosmos-sdk module group.
- Port existing DAO transactions
- Create new DAO proposal types
  - Merging PR in DAO repositories
  - Creating new releases in DAO repositories
  - Managing collaborators in DAO repositories
  - Updating DAO governance configuration
  - Updating DAO metadata
  - DAO treasury spend
- Migration for existing DAOs and members

## [4.0.0] - 2024-08-20

- Upgrade cosmos-sdk version to v0.47.13
- Upgrade ibc-go version to v7.4.0
- Upgrade cometbft version to v0.37.6
- Upgrade go version to 1.21
- Change
- Add end to end tests
- Fix output stream of gitopiad binary
- Migration of params of sdk modules
- Fix genesis time in gitopia params
- Enable Interchain Accounts
- Add localnet docker compose config with chain, faucet, git server, graph indexer and rewards service

## [3.3.1] - 2024-07-10

- Use gitopia chain id in offchain signatures

## [3.3.0] - 2023-09-27

- Fix ledger signature validation in rewards module
- Reset airdrop decay

## [3.0.0] - 2023-09-13

- Added a transaction to archive a repository
- Upgrade ibc-go to v5.3.1
- Added a transaction to pin repositories for user and DAO
- Added update param transactions for gitopia and rewards module
- Migrate gitopia and rewards params
- Set start and end time for Cosmos ecosytem rewards
- Change inflation and token emission distribution

## [v1.4.0] - UNRELEASED

- Upgrade cosmos-sdk version to v0.46.10 and tendermint version to v0.34.26
- Set default branch on first push
- InvokeForkRepository and ForkRepository transaction now accepts name and branch parameters
- ToggleIssueState now accepts comment body parameter for comment and close
- SetPullRequestState now accepts comment body parameter for comment and close
- Close linked issue automatically when pr is merged and the issue is only assigned to the pr creator
- Branch protection: New transaction to toggle allowForcePush value of branch
- Default null values for comment type and parent
- Add issueIids param in create PR tx

## [v1.3.0] - 2023-02-22

- Bump cosmos-sdk version to v0.46.7 and tendermint version to v0.34.24
- KV changes for issue, pullrequest and comment. 
- Removed `issues` and `pullRequests` from Repository proto
- UpdateIssueTitle, UpdateIssueDescription, ToggleIssueState, AddIssueAssignees, RemoveIssueAssignees, AddIssueLabels, RemoveIssueLabels, DeleteIssue, UpdatePullRequestTitle, UpdatePullRequestDescription, InvokeMergePullRequest, SetPullRequestState, AddPullRequestReviewers, RemovePullRequestReviewers, AddPullRequestAssignees, RemovePullRequestAssignees, LinkPullRequestIssueByIid, UnlinkPullRequestIssueByIid, AddPullRequestLabels, RemovePullRequestLabels, and DeletePullRequest tx takes `repositoryId` and `iid` instead of `id`.
- Add `repositoryId` in Comment and Bounty proto
- Modified comment structure - Parent: issue and pull; various comment types like label, assignees etc; reactions; replies; resolved/unresolved
- Removed queries to get a issue, pullrequest and comment by id.
- PullRequestMergePermission query also takes `repositoryId`
- Add queries RepositoryIssue, RepositoryIssueAll, RepositoryPullRequest, RepositoryPullRequestAll ,IssueComment, PullRequestComment, IssueCommentAll and PullRequestCommentAll.
- In place store migration for store changes
- Refactored app.go

## [v1.2.0] - 2022-11-07

- Upgrade cosmos-sdk version to v0.46.4 and iavl version to v0.19.4

## [v1.1.3] - 2022-11-04

- Fix: pull request permissions

## [v1.1.2] - 2022-11-01

- Fix: allow change of case in username and dao name

## [v1.1.1] - 2022-11-01

- Resolve username in create pr transaction
- Set gitopia dao name in migrate script

## [v1.1.0] - 2022-10-27

- Upgraded cosmos-sdk version to v0.46.3 and tendermint version to v0.34.22
- Added support for Ledger Nano S plus

## [v1.0.0] - 2022-10-17

### Fixes

- Do not allow update/removal of only owner in dao
- Set timeout_commit to 1s

### Features

- Upgraded cosmos-sdk version to v0.46.2 and tendermint version to v0.34.21
- New onboarding flow to set username, profile, etc
- Reserve usernames and dao names
- New whois query to resolve usernames or dao name: `/gitopia/gitopia/gitopia/whois/{name}`
- Provider transactions: authorize and revoke permissions
- Query to check whether provider has authorization
- Add a Verified field in User
- Add Backups and EnableArweaveBackup fields in Repository
- Transaction to toggle arweave backup flag
- Set max deposit period and voting period to 2 days
- Migration script for migratiing existing app state to new genesis
- Offchain module for signing and verifying arbitrary messages
- Emit events from all transactions
- Cross platform builds

### Breaking Changes

- New module addresses for daos: Existing address generation logic overlaps when new chain starts with older state, so we have migrated existing addresses to the new address. Older addresses will be invalid
- Repository query has been changed to `/gitopia/gitopia/gitopia/user/{id}/repository/{repositoryName}`. `id` can be user address, username or dao name
- Branch query has been changed to `/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/branch`
- Tag query has been changed to `/gitopia/gitopia/gitopia/{id}/repository/{repositoryName}/tag`
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
