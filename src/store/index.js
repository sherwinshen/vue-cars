import Vue from "vue";
import Vuex from "vuex";

import location from "@/store/modules/location";
import app from "@/store/modules/app";
import login from "@/store/modules/login";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    location,
    app,
    login
  }
});
