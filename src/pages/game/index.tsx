import * as React from 'react'
import * as qs from 'query-string'
import Error404 from '../error/404'
import Game2048 from '../../Game/2048'
import {RouteComponentProps} from 'react-router-dom'
import {useEffect, useState} from "react";
import {GAME_ID} from '../../Game'


export default ({location}: RouteComponentProps) => {
  const [view, setView] = useState(null);
  useEffect(() => {
    const query = qs.parse(location.search);
    switch (query['g']) {
      case GAME_ID.TANK:
      case GAME_ID.GAME2048:
      case GAME_ID.MINE_CLEARANCE:
      case GAME_ID.BRICK_ELIMINATION:
      case GAME_ID.TETRIS:
        setView(<Game2048/>);
        break;
      default:
        setView(<Error404/>);
        return;
    }
  }, [location.search]);
  return <div id="game">{view}</div>
}