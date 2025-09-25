import axios from "axios";


const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011',
    withCredentials: true,
})

serverApi.defaults.timeout = 10000

serverApi.interceptors.request.use(
    (config) => {

        config.headers['accessToken'] = config.cookies?.accessToken
        config.headers['refreshToken'] = config.cookies?.refreshToken
        config.headers['serverSide'] = 'true'
        return config
    },
    (error) => {

        return Promise.reject(error)
    },

)

serverApi.interceptors.response.use(
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

export function getProductsSSR({ params, accessToken, refreshToken }) {
  return get('products',params, {accessToken,refreshToken})
}

export function post(url, data = {}) {
    return new Promise(function (resolve, reject) {
        serverApi
            .post(url, data)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
    })
}



export function get(url, data = {},cookies) {
    return new Promise(function (resolve, reject) {
        serverApi
            .get(url, {
                params: data,
                cookies
            })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


