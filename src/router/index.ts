import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/user/UsersView.vue'),
    },
    {
      path: '/addUser',
      name: 'addUser',
      component: () => import('@/views/user/AddUserView.vue'),
    },
    {
      path: '/models',
      name: 'models',
      component: () => import('@/views/model/ModelsView.vue'),
    },
    {
      path: '/addModel',
      name: 'addModel',
      component: () => import('@/views/model/AddModelView.vue'),
    },
  ]
})

export default router
