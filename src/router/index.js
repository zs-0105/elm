import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import {routerMode} from '../config/env.js'
const home = () => import(/* webpackChunkName: "home" */ '../pages/home/home.vue')
const city = () => import(/* webpackChunkName: "city" */ '../pages/city/city.vue')
console.log(routerMode);
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    mode:routerMode,
    component: App,
    children: [
      //地址为空时跳转home页面
      {
        path: '',
        redirect: '/home'
      },
      //首页城市列表页
      {
        path: '/home',
        component: home
      },
      //当前选择城市页
      {
        path: '/city/:cityid',
        component: city
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savePosition = document.documentElement.scrollTop
      }
      return { x: 0, y: to.meta.savePosition || 0 }
    }
  }
})

export default router
