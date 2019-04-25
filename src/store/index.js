import Vue from 'vue'
import Vuex from 'vuex'
import api, {baseURL} from './api/main'
import blocks from './modules/blocks'
import links from './modules/links'
import pages from './modules/pages'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        blocks,
        links,
        pages
    },
})
export default store
