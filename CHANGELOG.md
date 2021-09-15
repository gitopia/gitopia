# Change Log

All notable changes will be documented here.

## [Unreleased] - yyyy-mm-dd

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
