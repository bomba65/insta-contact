import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'

import * as VueGoogleMaps from 'vue2-google-maps'
import YmapPlugin from 'vue-yandex-maps'

import 'vue-tel-input/dist/vue-tel-input.css'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBWMOxisvZSDeGKkASEu1mAQNJn5hZd_AY',
    libraries: 'places',
  },
})
const options = {
  apiKey: '5c1ae222-f119-47f0-a9cb-ee4e54acb1b4',
  lang: 'ru_RU',
  version: '2.1'
}
Vue.use(YmapPlugin, options)


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
