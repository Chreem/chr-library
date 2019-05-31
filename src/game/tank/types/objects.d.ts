interface BaseObject {
  id?: string,
  position: [number, number];
  type: string,
  classify: string,

  direction?: Direction,
  health?: number,
  resource?: string,          // 材质图片
  topClass?: number,          // 显示层级，对应z-index
  breakLevel?: number,        // 破坏所需等级
  editor?: boolean,           // 地图编辑状态，如坦克按键监听等将不可用
  tip?: boolean,              // 提示状态，物体将更透明
}
export const enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}
export const enum ObjectType {
  WALL = 'wall',
  TANK = 'tank'
}


/**
 * 墙
 */
export const enum WallType {
  NORMAL = 'normal',
  STEEL = 'steel',
  GRASS = 'grass',
  WATER = 'water'
}
export interface Wall extends BaseObject {
  type: ObjectType.WALL,
  classify: WallType,
  canThroughBullet?: boolean, // 子弹可否通过
  canDriveTank?: boolean      // 坦克可否通过
}


/**
 * 坦克
 */
export const enum TankType {
  PLAYER1 = 'player1',
  PLAYER2 = 'player2',
  NORMAL = 'normal',
  SPEED_UP = 'speed_up',
  HEALTH_UP = 'health_up',
  POWER_UP = 'power_up'
}
export interface Tank extends BaseObject {
  type: ObjectType.TANK,
  classify: TankType,
  direction: Direction,
  level?: TankType, // for player
  speed: number,    // 移动一格所需时间ms
}

export type SceneObject = Wall | Tank;