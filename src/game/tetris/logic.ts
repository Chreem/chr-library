import guid from "~vendor/guid";
import {Point} from "../../type";
import cubes from './cube'


export interface TetrisBoxType {
  id?: string,
  color?: string,
  forTip?: boolean,
  x?: number,
  y?: number
}


/**
 * 预设形状，可旋转的角度，如长条只有0|90，方块只有0
 */
type DirectType = 0 | 90 | 180 | 270
export interface TetrisShapeType {
  cubes: TetrisBoxType[],
  directs: DirectType[]
}


export default class Tetris {
  width = 5;
  height = 10;
  game: TetrisBoxType[][] = null;
  score = 0;
  presets: TetrisShapeType[] = null;


  constructor() {this.presets = cubes;}


  init = (w, h) => {
    this.width = w;
    this.height = h;
    const game = [];
    for (let y = 0; y < h; y++) {
      const row: TetrisBoxType[] = [];
      for (let x = 0; x < w; x++) {
        row.push({
          id: guid(),
          color: ''
        });
      }
      game.push(row);
    }
    this.game = game;
    this.score = 0;
    return game;
  };


  /**
   * 指定某个放格状态
   */
  generatePointPosition = ([x, y]: Point, params: TetrisBoxType) => {
    const {game} = this;
    const item = game[y][x];
    game[y][x] = {...item, ...params};
    return game;
  };


  /**
   * 扩展形状库
   */
  extendCubes = (shape: TetrisShapeType) => this.presets.push(shape)
}