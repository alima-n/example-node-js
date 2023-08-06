import Vue from 'vue'
import Router from 'vue-router'
import authGuard from '@/middleware/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  hash: false,
  base: '/',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/devices',
      name: 'devices',
      component: () => import('@/views/Devices.vue'),
      beforeEnter: authGuard,
      meta: {
        title: 'My Raspberry Pis',
      },
    },
    {
      path: '/devices/:id(\\d+)',
      name: 'device',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth.vue'),
      meta: {
        title: 'Sign in',
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Auth.vue'),
      props: { isSignup: true },
      meta: {
        title: 'Sign up',
      },
    },
  ],
})

export default router
