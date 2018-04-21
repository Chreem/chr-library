/**
 * 自动设置html的font-size
 */
(function () {
    function createTag(tag, options, content) {
        var newTag = document.createElement(tag);
        Object.keys(options).forEach(function (key) {
            newTag[key] = options[key]
        });
        if (content) newTag.innerHTML = content;
        return newTag;
    }

    function SetSize(opt) {
        var options = opt || {};
        this.win = options.win || window;
        this.count = options.count || 32;
        this.maxWidth = options.width || 640;
        this.docHtml = document.documentElement;
        this.setup();
    }

    SetSize.prototype.setup = function () {
        var win = this.win;
        this.isApp = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
        this.screenRatio = 1;
        this.scale = 1 / this.screenRatio;
        this.createMeta();
        this.readSize();
        this.bindEvent();
    };

    SetSize.prototype.createMeta = function () {
        var screenRatio = this.screenRatio;
        var scale = this.scale;
        var metaTag = document.querySelector('meta[name="viewport"]');
        var content = 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', width=device-width, user-scalable=no';
        document.head.appendChild(createTag('style', {}, 'body,input,textarea{font-size: 1rem;}'));
        if (!metaTag) document.head.appendChild(createTag('meta', {name: 'viewport', content: content}));
        else metaTag.content = content;
        this.maxWidth = screenRatio * this.maxWidth;
    };

    SetSize.prototype.readSize = function () {
        var win = this.win;
        var count = this.count;
        var maxWidth = this.maxWidth;
        var width = win.innerWidth || document.documentElement.clientWidth;
        if (!width && !!document.body) {
            width = document.body.clientWidth;
        } else if (!width) {
            return false;
        }
        width = Math.min(width, maxWidth);
        var fontSize = width / count;
        this.fontSize = fontSize;
        this.docHtml.style.fontSize = fontSize + 'px';
    };

    SetSize.prototype.bindEvent = function () {
        var win = this.win;
        win.addEventListener('resize', this.readSize.bind(this))
    };

    if (window) window.SetSize = SetSize;
    if (typeof module === 'undefined') return new SetSize();
    if (module.exports) module.exports = SetSize;
})();
