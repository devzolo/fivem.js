import { Menu } from '../';
import { Sprite } from '../../';
import { BadgeStyle } from '../../../enums';
import { Color, Point } from '../../../utils';
import { ResRectangle, ResText } from '../modules/';
export declare class UIMenuItem {
    static readonly defaultBackColor: Color;
    static readonly defaultHighlightedBackColor: Color;
    static readonly defaultForeColor: Color;
    static readonly defaultHighlightedForeColor: Color;
    readonly id: string;
    backColor: Color;
    highlightedBackColor: Color;
    foreColor: Color;
    highlightedForeColor: Color;
    enabled: boolean;
    selected: boolean;
    hovered: boolean;
    description: string;
    offset: Point;
    parent: Menu | undefined;
    rightLabel: string;
    leftBadge: BadgeStyle;
    rightBadge: BadgeStyle;
    protected rectangle: ResRectangle;
    protected text: ResText;
    protected selectedSprite: Sprite;
    protected badgeLeft: Sprite;
    protected badgeRight: Sprite;
    protected labelText: ResText;
    private event;
    get Text(): string;
    set Text(v: string);
    constructor(text: string, description?: string);
    setVerticalPosition(y: number): void;
    addEvent(event: string, ...args: unknown[]): void;
    fireEvent(): void;
    draw(): void;
    setLeftBadge(badge: BadgeStyle): void;
    setRightBadge(badge: BadgeStyle): void;
    setRightLabel(text: string): void;
    /**
     * Always returns 'commonmenu' for now
     */
    badgeToSpriteLib(): string;
    badgeToSpriteName(badge: BadgeStyle, selected: boolean): string;
    isBagdeWhiteSprite(badge: BadgeStyle): boolean;
    badgeToColor(badge: BadgeStyle, selected: boolean): Color;
}
//# sourceMappingURL=UIMenuItem.d.ts.map