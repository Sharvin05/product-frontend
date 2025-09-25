import axios from 'axios'

const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011',
    withCredentials: true,
})


clientApi.defaults.timeout = 10000

clientApi.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {

        return Promise.reject(error)
    },

)

clientApi.interceptors.response.use(
    (response) => {
        const code = response.status
        if (code == 200) {
            return response.data
        } else {
            return Promise.reject(response?.response?.data || 'request error')
        }
    },
    (error) => {
        return Promise.reject(error?.response?.data)
    }
)


export const postProducts = (params) => {
    return post('/products', params)
}

export const getProducts = (params) => {
    return get('/products', params)
}

export const logOut = (params) => {
    return post('/logOut', params)
}

export function signIn(value) {
    return post('/auth/login', value)
}

export function post(url, data = {}) {
    return new Promise(function (resolve, reject) {
        clientApi
            .post(url, data)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
    })
}



export function get(url, data = {}) {
    return new Promise(function (resolve, reject) {
        clientApi
            .get(url, {
                params: data
            })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default clientApi