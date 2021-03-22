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
      // 用户中心
      {
        path: "/user",
        name: "User",
        meta: {
          title: "用户中心"
        },
        component: () => import("@/views/User/index")
      },
      // 用户信息
      {
        path: "/login",
        name: "Login",
        meta: {
          title: "登录"
        },
        component: () => import("@/views/Account/login")
      },
      {
        path: "/register",
        name: "Register",
        meta: {
          title: "注册"
        },
        component: () => import("@/views/Account/register")
      },
      {
        path: "/forget",
        name: "Forget",
        meta: {
          title: "忘记密码"
        },
        component: () => import("../views/Account/forget")
      },
      // 安全设置
      {
        path: "/safe",
        name: "Safe",
        meta: {
          title: "安全设置"
        },
        component: () => import("@/views/Safe/index")
      },
      {
        path: "/password",
        name: "Password",
        meta: {
          title: "重置密码"
        },
        component: () => import("../views/Safe/password")
      },
      {
        path: "/capital",
        name: "Capital",
        meta: {
          title: "设置资金密码"
        },
        component: () => import("../views/Safe/capital")
      },
      {
        path: "/bank",
        name: "Bank",
        meta: {
          title: "绑定银行卡"
        },
        component: () => import("../views/Safe/bank")
      },
      {
        path: "/bankAdd",
        name: "BankAdd",
        meta: {
          title: "添加银行卡"
        },
        component: () => import("../views/Safe/bankAdd")
      },
      // 实名认证
      {
        path: "/authentication",
        name: "Authentication",
        meta: {
          title: "实名认证"
        },
        component: () => import("../views/Authentication/index")
      },
      // 我的帐户
      {
        path: "/my",
        name: "My",
        meta: {
          title: "我的帐户"
        },
        component: () => import("../views/My/index")
      },
      // 订单
      {
        path: "/order",
        name: "Order",
        meta: {
          title: "租车订单"
        },
        component: () => import("../views/Order/index")
      },
      {
        path: "/orderDetailed",
        name: "OrderDetailed",
        meta: {
          title: "订单详情"
        },
        component: () => import("../views/Order/detailed")
      },
      // 支付相关
      {
        path: "/recharge",
        name: "Recharge",
        meta: {
          title: "充值"
        },
        component: () => import("../views/Pay/index")
      },
      {
        path: "/payStatus",
        name: "PayStatus",
        meta: {
          title: "支付状态"
        },
        component: () => import("../views/Pay/status")
      },
      {
        path: "/payResult",
        name: "PayResult",
        meta: {
          title: "支付结果"
        },
        component: () => import("../views/Pay/result")
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
