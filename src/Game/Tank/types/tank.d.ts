import { SceneObjectType } from "./object";

export const enum TANK_TYPE {
    NORMAL = '1',           // 普通坦克
    SPEED_UP = '2',         // 行驶速度强化 2倍行驶速度
    HEALTHY_UP = '3',       // 生命值强化   3点生命
    POWER_UP = '4',         // 攻击力强化   可打穿钢板

    PLAYER_NORMAL = '5',
    PLAYER_SPEED_UP = '6',
    PLAYER_BULLET_UP = ''
}

export const enum TANK_CAMP {
    PLAYER = 'player',
    ENEMY = 'enemy'
}

export interface Tank extends SceneObjectType {
    speed: number;      // 行驶速度
    camp: TANK_CAMP;       // 阵营
    type: TANK_TYPE;    // 坦克种类
    withItem: boolean;  // 是否携带道具
    bulletCount: number;    // 同时存在的子弹数量
    bulletLevel: number;
    bulletSpeed: number;
}