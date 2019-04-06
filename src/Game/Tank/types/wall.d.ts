import { SceneObjectType } from "./object";

export interface Wall extends SceneObjectType {
    canBreak: boolean;
    breakLevel: number;     // 破坏所需的火力等级
    canDrive: boolean;      // 坦克能否在其上行驶
    canThroughBullet: boolean;  // 子弹可否穿过
}