import { Color, Point, Size } from '../utils';
import { Rectangle } from './';
export declare class Container extends Rectangle {
    items: Container[];
    constructor(pos: Point, size: Size, color: Color);
    addItem(item: any): void;
    draw(offset?: Size): void;
}
//# sourceMappingURL=Container.d.ts.map