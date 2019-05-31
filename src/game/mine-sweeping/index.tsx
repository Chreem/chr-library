import * as React from 'react'
import {useCallback, useMemo, useState} from "react";
import {Global, css} from '@emotion/core'
import Grid from '~components/normal/grid'
import Overlay from '~components/normal/overlay'
import withGame, {MineSweepingPropsType} from './game';
import './style.less'
import {MineBoxType} from "./logic";


const Game = ({
                game,
                gameOver,
                win,
                width,
                height,
                handleChangeDifficulty,
                handleNewGame,
                handleClick,
                handleFlagState
              }: MineSweepingPropsType) => {
  /**
   * 游戏本体
   */
    // 每个格子点击事件
  const [firstClick, setFirstClick] = useState(true);
  const handleBoxClick = useCallback(({x, y}: MineBoxType, button: 0 | 1) => {
    if (gameOver || win) return;
    if (firstClick) {
      handleNewGame([x, y]);
      setFirstClick(false);
    }
    if (button) return handleClick([x, y]);
    else return handleFlagState([x, y]);
  }, [firstClick, gameOver, win]);

  // 生成格子
  const handleRenderData = useCallback((data: MineBoxType) => {
    const {id, isMine, flag, num, swept} = data;
    let children = num || '';
    let className = 'game-box';
    // 扫过
    if (swept) {
      className += ' swept';
      if (children) className += ` c-${num}`;
      // 是雷
      if (isMine) {
        className += ' is-mine';
        if (flag === 1) className += ' right';

      } else {
        if (flag === 1) {
          className += ' wrong';
          children = '';
        }
      }
    }

    // 未扫过
    else {
      if (!flag || flag === 2) className += ' normal';
      if (flag === 1) className += ' flag';
      if (flag === 2) children = '?';
    }
    return <div key={id}
                className={className}
                onClick={() => handleBoxClick(data, 1)}
                onContextMenu={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleBoxClick(data, 0)
                }}>
      {(swept || flag === 2) && <span>{children}</span>}
    </div>
  }, [firstClick, win, gameOver]);


  /**
   * 新游戏
   */
  const handleNewGameClick = useCallback(() => {
    let result = true;
    if (!win && !gameOver) result = confirm('还有一线生机，是否放弃本菊');
    if (!result) return;
    setFirstClick(true);
    handleNewGame();
  }, [handleNewGame, gameOver, win]);


  const handleChangeDifficultyClick = useCallback((w, h, c) => {
    let result = true;
    if (!gameOver && !win) result = confirm('还有一线生机，是否改变难度');
    if (!result) return;
    setFirstClick(true);
    handleChangeDifficulty(w, h, c);
    handleNewGame();
  }, [handleChangeDifficulty, win, gameOver]);


  const [containerWidth] = useState(23);
  const border = useMemo(() => 0.15 * containerWidth / width, [containerWidth, width]);

  return <div id="game_mine_sweeping">
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
      <div className="game-header">
        <div className="options">
          <div className="row">
            <button className="easy"
                    onClick={() => handleChangeDifficultyClick(10, 10, 10)}>easy
            </button>
            <button className="normal"
                    onClick={() => handleChangeDifficultyClick(10, 12, 20)}>normal
            </button>
            <button className="hard"
                    onClick={() => handleChangeDifficultyClick(10, 12, 45)}>hard
            </button>
          </div>
          <div className="row">
            <button className="new-game"
                    onClick={handleNewGameClick}>New Game
            </button>
          </div>
        </div>
      </div>
      <div className="game-body">
        <Grid data={game}
              renderData={handleRenderData}/>
        <Overlay className="win" active={win}>
          <span>Wow! you win!</span>
        </Overlay>
      </div>
    </div>
  </div>
};

export default withGame(Game);