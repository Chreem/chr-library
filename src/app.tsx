import * as React from 'react'
import { Component, Fragment } from 'react'
import TankWorld from './Game/Tank'
import './style.less'

export default class extends Component {
    render() {
        return <Fragment>
            <TankWorld></TankWorld>
        </Fragment>
    }
}