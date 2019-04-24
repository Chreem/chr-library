import * as React from 'react'
import {ObjectType, SceneObject, TankType, WallType} from "../../../types/objects";
import Player from '../../../parts/player'
import Wall from '../../../parts/wall'
import './style.less'


const WALL = {
  [WallType.GRASS]: require('../../../config/wall.grass.js'),
  [WallType.NORMAL]: require('../../../config/wall.normal.js'),
  [WallType.STEEL]: require('../../../config/wall.steel.js'),
  [WallType.WATER]: require('../../../config/wall.water.js')
};


type SceneType = {
  width: number,
  height: number,
  editor?: boolean
};
const index = (obj: SceneObject | Array<SceneObject>, scene?: SceneType) => {
  if (!obj) return null;
  if (obj.constructor === Array) return (obj as Array<SceneObject>).map(i => index(i, scene));
  scene = scene || {width: 20, height: 20, editor: false} as SceneType;

  obj = obj as SceneObject;
  switch (obj.type) {
    case ObjectType.TANK:
      if (obj.classify === TankType.PLAYER1 || obj.classify === TankType.PLAYER2)
        return <Player {...obj} {...scene}/>;
      else return null;
    case ObjectType.WALL:
      return <Wall {...obj} {...WALL[obj.classify]} {...scene}/>;
    default:
      return null;
  }
};

export default index;