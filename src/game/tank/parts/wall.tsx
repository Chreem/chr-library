import * as React from 'react'
import {Component} from 'react'
import Base from './base'
import {Wall} from "../types/objects";


export default class extends Component<Wall> {
  render() {
    const {canDriveTank, canThroughBullet, ...otherProps} = this.props;
    return <Base {...otherProps}/>
  }
}