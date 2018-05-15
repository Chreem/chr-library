import * as React from 'react'
import './overlay.less'

export default class Overlay extends React.Component<{ show: boolean }> {
    render() {
        const {show, ...otherProps} = this.props;
        return <div {...otherProps} className={'overlay' + (show ? ' active' : '')}/>
    }
}