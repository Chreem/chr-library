import * as React from 'react';
import {ReactNode} from "react";

const Swiper = require('swiper/dist/js/swiper.js');

function arrayFormat(arr: Array<any>) {
    if (arr.constructor !== Array)
        return;
    let newArr = [] as Array<any>;
    let j = 0;

    function fn(arr: Array<any>) {
        for (let i = 0; i < arr.length; i++) {//遍历数组
            if (arr[i].length && (j <= 3)) {//判断是不是多维数组.j的设置可以选择从左往右拍几次，去掉即可完全打平
                j += 1;
                fn(arr[i]);    //递归调用
            } else {
                newArr.push(arr[i]);
            }
        }
    }

    fn(arr);
    return newArr;
}

interface FullpagePropsType {
    id: string,
    config?: SwiperOptions,

    children: any
}

export default class Fullpage extends React.Component<FullpagePropsType> {
    private swiper: Swiper;
    private defaultConfig: SwiperOptions = {
        direction: 'vertical',
        effect: 'slide'
    };

    constructor(props: FullpagePropsType) {
        super(props)
    }

    componentDidMount() {
        const {id, config} = this.props;
        this.swiper = new Swiper(
            `#${id}`,
            Object.assign({}, this.defaultConfig, config)
        );
        if (!window.swiper) window.swiper = {};
        window.swiper[id] = this.swiper;
    }

    render() {
        let {children, ...otherProps} = this.props;
        children = arrayFormat(children) as Array<ReactNode>;
        return <div {...otherProps} className="swiper-container">
            <div className="swiper-wrapper">
                {children.map((item: HTMLElement, index: number) =>
                    <div key={index} className="swiper-slide">{item}</div>)}
            </div>
        </div>
    }
}