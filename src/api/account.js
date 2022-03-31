import service from "@/utils/request.js";

//验证手机号是否存在
export function CheckName(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/check',
        method: 'post',
        data
    })
}
//验证码获取
export function Send(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/send',
        method: 'post',
        data
    })
}
//注册
export function Registe(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/register',
        method: 'post',
        data
    })
}
//登录
export function Login(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/login',
        method: 'post',
        data
    })
}