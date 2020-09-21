import { Sprite } from '../../';
import { LiteEvent } from '../../../utils';
import { ItemsCollection, ListItem, ResText } from '../modules/';
import { UIMenuItem } from './';
export declare class UIMenuListItem extends UIMenuItem {
    scrollingEnabled: boolean;
    holdTimeBeforeScroll: number;
    protected itemText: ResText;
    protected arrowLeft: Sprite;
    protected arrowRight: Sprite;
    protected index: number;
    private readonly onListChanged;
    private arrowOnlyOnSelected;
    private holdTime;
    private currOffset;
    private collection;
    private Caption;
    get Collection(): (ListItem | string)[];
    set Collection(v: (ListItem | string)[]);
    set SelectedItem(v: ListItem | string | undefined);
    get SelectedItem(): ListItem | string | undefined;
    get SelectedValue(): unknown;
    get ListChanged(): LiteEvent;
    get Index(): number;
    set Index(value: number);
    constructor(text: string, description?: string, collection?: ItemsCollection, startIndex?: number, arrowOnlyOnSelected?: boolean);
    setCollection(collection: ItemsCollection): void;
    setCollectionItem(index: number, item: ListItem | string, resetSelection?: boolean): void;
    setVerticalPosition(y: number): void;
    draw(): void;
}
//# sourceMappingURL=UIMenuListItem.d.ts.map