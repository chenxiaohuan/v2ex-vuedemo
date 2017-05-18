import Vue from 'vue'
import 'babel-polyfill'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import Marked from 'marked'
import App from './App.vue'

FastClick.attach(document.body)
// 在原型链上扩展$marked方法
Vue.prototype.$marked = Marked

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
