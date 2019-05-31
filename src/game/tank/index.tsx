import * as React from 'react'
import {Component, HTMLProps} from 'react'
import StoreReceiver from '~components/hoc/StoreReceiver'
import store, {TankStateType} from './state'
import Scene from './pages'
import './style.less'

interface AppPropsType extends HTMLProps<HTMLDivElement>, TankStateType {}


class App extends Component<AppPropsType> {
  render() {
    const {checkpoint, ...otherProps} = this.props;

    return <div id="tank" {...otherProps}>
      {Scene[checkpoint]}
    </div>
  }
}

export default StoreReceiver(App, store);