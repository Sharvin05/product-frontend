import axios from "axios";


const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011',
    withCredentials: true,
})

serverApi.defaults.timeout = 10000

serverApi.interceptors.request.use(
    (config) => {
        config.headers['serverSide'] = 'true'
        console.log("config.headers",config.params.accessToken)
        console.log("config.headers small",config.headers.accesstoken)
        console.log("config",config);
        
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

export async function getProductsSSR({ params, accessToken, refreshToken }) {
  return get('/products',{accessToken,refreshToken,...params})
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



export function get(url, data = {}) {
    return new Promise(function (resolve, reject) {
        serverApi
            .get(url, {
                params: data,
            })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


