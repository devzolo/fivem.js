import { LiteEvent } from '../../../utils';
import { UIMenuItem } from './';
export declare class UIMenuCheckboxItem extends UIMenuItem {
    checked: boolean;
    private readonly checkedSprite;
    private readonly oncheckedChanged;
    get checkedChanged(): LiteEvent;
    constructor(text: string, check?: boolean, description?: string);
    setVerticalPosition(y: number): void;
    draw(): void;
}
//# sourceMappingURL=UIMenuCheckboxItem.d.ts.map