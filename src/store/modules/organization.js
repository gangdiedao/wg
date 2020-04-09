import * as organizationApi from '@/api/organization'

const state = {
  deptList: []
}

const mutations = {
  SET_DEPT_LIST: (state, data) => {
    state.deptList = data.data.data
  },
}

const actions = {
  async getDeptList({ commit }, params) {
    commit('SET_DEPT_LIST', await organizationApi.getDeptList(params))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
