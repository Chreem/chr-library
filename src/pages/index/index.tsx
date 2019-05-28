import * as React from 'react'
import GamePad from '~components/normal/game-pad'
import {createHashHistory} from 'history'
import './style.less'
import {useState, useImperativeHandle, useRef, useCallback} from "react";
import sleep from "~vendor/sleep";
import allSelects from '../../Game'


const ALL_COUNT = allSelects.length;
const EVERY_ROW = 3;
const history = createHashHistory();


export default () => {
  const [active, setActive] = useState(0);
  const [clicked, setClick] = useState(false);
  const animateTime = 500;

  const handleDirectChange = useCallback(d => {
    if (clicked) return;
    switch (d) {
      case 'w':
      case 'ArrowUp':
        setActive(active => (active + ALL_COUNT - EVERY_ROW) % ALL_COUNT);
        break;
      case 's':
      case 'ArrowDown':
        setActive(active => (active + EVERY_ROW) % ALL_COUNT);
        break;
      case 'a':
      case 'ArrowLeft':
        setActive(active => (active + ALL_COUNT - 1) % ALL_COUNT);
        break;
      case 'd':
      case 'ArrowRight':
        setActive(active => (active + 1) % ALL_COUNT);
        break;
    }
  }, [clicked]);


  const handleConfirm = useCallback(index => {
    if (clicked) return;
    setClick(true);
    setActive(index);
    const path = allSelects[index].link;
    (async () => {
      await sleep(animateTime);
      history.push(path);
    })();
  }, [clicked]);

  const handleConfirmKeyDown = useCallback(c => {
    if (clicked) return;
    c && handleConfirm(active);
  }, [handleConfirm, clicked, active]);


  const selects = allSelects.map(({id, name, link, img}, index) => {
    let className = 'game ';
    className += index === active ? 'active ' : '';
    className += ((index === active) && clicked) ? 'select' : '';
    return <div key={id}
                className={className}
                onClick={() => handleConfirm(index)}>
      <div className="bg"
           style={{backgroundImage: `url(${img})`}}/>
      <span className="name">{name}</span>
    </div>
  });


  return <div id="index">
    <div className="left">{selects}</div>

    <div className="control">
      <GamePad directKey={['w', 'a', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']}
               fireKey={['j', ' ']}
               onDirectChange={handleDirectChange}
               onConfirm={handleConfirmKeyDown}/>
      <div className="tip">Try: ↑↓←→ space</div>
    </div>
  </div>;
};