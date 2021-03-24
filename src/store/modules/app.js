const state = {
  // 是否点击了车辆列表
  isClickCarsList: true,
  // 是否是请求车辆列表
  isRequestCarsList: false,
  // 路由title
  routerName: "",
  // 首页是否刷新
  isReset: false
};
const mutations = {
  SET_CARS_LIST_STATUS(state, value) {
    state.isClickCarsList = value;
  },
  SET_CARS_LIST_REQUEST(state, value) {
    state.isRequestCarsList = value;
  },
  SET_ROUTER_NAME(state, value) {
    state.routerName = value;
  },
  SET_INDEX_RESET(state, value) {
    state.isReset = value;
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
