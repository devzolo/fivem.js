import { Sprite } from './Sprite';
export declare class Timerbar {
    private sprite;
    private title;
    private text;
    private useProgressBar;
    private usePlayerStyle;
    private isVisible;
    private pbarValue;
    private textColor;
    private pbarBgColor;
    private pbarFgColor;
    constructor(title: string, useProgressBar?: boolean);
    get Title(): string;
    set Title(value: string);
    get Text(): string;
    set Text(value: string);
    get UseProgressBar(): boolean;
    get Progress(): number;
    set Progress(value: number);
    get Visible(): boolean;
    set Visible(value: boolean);
    get TextColor(): number | number[];
    set TextColor(value: number | number[]);
    get ProgressbarBgColor(): number[] | number;
    set ProgressbarBgColor(value: number[] | number);
    get ProgressbarFgColor(): number[] | number;
    set ProgressbarFgColor(value: number[] | number);
    set PlayerStyle(value: boolean);
    get PlayerStyle(): boolean;
    get Sprite(): Sprite | undefined;
}
//# sourceMappingURL=Timerbar.d.ts.map