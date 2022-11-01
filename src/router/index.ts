import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const constantRoutes = [
  // 登录
  {
    name: 'Sign',
    path: '/sign',
    component: () => import('@/views/Sign/index.vue'),
    meta: { title: '登录' }
  }
]

export const asyncRoutes = [
  {
    name: 'Index',
    path: '/',
    redirect: '/home',
    children: [{
      name: 'Home',
      path: 'home',
      component: () => import("@/views/Home/index.vue")
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
})

export default router
