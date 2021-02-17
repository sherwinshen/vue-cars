const state = {
  selfLocation: true
};
const mutations = {
  SELF_LOCATION() {
    state.selfLocation = !state.selfLocation; // 在map中监听值改变从而进行处理
  }
};
const actions = {};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
