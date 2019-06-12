import * as React from 'react'
import * as qs from 'query-string'
import {RouteComponentProps} from 'react-router-dom'
import {useEffect, useState} from "react";
import Error404 from '../error/404'
import Game2048 from '../../game/2048'
import Tetris from '../../game/tetris'
import MineSweeping from '../../game/mine-sweeping'
import {GAME_ID} from '../../game'


export default ({location}: RouteComponentProps) => {
  const [view, setView] = useState(null);
  useEffect(() => {
    const query = qs.parse(location.search);
    switch (query['g']) {
      case GAME_ID.TANK:
      case GAME_ID.GAME2048:
        setView(<Game2048/>);
        break;
      case GAME_ID.MINE_SWEEPING:
        setView(<MineSweeping/>);
        break;
      case GAME_ID.BRICK_ELIMINATION:
      case GAME_ID.TETRIS:
        setView(<Tetris/>);
        break;
      default:
        setView(<Error404/>);
        return;
    }
  }, [location.search]);
  return <div id="game">{view}</div>
}