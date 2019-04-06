import { SceneObjectType } from "./object";

export interface Item extends SceneObjectType {
    existTime: number;      // 掉落后存在时间
    
}