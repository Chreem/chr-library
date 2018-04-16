import React from 'react'
import './index.less'

class Drop extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {x, y, z, range, offset} = this.props.coordinate;
        x = x || 0;
        y = y || 0;
        z = z || 0;
        range = range || 0;
        offset = offset || 0;
        const width = window.innerWidth;
        const cmpStyle = {
            // 7-9s
            'animationDuration': `${9 - (z / 5)}s`,    // 持续时间z相关 越大约靠前  持续时间短
            'zIndex': z,
            'height': z / 5 * 20 + 20 + 'px',
            'width': z / 5 * 20 + 20 + 'px',

            // 0-7s(最大值值尽量在animationDuration之间)
            'animationDelay': (7 - y / 15) + 's',    // 延迟y相关    越大越偏下  延迟越短

            'left': x + '%',                            // 起始位置

            // 在某个范围偏移
            'transform': `translateX(${range + offset}px)`
        };

        return <div className="drop-component" style={cmpStyle}>{this.props.children}</div>
    }
}

export default Drop