import { message } from "ant-design-vue";
import axios from "axios"
import { getToken,getUsername} from "./cookies"
//创建axios实列
const service = axios.create({
    baseURL: "",
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
service.interceptors.request.use(function(config) {
    // 发送请求之前
    config.headers["Authorization"] = getToken();  // 携带token
    config.headers["username"] = getUsername();  // 携带username
    return config;
}, function(error) {
    // 请求错误
    console.log('ssss')
    // return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function(response) {
    // 响应数据
    const data = response.data;
    if(data.error_code !== 0) {
        message.error(data.message)
        return Promise.reject(data)
    } else {
        return Promise.resolve(data)
    }
}, function(error) {
    // 响应错误
    const data = JSON.parse(error.request.response)
    message.error.apply(data.message)
    return Promise.reject(error);
});
export default service;