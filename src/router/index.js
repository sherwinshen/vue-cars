import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
      {
        path: "/user",
        name: "User",
        component: () => import("@/views/User/index")
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login/index")
      },
      {
        path: "/safe",
        name: "Safe",
        component: () => import("@/views/Safe/index")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
