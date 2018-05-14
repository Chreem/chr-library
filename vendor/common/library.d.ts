type FormCheckResult = Array<{
    result: {
        len?: string,
        phone?: string,

        [propsName: string]: string
    },
    target: HTMLElement
}>;

declare interface Window {
    browser: {
        version: {
            [propsName: string]: any
        },
        isWeiboApp: boolean,
        isMobile: boolean
    },
    FormCheck: {
        new (el: string): {
            check(): FormCheckResult
        };
    },
    SetSize: {
        new (options: {
            win?: object,
            count?: number,
            width?: number
        }): void;
    },
    Message: {
        show(message: string, time?: number): void;
    },

    alert(message: string, time?: number): void;

    Loading: {
        show(timeoutMessage?: string, timeout?: number): void;
        done(doneMessage?: string): void;
    }

    random(start?: number, end?: number, integer?: boolean): number;

    [propsName: string]: any
}