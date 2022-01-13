import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  // 登录
  {
    path: "/",
    name: "login",
    meta: {
      hidden: true,
      title: "登录",
    },
    component: () => import("../views/account/login.vue"),
  },
  // 注册
  {
    path: "/register",
    name: "logregisterin",
    meta: {
      hidden: true,
      title: "注册",
    },
    component: () => import("../views/account/register.vue"),
  },
  // 忘记密码
  {
    path: "/forget",
    name: "forget",
    meta: {
      hidden: true,
      title: "忘记密码",
    },
    component: () => import("../views/account/forget.vue"),
  },
  // 首页
  {
    path: "/index",
    name: "index",
    meta: {
      title: "首页",
      icon: "home",
    },
    component: () => import("../views/layout/index.vue"),
    children: [{
        path: "/home",
        name: "home",
        meta: {
            title: '首页',
        },
        component: () =>
            import ("../views/admin/index.vue")
    }]
  },
  // 管理总台
  {
    path: "/adminIndex",
    name: "adminIndex",
    meta: {
      title: "管理总台",
      icon: "console",
    },
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: "/role",
        name: "role",
        meta: {
          title: "角色管理",
        },
        component: () => import("../views/admin/role.vue"),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "用户管理",
        },
        component: () => import("../views/admin/user.vue"),
      },
      {
        path: "/menu",
        name: "menu",
        meta: {
          title: "菜单列表",
        },
        component: () => import("../views/admin/menu.vue"),
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
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: "/role",
        name: "role",
        meta: {
          title: "角色管理",
        },
        component: () => import("../views/admin/role.vue"),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "用户管理",
        },
        component: () => import("../views/admin/user.vue"),
      },
      {
        path: "/menu",
        name: "menu",
        meta: {
          title: "菜单列表",
        },
        component: () => import("../views/admin/menu.vue"),
        children: [
          {
            path: "/role",
            name: "role",
            meta: {
              title: "角色管理",
            },
            component: () => import("../views/admin/role.vue"),
          },
          {
            path: "/user",
            name: "user",
            meta: {
              title: "用户管理",
            },
            component: () => import("../views/admin/user.vue"),
          },
          {
            path: "/menu",
            name: "menu",
            meta: {
              title: "菜单列表",
            },
            component: () => import("../views/admin/menu.vue"),
          },
        ],
      },
    ],
  },
  // 会员管理
  {
    path: "/member",
    name: "Member",
    meta: {
      title: "会员管理",
      icon: "member",
    },
    component: () => import("../views/layout/index.vue"),
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
    component: () => import("../views/layout/index.vue"),
    children: [],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
