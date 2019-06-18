import axios from 'axios'

export const baseURL = 'https://cors-anywhere.herokuapp.com/https://instacontact.me/api/rest'

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
})

api.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    if (error.response.status === 401) {
      store.dispatch('userLogout')
      $router.push('/login')
    }
    return Promise.reject(error)
})

export const setAuth = token => { api.defaults.headers.common.Authorization = token }
export const removeAuth = () => { delete api.defaults.headers.common.Authorization }

export const getProfile = () => axios({url: 'http://localhost:3000/company/private/profile', method: 'get'})

export default api