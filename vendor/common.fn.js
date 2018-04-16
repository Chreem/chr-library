import $ from 'jquery'

export const sleep = t => new Promise(r => setTimeout(r, t));

export const jsonp = {
    put(url, params) {
        return new Promise((res, rej) => {
            $.get(url, params, data => {
                data.error === '0'
                    ? res(data)
                    : rej(data.errmsg)
            }, 'jsonp')
        });
    },

    get(url, params) {
        return new Promise((res, rej) => {
            $.getJSON(url, params, data => {
                data.error === '0'
                    ? res(data)
                    : rej(data.errmsg)
            });
        })
    }
};

/**
 * 生成结果小数∈(start,end] 整数∈[start,end]
 * @param start
 * @param end
 * @param integer
 * @returns {number}
 */
export function random(start = 0, end = 1, integer = true) {
    const range = end - start;
    const result = range * Math.random() + start;
    return integer ? Math.floor(result + 0.5) : result;
}


/**
 * 自动设置html的font-size
 */
export function rootSize(win = window, count = 32, maxWidth = 640) {
    return new function () {
        let SetSize = win.SetSize = this,
            docHtml = document.documentElement,
            count = count || 32,
            maxWidth = maxWidth || 640,
            screenRatio,
            width,
            scale;

        this.fontSize = 0;

        const setup = function () {
            const isApp = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
            screenRatio = 1;
            scale = 1 / screenRatio;
            createMeta();
        };
        const createMeta = function () {
            document.write('<meta name="viewport" content="initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', width=device-width, user-scalable=no" />');
            document.write('<style>body,input,textarea{font-size:' + 10 * screenRatio + 'px;}</style>');
            maxWidth = screenRatio * maxWidth;
            readSize();
            bindEvents();
        };
        const readSize = function () {
            width = win.innerWidth || document.documentElement.clientWidth;
            if (!width && !!document.body) {
                width = document.body.clientWidth;
            } else if (!width) {
                return false;
            }
            width = Math.min(width, maxWidth);
            SetSize.fontSize = width / count;
            docHtml.style.fontSize = SetSize.fontSize + 'px';
        };
        const bindEvents = function () {
            win.addEventListener('resize', function () {
                readSize();
            }, false);
        };

        this.getFontSize = function () {
            return SetSize.fontSize;
        };

        this.getScreenRatio = function () {
            return screenRatio;
        };

        this.getEmSize = function (px) {
            return Math.floor(px / SetSize.fontSize * 100) / 100;
        };

        setup();
    };
}

/**
 * 判断ua
 */
export const browser = function () {
    const u = navigator.userAgent
        , app = navigator.appVersion
        , language = (navigator.browserLanguage || navigator.language).toLowerCase();
    const version = {//移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
    };
    return {
        version,
        mobile: (version.ios || version.android || version.iPhone || version.iPad)
    }
};

export const URL = {
    parse(url) {

    },
    stringify(base, params) {
        if (!params || params.constructor !== Object) throw new Error('params must be Object')
        let paramStr = [];
        for (let key in params) {
            paramStr.push(key + '=' + params[key])
        }
        base = base.slice(-1) === '?' ? base : base + '?';
        return base + paramStr.join('&');
    }
};
