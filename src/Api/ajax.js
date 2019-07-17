import axios from 'axios'
import qs from 'qs'
 import {message} from 'antd'

//  添加请求拦截器：让让post请求的请求体格式为urlencoded格式 a=1&b2
// 在真正发请求之前执行
 axios.interceptors.request.use(function(config){
     const {method,data} = config;
     if (method.toLowerCase()==='post'&&typeof data ==='object'){
        config.data =qs.stringify(data)
     }
     console.log(config)
     return config
 })
//  添加响应拦截器
// 功能1: 让请求成功的结果不再是response, 而是response.data的值
  // 功能2: 统一处理所有请求的异常错误
// 在请求返回之后且在我们指定的请求响应回调函数之前
axios.interceptors.response.use(function(response){
  console.log(response.data)
return response.data
},function (error) {
    message.error('请求出错'+error.message)
    return new Promise(()=>{})
});
export default axios