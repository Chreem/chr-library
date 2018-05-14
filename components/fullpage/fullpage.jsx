import React from 'react'
import Swiper from 'swiper/dist/js/swiper'
import './full.less'
import UpArrow from './down.png'

function arrayFormat(arr) {
    if (arr.constructor !== Array)
        return;
    let newArr = [];
    let j = 0;

    function fn(arr) {
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

export default class FullPage extends React.Component {
    constructor(props) {
        super(props);
        this.config = Object.assign({
            direction: 'vertical',
            effect: 'slide',
        }, props.config);

        if (!!this.config.onSlideChange) this.config.on = {
            slideChange: this.config.onSlideChange.bind(this, this)
        };

        this.handleNextSlideClick = this.handleNextSlideClick.bind(this);
    }

    /**
     * life cycle
     */
    componentDidMount() {
        this.swiper = new Swiper('#' + this.props.id, this.config);
        if (!window.swiper) window.swiper = {};
        window.swiper[this.props.id] = this.swiper;
    }

    /**
     * 下翻页
     */
    handleNextSlideClick() {
        this.swiper.slideNext();
    }

    render() {
        let children = arrayFormat(this.props.children);
        const config = this.config;
        const {down} = config;
        if (!!down) config.downArrow = true;

        return <div id={this.props.id} style={this.props.style} className="swiper-container">
            <div className="swiper-wrapper">
                {children.map((item, index) => <div key={index} className="swiper-slide">{item}</div>)}
            </div>
            {config.downArrow ?
                <img className="slidetip-down" src={down ? down : require('./down.png')} alt="上划"
                     onClick={this.handleNextSlideClick}/> : ''}
            <div className="swiper-scrollbar"/>
        </div>
    }
}