import axios from "axios";
import {getAuthorization} from "./util";

//get请求(参数json)
const get = (url, param) => {
    let auth = getAuthorization();
    return axios.request({
        url: url,
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': auth
        },
        params: param
    })
}

//post(请求)
const post = (url, param) => {
    let auth = getAuthorization();
    return axios.request({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': auth
        },
        data: param
    })
}

//上传
const upload = (url, param) => {
    return axios.request({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest'
        },
        data: param
    })
}

//下载
const download = (url, param) => {
    return axios.post(url, param, {responseType: 'blob'});
}

//登录
const login = (url, data) => {
    return axios.request({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    });
}

export {get, post, upload, download, login}