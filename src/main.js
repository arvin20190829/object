import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import { mockXHR } from './mock/mock'

Vue.use(Element)

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  mockXHR()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
