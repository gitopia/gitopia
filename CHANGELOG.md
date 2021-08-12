# Change Log

All notable changes will be documented here.

## [Unreleased] - yyyy-mm-dd

### Added

- Added api to get all user organizations (no pagination)
- Added api to get organization by name
- Added api to query Organization all repositories (with pagination)
- Added api to get organization repository
- Added api to get sha by branchName
- Implemented transaction to change ownership of a repository

### Changed

- Removed field `repositoryNames` and `repositories_archived` from User and Organization
- Fields `repositories` and `organizations` are changed to map

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