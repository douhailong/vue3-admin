import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  // 登录
  {
    path: "/",
    name: "Login",
    meta: {
      hidden: true,
      title: "登录",
    },
    component: () => import("../views/account/login.vue"),
  },
  // 注册
  {
    path: "/register",
    name: "Register",
    meta: {
      hidden: true,
      title: "注册",
    },
    component: () => import("../views/account/register.vue"),
  },
  // 忘记密码
  {
    path: "/forget",
    name: "Forget",
    meta: {
      hidden: true,
      title: "忘记密码",
    },
    component: () => import("../views/account/forget.vue"),
  },
  // 首页
  {
    path: "/index",
    name: "Index",
    meta: {
      title: "首页",
      icon: "home",
    },
    component: () => import("../views/layout/Index.vue"),
    children: [{
        path: "/home",
        name: "Home",
        meta: {
            title: '首页',
        },
        component: () =>
            import ("../views/home/Index.vue")
    }]
  },
  // 管理总台
  {
    path: "/adminIndex",
    name: "AdminIndex",
    meta: {
      title: "管理总台",
      icon: "console",
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/role",
        name: "Role",
        meta: {
          title: "角色管理",
        },
        component: () => import("../views/admin/Role.vue"),
      },
      {
        path: "/user",
        name: "User",
        meta: {
          title: "用户管理",
        },
        component: () => import("../views/admin/User.vue"),
      },
      {
        path: "/menu",
        name: "Menu",
        meta: {
          title: "菜单列表",
        },
        component: () => import("../views/admin/Menu.vue"),
      },
    ],
  },
  // 信息管理
  {
    path: "/info",
    name: "Info",
    meta: {
      title: "信息管理",
      icon: "info",
      // hidden: true,
    },
    component: () => import("../views/layout/Index.vue"),
  },
  // 会员管理
  {
    path: "/member",
    name: "Member",
    meta: {
      title: "会员管理",
      icon: "member",
    },
    component: () => import("../views/layout/Index.vue"),
    children: [],
  },
  // 产品管理
  {
    path: "/product",
    name: "Product",
    meta: {
      title: "产品管理",
      icon: "product",
    },
    component: () => import("../views/layout/Index.vue"),
    children: [],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
