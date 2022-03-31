
export function MenuDetailed(data = {}){
    return service.request({
        url: process.env.VUE_APP_APIURL_USER + '/v1/menu/detailed',
        method: 'post',
        data,
    })
}