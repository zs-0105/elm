//封装请求相关的方法
import axios from "axios"

// 初始化一个axios对象 
let instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 30000
})

// 创建一个get请求方法
let get = async function (url, params) {
    let { data } = await instance.get(url, { params })
    return data
}
// 创建一个post请求方法
let post = async function (url, params) {
    let { data } = await instance.post(url, params)
    return data
}

export {
    get,
    post
}