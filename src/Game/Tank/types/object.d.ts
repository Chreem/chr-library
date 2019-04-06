export type Direction = 'up' | 'down' | 'left' | 'right';
export interface SceneObjectType {
    health: number;
    volume: number;     // 触碰体积
    direction: Direction;
    zIndex: number;          // 显示层级
    resource: string;       // 物体图片
}