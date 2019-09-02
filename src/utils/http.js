import axios from 'axios'
// import { getToken } from '../utils/auth'
// import store from '@/store'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = process.env.VUE_APP_URL
} else {
  axios.defaults.baseURL = process.env.VUE_APP_BASE_API
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Cache-Control'] = 'no-cache'
axios.interceptors.request.use(
  config =>
    // if (store.getters.token) {
    //   config.headers['authorization'] = getToken()
    // }
    config
  ,
  (error) => {
    Promise.resolve(error)
  },
)
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response)
    }
    return Promise.reject(response)
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          break
        case 403:
          break
        case 404:
          break
        default:
      }
      return Promise.reject(error.response)
    }
  },
)

function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      // params: Object.assign({ monmentDataTime: Date.parse(new Date()) }, params)
      params
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err.data)
    })
  })
}

function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

function patch(url, params) {
  return new Promise((resolve, reject) => {
    axios.patch(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

function del(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url, // 请求地址
      responseType: 'blob' // 表明返回服务器返回的数据类型
    }).then(
      (response) => {
        resolve(response)
      },
      (err) => {
        reject(err)
      },
    )
  })
}

export {
  get, post, put, del, patch, downloadFile
}
