import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import myPlugin from './plugin'
import headTop from 'components/header/header.vue'
Vue.component('headTop',headTop)
import './utils/rem'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
