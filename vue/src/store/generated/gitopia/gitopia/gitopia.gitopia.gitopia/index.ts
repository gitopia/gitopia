import { txClient, queryClient } from './module'
// @ts-ignore
import { SpVuexError } from '@starport/vuex'

import { User } from "./module/types/gitopia/user"
import { Whois } from "./module/types/gitopia/whois"


async function initTxClient(vuexGetters) {
	return await txClient(vuexGetters['common/wallet/signer'], {
		addr: vuexGetters['common/env/apiTendermint']
	})
}

async function initQueryClient(vuexGetters) {
	return await queryClient({
		addr: vuexGetters['common/env/apiCosmos']
	})
}

function getStructure(template) {
	let structure = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field: any = {}
		field.name = key
		field.type = typeof value
		structure.fields.push(field)
	}
	return structure
}

const getDefaultState = () => {
	return {
        User: {},
        UserAll: {},
        Whois: {},
        WhoisAll: {},
        
        _Structure: {
            User: getStructure(User.fromPartial({})),
            Whois: getStructure(Whois.fromPartial({})),
            
		},
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
			state._Subscriptions.add(subscription)
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(subscription)
		}
	},
	getters: {
        getUser: (state) => (params = {}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.User[JSON.stringify(params)] ?? {}
		},
        getUserAll: (state) => (params = {}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.UserAll[JSON.stringify(params)] ?? {}
		},
        getWhois: (state) => (params = {}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Whois[JSON.stringify(params)] ?? {}
		},
        getWhoisAll: (state) => (params = {}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.WhoisAll[JSON.stringify(params)] ?? {}
		},
        
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('init')
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
			state._Subscriptions.forEach((subscription) => {
				dispatch(subscription.action, subscription.payload)
			})
		},
		async QueryUser({ commit, rootGetters, getters }, { options: { subscribe = false , all = false}, params: {...key}, query=null }) {
			try {
				
				let value = query?(await (await initQueryClient(rootGetters)).queryUser( key.id,  query)).data:(await (await initQueryClient(rootGetters)).queryUser( key.id )).data
				
				commit('QUERY', { query: 'User', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryUser', payload: { options: { all }, params: {...key},query }})
				return getters['getUser']( { params: {...key}, query}) ?? {}
			} catch (e) {
				console.error(new SpVuexError('QueryClient:QueryUser', 'API Node Unavailable. Could not perform query.'))
				return {}
			}
		},
		async QueryUserAll({ commit, rootGetters, getters }, { options: { subscribe = false , all = false}, params: {...key}, query=null }) {
			try {
				
				let value = query?(await (await initQueryClient(rootGetters)).queryUserAll( query)).data:(await (await initQueryClient(rootGetters)).queryUserAll()).data
				
				while (all && (<any> value).pagination && (<any> value).pagination.nextKey!=null) {
					let next_values=(await (await initQueryClient(rootGetters)).queryUserAll({...query, 'pagination.key':(<any> value).pagination.nextKey})).data
					for (let prop of Object.keys(next_values)) {
						if (Array.isArray(next_values[prop])) {
							value[prop]=[...value[prop], ...next_values[prop]]
						}else{
							value[prop]=next_values[prop]
						}
					}
				}
				
				commit('QUERY', { query: 'UserAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryUserAll', payload: { options: { all }, params: {...key},query }})
				return getters['getUserAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				console.error(new SpVuexError('QueryClient:QueryUserAll', 'API Node Unavailable. Could not perform query.'))
				return {}
			}
		},
		async QueryWhois({ commit, rootGetters, getters }, { options: { subscribe = false , all = false}, params: {...key}, query=null }) {
			try {
				
				let value = query?(await (await initQueryClient(rootGetters)).queryWhois( key.name,  query)).data:(await (await initQueryClient(rootGetters)).queryWhois( key.name )).data
				
				commit('QUERY', { query: 'Whois', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryWhois', payload: { options: { all }, params: {...key},query }})
				return getters['getWhois']( { params: {...key}, query}) ?? {}
			} catch (e) {
				console.error(new SpVuexError('QueryClient:QueryWhois', 'API Node Unavailable. Could not perform query.'))
				return {}
			}
		},
		async QueryWhoisAll({ commit, rootGetters, getters }, { options: { subscribe = false , all = false}, params: {...key}, query=null }) {
			try {
				
				let value = query?(await (await initQueryClient(rootGetters)).queryWhoisAll( query)).data:(await (await initQueryClient(rootGetters)).queryWhoisAll()).data
				
				while (all && (<any> value).pagination && (<any> value).pagination.nextKey!=null) {
					let next_values=(await (await initQueryClient(rootGetters)).queryWhoisAll({...query, 'pagination.key':(<any> value).pagination.nextKey})).data
					for (let prop of Object.keys(next_values)) {
						if (Array.isArray(next_values[prop])) {
							value[prop]=[...value[prop], ...next_values[prop]]
						}else{
							value[prop]=next_values[prop]
						}
					}
				}
				
				commit('QUERY', { query: 'WhoisAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryWhoisAll', payload: { options: { all }, params: {...key},query }})
				return getters['getWhoisAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				console.error(new SpVuexError('QueryClient:QueryWhoisAll', 'API Node Unavailable. Could not perform query.'))
				return {}
			}
		},
		
		async sendMsgUpdateWhois({ rootGetters }, { value, fee, memo }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgUpdateWhois(value)
				const result = await (await initTxClient(rootGetters)).signAndBroadcast([msg], {fee: { amount: fee, 
  gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgUpdateWhois:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgUpdateWhois:Send', 'Could not broadcast Tx.')
				}
			}
		},
		async sendMsgUpdateUser({ rootGetters }, { value, fee, memo }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgUpdateUser(value)
				const result = await (await initTxClient(rootGetters)).signAndBroadcast([msg], {fee: { amount: fee, 
  gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgUpdateUser:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgUpdateUser:Send', 'Could not broadcast Tx.')
				}
			}
		},
		async sendMsgDeleteWhois({ rootGetters }, { value, fee, memo }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgDeleteWhois(value)
				const result = await (await initTxClient(rootGetters)).signAndBroadcast([msg], {fee: { amount: fee, 
  gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgDeleteWhois:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgDeleteWhois:Send', 'Could not broadcast Tx.')
				}
			}
		},
		async sendMsgSetWhois({ rootGetters }, { value, fee, memo }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgSetWhois(value)
				const result = await (await initTxClient(rootGetters)).signAndBroadcast([msg], {fee: { amount: fee, 
  gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgSetWhois:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgSetWhois:Send', 'Could not broadcast Tx.')
				}
			}
		},
		async sendMsgCreateUser({ rootGetters }, { value, fee, memo }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgCreateUser(value)
				const result = await (await initTxClient(rootGetters)).signAndBroadcast([msg], {fee: { amount: fee, 
  gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgCreateUser:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgCreateUser:Send', 'Could not broadcast Tx.')
				}
			}
		},
		async sendMsgDeleteUser({ rootGetters }, { value, fee, memo }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgDeleteUser(value)
				const result = await (await initTxClient(rootGetters)).signAndBroadcast([msg], {fee: { amount: fee, 
  gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgDeleteUser:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgDeleteUser:Send', 'Could not broadcast Tx.')
				}
			}
		},
		
		async MsgUpdateWhois({ rootGetters }, { value }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgUpdateWhois(value)
				return msg
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgUpdateWhois:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgUpdateWhois:Create', 'Could not create message.')
				}
			}
		},
		async MsgUpdateUser({ rootGetters }, { value }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgUpdateUser(value)
				return msg
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgUpdateUser:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgUpdateUser:Create', 'Could not create message.')
				}
			}
		},
		async MsgDeleteWhois({ rootGetters }, { value }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgDeleteWhois(value)
				return msg
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgDeleteWhois:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgDeleteWhois:Create', 'Could not create message.')
				}
			}
		},
		async MsgSetWhois({ rootGetters }, { value }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgSetWhois(value)
				return msg
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgSetWhois:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgSetWhois:Create', 'Could not create message.')
				}
			}
		},
		async MsgCreateUser({ rootGetters }, { value }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgCreateUser(value)
				return msg
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgCreateUser:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgCreateUser:Create', 'Could not create message.')
				}
			}
		},
		async MsgDeleteUser({ rootGetters }, { value }) {
			try {
				const msg = await (await initTxClient(rootGetters)).msgDeleteUser(value)
				return msg
			} catch (e) {
				if (e.toString()=='wallet is required') {
					throw new SpVuexError('TxClient:MsgDeleteUser:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgDeleteUser:Create', 'Could not create message.')
				}
			}
		},
		
	}
}
