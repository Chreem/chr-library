import * as React from 'react'
import {ComponentType, useCallback, useEffect, useRef, useState} from "react";
import GameLogic, {MineBoxType, Point} from './logic'


export interface MineSweepingPropsType {
  width?: number,
  height?: number,
  game: MineBoxType[][],
  gameOver: boolean,
  win: boolean,
  handleChangeDifficulty(w?: number, h?: number, c?: number): void;
  handleNewGame(point?: Point): void;
  handleClick(point: Point): void;
  handleFlagState(point: Point): void;
}


export default function (Component: ComponentType<MineSweepingPropsType>) {
  return props => {
    const logic = useRef<GameLogic>(new GameLogic());
    const [game, setGame] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWinState] = useState(false);

    /**
     * 初始化宽高
     */
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
    const [mine, setMineCount] = useState(10);
    const handleChangeDifficulty = useCallback((w, h, c) => {
      setWidth(w);
      setHeight(h);
      setMineCount(c);
    }, []);
    useEffect(() => {
      logic.current.init(width, height);
      setGame(logic.current.game);
    }, [width, height, mine]);


    /**
     * 新游戏
     * 给了点则生成雷，否则重绘棋盘
     */
    const handleNewGame = useCallback(p => {
      if (!width || !height || !mine || !logic.current) return;
      if (!p) logic.current.init(width, height);
      else logic.current.newGame(mine, p);
      setGameOver(false);
      setWinState(false);
      setGame(JSON.parse(JSON.stringify(logic.current.game)));
    }, [width, height, mine]);


    /**
     * 判断点击位置
     */
    const handleClick = useCallback(p => {
      if (gameOver || win) return;
      const result = logic.current.checkBoom(p);
      if (result) {
        setGameOver(true);
        logic.current.showAllBox();
      } else {
        const win = logic.current.checkWin();
        setWinState(!gameOver && win);
      }
      setGame(JSON.parse(JSON.stringify(logic.current.game)));
    }, [gameOver, win]);


    /**
     * 改变插旗状态
     */
    const handleFlagState = useCallback(p => {
      if (gameOver || win) return;
      logic.current.changeFlagState(p);
      setGame(JSON.parse(JSON.stringify(logic.current.game)));
    }, [gameOver, win]);


    return <Component width={width}
                      height={height}
                      game={game}
                      win={win}
                      gameOver={gameOver}
                      handleChangeDifficulty={handleChangeDifficulty}
                      handleNewGame={handleNewGame}
                      handleClick={handleClick}
                      handleFlagState={handleFlagState}
                      {...props}/>
  };
}