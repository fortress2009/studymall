import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 原型：$bus在被创建之前是 undefined 但是vue实例可以作为事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

