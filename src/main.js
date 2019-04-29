import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'

import * as VueGoogleMaps from 'vue2-google-maps'

import 'vue-tel-input/dist/vue-tel-input.css'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBWMOxisvZSDeGKkASEu1mAQNJn5hZd_AY',
    libraries: 'places',
  },
})


Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //Storage
  template: '<App/>',
  components: {
    App
  }
})
