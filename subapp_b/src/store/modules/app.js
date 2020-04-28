export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    // 设置token
    SET_TOKEN(state, data) {
      state.token = data;
    },
  },
  actions: {
    // 设置token
    setToken({ commit }, data) {
      commit('SET_TOKEN', data)
    }
  }
}