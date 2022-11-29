import { Client, registry, MissingWalletError } from 'gitopia-gitopia-client-ts'

import { Branch } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { Comment } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { Dao } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { Issue } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { Member } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { PullRequest } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { PullRequestHead } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { PullRequestBase } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { IssueOptions } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { PullRequestOptions } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { RepositoryFork } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { Release } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { Repository } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { RepositoryId } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { BaseRepositoryKey } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { RepositoryOwner } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { RepositoryIssue } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { RepositoryPullRequest } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { RepositoryCollaborator } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { RepositoryLabel } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { RepositoryRelease } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { Attachment } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { RepositoryBackup } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { Tag } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { Task } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { MsgDeleteStorageProviderResponse } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { MsgSetBranch_Branch } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { MsgMultiSetBranch_Branch } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { MsgSetTag_Tag } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { MsgMultiSetTag_Tag } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { User } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { UserDao } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"
import { Whois } from "gitopia-gitopia-client-ts/gitopia.gitopia.gitopia/types"


export { Branch, Comment, Dao, Issue, Member, PullRequest, PullRequestHead, PullRequestBase, IssueOptions, PullRequestOptions, RepositoryFork, Release, Repository, RepositoryId, BaseRepositoryKey, RepositoryOwner, RepositoryIssue, RepositoryPullRequest, RepositoryCollaborator, RepositoryLabel, RepositoryRelease, Attachment, RepositoryBackup, Tag, Task, MsgDeleteStorageProviderResponse, MsgSetBranch_Branch, MsgMultiSetBranch_Branch, MsgSetTag_Tag, MsgMultiSetTag_Tag, User, UserDao, Whois };

function initClient(vuexGetters) {
	return new Client(vuexGetters['common/env/getEnv'], vuexGetters['common/wallet/signer'])
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	let structure: {fields: Field[]} = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const getDefaultState = () => {
	return {
				Task: {},
				TaskAll: {},
				BranchAll: {},
				RepositoryBranch: {},
				RepositoryBranchSha: {},
				RepositoryBranchAll: {},
				TagAll: {},
				RepositoryTag: {},
				RepositoryTagSha: {},
				RepositoryTagAll: {},
				DaoMember: {},
				DaoMemberAll: {},
				MemberAll: {},
				Release: {},
				ReleaseAll: {},
				PullRequest: {},
				PullRequestAll: {},
				Dao: {},
				DaoAll: {},
				Comment: {},
				CommentAll: {},
				Issue: {},
				IssueAll: {},
				RepositoryReleaseLatest: {},
				RepositoryRelease: {},
				RepositoryReleaseAll: {},
				RepositoryIssue: {},
				RepositoryIssueAll: {},
				RepositoryPullRequest: {},
				RepositoryPullRequestAll: {},
				Repository: {},
				RepositoryAll: {},
				ForkAll: {},
				User: {},
				UserDaoAll: {},
				UserAll: {},
				AnyRepositoryAll: {},
				AnyRepository: {},
				Whois: {},
				WhoisAll: {},
				PullRequestMergePermission: {},
				CheckGitServerAuthorization: {},
				CheckStorageProviderAuthorization: {},
				
				_Structure: {
						Branch: getStructure(Branch.fromPartial({})),
						Comment: getStructure(Comment.fromPartial({})),
						Dao: getStructure(Dao.fromPartial({})),
						Issue: getStructure(Issue.fromPartial({})),
						Member: getStructure(Member.fromPartial({})),
						PullRequest: getStructure(PullRequest.fromPartial({})),
						PullRequestHead: getStructure(PullRequestHead.fromPartial({})),
						PullRequestBase: getStructure(PullRequestBase.fromPartial({})),
						IssueOptions: getStructure(IssueOptions.fromPartial({})),
						PullRequestOptions: getStructure(PullRequestOptions.fromPartial({})),
						RepositoryFork: getStructure(RepositoryFork.fromPartial({})),
						Release: getStructure(Release.fromPartial({})),
						Repository: getStructure(Repository.fromPartial({})),
						RepositoryId: getStructure(RepositoryId.fromPartial({})),
						BaseRepositoryKey: getStructure(BaseRepositoryKey.fromPartial({})),
						RepositoryOwner: getStructure(RepositoryOwner.fromPartial({})),
						RepositoryIssue: getStructure(RepositoryIssue.fromPartial({})),
						RepositoryPullRequest: getStructure(RepositoryPullRequest.fromPartial({})),
						RepositoryCollaborator: getStructure(RepositoryCollaborator.fromPartial({})),
						RepositoryLabel: getStructure(RepositoryLabel.fromPartial({})),
						RepositoryRelease: getStructure(RepositoryRelease.fromPartial({})),
						Attachment: getStructure(Attachment.fromPartial({})),
						RepositoryBackup: getStructure(RepositoryBackup.fromPartial({})),
						Tag: getStructure(Tag.fromPartial({})),
						Task: getStructure(Task.fromPartial({})),
						MsgDeleteStorageProviderResponse: getStructure(MsgDeleteStorageProviderResponse.fromPartial({})),
						MsgSetBranch_Branch: getStructure(MsgSetBranch_Branch.fromPartial({})),
						MsgMultiSetBranch_Branch: getStructure(MsgMultiSetBranch_Branch.fromPartial({})),
						MsgSetTag_Tag: getStructure(MsgSetTag_Tag.fromPartial({})),
						MsgMultiSetTag_Tag: getStructure(MsgMultiSetTag_Tag.fromPartial({})),
						User: getStructure(User.fromPartial({})),
						UserDao: getStructure(UserDao.fromPartial({})),
						Whois: getStructure(Whois.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getTask: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Task[JSON.stringify(params)] ?? {}
		},
				getTaskAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.TaskAll[JSON.stringify(params)] ?? {}
		},
				getBranchAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.BranchAll[JSON.stringify(params)] ?? {}
		},
				getRepositoryBranch: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryBranch[JSON.stringify(params)] ?? {}
		},
				getRepositoryBranchSha: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryBranchSha[JSON.stringify(params)] ?? {}
		},
				getRepositoryBranchAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryBranchAll[JSON.stringify(params)] ?? {}
		},
				getTagAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.TagAll[JSON.stringify(params)] ?? {}
		},
				getRepositoryTag: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryTag[JSON.stringify(params)] ?? {}
		},
				getRepositoryTagSha: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryTagSha[JSON.stringify(params)] ?? {}
		},
				getRepositoryTagAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryTagAll[JSON.stringify(params)] ?? {}
		},
				getDaoMember: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.DaoMember[JSON.stringify(params)] ?? {}
		},
				getDaoMemberAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.DaoMemberAll[JSON.stringify(params)] ?? {}
		},
				getMemberAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.MemberAll[JSON.stringify(params)] ?? {}
		},
				getRelease: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Release[JSON.stringify(params)] ?? {}
		},
				getReleaseAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ReleaseAll[JSON.stringify(params)] ?? {}
		},
				getPullRequest: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.PullRequest[JSON.stringify(params)] ?? {}
		},
				getPullRequestAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.PullRequestAll[JSON.stringify(params)] ?? {}
		},
				getDao: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Dao[JSON.stringify(params)] ?? {}
		},
				getDaoAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.DaoAll[JSON.stringify(params)] ?? {}
		},
				getComment: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Comment[JSON.stringify(params)] ?? {}
		},
				getCommentAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.CommentAll[JSON.stringify(params)] ?? {}
		},
				getIssue: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Issue[JSON.stringify(params)] ?? {}
		},
				getIssueAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.IssueAll[JSON.stringify(params)] ?? {}
		},
				getRepositoryReleaseLatest: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryReleaseLatest[JSON.stringify(params)] ?? {}
		},
				getRepositoryRelease: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryRelease[JSON.stringify(params)] ?? {}
		},
				getRepositoryReleaseAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryReleaseAll[JSON.stringify(params)] ?? {}
		},
				getRepositoryIssue: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryIssue[JSON.stringify(params)] ?? {}
		},
				getRepositoryIssueAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryIssueAll[JSON.stringify(params)] ?? {}
		},
				getRepositoryPullRequest: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryPullRequest[JSON.stringify(params)] ?? {}
		},
				getRepositoryPullRequestAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryPullRequestAll[JSON.stringify(params)] ?? {}
		},
				getRepository: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Repository[JSON.stringify(params)] ?? {}
		},
				getRepositoryAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RepositoryAll[JSON.stringify(params)] ?? {}
		},
				getForkAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ForkAll[JSON.stringify(params)] ?? {}
		},
				getUser: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.User[JSON.stringify(params)] ?? {}
		},
				getUserDaoAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.UserDaoAll[JSON.stringify(params)] ?? {}
		},
				getUserAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.UserAll[JSON.stringify(params)] ?? {}
		},
				getAnyRepositoryAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AnyRepositoryAll[JSON.stringify(params)] ?? {}
		},
				getAnyRepository: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.AnyRepository[JSON.stringify(params)] ?? {}
		},
				getWhois: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Whois[JSON.stringify(params)] ?? {}
		},
				getWhoisAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.WhoisAll[JSON.stringify(params)] ?? {}
		},
				getPullRequestMergePermission: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.PullRequestMergePermission[JSON.stringify(params)] ?? {}
		},
				getCheckGitServerAuthorization: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.CheckGitServerAuthorization[JSON.stringify(params)] ?? {}
		},
				getCheckStorageProviderAuthorization: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.CheckStorageProviderAuthorization[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: gitopia.gitopia.gitopia initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryTask({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryTask( key.id)).data
				
					
				commit('QUERY', { query: 'Task', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryTask', payload: { options: { all }, params: {...key},query }})
				return getters['getTask']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryTask API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryTaskAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryTaskAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryTaskAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'TaskAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryTaskAll', payload: { options: { all }, params: {...key},query }})
				return getters['getTaskAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryTaskAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryBranchAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryBranchAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryBranchAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'BranchAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryBranchAll', payload: { options: { all }, params: {...key},query }})
				return getters['getBranchAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryBranchAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryBranch({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryBranch( key.id,  key.repositoryName,  key.branchName)).data
				
					
				commit('QUERY', { query: 'RepositoryBranch', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryBranch', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryBranch']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryBranch API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryBranchSha({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryBranchSha( key.id,  key.repositoryName,  key.branchName)).data
				
					
				commit('QUERY', { query: 'RepositoryBranchSha', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryBranchSha', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryBranchSha']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryBranchSha API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryBranchAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryBranchAll( key.id,  key.repositoryName, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryRepositoryBranchAll( key.id,  key.repositoryName, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'RepositoryBranchAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryBranchAll', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryBranchAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryBranchAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryTagAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryTagAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryTagAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'TagAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryTagAll', payload: { options: { all }, params: {...key},query }})
				return getters['getTagAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryTagAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryTag({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryTag( key.id,  key.repositoryName,  key.tagName)).data
				
					
				commit('QUERY', { query: 'RepositoryTag', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryTag', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryTag']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryTag API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryTagSha({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryTagSha( key.id,  key.repositoryName,  key.tagName)).data
				
					
				commit('QUERY', { query: 'RepositoryTagSha', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryTagSha', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryTagSha']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryTagSha API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryTagAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryTagAll( key.id,  key.repositoryName, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryRepositoryTagAll( key.id,  key.repositoryName, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'RepositoryTagAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryTagAll', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryTagAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryTagAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryDaoMember({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryDaoMember( key.daoId,  key.userId)).data
				
					
				commit('QUERY', { query: 'DaoMember', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryDaoMember', payload: { options: { all }, params: {...key},query }})
				return getters['getDaoMember']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryDaoMember API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryDaoMemberAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryDaoMemberAll( key.daoId, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryDaoMemberAll( key.daoId, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'DaoMemberAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryDaoMemberAll', payload: { options: { all }, params: {...key},query }})
				return getters['getDaoMemberAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryDaoMemberAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryMemberAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryMemberAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryMemberAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'MemberAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryMemberAll', payload: { options: { all }, params: {...key},query }})
				return getters['getMemberAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryMemberAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRelease({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRelease( key.id)).data
				
					
				commit('QUERY', { query: 'Release', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRelease', payload: { options: { all }, params: {...key},query }})
				return getters['getRelease']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRelease API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryReleaseAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryReleaseAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryReleaseAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'ReleaseAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryReleaseAll', payload: { options: { all }, params: {...key},query }})
				return getters['getReleaseAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryReleaseAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryPullRequest({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryPullRequest( key.id)).data
				
					
				commit('QUERY', { query: 'PullRequest', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryPullRequest', payload: { options: { all }, params: {...key},query }})
				return getters['getPullRequest']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryPullRequest API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryPullRequestAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryPullRequestAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryPullRequestAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'PullRequestAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryPullRequestAll', payload: { options: { all }, params: {...key},query }})
				return getters['getPullRequestAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryPullRequestAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryDao({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryDao( key.id)).data
				
					
				commit('QUERY', { query: 'Dao', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryDao', payload: { options: { all }, params: {...key},query }})
				return getters['getDao']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryDao API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryDaoAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryDaoAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryDaoAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'DaoAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryDaoAll', payload: { options: { all }, params: {...key},query }})
				return getters['getDaoAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryDaoAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryComment({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryComment( key.id)).data
				
					
				commit('QUERY', { query: 'Comment', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryComment', payload: { options: { all }, params: {...key},query }})
				return getters['getComment']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryComment API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryCommentAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryCommentAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryCommentAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'CommentAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryCommentAll', payload: { options: { all }, params: {...key},query }})
				return getters['getCommentAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryCommentAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryIssue({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryIssue( key.id)).data
				
					
				commit('QUERY', { query: 'Issue', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryIssue', payload: { options: { all }, params: {...key},query }})
				return getters['getIssue']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryIssue API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryIssueAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryIssueAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryIssueAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'IssueAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryIssueAll', payload: { options: { all }, params: {...key},query }})
				return getters['getIssueAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryIssueAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryReleaseLatest({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryReleaseLatest( key.id,  key.repositoryName)).data
				
					
				commit('QUERY', { query: 'RepositoryReleaseLatest', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryReleaseLatest', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryReleaseLatest']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryReleaseLatest API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryRelease({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryRelease( key.id,  key.repositoryName,  key.tagName)).data
				
					
				commit('QUERY', { query: 'RepositoryRelease', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryRelease', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryRelease']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryRelease API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryReleaseAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryReleaseAll( key.id,  key.repositoryName, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryRepositoryReleaseAll( key.id,  key.repositoryName, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'RepositoryReleaseAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryReleaseAll', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryReleaseAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryReleaseAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryIssue({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryIssue( key.id,  key.repositoryName,  key.issueIid)).data
				
					
				commit('QUERY', { query: 'RepositoryIssue', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryIssue', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryIssue']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryIssue API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryIssueAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryIssueAll( key.id,  key.repositoryName, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryRepositoryIssueAll( key.id,  key.repositoryName, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'RepositoryIssueAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryIssueAll', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryIssueAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryIssueAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryPullRequest({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryPullRequest( key.id,  key.repositoryName,  key.pullIid)).data
				
					
				commit('QUERY', { query: 'RepositoryPullRequest', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryPullRequest', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryPullRequest']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryPullRequest API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryPullRequestAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryPullRequestAll( key.id,  key.repositoryName, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryRepositoryPullRequestAll( key.id,  key.repositoryName, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'RepositoryPullRequestAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryPullRequestAll', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryPullRequestAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryPullRequestAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepository({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepository( key.id)).data
				
					
				commit('QUERY', { query: 'Repository', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepository', payload: { options: { all }, params: {...key},query }})
				return getters['getRepository']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepository API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRepositoryAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryRepositoryAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryRepositoryAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'RepositoryAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRepositoryAll', payload: { options: { all }, params: {...key},query }})
				return getters['getRepositoryAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRepositoryAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryForkAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryForkAll( key.id,  key.repositoryName, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryForkAll( key.id,  key.repositoryName, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'ForkAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryForkAll', payload: { options: { all }, params: {...key},query }})
				return getters['getForkAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryForkAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryUser({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryUser( key.id)).data
				
					
				commit('QUERY', { query: 'User', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryUser', payload: { options: { all }, params: {...key},query }})
				return getters['getUser']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryUser API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryUserDaoAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryUserDaoAll( key.userId, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryUserDaoAll( key.userId, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'UserDaoAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryUserDaoAll', payload: { options: { all }, params: {...key},query }})
				return getters['getUserDaoAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryUserDaoAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryUserAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryUserAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryUserAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'UserAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryUserAll', payload: { options: { all }, params: {...key},query }})
				return getters['getUserAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryUserAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAnyRepositoryAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryAnyRepositoryAll( key.id, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryAnyRepositoryAll( key.id, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'AnyRepositoryAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAnyRepositoryAll', payload: { options: { all }, params: {...key},query }})
				return getters['getAnyRepositoryAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAnyRepositoryAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryAnyRepository({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryAnyRepository( key.id,  key.repositoryName)).data
				
					
				commit('QUERY', { query: 'AnyRepository', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryAnyRepository', payload: { options: { all }, params: {...key},query }})
				return getters['getAnyRepository']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryAnyRepository API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryWhois({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryWhois( key.name)).data
				
					
				commit('QUERY', { query: 'Whois', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryWhois', payload: { options: { all }, params: {...key},query }})
				return getters['getWhois']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryWhois API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryWhoisAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryWhoisAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.GitopiaGitopiaGitopia.query.queryWhoisAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'WhoisAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryWhoisAll', payload: { options: { all }, params: {...key},query }})
				return getters['getWhoisAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryWhoisAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryPullRequestMergePermission({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryPullRequestMergePermission( key.userId,  key.pullId)).data
				
					
				commit('QUERY', { query: 'PullRequestMergePermission', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryPullRequestMergePermission', payload: { options: { all }, params: {...key},query }})
				return getters['getPullRequestMergePermission']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryPullRequestMergePermission API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryCheckGitServerAuthorization({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryCheckGitServerAuthorization( key.userAddress,  key.providerAddress)).data
				
					
				commit('QUERY', { query: 'CheckGitServerAuthorization', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryCheckGitServerAuthorization', payload: { options: { all }, params: {...key},query }})
				return getters['getCheckGitServerAuthorization']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryCheckGitServerAuthorization API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryCheckStorageProviderAuthorization({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.GitopiaGitopiaGitopia.query.queryCheckStorageProviderAuthorization( key.userAddress,  key.providerAddress)).data
				
					
				commit('QUERY', { query: 'CheckStorageProviderAuthorization', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryCheckStorageProviderAuthorization', payload: { options: { all }, params: {...key},query }})
				return getters['getCheckStorageProviderAuthorization']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryCheckStorageProviderAuthorization API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgDeleteRelease({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgDeleteRelease({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteRelease:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteRelease:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateDaoDescription({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateDaoDescription({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateDaoDescription:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateDaoDescription:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateUser({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgCreateUser({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateUser:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateUser:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateIssueTitle({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateIssueTitle({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateIssueTitle:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateIssueTitle:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateMemberRole({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateMemberRole({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateMemberRole:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateMemberRole:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSetPullRequestState({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgSetPullRequestState({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetPullRequestState:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSetPullRequestState:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgChangeOwner({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgChangeOwner({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgChangeOwner:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgChangeOwner:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRemovePullRequestAssignees({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgRemovePullRequestAssignees({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemovePullRequestAssignees:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRemovePullRequestAssignees:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgToggleRepositoryForking({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgToggleRepositoryForking({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgToggleRepositoryForking:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgToggleRepositoryForking:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSetDefaultBranch({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgSetDefaultBranch({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetDefaultBranch:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSetDefaultBranch:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeletePullRequest({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgDeletePullRequest({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeletePullRequest:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeletePullRequest:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateDaoWebsite({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateDaoWebsite({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateDaoWebsite:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateDaoWebsite:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateTask({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgCreateTask({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateTask:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateTask:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateIssue({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgCreateIssue({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateIssue:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateIssue:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateRepositoryCollaborator({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateRepositoryCollaborator({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateRepositoryCollaborator:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateRepositoryCollaborator:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgMultiDeleteTag({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgMultiDeleteTag({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgMultiDeleteTag:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgMultiDeleteTag:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgInvokeForkRepository({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgInvokeForkRepository({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgInvokeForkRepository:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgInvokeForkRepository:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateRepositoryLabel({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgCreateRepositoryLabel({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateRepositoryLabel:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateRepositoryLabel:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgToggleIssueState({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgToggleIssueState({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgToggleIssueState:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgToggleIssueState:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRemoveIssueAssignees({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgRemoveIssueAssignees({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveIssueAssignees:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRemoveIssueAssignees:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgForkRepository({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgForkRepository({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgForkRepository:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgForkRepository:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteTask({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgDeleteTask({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteTask:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteTask:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAuthorizeProvider({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgAuthorizeProvider({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAuthorizeProvider:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAuthorizeProvider:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRemoveIssueLabels({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgRemoveIssueLabels({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveIssueLabels:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRemoveIssueLabels:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSetTag({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgSetTag({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetTag:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSetTag:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateRelease({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgCreateRelease({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateRelease:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateRelease:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgMultiSetTag({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgMultiSetTag({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgMultiSetTag:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgMultiSetTag:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreatePullRequest({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgCreatePullRequest({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreatePullRequest:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreatePullRequest:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateRepositoryLabel({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateRepositoryLabel({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateRepositoryLabel:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateRepositoryLabel:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateUserBio({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateUserBio({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateUserBio:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateUserBio:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteBranch({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgDeleteBranch({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteBranch:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteBranch:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgToggleArweaveBackup({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgToggleArweaveBackup({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgToggleArweaveBackup:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgToggleArweaveBackup:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateRepositoryBackupRef({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateRepositoryBackupRef({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateRepositoryBackupRef:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateRepositoryBackupRef:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRemoveMember({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgRemoveMember({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveMember:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRemoveMember:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteUser({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgDeleteUser({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteUser:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteUser:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRenameDao({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgRenameDao({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRenameDao:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRenameDao:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddPullRequestReviewers({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgAddPullRequestReviewers({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddPullRequestReviewers:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddPullRequestReviewers:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateRepositoryDescription({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateRepositoryDescription({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateRepositoryDescription:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateRepositoryDescription:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgMultiSetBranch({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgMultiSetBranch({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgMultiSetBranch:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgMultiSetBranch:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateComment({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateComment({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateComment:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateComment:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteRepository({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgDeleteRepository({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteRepository:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteRepository:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddIssueAssignees({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgAddIssueAssignees({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddIssueAssignees:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddIssueAssignees:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSetBranch({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgSetBranch({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetBranch:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSetBranch:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateUserName({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateUserName({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateUserName:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateUserName:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateRepository({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgCreateRepository({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateRepository:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateRepository:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRenameRepository({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgRenameRepository({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRenameRepository:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRenameRepository:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateDaoAvatar({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateDaoAvatar({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateDaoAvatar:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateDaoAvatar:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddMember({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgAddMember({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddMember:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddMember:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteRepositoryLabel({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgDeleteRepositoryLabel({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteRepositoryLabel:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteRepositoryLabel:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteIssue({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgDeleteIssue({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteIssue:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteIssue:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRemovePullRequestReviewers({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgRemovePullRequestReviewers({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemovePullRequestReviewers:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRemovePullRequestReviewers:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateIssueDescription({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateIssueDescription({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateIssueDescription:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateIssueDescription:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRemoveRepositoryCollaborator({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgRemoveRepositoryCollaborator({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveRepositoryCollaborator:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRemoveRepositoryCollaborator:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgInvokeMergePullRequest({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgInvokeMergePullRequest({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgInvokeMergePullRequest:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgInvokeMergePullRequest:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteTag({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgDeleteTag({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteTag:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteTag:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateRelease({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateRelease({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateRelease:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateRelease:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgForkRepositorySuccess({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgForkRepositorySuccess({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgForkRepositorySuccess:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgForkRepositorySuccess:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateComment({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgCreateComment({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateComment:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateComment:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRevokeProviderPermission({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgRevokeProviderPermission({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRevokeProviderPermission:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRevokeProviderPermission:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateDaoLocation({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateDaoLocation({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateDaoLocation:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateDaoLocation:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteComment({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgDeleteComment({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteComment:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteComment:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateDao({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgCreateDao({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateDao:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateDao:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteDao({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgDeleteDao({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteDao:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteDao:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddPullRequestAssignees({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgAddPullRequestAssignees({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddPullRequestAssignees:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddPullRequestAssignees:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddPullRequestLabels({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgAddPullRequestLabels({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddPullRequestLabels:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddPullRequestLabels:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgMultiDeleteBranch({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgMultiDeleteBranch({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgMultiDeleteBranch:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgMultiDeleteBranch:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddIssueLabels({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgAddIssueLabels({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddIssueLabels:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddIssueLabels:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateUserAvatar({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateUserAvatar({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateUserAvatar:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateUserAvatar:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdatePullRequestDescription({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdatePullRequestDescription({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdatePullRequestDescription:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdatePullRequestDescription:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateUserUsername({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateUserUsername({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateUserUsername:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateUserUsername:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgRemovePullRequestLabels({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgRemovePullRequestLabels({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemovePullRequestLabels:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgRemovePullRequestLabels:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddRepositoryBackupRef({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgAddRepositoryBackupRef({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddRepositoryBackupRef:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddRepositoryBackupRef:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdatePullRequestTitle({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdatePullRequestTitle({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdatePullRequestTitle:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdatePullRequestTitle:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUpdateTask({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.GitopiaGitopiaGitopia.tx.sendMsgUpdateTask({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateTask:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateTask:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgDeleteRelease({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgDeleteRelease({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteRelease:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteRelease:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateDaoDescription({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateDaoDescription({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateDaoDescription:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateDaoDescription:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateUser({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgCreateUser({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateUser:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateUser:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateIssueTitle({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateIssueTitle({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateIssueTitle:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateIssueTitle:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateMemberRole({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateMemberRole({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateMemberRole:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateMemberRole:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSetPullRequestState({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgSetPullRequestState({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetPullRequestState:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSetPullRequestState:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgChangeOwner({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgChangeOwner({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgChangeOwner:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgChangeOwner:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRemovePullRequestAssignees({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgRemovePullRequestAssignees({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemovePullRequestAssignees:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRemovePullRequestAssignees:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgToggleRepositoryForking({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgToggleRepositoryForking({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgToggleRepositoryForking:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgToggleRepositoryForking:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSetDefaultBranch({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgSetDefaultBranch({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetDefaultBranch:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSetDefaultBranch:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeletePullRequest({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgDeletePullRequest({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeletePullRequest:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeletePullRequest:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateDaoWebsite({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateDaoWebsite({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateDaoWebsite:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateDaoWebsite:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateTask({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgCreateTask({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateTask:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateTask:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateIssue({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgCreateIssue({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateIssue:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateIssue:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateRepositoryCollaborator({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateRepositoryCollaborator({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateRepositoryCollaborator:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateRepositoryCollaborator:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgMultiDeleteTag({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgMultiDeleteTag({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgMultiDeleteTag:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgMultiDeleteTag:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgInvokeForkRepository({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgInvokeForkRepository({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgInvokeForkRepository:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgInvokeForkRepository:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateRepositoryLabel({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgCreateRepositoryLabel({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateRepositoryLabel:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateRepositoryLabel:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgToggleIssueState({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgToggleIssueState({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgToggleIssueState:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgToggleIssueState:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRemoveIssueAssignees({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgRemoveIssueAssignees({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveIssueAssignees:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRemoveIssueAssignees:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgForkRepository({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgForkRepository({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgForkRepository:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgForkRepository:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeleteTask({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgDeleteTask({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteTask:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteTask:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAuthorizeProvider({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgAuthorizeProvider({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAuthorizeProvider:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAuthorizeProvider:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRemoveIssueLabels({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgRemoveIssueLabels({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveIssueLabels:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRemoveIssueLabels:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSetTag({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgSetTag({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetTag:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSetTag:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateRelease({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgCreateRelease({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateRelease:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateRelease:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgMultiSetTag({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgMultiSetTag({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgMultiSetTag:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgMultiSetTag:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreatePullRequest({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgCreatePullRequest({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreatePullRequest:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreatePullRequest:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateRepositoryLabel({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateRepositoryLabel({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateRepositoryLabel:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateRepositoryLabel:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateUserBio({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateUserBio({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateUserBio:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateUserBio:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeleteBranch({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgDeleteBranch({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteBranch:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteBranch:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgToggleArweaveBackup({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgToggleArweaveBackup({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgToggleArweaveBackup:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgToggleArweaveBackup:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateRepositoryBackupRef({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateRepositoryBackupRef({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateRepositoryBackupRef:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateRepositoryBackupRef:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRemoveMember({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgRemoveMember({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveMember:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRemoveMember:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeleteUser({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgDeleteUser({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteUser:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteUser:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRenameDao({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgRenameDao({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRenameDao:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRenameDao:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddPullRequestReviewers({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgAddPullRequestReviewers({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddPullRequestReviewers:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddPullRequestReviewers:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateRepositoryDescription({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateRepositoryDescription({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateRepositoryDescription:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateRepositoryDescription:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgMultiSetBranch({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgMultiSetBranch({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgMultiSetBranch:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgMultiSetBranch:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateComment({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateComment({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateComment:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateComment:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeleteRepository({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgDeleteRepository({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteRepository:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteRepository:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddIssueAssignees({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgAddIssueAssignees({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddIssueAssignees:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddIssueAssignees:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSetBranch({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgSetBranch({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSetBranch:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSetBranch:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateUserName({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateUserName({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateUserName:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateUserName:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateRepository({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgCreateRepository({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateRepository:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateRepository:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRenameRepository({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgRenameRepository({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRenameRepository:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRenameRepository:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateDaoAvatar({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateDaoAvatar({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateDaoAvatar:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateDaoAvatar:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddMember({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgAddMember({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddMember:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddMember:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeleteRepositoryLabel({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgDeleteRepositoryLabel({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteRepositoryLabel:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteRepositoryLabel:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeleteIssue({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgDeleteIssue({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteIssue:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteIssue:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRemovePullRequestReviewers({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgRemovePullRequestReviewers({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemovePullRequestReviewers:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRemovePullRequestReviewers:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateIssueDescription({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateIssueDescription({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateIssueDescription:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateIssueDescription:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRemoveRepositoryCollaborator({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgRemoveRepositoryCollaborator({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemoveRepositoryCollaborator:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRemoveRepositoryCollaborator:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgInvokeMergePullRequest({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgInvokeMergePullRequest({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgInvokeMergePullRequest:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgInvokeMergePullRequest:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeleteTag({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgDeleteTag({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteTag:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteTag:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateRelease({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateRelease({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateRelease:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateRelease:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgForkRepositorySuccess({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgForkRepositorySuccess({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgForkRepositorySuccess:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgForkRepositorySuccess:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateComment({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgCreateComment({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateComment:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateComment:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRevokeProviderPermission({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgRevokeProviderPermission({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRevokeProviderPermission:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRevokeProviderPermission:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateDaoLocation({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateDaoLocation({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateDaoLocation:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateDaoLocation:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeleteComment({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgDeleteComment({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteComment:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteComment:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateDao({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgCreateDao({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateDao:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateDao:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeleteDao({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgDeleteDao({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteDao:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteDao:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddPullRequestAssignees({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgAddPullRequestAssignees({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddPullRequestAssignees:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddPullRequestAssignees:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddPullRequestLabels({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgAddPullRequestLabels({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddPullRequestLabels:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddPullRequestLabels:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgMultiDeleteBranch({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgMultiDeleteBranch({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgMultiDeleteBranch:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgMultiDeleteBranch:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddIssueLabels({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgAddIssueLabels({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddIssueLabels:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddIssueLabels:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateUserAvatar({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateUserAvatar({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateUserAvatar:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateUserAvatar:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdatePullRequestDescription({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdatePullRequestDescription({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdatePullRequestDescription:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdatePullRequestDescription:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateUserUsername({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateUserUsername({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateUserUsername:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateUserUsername:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgRemovePullRequestLabels({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgRemovePullRequestLabels({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgRemovePullRequestLabels:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgRemovePullRequestLabels:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddRepositoryBackupRef({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgAddRepositoryBackupRef({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddRepositoryBackupRef:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddRepositoryBackupRef:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdatePullRequestTitle({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdatePullRequestTitle({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdatePullRequestTitle:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdatePullRequestTitle:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUpdateTask({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.GitopiaGitopiaGitopia.tx.msgUpdateTask({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateTask:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateTask:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
