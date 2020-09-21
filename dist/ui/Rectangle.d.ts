import { Color, Point, Size } from '../utils';
import { IElement } from './interfaces';
export declare class Rectangle extends IElement {
    pos: Point;
    size: Size;
    color: Color;
    constructor(pos: Point, size: Size, color: Color);
    draw(pos: any, size: any, color: Color): void;
}
//# sourceMappingURL=Rectangle.d.ts.map