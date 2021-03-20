import router from "./index";
import store from "../store";

// 守卫路由，进入路由之前处理
router.beforeEach((to, form, next) => {
  if (to.meta && to.meta.title) {
    const routerName = to.meta.title;
    document.title = routerName; // 浏览器上显示的网页title
    store.commit("app/SET_ROUTER_NAME", routerName);
  }
  next();
});
