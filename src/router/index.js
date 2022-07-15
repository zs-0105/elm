import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
const home = () => import( /* webpackChunkName: "home" */ '../pages/home/home.vue')
const city = () => import( /* webpackChunkName: "city" */ '../pages/city/city.vue')
const msite = () => import( /* webpackChunkName: "msite" */ '../pages/msite/msite.vue')
const search = () => import( /* webpachChunkName: "search" */ '../pages/search/search.vue')
const order = () => import( /* webpackChunkName:"order" */ '../pages/order/order.vue')
const orderDetail = () => import( /* webpackChunkName:"orderDetail" */ '../pages/order/children/orderDetail.vue')
const login = () => import( /* webpackChunkName:"login" */ '../pages/login/login.vue')
const profile = () => import( /* webpackChunkName:"profile" */ '../pages/profile/profile.vue')
const info = () => import( /* webpackChunkName:"info" */ '../pages/profile/children/info.vue')
const address = () => import( /* webpackChunkName:"address" */ '../pages/profile/children/children/address.vue')
const setusername = () => import( /* webpackChunkName:"setusername" */ '../pages/profile/children/children/setusername.vue')
const add = () => import( /* webpackChunkName:"add" */ '../pages/profile/children/children/children/add.vue')
const addDetail = () => import( /* webpackChunkName:"addDetail" */ '../pages/profile/children/children/children/children/addDetail.vue')
const vipcard = () => import( /* webpackChunkName:"vipcard" */ '../pages/vipcard/vipcard.vue')
const vipDescription = () => import( /* webpackChunkName:"vipDescription" */ '../pages/vipcard/children/vipDescription.vue')
const useCart = () => import( /* webpackChunkName:"useCart" */ '../pages/vipcard/children/useCard.vue')
const invoiceRecord = () => import( /* webpackChunkName:"invoiceRecord" */ '../pages/vipcard/children/invoiceRecord.vue')
const service = () => import( /* webpackChunkName:"service" */ '../pages/service/service.vue')
const questionDetail = () => import( /* webpackChunkName:"questionDetail" */ '../pages/service/children/questionDetail.vue')
const download = () => import( /* webpackChunkName:"download" */ '../pages/download/download.vue')
const balance = () => import( /* webpackChunkName:"balance" */ '../pages/balance/balance.vue')
const detail = () => import( /* webpackChunkName:"detail" */ '../pages/balance/children/detail.vue')
const points = () => import( /* webpackChunkName:"points" */ '../pages/points/points.vue')
const pointsDetail = () => import( /* webpackChunkName:"pointsDetail" */ '../pages/points/children/detail.vue')
const benefit = () => import( /* webpackChunkName:"benefit" */ '../pages/benefit/benefit.vue')
const commend = () => import( /* webpackChunkName:"commend" */ '../pages/benefit/children/commend.vue')
const coupon = () => import( /* webpackChunkName:"coupon" */ '../pages/benefit/children/coupon.vue')
const exchange = () => import( /* webpackChunkName:"exchange" */ '../pages/benefit/children/exchange.vue')
const hbDescription = () => import( /* webpackChunkName:"hbDescription" */ '../pages/benefit/children/hbDescription.vue')
const hbHistory = () => import( /* webpackChunkName:"hbHistory" */ '../pages/benefit/children/hbHistory.vue')
const forget = () => import( /* webpackChunkName:"forget" */ '../pages/forget/forget.vue')
const food = () => import( /* webpackChunkName:"food" */ '../pages/food/food.vue')
const shop = () => import( /* webpackChunkName:"shop" */ '../pages/shop/shop.vue')
const foodDetail = () => import( /* webpackChunkName:"foodDetail" */ '../pages/shop/children/foodDetail.vue')
const shopDetail = () => import( /* webpackChunkName:"shopDetail" */ '../pages/shop/children/shopDetail.vue')
const shopSafe = () => import( /* webpackChunkName:"shopDetail" */ '../pages/shop/children/children/shopSafe.vue')
const confirmOrder = () => import( /* webpackChunkName:"confirmOrder"*/ '../pages/confirmOrder/confirmOrder.vue')
const remark = () => import( /* webpackChunkName:"remark"*/ '../pages/confirmOrder/children/remark.vue')
const invoice = () => import( /* webpackChunkName:"invoice"*/ '../pages/confirmOrder/children/invoice.vue')
const payment = () => import( /* webpackChunkName:"payment"*/ '../pages/confirmOrder/children/payment.vue')
const userValidation = () => import( /* webpackChunkName:"userValidation"*/ '../pages/confirmOrder/children/userValidation.vue')
const chooseAddress = () => import( /* webpackChunkName:"chooseAddress"*/ '../pages/confirmOrder/children/chooseAddress.vue')
const addAddress = () => import( /* webpackChunkName:"addAddress"*/ '../pages/confirmOrder/children/children/addAddress.vue')
const searchAddress = () => import( /* webpackChunkName:"searchAddress"*/ '../pages/confirmOrder/children/children/children/searchAddress.vue')


Vue.use(VueRouter)

const routes = [{
  path: '/',
  mode: process.env.ROUTER_MODE,
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
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/search',
      component: search,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/order',
      component: order,
      children: [{
        path: '/order/orderDetail',
        component: orderDetail
      }]
    },
    {
      path: '/profile',
      component: profile,
      children: [{
        path: '/profile/info',
        component: info,
        children: [{
            path: '/profile/info/address',
            component: address,
            children: [{
              path: '/profile/info/address/add',
              component: add,
              children: [{
                path: '/profile/info/address/add/addDetail',
                component: addDetail
              }]
            }]
          },
          {
            path: '/profile/info/setusername',
            component: setusername
          },
        ]
      }]
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/vipcard',
      component: vipcard,
      children: [{
        path: '/vipcard/vipDescription',
        component: vipDescription
      }, {
        path: '/vipcard/useCart',
        component: useCart
      }, {
        path: '/vipcard/invoiceRecord',
        component: invoiceRecord
      }]
    },
    {
      path: '/service',
      component: service,
      children: [{
        path: '/service/questionDetail',
        component: questionDetail
      }]
    },
    {
      path: '/download',
      component: download
    },
    {
      path: '/balance',
      component: balance,
      children: [{
        path: '/balance/detail',
        component: detail
      }]
    },
    {
      path: '/points',
      component: points,
      children: [{
        path: '/points/detail',
        component: pointsDetail
      }]
    },
    {
      path: '/benefit',
      component: benefit,
      children: [{
          path: '/benefit/commend',
          component: commend,
        },
        {
          path: '/benefit/coupon',
          component: coupon,
        },
        {
          path: '/benefit/exchange',
          component: exchange,
        },
        {
          path: '/benefit/hbDescription',
          component: hbDescription,
        },
        {
          path: '/benefit/hbHistory',
          component: hbHistory,
        }
      ]
    },
    {
      path: '/forget',
      component: forget
    },
    {
      path: '/food',
      component: food
    },
    {
      path: '/shop',
      component: shop,
      children: [{
          path: '/shop/foodDetail', //食品详情页
          component: foodDetail,
        },
        {
          path: '/shop/shopDetail', //商铺详情页
          component: shopDetail,
          children: [{
            path: '/shop/shopDetail/shopSafe', //商铺安全认证页
            component: shopSafe,
          }]
        }
      ]
    },
    {
      path: '/confirmOrder',
      component: confirmOrder,
      children: [{
        path: 'remark', //订单备注
        component: remark,
      }, {
        path: 'invoice', //发票抬头
        component: invoice,
      }, {
        path: 'payment', //付款页面
        component: payment,
      }, {
        path: 'userValidation', //用户验证
        component: userValidation,
      }, {
        path: 'chooseAddress', //选择地址
        component: chooseAddress,
        children: [{
          path: 'addAddress', //添加地址
          component: addAddress,
          children: [{
            path: 'searchAddress', //搜索地址
            component: searchAddress,
          }]
        }, ]
      }, ]
    }
  ]
}]

const router = new VueRouter({
  mode: 'history',
  routes,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savePosition) {
    if (savePosition) { // savedPosition 会在你使用浏览器前进或后退按钮时候生效
      return savePosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savePosition = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffsets
      }
      return {
        x: 0,
        y: to.meta.savePosition || 0
      }
    }
  }
})

export default router