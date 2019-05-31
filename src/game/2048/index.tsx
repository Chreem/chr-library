import * as React from 'react'
import {Fragment, useCallback, useEffect, useState} from "react";
import {Global, css} from '@emotion/core'
import withGameLogic, {GamePropsType} from './game'
import {Game2048BoxType} from './logic'
import Overlay from '~components/normal/overlay'
import Grid from '~components/normal/grid'
import './style.less'


const Game = ({
                bestRecord,
                currentRecord,
                width,
                height,
                gameOver,
                handleNewGame,
                handleClearBest,
                game,
                ...other
              }: GamePropsType) => {
  /**
   * 游戏本体
   */
  const handleRenderData = useCallback(({id, num, x, y}: Game2048BoxType) => {
    let className = '';
    if (num) {className += `b-${num} `}
    className += 'game-box no-touch';
    return <div id={id}
                key={id}
                style={{
                  top: `${y / height * 100}%`,
                  left: `${x / width * 100}%`
                }}
                className={className}>
      <span>{num || ''}</span>
    </div>;
  }, []);


  /**
   * 两个按钮
   */
  const handleNewGameClick = useCallback(() => {
    if (!gameOver) {
      const pass = confirm('还有一线生机，是否结束本菊');
      if (!pass) return;
    }
    handleNewGame();
  }, [handleNewGame, gameOver]);

  const handleClearBestClick = useCallback(() => {
    let pass = true;
    if (bestRecord > 500) { pass = confirm('是否清除最佳成绩'); }
    if (pass) handleClearBest();
  }, [handleClearBest, bestRecord]);


  /**
   * 宽度计算
   */
  const [containerWidth] = useState(23);
  const margin = 0.4;

  return <div id="game_2048">
    <div className="container">
      <div className="record">
        <div className="score">{currentRecord}</div>
        <div className="best">{bestRecord}</div>
      </div>
      <div className="options">
        <button className="new-game" onClick={handleNewGameClick}>New Game</button>
        <button className="clear" onClick={handleClearBestClick}>Clear</button>
      </div>

      <Global styles={css`
        .game-body{
          width:${containerWidth}em;
          height:${containerWidth / width * height}em;
        }
        .game-box{
          margin:${margin}em;
          width:${containerWidth / width - margin * 2}em;
          height:${containerWidth / width - margin * 2}em;
        }
      `}/>
      <div className="game-body" {...other}>
        <Grid data={game}
              renderData={handleRenderData}/>
        <Overlay className="game-over-tip no-touch"
                 active={gameOver}>
          Game Over
        </Overlay>
      </div>
    </div>
  </div>
};

const GameLogic = withGameLogic(Game);

export default () => {
  const [width] = useState(4);
  const [height] = useState(4);
  return <Fragment>
    <GameLogic w={width}
               h={height}
               defaultCubeCount={6}/>
  </Fragment>
}