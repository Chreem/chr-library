import * as React from 'react'
import {Component} from 'react'
import store, {actions} from '../state'
import './select-style.less'
import {SCENE} from "../types/scene";

interface ComponentPropsType {
  player?: number;
}

export default class extends Component<ComponentPropsType> {
  static defaultProps = {player: 1};
  state = {player: this.props.player};

  handleKeyDown = e => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        this.setState({player: this.state.player % 2 + 1});
        break;
      case 'Enter':
        console.log(`confirm player: ${this.state.player}`);
        store.dispatch(actions.setCheckpoint(SCENE.CHECKPOINT_1));
    }
  };

  componentDidMount(): void {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {player} = this.state;

    return <div className="select-player">
      <div className={`player-1 ${player === 1 ? 'active' : ''}`}>1 Player</div>
      <div className={`player-2 ${player === 2 ? 'active' : ''}`}>2 Players</div>
    </div>
  }
}