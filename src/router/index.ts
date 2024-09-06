import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/views/user/UsersView.vue"),
      // meta: { requiresAuth: true },
    },
    {
      path: "/addUser",
      name: "addUser",
      component: () => import("@/views/user/AddUserView.vue"),
      // meta: { requiresAuth: true },
    },
    {
      path: "/models",
      name: "models",
      component: () => import("@/views/model/ModelsView.vue"),
      // meta: { requiresAuth: true },
    },
    {
      path: "/addModel",
      name: "addModel",
      component: () => import("@/views/model/AddModelView.vue"),
      // meta: { requiresAuth: true },
    },
  ],
});

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token"); // 从 localStorage 获取 token

  // 如果目标路由需要认证
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      next(); // 允许访问
    } else {
      next("/login"); // 重定向到登录页
    }
  } else {
    next();
  }
});

export default router;
