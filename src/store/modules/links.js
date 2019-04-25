import api, {baseURL} from '../api/main'

const state = {
    links: [
        'link1',
        'link2',
        'link3',
        'link4',
        'link5',
    ],
}


const getters = {
    getLinks: (state, getters) => {
        return state.links
    },
}

const mutations = {
    addLink: (state, payload) => {
        state.links.push(payload);
    },
    setLinks: (state, payload) => {
        state.links = payload;
    },
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