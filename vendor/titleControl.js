export default class {
    constructor(title) {
        this.title = document.title;
        if (!!title && title.constructor === String) document.title = title;
        if (!!title && title.constructor === Object) {
            if (title.fun) {
                Object.entries(title).map(([k, v]) => {
                    this[k] = v
                });
                this.funTimer = null;
                this.funRecoverTimer = null;
                this.haveFun();
            }
        }
    }

    setTitle(title) {
        this.title = document.title = title;
    }

    haveFun() {
        let active = false;
        window.addEventListener('visibilitychange', () => {
            clearTimeout(this.funTimer);
            clearTimeout(this.funRecoverTimer);
            if (document.hidden) {
                this.funTimer = setTimeout(() => {
                    document.title = this.funTitle;
                    active = true;
                }, this.funDelay)
            } else {
                if (active === true) {
                    document.title = this.funRecoverTitle;
                    this.funRecoverTimer = setTimeout(() => {
                        document.title = this.title;
                        active = false;
                    }, this.funRecoverTime);
                }
            }
        })
    }
}
