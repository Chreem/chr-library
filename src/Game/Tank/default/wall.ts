import {Wall} from '../types/wall'

export const normal = {
  health: 1,
  volume: 1,
  direction: 'up',
  zIndex: 1,
  resource: require('../images/wall/wall.gif'),
  canBreak: true,
  breakLevel: 1,
  canDrive: false,
  canThroughBullet: false
} as Wall;

export const grass = {
  health: 1,
  volume: 1,
  direction: 'up',
  zIndex: 10,
  resource: require('../images/wall/grass.png'),
  canBreak: true,
  breakLevel: 2,
  canDrive: true,
  canThroughBullet: true
} as Wall;

export const steel = {
  health: 1,
  volume: 1,
  direction: 'up',
  zIndex: 1,
  resource: require('../images/wall/steel.gif'),
  canBreak: true,
  breakLevel: 2,
  canDrive: false,
  canThroughBullet: false
} as Wall;

export const water = {
  health: 1,
  volume: 1,
  direction: 'up',
  zIndex: 1,
  resource: require('../images/wall/water.gif'),
  canBreak: false,
  breakLevel: 1,
  canDrive: false,
  canThroughBullet: true
} as Wall;