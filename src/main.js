import Vue from 'vue'
import App from './App.vue'
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"
import router from "./router/Router"
import VueClipboards from 'vue-clipboard2'
import "@/mock/mockServe"
Vue.use(VueClipboards);

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
