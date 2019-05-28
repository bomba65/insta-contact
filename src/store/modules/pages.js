import api, {baseURL} from '../api/main'

const state = {
    pages: [
        'page1',
        'page2',
        'page3',
        'page4',
        'page5',
    ],
    selectedPage: 0
}


const getters = {
    getPages: (state, getters) => {
        return state.pages
    },
    getSelectedPage: (state, getters) => {
        return state.selectedPage
    }
}

const mutations = {
    addPage: (state, payload) => {
        state.pages.push(payload)
    },
    deletePage: (state, payload) => {
        state.pages.splice(state.selectedPage, 1)
    },
    setPage: (state, payload) => {
        state.pages[state.selectedPage] = payload
    },
    setSelectedPage: (state, payload) => {
        return state.selectedPage = payload
    }
}
const actions = {

}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}