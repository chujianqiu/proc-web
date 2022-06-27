const contextPath = '/operation/';
const get = (url, param) => {
    url = contextPath + url;
    return fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        body: param,
        mode: 'cors',
        credentials: "include"    //带cache访问
    }).then().catch(err => {
        console.log(err);
    })
}

const post = (url, param) => {
    url = contextPath + url;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: param,
        mode: 'cors',
        credentials: 'include'   //带cache访问
    }).then().catch(err => {
        console.log(err);
    });
}

export {get, post}