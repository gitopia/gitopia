package cli

import (
	"fmt"
	"strconv"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"

	"github.com/gitopia/gitopia/v6/x/storage/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd(queryRoute string) *cobra.Command {
	// Group storage queries under a subcommand
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(CmdQueryParams())
	cmd.AddCommand(CmdShowProvider())
	cmd.AddCommand(CmdListProviders())
	cmd.AddCommand(CmdListActiveProviders())
	cmd.AddCommand(CmdShowPackfile())
	cmd.AddCommand(CmdListPackfiles())
	cmd.AddCommand(CmdShowRepositoryPackfile())
	cmd.AddCommand(CmdShowReleaseAsset())
	cmd.AddCommand(CmdListReleaseAssets())
	cmd.AddCommand(CmdShowRepositoryReleaseAsset())
	cmd.AddCommand(CmdListRepositoryReleaseAssets())
	cmd.AddCommand(CmdListRepositoryReleaseAssetsByRepositoryId())
	cmd.AddCommand(CmdShowChallenge())
	cmd.AddCommand(CmdListChallenges())
	cmd.AddCommand(CmdShowStorageStats())
	cmd.AddCommand(CmdShowCidReferenceCount())
	cmd.AddCommand(CmdListCidReferenceCounts())
	cmd.AddCommand(CmdListLFSObjects())
	cmd.AddCommand(CmdShowLFSObject())
	cmd.AddCommand(CmdListLFSObjectsByRepositoryId())
	cmd.AddCommand(CmdShowLFSObjectByRepositoryIdAndOid())
	cmd.AddCommand(CmdListProviderRewardsAll())
	cmd.AddCommand(CmdShowProviderRewards())
	cmd.AddCommand(CmdShowProviderStake())
	cmd.AddCommand(CmdListProviderStakes())

	return cmd
}

func CmdShowProvider() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "provider [address]",
		Short: "shows a provider",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			argAddress := args[0]
			params := &types.QueryProviderRequest{
				Address: argAddress,
			}
			res, err := queryClient.Provider(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListProviders() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "providers",
		Short: "list all providers",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			params := &types.QueryProvidersRequest{
				Pagination: pageReq,
			}
			res, err := queryClient.Providers(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListActiveProviders() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "active-providers",
		Short: "list all active providers",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			params := &types.QueryActiveProvidersRequest{}
			res, err := queryClient.ActiveProviders(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdShowPackfile() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "packfile [id]",
		Short: "shows a packfile",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			params := &types.QueryPackfileRequest{Id: id}
			res, err := queryClient.Packfile(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListPackfiles() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "packfiles",
		Short: "list all packfiles",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			params := &types.QueryPackfilesRequest{
				Pagination: pageReq,
			}
			res, err := queryClient.Packfiles(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdShowRepositoryPackfile() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "repository-packfile [repository-id]",
		Short: "shows a packfile for a repository",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			params := &types.QueryRepositoryPackfileRequest{RepositoryId: repositoryId}
			res, err := queryClient.RepositoryPackfile(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdShowReleaseAsset() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "release-asset [id]",
		Short: "shows a release asset",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			params := &types.QueryReleaseAssetRequest{Id: id}
			res, err := queryClient.ReleaseAsset(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListReleaseAssets() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "release-assets",
		Short: "list all release assets",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			params := &types.QueryReleaseAssetsRequest{
				Pagination: pageReq,
			}
			res, err := queryClient.ReleaseAssets(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdShowRepositoryReleaseAsset() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "repository-release-asset",
		Short: "shows a release asset for a repository (--repository-id, --tag, --name)",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			repositoryId, err := cmd.Flags().GetUint64("repository-id")
			if err != nil {
				return err
			}
			tag, err := cmd.Flags().GetString("tag")
			if err != nil {
				return err
			}
			name, err := cmd.Flags().GetString("name")
			if err != nil {
				return err
			}
			params := &types.QueryRepositoryReleaseAssetRequest{
				RepositoryId: repositoryId,
				Tag:          tag,
				Name:         name,
			}
			res, err := queryClient.RepositoryReleaseAsset(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	cmd.Flags().Uint64("repository-id", 0, "repository id")
	cmd.Flags().String("tag", "", "release tag")
	cmd.Flags().String("name", "", "asset name")
	_ = cmd.MarkFlagRequired("repository-id")
	_ = cmd.MarkFlagRequired("tag")
	_ = cmd.MarkFlagRequired("name")
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListRepositoryReleaseAssets() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "repository-release-assets",
		Short: "list all release assets for a repository and tag (--repository-id, --tag)",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			repositoryId, err := cmd.Flags().GetUint64("repository-id")
			if err != nil {
				return err
			}
			tag, err := cmd.Flags().GetString("tag")
			if err != nil {
				return err
			}
			params := &types.QueryRepositoryReleaseAssetsRequest{
				RepositoryId: repositoryId,
				Tag:          tag,
			}
			res, err := queryClient.RepositoryReleaseAssets(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	cmd.Flags().Uint64("repository-id", 0, "repository id")
	cmd.Flags().String("tag", "", "release tag")
	_ = cmd.MarkFlagRequired("repository-id")
	_ = cmd.MarkFlagRequired("tag")
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListRepositoryReleaseAssetsByRepositoryId() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "repository-release-assets-by-id [repository-id]",
		Short: "list all release assets for a repository by repository id",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			params := &types.QueryRepositoryReleaseAssetsByRepositoryIdRequest{
				RepositoryId: repositoryId,
				Pagination:   pageReq,
			}
			res, err := queryClient.RepositoryReleaseAssetsByRepositoryId(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdShowChallenge() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "challenge [id]",
		Short: "shows a challenge",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			params := &types.QueryChallengeRequest{Id: id}
			res, err := queryClient.Challenge(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListChallenges() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "challenges",
		Short: "list all challenges",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			params := &types.QueryChallengesRequest{
				Pagination: pageReq,
			}
			res, err := queryClient.Challenges(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdShowStorageStats() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "storage-stats",
		Short: "shows the total storage size",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			params := &types.QueryStorageStatsRequest{}
			res, err := queryClient.StorageStats(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdShowCidReferenceCount() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "cid-reference-count [cid]",
		Short: "shows the reference count for a CID",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			cid := args[0]
			params := &types.QueryCidReferenceCountRequest{Cid: cid}
			res, err := queryClient.CidReferenceCount(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListCidReferenceCounts() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "cid-reference-counts",
		Short: "list all cid reference counts",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			params := &types.QueryCidReferenceCountsRequest{
				Pagination: pageReq,
			}
			res, err := queryClient.CidReferenceCounts(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListLFSObjects() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "lfs-objects",
		Short: "list all LFS objects",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			params := &types.QueryLFSObjectsRequest{
				Pagination: pageReq,
			}
			res, err := queryClient.LFSObjects(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdShowLFSObject() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "lfs-object [id]",
		Short: "shows an LFS object by id",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			params := &types.QueryLFSObjectRequest{Id: id}
			res, err := queryClient.LFSObject(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListLFSObjectsByRepositoryId() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "lfs-objects-by-repository-id [repository-id]",
		Short: "list all LFS objects for a repository",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			repositoryId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			params := &types.QueryLFSObjectsByRepositoryIdRequest{RepositoryId: repositoryId}
			res, err := queryClient.LFSObjectsByRepositoryId(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdShowLFSObjectByRepositoryIdAndOid() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "lfs-object-by-repo-and-oid",
		Short: "shows an LFS object by repository id and oid (--repository-id, --oid)",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			repositoryId, err := cmd.Flags().GetUint64("repository-id")
			if err != nil {
				return err
			}
			oid, err := cmd.Flags().GetString("oid")
			if err != nil {
				return err
			}
			params := &types.QueryLFSObjectByRepositoryIdAndOidRequest{
				RepositoryId: repositoryId,
				Oid:          oid,
			}
			res, err := queryClient.LFSObjectByRepositoryIdAndOid(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	cmd.Flags().Uint64("repository-id", 0, "repository id")
	cmd.Flags().String("oid", "", "lfs object oid")
	_ = cmd.MarkFlagRequired("repository-id")
	_ = cmd.MarkFlagRequired("oid")
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListProviderRewardsAll() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "provider-rewards-all",
		Short: "list all provider rewards",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			params := &types.QueryProviderRewardsAllRequest{}
			res, err := queryClient.ProviderRewardsAll(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdShowProviderRewards() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "provider-rewards [address]",
		Short: "shows a provider rewards by address",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			address := args[0]
			params := &types.QueryProviderRewardsRequest{Address: address}
			res, err := queryClient.ProviderRewards(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdShowProviderStake() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "provider-stake [address]",
		Short: "shows a provider stake by address",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			address := args[0]
			params := &types.QueryProviderStakeRequest{Address: address}
			res, err := queryClient.ProviderStake(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

func CmdListProviderStakes() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "provider-stakes",
		Short: "list all provider stakes",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)
			params := &types.QueryProviderStakesRequest{}
			res, err := queryClient.ProviderStakes(cmd.Context(), params)
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}
