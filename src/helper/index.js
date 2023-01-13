export function getUserToken() {
    return localStorage.getItem('user-tocken')
}

export function getHttpHeaders() {
    let headers = {
        'Content-Type': 'application/json',
    }
    if (getUserToken())
        headers['Authorization'] = 'Token ' + getUserToken()
    // console.log(headers)
    return headers
}

export function makeGetRequest(url) {
    let headers = getHttpHeaders();
    return fetch(url, {
        headers: headers,
        method: 'GET'
    })
}

export function makePostRequest(url, data, method) {
    let headers = getHttpHeaders()
    if (!method)
        method = 'POST'
    return fetch(url, {
        headers: headers,
        method: method,
        body: JSON.stringify(data),
    });
}

export function makeUpdateRequest(url, data) {
    let headers = getHttpHeaders()
    return fetch(url, {
        headers: headers,
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export function makeParticalUpdateRequest(url, data) {
    return makePostRequest(url, data, "PATCH")
}

export function makeDeleteRequest(url) {
    let headers = getHttpHeaders()
    return fetch(url, {
        headers: headers,
        method: 'DELETE',
    });
}

export function addGetParameters(url, parameters) {
    /**
     * Добавление к адресу гет параметры
     *
     * @param {string} url - адресс к которому добавляются гет параметры
     * @param {Map} parameters - словарь добавляемых параметров, где ключ название параметра а значаение это добавляемое значение
     * @type {Array}
     */
    let urlObject = new URL(url);
    for (let el of Object.keys(parameters)) {
        if (parameters[el] === undefined || parameters[el] == null)
            urlObject.searchParams.delete(el)
        else
            urlObject.searchParams.set(el, parameters[el])
    }
    return urlObject.toString();
}
