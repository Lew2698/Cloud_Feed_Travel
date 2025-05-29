import App from './App'
import cartStore from './store/cart.js'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
// 将购物车状态管理挂载到Vue原型上
Vue.prototype.$cartStore = cartStore
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  // 将购物车状态管理挂载到全局属性
  app.config.globalProperties.$cartStore = cartStore
  return {
    app
  }
}
// #endif