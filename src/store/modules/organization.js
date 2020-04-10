import * as organizationApi from '@/api/organization'

const state = {
  deptList: [],
  roleList: [],
  menus: []
}

const mutations = {
  SET_DEPT_LIST: (state, data) => {
    state.deptList = data.data.data
  },
  SET_ROLE_LIST: (state, data) => {
    state.roleList = data.data.data
  },
  SET_MENUS: (state, data) => {
    state.menus = data.data
  }
}

const actions = {
  async getDeptList({ commit }, params) {
    commit('SET_DEPT_LIST', await organizationApi.getDeptList(params))
  },

  async getRoleList({ commit }, params) {
    commit('SET_ROLE_LIST', await organizationApi.getRoleList(params))
  },

  async getMenus({ commit }, params) {
    commit('SET_MENUS', await organizationApi.getMenus(params))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
