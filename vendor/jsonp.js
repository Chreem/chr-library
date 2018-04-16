function replaceCallback(url, params, cbname) {
    // 分割替换callback位置
    const splitNum = url.indexOf('?')
    let paramUrl = url.slice(splitNum + 1)
    url = url.slice(0, splitNum)
    paramUrl = paramUrl.replace('?', cbname)
    let resu = url + '?' + paramUrl

    // 匹配参数
    if (typeof params !== 'undefined') {
        let p = ''
        Object.keys(params).map(key => {
            p += `${key}${params[key] === true ? '' : '=' + params[key]}&`
        })
        p = p.slice(0, -1)
        resu += p
    }

    return resu
}

export default (url, params, cb) => {
    params = params || {};
    if (params.constructor === Function) cb = params;
    const cbname = ('jsonp' + (new Date()).getTime());

    if (url.split('?').length < 3) { throw new Error('must provide callback position like: "jsonpcallback=?" in url "http://example.com/jsonp?jsonpcallback=?&other=params"') }
    url = replaceCallback(url, params, cbname)
    const script = document.createElement('script')
    script.src = url
    const handleLoadEvent = function () {
        document.body.removeChild(script)
        delete window[cbname]
        script.removeEventListener('load', handleLoadEvent)
    }
    script.addEventListener('load', handleLoadEvent)

    return new Promise(res => {
        window[cbname] = data => {
            cb ? cb(data) : void 0;
            res(data);
        }
        document.body.appendChild(script);
    })
}
