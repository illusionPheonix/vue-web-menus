import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: "/home",
    name: "home",
    component: () => import('../views/Home.vue'),
    meta: {
      requireAuth: true, // 在需要登录的路由的meta中添加响应的权限标识
    },
    children: [
      // 个人中心
      {
        path: "/sys/personalCenter",
        name: "personalCenter",
        component: () =>
          import("../views/personalCenter"),
        meta: {
          title: "个人中心",
          requireAuth: true,
          keepAlive: false
        }
      },
      {
        path: "/403",
        name: "403",
        component: () =>
          import("../views/403")
      },

      {
        path: '*',
        redirect: '/403'
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
