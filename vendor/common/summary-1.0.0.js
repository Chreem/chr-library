(function () {
    function createTag(tag, options, content) {
        var newTag = document.createElement(tag);
        if (options) Object.keys(options).forEach(function (key) {
            newTag[key] = options[key]
        });
        if (content) newTag.innerHTML = content;
        return newTag;
    }

    /**
     * 判断ua
     */
    (function () {
        var u = navigator.userAgent
            , app = navigator.appVersion
            , language = (navigator.browserLanguage || navigator.language).toLowerCase();

        var version = {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
            weibo: u.indexOf('Weibo') > -1
        };

        window.browser = {
            version,
            isMobile: (version.ios || version.android || version.iPhone || version.iPad),
            isWeiboApp: version.weibo
        };
    })();

    /**
     * 自动设置html的font-size
     */
    (function () {
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

        window.SetSize = SetSize;
    })();

    /**
     * 生成结果小数∈(start,end] 整数∈[start,end]
     * @param start
     * @param end
     * @param integer
     * @returns {number}
     */
    window.random = function (start = 0, end = 1, integer = true) {
        const range = end - start;
        const result = range * Math.random() + start;
        return integer ? Math.floor(result + 0.5) : result;
    };

    /**
     * 表单校验
     */
    (function () {
        function toArray(target) {
            if (!target) return [];
            return Array.prototype.slice.call(target);
        }

        var Rules = [
            {
                rule: 'phone',
                reg(data) {
                    return /^(1(([35789][0-9])|(47)|[8][01236789]))\d{8}$/.test(data)
                }
            }, {
                rule: 'len',
                reg(data, reg) {
                    return (new RegExp(`.{${reg}}`)).test(data)
                }
            }
        ];

        function FormCheck(el) {
            if (!el || el.constructor !== String) throw new Error('formcheck require root element selector String');
            this.root = document.querySelector(el);
            if (!this.root) return;
            this.inputs = toArray(this.root.querySelectorAll('input,textarea,select'));
        }

        FormCheck.inputCheck = function inputCheck(input) {
            var result = {};
            for (var key in input.dataset) {
                if (!(/^[a-z]*$/.test(key))) continue;
                var tester =
                    Rules.map(rule => {
                        if (rule.rule !== key) return;
                        if (!rule.reg(input.value, input.dataset[key])) result[key] = input.dataset[key + 'Msg'];
                    })
            }
            if (Object.keys(result).length <= 0) result = true;
            return result;
        };

        FormCheck.prototype.check = function () {
            var result = [];
            this.inputs.forEach(function (input) {
                var checkResult = FormCheck.inputCheck(input);
                if (checkResult === true) return;
                result.push({
                    target: input,
                    result: checkResult
                });
            });
            return result;
        };

        window.FormCheck = FormCheck;
    })();

    /**
     * 提示框
     */
    (function () {
        var tagId = 'message_tip';
        var contentTagClass = 'msg';
        var messageTag = document.querySelector('#' + tagId);
        var loadingImgLink = '//n.sinaimg.cn/hb/static/loading.png';
        if (!messageTag) {
            messageTag = document.createElement('div');
            messageTag.id = tagId;
            messageTag.innerHTML = '<div class="msg"></div>';
            document.body.insertBefore(messageTag, document.body.firstChild);
            document.head.appendChild(createTag('style', null, '#' + tagId + '{' +
                'position: fixed;' +
                'top: 0;' +
                'left: 0;' +
                'z-index: -1;' +
                'width: 100%;' +
                'height: 100%;' +
                'background-color: transparent;' +
                'display: -webkit-box;' +
                'display: -webkit-flex;' +
                'display: -moz-box;' +
                'display: -ms-flexbox;' +
                'display: flex;' +
                '-webkit-box-pack: center;' +
                '-webkit-justify-content: center;' +
                '-moz-box-pack: center;' +
                '-ms-flex-pack: center;' +
                'justify-content: center;' +
                '-webkit-box-align: center;' +
                '-webkit-align-items: center;' +
                '-moz-box-align: center;' +
                '-ms-flex-align: center;' +
                'align-items: center;' +
                '}#' + tagId + '.active{' +
                'z-index:1000;' +
                '}#' + tagId + ' .msg{' +
                'display: inline-block;' +
                'padding: 1rem;' +
                'border-radius: .3rem;' +
                'max-width: 12rem;' +
                'text-align: center;' +
                'font-size: 1.3rem;' +
                '-webkit-transform: scale(0.5);' +
                '-ms-transform: scale(0.5);' +
                'transform: scale(0.5);' +
                'opacity: 0;' +
                'background-color: rgba(0, 0, 0, 0.7);' +
                'color: #ffffff;' +
                '-webkit-user-select: none;' +
                '-moz-user-select: none;' +
                '-ms-user-select: none;' +
                'user-select: none;' +
                '-webkit-transition: all .3s ease-out;' +
                '-moz-transition: all .3s ease-out;' +
                '-ms-transition: all .3s ease-out;' +
                'transition: all .3s ease-out;' +
                '}#' + tagId + '.active .msg{' +
                '-webkit-transform: scale(1);' +
                '-ms-transform: scale(1);' +
                'transform: scale(1);' +
                'opacity: 1;' +
                '}@keyframes rotate {' +
                'from{transform: rotate(0)}' +
                'to{transform: rotate(360deg)}' +
                '}#' + tagId + ' .loading{' +
                'width: 2rem;' +
                'height: 2rem;' +
                '-webkit-background-size: cover;' +
                '-moz-background-size:cover;' +
                'background-size: cover;' +
                'background-image: url(' + loadingImgLink + ');' +
                '-webkit-animation: rotate 1s linear infinite;' +
                '-moz-animation: rotate 1s linear infinite;' +
                'animation: rotate 1s linear infinite;' +
                '}'))
        }

        var timer = null;
        var root = $(messageTag);
        var contentTag = root.find('.' + contentTagClass);
        var isLoading = false;
        root.on('click', function () {
            if (isLoading) return;
            clearTimeout(timer);
            root.removeClass('active');
        });

        /**
         * 提示信息
         */
        window.Message = {
            show: function (msg, time) {
                time = time || 3000;
                clearTimeout(timer);
                contentTag.text(msg);
                timer = setTimeout(function () {
                    root.removeClass('active');
                }, time);
                root.addClass('active');
            }
        };
        window.alert = Message.show;

        /**
         * 提交请求提示loading
         */
        var preloadImg = document.createElement('div');
        preloadImg.style.display = 'inline';
        preloadImg.style.width = '0';
        preloadImg.style.height = '0';
        preloadImg.style.backgroundImage = 'url(' + loadingImgLink + ')';
        document.body.appendChild(preloadImg);
        window.Loading = {
            show: function (timeoutMessage, timeout) {
                timeout = timeout || 5000;
                isLoading = true;
                clearTimeout(timer);
                contentTag.html('<div class="loading"></div>');
                timer = setTimeout(function () {
                    isLoading = false;
                    Message.show(timeoutMessage || '请求超时');
                }, timeout);
                root.addClass('active');
            },
            done: function (doneMessage) {
                clearTimeout(timer);
                isLoading = false;
                doneMessage
                    ? Message.show(doneMessage)
                    : root.removeClass('active');
            }
        }
    })();
})();