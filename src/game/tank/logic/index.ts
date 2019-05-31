import {ObjectType, SceneObject, TankType} from "../types/objects";


const WALL = {
  NORMAL: require('../config/wall.normal.js'),
  STEEL: require('../config/wall.steel.js'),
  GRASS: require('../config/wall.grass.js'),
  WATER: require('../config/wall.water.js'),
};


export default new class {
  data: Array<SceneObject> = null;

  private fillLive = (data: Array<SceneObject>) => {
    data = data.map(item => {
      switch (item.type) {
        case ObjectType.WALL:
        case ObjectType.TANK:
          item.health = 1;
      }
      return item;
    });
    return data;
  };

  init(data: Array<SceneObject>) {
    this.data = JSON.parse(JSON.stringify(data));
    this.fillLive(this.data);
    return this.data;
  }
}