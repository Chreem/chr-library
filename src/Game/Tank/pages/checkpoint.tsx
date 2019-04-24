import * as React from 'react'
import {Component, HTMLProps} from 'react'
import styled from 'styled-components'
import {SceneObject} from '../types/objects'
import render from './module/render'
import game from '../logic'
import store from '../state'

interface ComponentPropsType extends HTMLProps<HTMLDivElement> {
  objects: Array<SceneObject>,
  id: string,
}


class Checkpoint extends Component<ComponentPropsType> {
  state = {objects: game.init(this.props.objects)};


  componentDidMount(): void {

  }


  render() {
    const {objects, className, ...otherProps} = this.props;

    return <div className={`checkpoint ${className || ''}`}
                {...otherProps}>
      {render(this.state.objects)}
    </div>
  }
}

const side = 20;
export default styled(Checkpoint)`
  position: relative;
  *{
    position: absolute;
    width: ${100 / side}%;
    height: ${100 / side}%;
  }
  .tank{
    width: ${200 / side}%;
    height: ${200 / side}%;
  }
`;