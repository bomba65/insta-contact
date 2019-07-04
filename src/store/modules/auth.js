import api from '../api/main'

const setAuth = token => { api.defaults.headers.common['Authorization'] = `Token ${token}` }
const removeAuth = () => { delete api.defaults.headers.common['Authorization'] }

const loginActions = (token) => {
    localStorage.setItem('user-token', token)
    setAuth(token)
}

const logoutActions = () => {
    localStorage.removeItem('user-token')
    removeAuth()
    window.location.reload()
}

const state = {
    token: localStorage.getItem('user-token') || null,
}

const getters = {
    isLogged: state => state.token ? true : false,
    getToken: state => state.token,
}

const mutations = {
    setToken: (state, payload) => {
        state.token = payload
    },
}
const actions = {
    login: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            let data = {
                command: 'login',
                params: params
            }

            api.post('rest?data=' + JSON.stringify(data)).then(res => {
                if(res.data.status == 200) {
                    const token = res.data.object.token
                    loginActions(token)
                    commit('setToken', token)
                }
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    logout: ({commit}) => {
        return new Promise((resolve, reject) => {
            api.post('rest?data={command="logout",params:{}}').then(res => {
                logoutActions()
				commit('setToken', null)
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    register: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            let data = {
                command: 'register',
                params: params
            }
            console.log(params)
            console.log(data)
            api.post('rest?data=' + JSON.stringify(data)).then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    restorePassword: ({commit}, email) => {
        return new Promise((resolve, reject) => {
            let data = {
                command: 'restorePassword',
                params: {
                    email: email
                }
            }
            api.post('rest?data=' + JSON.stringify(data)).then(res => {
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
            console.log(data)
            api.post('rest?data=' + JSON.stringify(data)).then(res => {
                resolve(res)
            })
            .catch(err => {
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