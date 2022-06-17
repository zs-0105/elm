import { get, post } from "../utils/request.js"

// 定义一个插件
export default {
    // 插件中必须包含一个install方法    
    install: function (Vue) {
        //给Vue混入成员
        Vue.mixin({
            methods: {
                // get请求插件方法
                $get(url, params) {
                    return get(url, params)
                },
                // post请求插件方法
                $post(url, params) {
                    return post(url, params)
                }
            }
        })
    }
}