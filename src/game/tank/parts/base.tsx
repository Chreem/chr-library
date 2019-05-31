import * as React from 'react'
import {Component} from 'react'
import {BaseObject} from "../types/objects";


interface BasePropsType extends BaseObject {
  className?: string,
  width?: number,
  height?: number
}


export default class extends Component<BasePropsType> {
  static defaultProps = {width: 20, height: 20};

  render() {
    const {
      id, width, height, className, tip,
      type, classify, position, topClass,
      direction,
      health,
    } = this.props;
    const [x, y] = position || [0, 0];
    const style: any = {
      top: `${y * 100 / height}%`,
      left: `${x * 100 / width}%`,
      zIndex: topClass,
    };
    if (tip) {style.opacity = 0.6}
    return <div key={id}
                className={`${type} ${classify || ''} ${direction || ''} ${className || ''}`}
                data-health={health}
                style={style}/>
  }
}