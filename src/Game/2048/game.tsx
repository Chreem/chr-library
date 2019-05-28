import * as React from 'react'
import {ComponentType, useCallback, useEffect, useRef, useState} from "react";
import GameLogic, {Game2048BoxType} from './logic'
import withControl from '~components/hoc/DirectControl'


export interface GamePropsType {
  bestRecord?: number,
  currentRecord?: number,
  game?: Game2048BoxType[][],
  gameOver?: boolean,
  width?: number,
  height?: number,

  handleNewGame?(): void;
  handleClearBest?(): void;
}


interface ComponentPropsType {
  w?: number,
  h?: number,
  defaultCubeCount?: number,

  direct?: string,
  fire?: boolean
}

export default function (Component: ComponentType<GamePropsType>) {
  const WrapperComponent = ({w, h, defaultCubeCount, direct, fire, ...other}: ComponentPropsType) => {
    const [game, setGame] = useState(null);
    const logic = useRef<GameLogic>(null);
    const [gameOver, setGameOverState] = useState(false);
    const [bestRecord, setBestRecord] = useState(0);
    useEffect(() => {
      logic.current = new GameLogic();
      logic.current.newGame(w, h, defaultCubeCount);
      setGame(logic.current.game);
      setGameOverState(false);
      setBestRecord(logic.current.bestRecord);
    }, [w, h, defaultCubeCount]);


    useEffect(() => {
      let res = null;
      if (direct === 'normal') return;
      switch (direct) {
        case 'ArrowUp':
          res = logic.current.moveToTop();
          break;
        case 'ArrowDown':
          res = logic.current.moveToBottom();
          break;
        case 'ArrowLeft':
          res = logic.current.moveToLeft();
          break;
        case 'ArrowRight':
          res = logic.current.moveToRight();
          break;
        default:
          return;
      }
      const [g, hasChange] = res;
      if (!hasChange) return;
      logic.current.generateRandom(1);
      const result = logic.current.checkMovable();
      setGameOverState(!result);
      setGame(JSON.parse(JSON.stringify(logic.current.game)));
      setBestRecord(logic.current.bestRecord);
    }, [direct]);


    const handleNewGame = useCallback(() => {
      if (!logic.current) logic.current = new GameLogic();
      const game = logic.current.newGame(w, h, defaultCubeCount);
      setGame(game);
      setGameOverState(false);
    }, [w, h, defaultCubeCount]);


    const handleClearBest = useCallback(() => {
      logic.current.clearBest();
      setBestRecord(logic.current.bestRecord);
    }, []);


    return <Component game={game}
                      currentRecord={logic.current && logic.current.currentRecord}
                      bestRecord={bestRecord}
                      handleNewGame={handleNewGame}
                      handleClearBest={handleClearBest}
                      gameOver={gameOver}
                      width={w}
                      height={h}
                      {...other}/>
  };

  return withControl(WrapperComponent);
}