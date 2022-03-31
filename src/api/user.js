import service from "@/utils/request.js";

//新增用户
export function UserCreate(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/create',
        method: 'post',
        data
    })
}

//用户列表
export function UserList(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/lists',
        method: 'post',
        data
    })
}
//删除用户
export function UserDelete(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/remove',
        method: 'post',
        data
    })
}
//状态更新
export function UserSwitch(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/status',
        method: 'post',
        data
    })
}
//用户详情
export function UserInfo(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/info',
        method: 'post',
        data
    })
}
//编辑
export function UserUpdate(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/update',
        method: 'post',
        data
    })
}
//搜索
export function UserSearch(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/user/update',
        method: 'post',
        data
    })
}