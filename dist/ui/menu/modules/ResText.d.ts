import { Text } from '../../';
import { Alignment, Font } from '../../../enums';
import { Color, Point, Size } from '../../../utils';
export declare class ResText extends Text {
    textAlignment: Alignment;
    dropShadow: boolean;
    outline: boolean;
    wordWrap: Size | undefined;
    constructor(caption: string, pos: Point, scale: number, color?: Color, font?: Font, justify?: Alignment);
    draw(offset?: Size): void;
    draw(caption: string, pos: Point, scale: number, color: Color, font: Font, arg2: boolean): void;
}
//# sourceMappingURL=ResText.d.ts.map