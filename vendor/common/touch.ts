export type Point = { x: number, y: number };
export type Vector = { start: Point, direct: Point };

type Callback<T, E=Event> = (type?: T, originEvent?: E) => void;
type NumberCallback = Callback<number>;
type ObjectCallback = Callback<Point>;

/**
 * 事件队列
 * @constructor
 */
class TouchEventArray<T> {
    private _list: Array<T> = [];

    list() {
        return this._list;
    }

    add(cb: T) {
        this._list.push(cb)
    }

    remove(cb: T) {
        const index = this._list.indexOf(cb);
        if (index <= -1) return false;
        this._list.splice(index, 1);
        return true;
    }
}

class CallbackManager {
    protected moveQueue = new TouchEventArray<ObjectCallback>();
    protected rotateQueue = new TouchEventArray<NumberCallback>();
    protected zoomQueue = new TouchEventArray<NumberCallback>();

    protected moveCallback(direct: Point, e: Event) {
        const moveQueue = this.moveQueue.list();
        moveQueue.forEach(function (cb) {
            cb(direct, e)
        });
    }

    protected rotateCallback(angle: number, e: Event) {
        const rotateQueue = this.rotateQueue.list();
        rotateQueue.forEach(function (cb) {
            cb(angle, e)
        });
    }

    protected zoomCallback(zoom: number, e: Event) {
        const zoomQueue = this.zoomQueue.list();
        zoomQueue.forEach(cb => {
            cb(zoom, e)
        })
    }

    public addMoveListener(cb: ObjectCallback) {
        this.moveQueue.add(cb);
    }

    public addRotateListener(cb: NumberCallback) {
        this.rotateQueue.add(cb);
    }

    public addZoomListener(cb: NumberCallback) {
        this.zoomQueue.add(cb)
    }
}

/**
 * 调用实例及DOM交互
 */
export class TouchGesture extends CallbackManager {
    private startPoint: Array<Point> = [];

    private handleTouchStart(e: TouchEvent) {
        let len = e.touches.length;
        for (let i = 0; i < len; i++) {
            this.startPoint[i] = {
                x: e.touches[i].clientX,
                y: e.touches[i].clientY
            };
        }
    }

    private handleTouchEnd() {
        this.startPoint.pop();
    }

    private handleTouchMove(e: TouchEvent) {
        const {clientX: x2, clientY: y2} = e.touches[0];
        const {startPoint} = this;
        if (startPoint.length <= 0) startPoint.push({x: x2, y: y2});
        const {x: x1, y: y1} = startPoint[0];
        const moveResult = {x: (x2 - x1) / 100, y: (y2 - y1) / 100};
        this.moveCallback(moveResult, e);
        this.startPoint[0].x = x2;
        this.startPoint[0].y = y2;

        if (e.touches.length < 2) return;
        const {clientX: x2p, clientY: y2p} = e.touches[1];
        if (this.startPoint.length <= 1) this.startPoint.push({x: x2p, y: y2p});
        const {x: x1p, y: y1p} = startPoint[1];
        const rotateQueue = this.rotateQueue.list();
        if (rotateQueue.length > 0) {
            const oa = {
                start: {x: x1, y: y1},
                direct: {x: x1p, y: y1p}
            };
            const ob = {
                start: {x: x2, y: y2},
                direct: {x: x2p, y: y2p}
            };
            this.rotateCallback(TouchGesture.VectorAngle(oa, ob), e)
        }

        const zoomQueue = this.zoomQueue.list();
        if (zoomQueue.length > 0) {
            const originDirect = TouchGesture.getDirect(this.startPoint[0], this.startPoint[1]);
            const direct = TouchGesture.getDirect({x: x2p, y: y2p}, {x: x2, y: y2});
            this.zoomCallback(direct - originDirect, e)
        }

        this.startPoint[1].x = x2p;
        this.startPoint[1].y = y2p;

        // 禁用元素内默认滚动事件
        if (e.cancelable) {
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
    }

    constructor(target: HTMLElement) {
        super();
        target.addEventListener('touchstart', this.handleTouchStart.bind(this));
        target.addEventListener('touchmove', this.handleTouchMove.bind(this));
        target.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }

    /**
     * 预留缩放关系函数
     * @param {number} direct
     */
    public static zoomProportion(direct: number) {
        const {log, abs} = Math;
        return direct > 0
            // y = log(x+1)/log(0.2)
            ? log(abs(direct + 1)) / log(0.2)
            // y = -x/5;
            : -direct / 5;
    }

    /**
     * 两点的距离
     * @param {Point} p1
     * @param {Point} p2
     * @returns {number}
     */
    public static getDirect(p1: Point, p2: Point) {
        const {x: x1, y: y1} = p1;
        const {x: x2, y: y2} = p2;
        const tempX = Math.abs(x2 - x1);
        const tempY = Math.abs(y2 - y1);
        return Math.sqrt(tempX ** 2 + tempY ** 2);
    }

    /**
     * 向量夹角
     * @param {Vector} a
     * @param {Vector} b
     * @constructor
     */
    public static VectorAngle(a: Vector, b: Vector) {
        const {abs, acos} = Math;
        const x1 = abs(a.direct.x - a.start.x);
        const y1 = abs(a.direct.y - a.start.y);
        const x2 = abs(b.direct.x - b.start.x);
        const y2 = abs(b.direct.y - b.start.y);
        const oa$ob = x1 * x2 + y1 * y2;
        const oa2 = x1 ** 2 + y1 ** 2;
        const ob2 = x2 ** 2 + y2 ** 2;
        const cosOaOb = oa$ob / ((oa2 * ob2) ** 0.5);
        // 角度 = arccos(余弦公式)
        const angle = acos(cosOaOb);
        // 方向 = aXb>0 ? 顺时针:逆时针;
        return (x1 * y2 - x2 * y1) > 0 ? angle : -angle;
    }
}

export class MouseGesture extends CallbackManager {
    private startPoint: Point;
    private mouseMoveActive = false;

    private handleMouseDown(e: MouseEvent) {
        const {clientX, clientY} = e;
        this.startPoint = {x: clientX, y: clientY};
        this.mouseMoveActive = true;
    }

    private handleMouseUp() {
        this.startPoint = undefined;
        this.mouseMoveActive = false;
    }

    private handleMouseMove(e: MouseEvent) {
        if (!this.mouseMoveActive) return;
        const {clientX: x2, clientY: y2} = e;
        if (!this.startPoint) this.startPoint = {x: x2, y: y2};
        const {x: x1, y: y1} = this.startPoint;
        const result = {
            x: (x2 - x1) / 100,
            y: (y2 - y1) / 100
        };
        this.moveCallback(result, e);
        this.startPoint.x = x2;
        this.startPoint.y = y2;
    }

    private handleMouseWheel(e: MouseWheelEvent) {
        const {wheelDelta, altKey} = e;
        const result = wheelDelta > 0 ? 10 : -10;
        altKey
            ? this.zoomCallback(result, e)
            : this.rotateCallback(result / 10, e);
    }

    constructor(target: HTMLElement) {
        super();
        target.addEventListener('mousedown', this.handleMouseDown.bind(this))
        target.addEventListener('mousewheel', this.handleMouseWheel.bind(this))
        target.addEventListener('mousemove', this.handleMouseMove.bind(this))
        target.addEventListener('mouseup', this.handleMouseUp.bind(this))
    }
}