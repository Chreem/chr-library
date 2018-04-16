import React from 'react'
import './overlay.less'

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const show = this.props.show;
        return <div id={this.props.id} className={show ? 'overlay active' : 'overlay'} onClick={this.props.onClick}>
            {this.props.children}
        </div>
    }
}