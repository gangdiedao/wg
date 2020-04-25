import * as systemApi from '@/api/system'

const state = {
  dictTypeList: '',
  dictList: [],
  city: [],
}

const mutations = {
  SET_DICT_LIST: (state, data) => {
    state.dictList = data.data.data
  },
  SET_DICTTYPE_LIST: (state, data) => {
    state.dictTypeList = data.data
  },
  SET_CITY: (state, data) => {
    state.city = data.data.reverse()
  }
}

const actions = {
  async getDictTypeList({ commit }, params) {
    commit('SET_DICTTYPE_LIST', await systemApi.getDictTypes(params))
  },

  async getDictList({ commit }, params) {
    let res = await systemApi.getDictList(params)
    commit('SET_DICT_LIST', res)
    return res
  },

  async getCity({ commit }) {
    commit('SET_CITY', await systemApi.getOtherDictList({type: 'city'}))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
