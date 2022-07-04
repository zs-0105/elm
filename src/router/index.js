import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
const home = () => import(/* webpackChunkName: "home" */ '../pages/home/home.vue')
const city = () => import(/* webpackChunkName: "city" */ '../pages/city/city.vue')
const msite= () => import(/* webpackChunkName: "msite" */'../pages/msite/msite.vue')
const search= () => import(/*webpachChunkName: "search" */'../pages/search/search.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    mode:process.env.ROUTER_MODE,
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
      {
        path: '/msite',
        component: msite,
        meta:{
          keepAlive:true  
        }
      },
      {
        path: '/search',
        component: search,
        meta:{
          keepAlive:true  
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {// savedPosition 会在你使用浏览器前进或后退按钮时候生效
      return savePosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savePosition = document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffsets
      }
      return { x: 0, y: to.meta.savePosition || 0 }
    }
  }
})

export default router
