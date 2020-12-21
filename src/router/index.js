import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/user",
        name: "User",
        component: () => import("@/views/Users/index")
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
