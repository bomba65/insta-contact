import api, {baseURL} from '../api/main'

const state = {
    settings: {
        design: 'default'
    }
}


const getters = {
    getDesign: (state, getters) => {
        return state.settings.design
    },
}

const mutations = {
    setDesign: (state, payload) => {
        state.settings.design = payload
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