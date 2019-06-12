import * as React from 'react'
import {ComponentType, useCallback, useEffect, useRef, useState} from "react";
import withDirectControl from '~components/hoc/DirectControl'
import Tetris, {TetrisBoxType} from './logic'


export interface TetrisPropsType {
  width?: number,
  height?: number,
  game?: TetrisBoxType[][],
  handleNewGame?(w?: number, h?: number): void,
}

interface LogicPropsType {
  direct?: string,
  fire?: boolean,
}

export default (Component: ComponentType<TetrisPropsType>) => {
  const Game = ({direct, fire, ...other}: LogicPropsType) => {
    const [game, setGame] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const handleNewGame = useCallback((w, h) => {
      setWidth(w);
      setHeight(h);
    }, []);

    const logic = useRef<Tetris>(new Tetris());
    useEffect(() => {
      if (!width || !height) return;
      const game = logic.current.init(width, height);
      logic.current.generatePointPosition([0, 0], {color: '#ff0000'})
      logic.current.generatePointPosition([0, 1], {color: '#ff0000'})
      logic.current.generatePointPosition([0, 2], {color: '#ff0000'})
      logic.current.generatePointPosition([0, 3], {color: '#ff0000'})
      logic.current.generatePointPosition([0, 5], {color: '#00ff00'})
      logic.current.generatePointPosition([0, 6], {color: '#00ff00'})
      logic.current.generatePointPosition([1, 6], {color: '#00ff00'})
      logic.current.generatePointPosition([1, 7], {color: '#00ff00'})
      setGame(game);
    }, [width, height]);

    return <Component game={game}
                      width={width}
                      height={height}
                      handleNewGame={handleNewGame}
                      {...other}/>
  };

  const ControlledGame = withDirectControl<TetrisPropsType>(Game);
  return () => <ControlledGame/>;
}