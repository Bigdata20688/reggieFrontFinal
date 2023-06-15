import {caxios} from "@/js/request";

function loginApi(data) {
    return caxios({
        'url': '/employee/login',
        'method': 'post',
        data
    })
}

function logoutApi() {
    return caxios({
        'url': '/employee/logout',
        'method': 'post',
    })
}

export {loginApi, logoutApi}
