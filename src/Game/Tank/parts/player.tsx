import * as React from 'react'
import {Component, HTMLProps} from 'react'
import Base from './base'
import {Direction, Tank, TankType} from "../types/objects";

type ControlType = {
  UP: string,
  DOWN: string,
  LEFT: string,
  RIGHT: string,
  FIRE: string
};

const PLAYER1_CONTROL: ControlType = {
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd',
  FIRE: 'j'
};


const PLAYER2_CONTROL: ControlType = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  FIRE: 'Space'
};


interface TankPropsType extends Tank {
  onMove?(d: Direction, t: Tank): void;
  editor?: boolean;
  width?: number,
  height?: number
}

export default class extends Component<TankPropsType> {
  control = {} as ControlType;
  state = {
    animating: false,
    position: null as [number, number],
    direction: null as Direction
  };


  moveTo = (direction: string) => {
    this.setState({animating: true, direction});
  };


  handleKeyPress = e => {
    e.stopPropagation();
    e.preventDefault();
    const {UP, DOWN, LEFT, RIGHT, FIRE} = this.control;
    const {moveTo} = this;
    switch (e.key) {
      case UP:
        return moveTo('up');
      case DOWN:
        return moveTo('down');
      case LEFT:
        return moveTo('left');
      case RIGHT:
        return moveTo('right');
    }
  };

  handleKeyUp = e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({animating: false});
  };

  componentDidMount() {
    const {classify, editor, position, direction} = this.props;
    this.setState({position, direction});
    if (editor) return;
    window.addEventListener('keydown', this.handleKeyPress);
    window.addEventListener('keyup', this.handleKeyUp);
    if (classify === TankType.PLAYER2) this.control = PLAYER2_CONTROL;
    if (classify === TankType.PLAYER1) this.control = PLAYER1_CONTROL;
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    const {animating, position, direction} = this.state;
    const {level, ...otherProps} = this.props;
    return <Base className={`${level ? ('l' + level) : 'l1'} ${animating ? 'animating' : ''}`}
                 {...otherProps}
                 position={position}
                 direction={direction}>
      <div className="img"/>
    </Base>
  }
}