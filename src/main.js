// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Validate from "./components/validate"
import App from './App'
import router from './router'
//import '@/assets/css/common.css' //引入公共样式

Vue.config.productionTip = false
Vue.use(VueAxios,axios)
Vue.use(Validate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// export default{
// 	axios
// }
