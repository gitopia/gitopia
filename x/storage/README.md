# Storage Module

The Storage Module is a decentralized storage solution for Gitopia that enables secure and reliable storage of Git repositories through a network of storage providers.

## Overview

The module implements a storage network where providers stake tokens to participate in storing and serving Git repository data. Providers are incentivized to maintain high availability and data integrity through a challenge-response system.

## Features

### Storage Providers
- Providers stake tokens to participate in the network
- Providers can register and unregister from the network
- Unstaking process includes a cooldown period to prevent sudden exits
- Providers earn rewards for successful challenge responses
- Providers can be slashed for failing challenges

### Repository Storage
- Git repositories are stored as packfiles in IPFS
- Each repository has a unique packfile with CID and Merkle root hash
- Storage usage is tracked per user through quotas

### Challenge System
- Random challenges are generated to verify data availability
- Providers must respond to challenges within a deadline
- Successful responses are rewarded
- Failed responses result in slashing
- Consecutive failures can lead to increased slashing

## Messages

### RegisterProvider
```go
MsgRegisterProvider {
    creator string
    address string
    stake   sdk.Coin
}
```
Registers a new storage provider with the specified stake amount.

### UnregisterProvider
```go
MsgUnregisterProvider {
    creator string
}
```
Initiates the unregistration process for a provider. The provider must wait for the cooldown period before completing the unstaking.

### CompleteUnstake
```go
MsgCompleteUnstake {
    creator string
}
```
Completes the unstaking process after the cooldown period has passed.

### UpdateRepositoryPackfile
```go
MsgUpdateRepositoryPackfile {
    creator      string
    repositoryId uint64
    name         string
    cid          string
    rootHash     []byte
    size         uint64
}
```
Updates the packfile information for a repository.

### SubmitChallengeResponse
```go
MsgSubmitChallengeResponse {
    creator     string
    challengeId uint64
    data        []byte
    proof       *Proof
}
```
Submits a response to a storage challenge with Merkle proof.

### WithdrawProviderRewards
```go
MsgWithdrawProviderRewards {
    creator string
}
```
Withdraws accumulated rewards for a provider.

## Parameters

The module's behavior can be configured through the following parameters:

- `min_stake_amount`: Minimum amount of tokens required to become a provider
- `challenge_interval_blocks`: Number of blocks between challenges
- `challenge_timeout_blocks`: Number of blocks before a challenge times out
- `challenge_reward`: Reward amount for successful challenge responses
- `challenge_slash_amount`: Amount slashed for failed challenges
- `consecutive_fails_threshold`: Number of consecutive failures before increased slashing
- `consecutive_fails_slash_percentage`: Percentage of stake slashed for consecutive failures
- `unstake_cooldown_blocks`: Number of blocks to wait before completing unstaking

## Events

The module emits the following events:

- `EventProviderRegistered`: Emitted when a provider is registered
- `EventProviderStatusUpdated`: Emitted when provider status is updated
- `EventPackfileUpdated`: Emitted when a packfile is updated
- `EventChallengeCreated`: Emitted when a new challenge is created
- `EventChallengeCompleted`: Emitted when a challenge is completed
- `EventProviderUnregistered`: Emitted when a provider initiates unregistration
- `EventProviderUnstakeCompleted`: Emitted when a provider's unstaking is completed

## Queries

The module provides the following query endpoints:

- `Params`: Get the module's parameters
- `Provider`: Get a provider by address
- `Providers`: Get all providers
- `Packfile`: Get a packfile by ID
- `RepositoryPackfile`: Get a packfile for a repository
- `Challenge`: Get a challenge by ID

## Security Considerations

1. **Staking**: Providers must stake tokens to participate, ensuring they have skin in the game
2. **Slashing**: Failed challenges result in slashing to disincentivize malicious behavior
3. **Cooldown Period**: Unstaking requires a cooldown period to prevent sudden exits
4. **Challenge System**: Random challenges verify data availability and integrity
5. **Merkle Proofs**: Cryptographic proofs ensure data correctness
