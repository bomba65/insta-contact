import Vue from 'vue'
import Vuex from 'vuex'
import api, {baseURL} from './api/main'
import blocks from './modules/blocks'

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
    },
})
export default store
