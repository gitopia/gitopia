package cli

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/tx"

	// "github.com/cosmos/cosmos-sdk/client/flags"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// GetTxCmd returns the transaction commands for this module
func GetTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("%s transactions subcommands", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(CmdRegisterStorageProvider())
	cmd.AddCommand(CmdUpdateStorageProvider())
	cmd.AddCommand(CmdWithdrawProviderRewards())
	cmd.AddCommand(CmdIncreaseStake())
	cmd.AddCommand(CmdDecreaseStake())
	cmd.AddCommand(CmdCompleteDecreaseStake())
	cmd.AddCommand(CmdReactivateProvider())
	cmd.AddCommand(CmdUnregisterProvider())
	cmd.AddCommand(CmdCompleteUnstake())
	cmd.AddCommand(CmdUpdateRepositoryPackfile())
	cmd.AddCommand(CmdDeleteRepositoryPackfile())
	cmd.AddCommand(CmdUpdateReleaseAsset())
	cmd.AddCommand(CmdDeleteReleaseAsset())
	cmd.AddCommand(CmdUpdateLFSObject())
	cmd.AddCommand(CmdDeleteLFSObject())
	cmd.AddCommand(CmdMergePullRequest())
	cmd.AddCommand(CmdSubmitChallengeResponse())
	// this line is used by starport scaffolding # 1

	return cmd
}

func CmdRegisterStorageProvider() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "register-provider [api-url] [moniker] [stake] [ipfs-cluster-peer-multiaddr]",
		Short: "Register a new storage provider",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			amount, err := sdk.ParseCoinNormalized(args[2])
			if err != nil {
				return err
			}

			msg := types.NewMsgRegisterProvider(
				clientCtx.GetFromAddress().String(),
				args[0],
				args[1],
				amount,
				args[3],
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdUpdateStorageProvider() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-provider [api-url] [moniker] [ipfs-cluster-peer-multiaddr]",
		Short: "Update a storage provider",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateProvider(
				clientCtx.GetFromAddress().String(),
				args[0],
				args[1],
				args[2],
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdWithdrawProviderRewards() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "withdraw-rewards",
		Short: "Withdraw accumulated rewards for a storage provider",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgWithdrawProviderRewards(
				clientCtx.GetFromAddress().String(),
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdUnregisterProvider() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "unregister-provider",
		Short: "Unregister a storage provider",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUnregisterProvider(
				clientCtx.GetFromAddress().String(),
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdCompleteUnstake() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "complete-unstake",
		Short: "Complete the unstaking process after unregistering a provider",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCompleteUnstake(
				clientCtx.GetFromAddress().String(),
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdUpdateRepositoryPackfile() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-repository-packfile [repository-id] [name] [cid] [root-hash-hex] [size] [old-cid]",
		Short: "Update a repository packfile",
		Args:  cobra.ExactArgs(6),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid repository-id: %w", err)
			}

			name := args[1]
			cid := args[2]

			rootHash, err := hex.DecodeString(args[3])
			if err != nil {
				return fmt.Errorf("invalid root-hash-hex: %w", err)
			}

			size, err := strconv.ParseUint(args[4], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid size: %w", err)
			}

			oldCid := args[5]

			msg := types.NewMsgUpdateRepositoryPackfile(
				clientCtx.GetFromAddress().String(),
				repositoryId,
				name,
				cid,
				rootHash,
				size,
				oldCid,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdDeleteRepositoryPackfile() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-repository-packfile [repository-id] [owner-id]",
		Short: "Delete a repository packfile",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid repository-id: %w", err)
			}

			ownerId := args[1]

			msg := types.NewMsgDeleteRepositoryPackfile(
				clientCtx.GetFromAddress().String(),
				repositoryId,
				ownerId,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdUpdateReleaseAsset() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-release-asset [repository-id] [tag] [name] [cid] [root-hash-hex] [size] [sha256] [old-cid]",
		Short: "Update a release asset",
		Args:  cobra.ExactArgs(8),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid repository-id: %w", err)
			}

			tag := args[1]
			name := args[2]
			cid := args[3]

			rootHash, err := hex.DecodeString(args[4])
			if err != nil {
				return fmt.Errorf("invalid root-hash-hex: %w", err)
			}

			size, err := strconv.ParseUint(args[5], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid size: %w", err)
			}

			sha256 := args[6]
			oldCid := args[7]

			msg := types.NewMsgUpdateReleaseAsset(
				clientCtx.GetFromAddress().String(),
				repositoryId,
				tag,
				name,
				cid,
				rootHash,
				size,
				sha256,
				oldCid,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdDeleteReleaseAsset() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-release-asset [repository-id] [tag] [name] [owner-id]",
		Short: "Delete a release asset",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid repository-id: %w", err)
			}

			tag := args[1]
			name := args[2]
			ownerId := args[3]

			msg := types.NewMsgDeleteReleaseAsset(
				clientCtx.GetFromAddress().String(),
				repositoryId,
				tag,
				name,
				ownerId,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdUpdateLFSObject() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-lfs-object [repository-id] [oid] [size] [cid] [root-hash-hex]",
		Short: "Update an LFS object",
		Args:  cobra.ExactArgs(5),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid repository-id: %w", err)
			}

			oid := args[1]

			size, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid size: %w", err)
			}

			cid := args[3]

			rootHash, err := hex.DecodeString(args[4])
			if err != nil {
				return fmt.Errorf("invalid root-hash-hex: %w", err)
			}

			msg := types.NewMsgUpdateLFSObject(
				clientCtx.GetFromAddress().String(),
				repositoryId,
				oid,
				size,
				cid,
				rootHash,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdDeleteLFSObject() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-lfs-object [repository-id] [oid] [owner-id]",
		Short: "Delete an LFS object",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid repository-id: %w", err)
			}

			oid := args[1]
			ownerId := args[2]

			msg := types.NewMsgDeleteLFSObject(
				clientCtx.GetFromAddress().String(),
				repositoryId,
				oid,
				ownerId,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdMergePullRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "merge-pull-request [repository-id] [pull-request-iid] [merge-commit-sha] [task-id]",
		Short: "Merge a pull request",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid repository-id: %w", err)
			}

			pullRequestIid, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid pull-request-iid: %w", err)
			}

			mergeCommitSha := args[2]

			taskId, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid task-id: %w", err)
			}

			msg := types.NewMsgMergePullRequest(
				clientCtx.GetFromAddress().String(),
				repositoryId,
				pullRequestIid,
				mergeCommitSha,
				taskId,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}

func CmdSubmitChallengeResponse() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "submit-challenge-response [challenge-id] [data-hex] [proof-json]",
		Short: "Submit a response to a storage challenge.",
		Long: `Submit a response to a storage challenge.
[data-hex] is a hex-encoded byte array.
[proof-json] is a JSON string representing the proof. The 'hashes' array within the JSON must contain hex-encoded strings.
Example for proof-json: '{"hashes":["aabbcc","ddeeff"],"index":123}'`,
		Args: cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			challengeId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid challenge-id: %w", err)
			}

			data, err := hex.DecodeString(args[1])
			if err != nil {
				return fmt.Errorf("invalid data-hex: %w", err)
			}

			// A temporary struct to unmarshal hex strings from JSON
			var proofJSON struct {
				Hashes []string `json:"hashes"`
				Index  uint64   `json:"index"`
			}
			if err := json.Unmarshal([]byte(args[2]), &proofJSON); err != nil {
				return fmt.Errorf("invalid proof-json: %w", err)
			}

			var hashesBytes [][]byte
			for _, hashHex := range proofJSON.Hashes {
				hash, err := hex.DecodeString(hashHex)
				if err != nil {
					return fmt.Errorf("invalid hex in proof hashes: %w", err)
				}
				hashesBytes = append(hashesBytes, hash)
			}

			proof := &types.Proof{
				Hashes: hashesBytes,
				Index:  proofJSON.Index,
			}

			msg := types.NewMsgSubmitChallengeResponse(
				clientCtx.GetFromAddress().String(),
				challengeId,
				data,
				proof,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	return cmd
}
