import * as systemApi from '@/api/system'

const state = {
  dictTypeList: '',
  dictList: []
}

const mutations = {
  SET_DICT_LIST: (state, data) => {
    state.dictList = data.data.data
  },
  SET_DICTTYPE_LIST: (state, data) => {
    state.dictTypeList = data.data
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
