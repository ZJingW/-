//main.js是vue的入口函数，逻辑简单就是导入需要的库，并挂载到id为app的DOM节点上
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './icons/filters' // global filters
import moment from 'moment'
import VCharts from 'v-charts'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.use(VCharts)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$moment = moment

Vue.filter('formatDate', function(value, format) {
  return moment(value).format(format)
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
