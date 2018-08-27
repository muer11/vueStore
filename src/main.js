// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import cookie from './util/util';
import VueAxios from 'vue-axios'
import Validate from "./components/validate"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
// let cookie = require('./util/util.js');
//import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
//import '@/assets/css/common.css' //引入公共样式

Vue.config.productionTip = false;
Vue.use(Validate);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// export default{
// 	axios
// }

router.beforeEach((to, from, next) => {
  console.log('beforeEach路由拦截');
  // console.log(cookie.getCookie('session'));
  // console.log(to);
  // console.log(from);
  // console.log(next);
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    let token = cookie.getCookie('session');
    if (token) {
      next();
    } else {
      // next({
      //   path: '/login',
      //   query: {redirect: router.currentRoute.fullPath}
      // });
      router.replace({
        name: "login",
        query: {redirect: router.currentRoute.fullPath}
      });
    }
  } else {
    next(); //如果无需token,那么随它去吧
  }
})
// http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = cookie.getCookie('session');
    // console.log("request"+token)
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = `token ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
 
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // console.log(router.currentRoute.fullPath);
          router.replace({
            name: "login",
            query: {redirect: router.currentRoute.fullPath}
          });
          cookie.delCookie('session');
          break;
      }
    }
    return Promise.reject(error.response.data);   // 返回接口返回的错误信息
  });
// Vue.prototype.$http = axios;
Vue.prototype.cookie = cookie;
Vue.prototype.memberId = null;
// Vue.use(cookie);

Vue.use(Vuex, VueAxios, axios);