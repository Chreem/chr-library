import guid from '~vendor/guid'
import random from "~vendor/random";

const key = require('../../const/game.json');


export interface Game2048BoxType {
  id: string,
  x: number,
  y: number,
  num: number
}


class GameLogic {
  currentRecord = 0;
  bestRecord = 0;
  width = 0;
  height = 0;
  game: Game2048BoxType[][] = null;

  constructor() {
    const item = localStorage.getItem(key['game-ls-key']);
    if (!item) return;
    const lsItem = JSON.parse(item);
    this.bestRecord = parseInt(lsItem[key['game-2048']]) || 0;
  }

  /**
   * 初始化容器
   */
  newGame = (w = 4, h = 4, defaultCubeCount = 3) => {
    const result = [];
    this.width = w;
    this.height = h;
    for (let j = 0; j < h; j++) {
      const row = [];
      for (let i = 0; i < w; i++) {
        row.push({
          id: guid(),
          x: i,
          y: j,
          num: 0
        })
      }
      result.push(row);
    }
    this.game = result;
    this.currentRecord = 0;
    this.generateRandom(defaultCubeCount);
    return result;
  };


  /**
   * 随机位置生成
   */
  generateRandom: (count?: number) => [Game2048BoxType[][], boolean] = (c = 1) => {
    const {width, height, game} = this;
    if (!game) return;
    const numberEqualZero = [] as Game2048BoxType[];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const {num} = game[j][i];
        if (num === 0) numberEqualZero.push(game[j][i]);
      }
    }

    let successGenerated = true;
    let len = numberEqualZero.length;
    if (len < c) successGenerated = false;
    else {
      for (let i = 0; i < c; i++) {
        len = numberEqualZero.length;
        if (len <= 0) {
          successGenerated = false;
          break;
        }
        const result = random(1, 2, true);
        const index = random(0, len - 1, true);
        numberEqualZero[index].num = result * 2;
        numberEqualZero.splice(index, 1);
      }
    }

    return [this.game, successGenerated];
  };


  /**
   * 指定位置生成某数
   * @param x
   * @param y
   * @param num
   */
  generatePointPosition = (x: number, y: number, num: number) => {
    this.game[y][x].num = num;
    return this.game;
  };


  /**
   * core
   * 某一列的计算方式
   */
  move: (array: Game2048BoxType[]) => [Game2048BoxType[], boolean] = arr => {
    const result = [];
    const len = arr.length;
    let index = 0;
    let hasChange = false;
    for (let i = 0; i < len; i++) {
      // 该位为0直接跳过
      if (arr[i].num <= 0) continue;

      // 该结果位什么都没有，可大胆放入
      if (!result[index]) {
        result[index] = arr[i];
        continue;
      }

      // 新位与之前数字相同则相加
      // 结果由相加结果累加
      if (arr[i].num === result[index].num) {
        const resNum = result[index].num * 2;
        result[index].num = resNum;
        result[index].id = arr[i].id;
        this.logRecord(this.currentRecord + resNum);
        index += 1;
      }

      // 两数不同，下标后移并加入
      else {
        index += 1;
        result[index] = arr[i];
      }
    }


    // 新增元素填充空位
    for (let i = index; i < len; i++) {
      if (!result[i]) {
        result[i] = {
          id: guid(),
          x: 0,
          y: 0,
          num: 0
        }
      }
    }

    // 检测是否有元素改变
    for (let i = 0; i < len; i++) {
      if (result[i].num !== arr[i].num) {
        hasChange = true;
        break;
      }
    }


    return [result, hasChange];
  };


  private moveTo = () => {

  };

  /**
   * 方向移动
   */
    // 上移
  moveToTop = () => {
    const {game, width, height} = this;
    let hasChange = false;
    for (let x = 0; x < width; x++) {
      let result = [];
      for (let y = 0; y < height; y++) { result.push(game[y][x]); }
      const [res, hasMoved] = this.move(result);
      if (!hasMoved) continue;
      hasChange = true;
      result = res;
      let i = 0;
      for (let y = 0; y < height; y++) {
        const {num, id} = result[i];
        game[y][x] = {id, num, x, y};
        i++;
      }
    }
    return [JSON.parse(JSON.stringify(this.game)), hasChange];
  };

  // 下移
  moveToBottom = () => {
    const {game, width, height} = this;
    let hasChange = false;
    for (let x = 0; x < width; x++) {
      let result = [];
      for (let y = height - 1; y >= 0; y--) { result.push(game[y][x]); }
      const [res, hasMoved] = this.move(result);
      if (!hasMoved) continue;
      hasChange = true;
      result = res;
      let i = 0;
      for (let y = height - 1; y >= 0; y--) {
        const {num, id} = result[i];
        game[y][x] = {id, num, x, y};
        i++;
      }
    }
    return [JSON.parse(JSON.stringify(this.game)), hasChange];
  };

  moveToLeft = () => {
    const {game, width, height} = this;
    let hasChange = false;
    for (let y = 0; y < height; y++) {
      let result = [];
      for (let x = 0; x < width; x++) {
        result.push(game[y][x]);
      }
      const [res, hasMoved] = this.move(result);
      if (!hasMoved) continue;
      hasChange = true;
      result = res;
      let i = 0;
      for (let x = 0; x < width; x++) {
        const {num, id} = result[i];
        game[y][x] = {id, num, x, y};
        i++;
      }
    }
    return [JSON.parse(JSON.stringify(this.game)), hasChange];
  };

  moveToRight = () => {
    const {game, width, height} = this;
    let hasChange = false;
    for (let y = 0; y < height; y++) {
      let result = [];
      for (let x = width - 1; x >= 0; x--) {
        result.push(game[y][x]);
      }
      const [res, hasMoved] = this.move(result);
      if (!hasMoved) continue;
      hasChange = true;
      result = res;
      let i = 0;
      for (let x = width - 1; x >= 0; x--) {
        const {num, id} = result[i];
        game[y][x] = {id, num, x, y};
        i++;
      }
    }
    return [JSON.parse(JSON.stringify(this.game)), hasChange];
  };


  /**
   * 还能否移动
   * 相邻数字是否相同，是否有空格等
   */
  checkMovable = () => {
    const {game, width, height} = this;
    let movable = false;
    for (let x = 0; x < width; x++) {
      if (movable) break;
      for (let y = 0; y < height; y++) {
        // 有空格直接pass
        const {num} = game[y][x];
        if (num === 0) movable = true;
        if (movable) break;

        // 左右相邻相同pass
        const left = game[y][x - 1] || {num: 0};
        const right = game[y][x + 1] || {num: 0};
        if (num === left.num || num === right.num) movable = true;
        if (movable) break;

        const top = game[y - 1] ? game[y - 1][x] : {num: 0};
        const bottom = game[y + 1] ? game[y + 1][x] : {num: 0};
        if (num === top.num || num === bottom.num) movable = true;
      }
    }
    return movable;
  };


  /**
   * 清除最佳成绩
   */
  clearBest = () => this.setBest(0);

  private logRecord = (current: number) => {
    this.currentRecord = current;
    if (this.currentRecord < this.bestRecord) return;

    // better than before
    this.setBest(current);
  };

  private setBest = (best: number) => {
    this.bestRecord = best;
    let item = localStorage.getItem(key['game-ls-key']);
    let lsItem = null;
    if (!item) lsItem = {};
    else lsItem = JSON.parse(item);
    lsItem[key['game-2048']] = best;
    localStorage.setItem(key['game-ls-key'], JSON.stringify(lsItem));
  }
}

export default GameLogic