import { AdminLogin } from "@/api/login";
import { Register, Login } from "@/api/account";
import {
  setAdminToken,
  setAdminName,
  getAdminName,
  getAccountName,
  setAccountToken,
  setAccountName,
  removeAccountName,
  removeAccountToken,
  getAccountToken
} from "@/utils/cookies";

const state = {
  toKen: "",
  username: getAdminName() || "",
  accountToken: getAccountToken || "",
  accountName: getAccountName() || ""
};
const mutations = {
  SET_ADMIN_TOKEN(state, value) {
    state.toKen = value;
  },
  SET_ADMIN_NAME(state, value) {
    state.username = value;
  },
  SET_ACCOUNT_TOKEN(state, value) {
    state.accountToken = value;
  },
  SET_ACCOUNT_NAME(state, value) {
    state.accountName = value;
  }
};
const getters = {};
const actions = {
  adminLogin(content, requestData) {
    return new Promise((resolve, reject) => {
      AdminLogin(requestData)
        .then(response => {
          content.commit("SET_ADMIN_TOKEN", response.data.data.token);
          content.commit("SET_ADMIN_NAME", response.data.data.username);
          setAdminToken(response.data.data.token);
          setAdminName(response.data.data.username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  accountLogin(context, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData)
        .then(response => {
          const data = response.data.data;
          context.commit("SET_ACCOUNT_TOKEN", data.token);
          context.commit("SET_ACCOUNT_NAME", data.username);
          setAccountToken(data.token);
          setAccountName(data.username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  accountRegister(context, requestData) {
    return new Promise((resolve, reject) => {
      Register(requestData)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  accountLogout(context) {
    return new Promise(resolve => {
      context.commit("SET_ACCOUNT_TOKEN", "");
      context.commit("SET_ACCOUNT_NAME", "");
      removeAccountName();
      removeAccountToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
