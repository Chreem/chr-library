import {TetrisShapeType} from '../logic'

const ctx = require.context('./', false, /\.ts$/);
const cubes: TetrisShapeType[] = ctx.keys().map(key => {
  const item = ctx(key);
  return item ? item.default : null;
});
export default cubes;