import guid from "~vendor/guid";
import random from "~vendor/random";

export interface MineBoxType {
  id?: string,
  x?: number,
  y?: number,
  isMine?: boolean,   // 本格是否为雷
  num?: number,       // 周围雷数
  swept?: boolean,    // 已扫过
  flag?: 0 | 1 | 2,   // 插旗，1旗，2问号
}

export type Point = [number, number];


export default class MineSweeping {
  game: MineBoxType[][] = null;
  width = 0;
  height = 0;
  mineCount = 0;


  /**
   * 根据宽高生成最初的棋盘
   * 调整难度
   */
  init = (w: number, h: number) => {
    this.width = w;
    this.height = h;
    const result: MineBoxType[][] = [];
    for (let y = 0; y < h; y++) {
      const row = [];
      for (let x = 0; x < w; x++) {
        row.push({
          id: guid(),
          isMine: false,
          swept: false,
          flag: 0,
          num: 0,
          x,
          y,
        });
      }
      result.push(row);
    }
    this.game = result;
    return result;
  };


  /**
   * 在已有棋盘上布雷
   * 首次点击
   */
  newGame = (mineCount: number, point: Point) => {
    this.mineCount = mineCount;
    const {width, height, game} = this;
    if (width * height <= mineCount) return;
    const empty: MineBoxType[] = [];

    // 雷超过格子的三分之一 用排除法生成
    if (mineCount >= (width * height / 3)) {
      console.log('顺序排除法');
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // 首次点击位置
          if (point[0] === x && point[1] === y) continue;
          empty.push(game[y][x]);
        }
      }

      for (let i = 0; i < mineCount; i++) {
        const len = empty.length;
        if (len <= 0) break;
        const index = random(0, len - 1, true);
        const item = empty[index];
        this.generateBoom([item.x, item.y]);
        empty.splice(index, 1);
      }
    }

    // 雷较少，则在随机位置生成
    else {
      console.log('随机');
      for (let i = 0; i < mineCount; i++) {
        const w = random(0, width - 1, true);
        const h = random(0, height - 1, true);
        // 首次点击位置，以及已经是雷的位置不生成
        const item = game[h][w];
        if ((w === point[0] && h === point[1]) || item.isMine) {
          i--;
          continue;
        }
        this.generateBoom([w, h]);
      }
    }

    return game;
  };


  /**
   * 以点击位置起始，泛开查询所有不是雷的格子
   */
  checkBoom = ([x, y]: Point) => {
    // 待检测队列
    const item = this.game[y][x];
    if (item.flag || item.swept) return false;
    if (item.isMine) return true;
    const checkArray: MineBoxType[] = [];
    checkArray.push(item);

    // 查重队列
    const idArray: string[] = [item.id];
    while (checkArray.length > 0) {
      const target = checkArray.shift();
      const {id, isMine, flag, x, y, num, swept} = target;
      if (isMine) return true;
      if (flag || swept) continue;
      if (num) {
        target.swept = true;
        continue;
      }

      if (num === 0) {
        target.swept = true;
        const around = this.findAround([x, y]);
        around.map(i => {
          if (idArray.indexOf(i.id) >= 0) return;
          if (i.swept || i.isMine) return;
          idArray.push(i.id);
          checkArray.push(i);
        });
      }
    }
  };


  checkWin = () => {
    const {width, height, mineCount, game} = this;
    let count = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (game[y][x].swept) count += 1;
      }
    }
    return count >= (width * height - mineCount);
  };


  /**
   * 显示结果
   */
  showAllBox = () => {
    const {width, height, game} = this;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const item = game[y][x];
        if (item.flag === 2) item.flag = 0;
        item.swept = true;
      }
    }
    return game;
  };


  /**
   * 改变插旗状态
   */
  changeFlagState = ([x, y]: Point) => {
    const item = this.game[y][x];
    if (!item.swept) item.flag = (item.flag + 1) % 3 as any;
    return this.game;
  };


  generatePointPosition = ([x, y]: Point, params: MineBoxType) => {
    const {game, width, height} = this;
    if (x >= width || y >= height) return;
    const {...origin} = game[y][x];
    game[y][x] = {...origin, ...params};
    return game;
  };


  // 生成炸弹，周围格子雷数+1
  private generateBoom = (p: Point) => {
    this.generatePointPosition(p, {isMine: true, num: 0});
    const around = this.findAround(p);
    for (let i = 0, len = around.length; i < len; i++) {
      const item = around[i];
      if (!item.isMine) item.num += 1;
    }
  };


  // 整合周围格子
  private findAround = ([x, y]: Point, withBoom = false) => {
    const {game} = this;
    const result: MineBoxType[] = [];
    for (let j = 0; j <= 2; j++) {
      const row = game[y + j - 1];
      if (!row) continue;
      for (let i = 0; i <= 2; i++) {
        const item = row[x + i - 1];
        if (!item) continue;
        if (!withBoom && item.isMine) continue;
        if (x === (x + i - 1) && y === (y + j - 1)) continue;
        result.push(item);
      }
    }
    return result;
  };
}
