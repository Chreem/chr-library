import * as React from 'react'
import {useCallback, useMemo, useState, useEffect} from "react";
import {css, Global} from "@emotion/core";
import withGameLogic, {TetrisPropsType} from './game'
import Grid from '~components/normal/grid'
import './style.less'
import {TetrisBoxType} from "./logic";


const Game = (
  {
    game,
    width,
    height,
    handleNewGame
  }: TetrisPropsType) => {
  const handleNewGameInit = useCallback(() => {
    handleNewGame(10, 15);
  }, [handleNewGame]);
  useEffect(() => handleNewGameInit(), [handleNewGameInit]);


  const handleRenderData = useCallback(({id, color, forTip}: TetrisBoxType) => {
    let className = 'game-box';
    if (forTip) className += ' tip';
    return <div key={id}
                className={className}
                style={color ? {backgroundColor: color} : null}/>
  }, []);


  const [containerWidth] = useState(15);
  const border = useMemo(() => 0.05 * containerWidth / width, [containerWidth, width]);
  return <div id="game_tetris">
    <Global styles={css`
      .game-body{
        width:${containerWidth}em;
        height:calc(${containerWidth / width * height}em - 2px);
      }
      .game-box{
        border:${border}em solid;
        width:${containerWidth / width - border * 2}em;
        height:${containerWidth / width - border * 2}em;
      }
    `}/>


    <div className="container">
      <div className="game-head">
        <div className="score-tip"></div>
        <div className="next-cube"></div>
      </div>
      <div className="game-body no-touch">
        <Grid data={game} renderData={handleRenderData}/>
      </div>
    </div>
  </div>
};


export default withGameLogic(Game);