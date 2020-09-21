import { UIMenuItem } from './';
export declare class UIMenuSliderItem extends UIMenuItem {
    private arrowLeft;
    private arrowRight;
    private arrowOnlyOnSelected;
    private rectangleBackground;
    private rectangleSlider;
    private rectangleDivider;
    private items;
    private index;
    get Index(): number;
    set Index(value: number);
    constructor(text: string, items: unknown[], index: number, description?: string, divider?: boolean, arrowOnlyOnSelected?: boolean);
    setVerticalPosition(y: number): void;
    indexToItem(index: number): unknown;
    draw(): void;
}
//# sourceMappingURL=UIMenuSliderItem.d.ts.map