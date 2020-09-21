import { Alignment, Font } from '../enums';
import { Color, Point } from '../utils';
import { IElement } from './interfaces';
export declare class Text extends IElement {
    static addLongString(str: string): void;
    caption: string;
    pos: Point;
    scale: number;
    color: Color;
    font: Font;
    alignment: Alignment;
    /**
     *
     * @param caption Text to display
     * @param pos Position of text relative to alignment. In pixels.
     * @param scale Size of text. Default 1.0
     * @param color Color of text. Default black.
     * @param font Font of text. Default Chalet London.
     * @param alignment Alignment of text. Default Left.
     */
    constructor(caption: string, pos: Point, scale?: number, color?: Color, font?: Font, alignment?: Alignment);
    draw(): void;
}
//# sourceMappingURL=Text.d.ts.map