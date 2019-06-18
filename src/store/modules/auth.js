import api from '../api/main'

const state = {
    token: localStorage.getItem('user-token') || null,
}


const getters = {
    isLogged: state => state.token ? true : false,
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
    register: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            let data = {
                command: 'register',
                params: params
            }
            api.post('', data).then(res => {
                console.log(res)
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    checkUsername: ({commit}, username) => {
        return new Promise((resolve, reject) => {
            let data = {
                command: 'checkUsername',
                params: {
                    username: username
                }
            }
            api.post('', data).then(res => {
                console.log(res)
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}