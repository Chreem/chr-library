import guid from '~vendor/guid'

export const enum GAME_ID {
  TANK = 'tank',
  GAME2048 = '2048',
  MINE_SWEEPING = 'mine-sweeping',
  BRICK_ELIMINATION = 'brick-elimination',
  TETRIS = 'tetris'
}

export default [
  {
    id: guid(),
    link: `/game?g=${GAME_ID.TANK}`,
    name: '坦克大战',
    img: require('../assets/tank.jpeg')
  }, {
    id: guid(),
    link: `/game?g=${GAME_ID.GAME2048}`,
    active: true,
    name: '2048',
    img: require('../assets/2048.jpg')
  }, {
    id: guid(),
    link: `/game?g=${GAME_ID.MINE_SWEEPING}`,
    active: true,
    name: '扫雷',
    img: require('../assets/mine-clearance.jpg')
  }, {
    id: guid(),
    link: `/game?g=${GAME_ID.BRICK_ELIMINATION}`,
    name: '消砖块',
    img: require('../assets/brick-elimination.png')
  }, {
    id: guid(),
    link: `/game?g=${GAME_ID.TETRIS}`,
    name: '俄罗斯方块',
    img: require('../assets/tetris.jpg')
  }
];