"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const __1 = require("../");
const __2 = require("../../");
const enums_1 = require("../../enums");
const Game_1 = require("../../Game");
const utils_1 = require("../../utils");
const items_1 = require("./items");
const modules_1 = require("./modules");
class Menu {
    constructor(title, subtitle, offset = new utils_1.Point(15, 15), spriteLibrary, spriteName) {
        this.id = utils_1.uuidv4();
        this.widthOffset = 0;
        this.visible = false;
        this.mouseControlsEnabled = false;
        this.AUDIO_LIBRARY = 'HUD_FRONTEND_DEFAULT_SOUNDSET';
        this.AUDIO_UPDOWN = 'NAV_UP_DOWN';
        this.AUDIO_LEFTRIGHT = 'NAV_LEFT_RIGHT';
        this.AUDIO_SELECT = 'SELECT';
        this.AUDIO_BACK = 'BACK';
        this.AUDIO_ERROR = 'ERROR';
        this.menuItems = [];
        this.indexChange = new utils_1.LiteEvent();
        this.listChange = new utils_1.LiteEvent();
        this.sliderChange = new utils_1.LiteEvent();
        this.sliderSelect = new utils_1.LiteEvent();
        this.checkboxChange = new utils_1.LiteEvent();
        this.itemSelect = new utils_1.LiteEvent();
        this.menuOpen = new utils_1.LiteEvent();
        this.menuClose = new utils_1.LiteEvent();
        this.menuChange = new utils_1.LiteEvent();
        this.counterPretext = '';
        this.counterOverride = undefined;
        this.lastUpDownNavigation = 0;
        this.lastLeftRightNavigation = 0;
        this.activeItem = 1000;
        this.extraOffset = 0;
        this.justOpened = true;
        this.safezoneOffset = new utils_1.Point(0, 0);
        this.maxItemsOnScreen = 9;
        this.minItem = 0;
        this.maxItem = this.maxItemsOnScreen;
        if (!(offset instanceof utils_1.Point)) {
            offset = utils_1.Point.parse(offset);
        }
        this.title = title;
        this.subtitle = subtitle;
        this.spriteLibrary = spriteLibrary || 'commonmenu';
        this.spriteName = spriteName || 'interaction_bgd';
        this.offset = new utils_1.Point(offset.X, offset.Y);
        this.children = new Map();
        // Create everything
        this.mainMenu = new __1.Container(new utils_1.Point(0, 0), new utils_1.Size(700, 500), new utils_1.Color(0, 0, 0, 0));
        this.logo = new __1.Sprite(this.spriteLibrary, this.spriteName, new utils_1.Point(0 + this.offset.X, 0 + this.offset.Y), new utils_1.Size(431, 107));
        this.mainMenu.addItem((this.titleResText = new modules_1.ResText(this.title, new utils_1.Point(215 + this.offset.X, 20 + this.offset.Y), 1.15, new utils_1.Color(255, 255, 255, 255), 1, enums_1.Alignment.Centered)));
        if (this.subtitle !== '') {
            this.mainMenu.addItem((this.subtitleResRectangle = new modules_1.ResRectangle(new utils_1.Point(0 + this.offset.X, 107 + this.offset.Y), new utils_1.Size(431, 37), new utils_1.Color(255, 0, 0, 0))));
            this.mainMenu.addItem((this.subtitleResText = new modules_1.ResText(this.subtitle, new utils_1.Point(8 + this.offset.X, 110 + this.offset.Y), 0.35, new utils_1.Color(255, 255, 255, 255), 0, enums_1.Alignment.Left)));
            if (this.subtitle.startsWith('~')) {
                this.counterPretext = this.subtitle.substr(0, 3);
            }
            this.counterText = new modules_1.ResText('', new utils_1.Point(425 + this.offset.X, 110 + this.offset.Y), 0.35, new utils_1.Color(255, 255, 255, 255), 0, enums_1.Alignment.Right);
            this.extraOffset += 37;
        }
        this.upAndDownSprite = new __1.Sprite('commonmenu', 'shop_arrows_upanddown', new utils_1.Point(190 + this.offset.X, 147 + 37 * (this.maxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new utils_1.Size(50, 50));
        this.extraRectangleUp = new modules_1.ResRectangle(new utils_1.Point(0 + this.offset.X, 144 + 38 * (this.maxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new utils_1.Size(431, 18), new utils_1.Color(200, 0, 0, 0));
        this.extraRectangleDown = new modules_1.ResRectangle(new utils_1.Point(0 + this.offset.X, 144 + 18 + 38 * (this.maxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset), new utils_1.Size(431, 18), new utils_1.Color(200, 0, 0, 0));
        this.descriptionBar = new modules_1.ResRectangle(new utils_1.Point(this.offset.X, 123), new utils_1.Size(431, 4), utils_1.Color.black);
        this.descriptionRectangle = new __1.Sprite('commonmenu', 'gradient_bgd', new utils_1.Point(this.offset.X, 127), new utils_1.Size(431, 30));
        this.descriptionText = new modules_1.ResText('Description', new utils_1.Point(this.offset.X + 5, 125), 0.35, new utils_1.Color(255, 255, 255, 255), enums_1.Font.ChaletLondon, enums_1.Alignment.Left);
        this.background = new __1.Sprite('commonmenu', 'gradient_bgd', new utils_1.Point(this.offset.X, 144 + this.offset.Y - 37 + this.extraOffset), new utils_1.Size(290, 25));
        setTick(() => {
            this.render();
        });
    }
    get CurrentSelection() {
        return this.activeItem % this.menuItems.length;
    }
    set CurrentSelection(v) {
        this.menuItems[this.activeItem % this.menuItems.length].selected = false;
        this.activeItem = 1000 - (1000 % this.menuItems.length) + v;
        if (this.CurrentSelection > this.maxItem) {
            this.maxItem = this.CurrentSelection;
            this.minItem = this.CurrentSelection - this.maxItemsOnScreen;
        }
        else if (this.CurrentSelection < this.minItem) {
            this.maxItem = this.maxItemsOnScreen + this.CurrentSelection;
            this.minItem = this.CurrentSelection;
        }
    }
    setMenuwidthOffset(widthOffset) {
        this.widthOffset = widthOffset;
        if (this.logo != null) {
            this.logo.size = new utils_1.Size(431 + this.widthOffset, 107);
        }
        this.mainMenu.items[0].pos = new utils_1.Point((this.widthOffset + this.offset.X + 431) / 2, 20 + this.offset.Y);
        if (this.counterText) {
            this.counterText.pos = new utils_1.Point(425 + this.offset.X + widthOffset, 110 + this.offset.Y);
        }
        if (this.mainMenu.items.length >= 2) {
            const tmp = this.mainMenu.items[1];
            tmp.size = new utils_1.Size(431 + this.widthOffset, 37);
        }
    }
    addNewSubMenu(text, description, inherit = true) {
        let menu;
        if (inherit) {
            menu = new Menu(this.title, text, this.offset, this.spriteLibrary, this.spriteName);
            menu.setMenuwidthOffset(this.widthOffset);
        }
        else {
            menu = new Menu(this.title, text);
        }
        const item = new items_1.UIMenuItem(text, description);
        this.addItem(item);
        this.bindMenuToItem(menu, item);
        return menu;
    }
    addSubMenu(subMenuToAdd, text, description, inherit = true) {
        if (inherit)
            subMenuToAdd.setMenuwidthOffset(this.widthOffset);
        const item = new items_1.UIMenuItem(text, description);
        this.addItem(item);
        this.bindMenuToItem(subMenuToAdd, item);
        return subMenuToAdd;
    }
    addItem(item) {
        if (this.justOpened) {
            this.justOpened = false;
        }
        item.offset = this.offset;
        item.parent = this;
        item.setVerticalPosition(this.menuItems.length * 25 - 37 + this.extraOffset);
        this.menuItems.push(item);
        item.description = this.formatDescription(item.description);
        this.refreshIndex();
        this.recalculateDescriptionPosition();
    }
    refreshIndex() {
        if (this.menuItems.length === 0) {
            this.activeItem = 1000;
            this.maxItem = this.maxItemsOnScreen;
            this.minItem = 0;
            return;
        }
        for (const item of this.menuItems) {
            item.selected = false;
        }
        this.activeItem = 1000 - (1000 % this.menuItems.length);
        this.maxItem = this.maxItemsOnScreen;
        this.minItem = 0;
    }
    clear() {
        this.menuItems = [];
        this.recalculateDescriptionPosition();
    }
    open() {
        __2.Audio.playSoundFrontEnd(this.AUDIO_BACK, this.AUDIO_LIBRARY);
        this.visible = true;
        this.justOpened = true;
        this.menuOpen.emit();
    }
    close() {
        __2.Audio.playSoundFrontEnd(this.AUDIO_BACK, this.AUDIO_LIBRARY);
        this.visible = false;
        this.refreshIndex();
        this.menuClose.emit();
    }
    set Title(text) {
        this.title = text;
        this.titleResText.caption = text;
    }
    get Title() {
        return this.title;
    }
    set Subtitle(text) {
        this.subtitle = text;
        if (this.subtitleResText)
            this.subtitleResText.caption = text;
    }
    get Subtitle() {
        return this.subtitle;
    }
    set SubtitleForeColor(color) {
        if (this.subtitleResText)
            this.subtitleResText.color = color;
    }
    get SubtitleForeColor() {
        var _a, _b;
        return (_b = (_a = this.subtitleResText) === null || _a === void 0 ? void 0 : _a.color) !== null && _b !== void 0 ? _b : new utils_1.Color(255, 255, 255, 255);
    }
    set SubtitleBackColor(color) {
        if (this.subtitleResRectangle)
            this.subtitleResRectangle.color = color;
    }
    get SubtitleBackColor() {
        var _a, _b;
        return (_b = (_a = this.subtitleResRectangle) === null || _a === void 0 ? void 0 : _a.color) !== null && _b !== void 0 ? _b : new utils_1.Color(255, 255, 255, 255);
    }
    goLeft() {
        if (!(this.menuItems[this.CurrentSelection] instanceof items_1.UIMenuListItem) && !(this.menuItems[this.CurrentSelection] instanceof items_1.UIMenuSliderItem)) {
            return;
        }
        if (this.menuItems[this.CurrentSelection] instanceof items_1.UIMenuListItem) {
            const it = this.menuItems[this.CurrentSelection];
            if (it.Collection.length === 0) {
                return;
            }
            it.Index -= 1;
            __2.Audio.playSoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.listChange.emit(it, it.Index);
        }
        else if (this.menuItems[this.CurrentSelection] instanceof items_1.UIMenuSliderItem) {
            const it = this.menuItems[this.CurrentSelection];
            it.Index = it.Index - 1;
            __2.Audio.playSoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.sliderChange.emit(it, it.Index, it.indexToItem(it.Index));
            // it.sliderChangedTrigger(it.Index);
        }
    }
    goRight() {
        if (!(this.menuItems[this.CurrentSelection] instanceof items_1.UIMenuListItem) && !(this.menuItems[this.CurrentSelection] instanceof items_1.UIMenuSliderItem)) {
            return;
        }
        if (this.menuItems[this.CurrentSelection] instanceof items_1.UIMenuListItem) {
            const it = this.menuItems[this.CurrentSelection];
            if (it.Collection.length === 0) {
                return;
            }
            it.Index += 1;
            __2.Audio.playSoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.listChange.emit(it, it.Index);
        }
        else if (this.menuItems[this.CurrentSelection] instanceof items_1.UIMenuSliderItem) {
            const it = this.menuItems[this.CurrentSelection];
            it.Index += 1;
            __2.Audio.playSoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.sliderChange.emit(it, it.Index, it.indexToItem(it.Index));
            // it.sliderChangedTrigger(it.Index);
        }
    }
    selectItem() {
        if (!this.menuItems[this.CurrentSelection].enabled) {
            __2.Audio.playSoundFrontEnd(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
            return;
        }
        const it = this.menuItems[this.CurrentSelection];
        if (this.menuItems[this.CurrentSelection] instanceof items_1.UIMenuCheckboxItem) {
            it.checked = !it.checked;
            __2.Audio.playSoundFrontEnd(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
            this.checkboxChange.emit(it, it.checked);
        }
        else {
            __2.Audio.playSoundFrontEnd(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
            this.itemSelect.emit(it, this.CurrentSelection);
            if (this.children.has(it.id)) {
                const subMenu = this.children.get(it.id);
                this.visible = false;
                if (subMenu) {
                    subMenu.visible = true;
                    subMenu.justOpened = true;
                    subMenu.menuOpen.emit();
                }
                this.menuChange.emit(subMenu, true);
            }
        }
        it.fireEvent();
    }
    getScreenResolutionMantainRatio() {
        const height = __1.Screen.Height;
        const width = __1.Screen.ScaledWidth;
        return new utils_1.Size(width, height);
    }
    processControl() {
        if (!this.visible) {
            return;
        }
        if (this.justOpened) {
            this.justOpened = false;
            return;
        }
        if (Game_1.Game.isControlJustReleased(0, enums_1.Control.PhoneCancel)) {
            // Back
            this.goBack();
        }
        if (this.menuItems.length === 0) {
            return;
        }
        if (Game_1.Game.isControlPressed(0, enums_1.Control.PhoneUp) && this.lastUpDownNavigation + 200 < Date.now()) {
            // Up
            this.lastUpDownNavigation = Date.now();
            if (this.menuItems.length > this.maxItemsOnScreen + 1) {
                this.goUpOverflow();
            }
            else {
                this.goUp();
            }
        }
        else if (Game_1.Game.isControlPressed(0, enums_1.Control.PhoneDown) && this.lastUpDownNavigation + 200 < Date.now()) {
            // Down
            this.lastUpDownNavigation = Date.now();
            if (this.menuItems.length > this.maxItemsOnScreen + 1) {
                this.goDownOverflow();
            }
            else {
                this.goDown();
            }
        }
        else if (Game_1.Game.isControlPressed(0, enums_1.Control.PhoneLeft) && this.lastLeftRightNavigation + 200 < Date.now()) {
            // Left
            this.lastLeftRightNavigation = Date.now();
            this.goLeft();
        }
        else if (Game_1.Game.isControlPressed(0, enums_1.Control.PhoneRight) && this.lastLeftRightNavigation + 200 < Date.now()) {
            // Right
            this.lastLeftRightNavigation = Date.now();
            this.goRight();
        }
        else if (Game_1.Game.isControlJustPressed(0, enums_1.Control.FrontendAccept)) {
            // Select
            this.selectItem();
        }
    }
    goUpOverflow() {
        if (this.menuItems.length <= this.maxItemsOnScreen + 1) {
            return;
        }
        if (this.activeItem % this.menuItems.length <= this.minItem) {
            if (this.activeItem % this.menuItems.length === 0) {
                this.minItem = this.menuItems.length - this.maxItemsOnScreen - 1;
                this.maxItem = this.menuItems.length - 1;
                this.menuItems[this.activeItem % this.menuItems.length].selected = false;
                this.activeItem = 1000 - (1000 % this.menuItems.length);
                this.activeItem += this.menuItems.length - 1;
                this.menuItems[this.activeItem % this.menuItems.length].selected = true;
            }
            else {
                this.minItem -= 1;
                this.maxItem -= 1;
                this.menuItems[this.activeItem % this.menuItems.length].selected = false;
                this.activeItem -= 1;
                this.menuItems[this.activeItem % this.menuItems.length].selected = true;
            }
        }
        else {
            this.menuItems[this.activeItem % this.menuItems.length].selected = false;
            this.activeItem -= 1;
            this.menuItems[this.activeItem % this.menuItems.length].selected = true;
        }
        __2.Audio.playSoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.indexChange.emit(this.CurrentSelection);
    }
    goUp() {
        if (this.menuItems.length > this.maxItemsOnScreen + 1) {
            return;
        }
        this.menuItems[this.activeItem % this.menuItems.length].selected = false;
        this.activeItem -= 1;
        this.menuItems[this.activeItem % this.menuItems.length].selected = true;
        __2.Audio.playSoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.indexChange.emit(this.CurrentSelection);
    }
    goDownOverflow() {
        if (this.menuItems.length <= this.maxItemsOnScreen + 1) {
            return;
        }
        if (this.activeItem % this.menuItems.length >= this.maxItem) {
            if (this.activeItem % this.menuItems.length === this.menuItems.length - 1) {
                this.minItem = 0;
                this.maxItem = this.maxItemsOnScreen;
                this.menuItems[this.activeItem % this.menuItems.length].selected = false;
                this.activeItem = 1000 - (1000 % this.menuItems.length);
                this.menuItems[this.activeItem % this.menuItems.length].selected = true;
            }
            else {
                this.minItem += 1;
                this.maxItem += 1;
                this.menuItems[this.activeItem % this.menuItems.length].selected = false;
                this.activeItem += 1;
                this.menuItems[this.activeItem % this.menuItems.length].selected = true;
            }
        }
        else {
            this.menuItems[this.activeItem % this.menuItems.length].selected = false;
            this.activeItem += 1;
            this.menuItems[this.activeItem % this.menuItems.length].selected = true;
        }
        __2.Audio.playSoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.indexChange.emit(this.CurrentSelection);
    }
    goDown() {
        if (this.menuItems.length > this.maxItemsOnScreen + 1) {
            return;
        }
        this.menuItems[this.activeItem % this.menuItems.length].selected = false;
        this.activeItem += 1;
        this.menuItems[this.activeItem % this.menuItems.length].selected = true;
        __2.Audio.playSoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.indexChange.emit(this.CurrentSelection);
    }
    goBack() {
        __2.Audio.playSoundFrontEnd(this.AUDIO_BACK, this.AUDIO_LIBRARY);
        this.visible = false;
        if (this.parentMenu != null) {
            this.parentMenu.visible = true;
            this.parentMenu.justOpened = true;
            this.parentMenu.menuOpen.emit();
            this.menuChange.emit(this.parentMenu, false);
        }
        this.menuClose.emit();
    }
    bindMenuToItem(menuToBind, itemToBindTo) {
        menuToBind.parentMenu = this;
        menuToBind.parentItem = itemToBindTo;
        this.children.set(itemToBindTo.id, menuToBind);
    }
    releaseMenuFromItem(releaseFrom) {
        if (!this.children.has(releaseFrom.id)) {
            return false;
        }
        const menu = this.children.get(releaseFrom.id);
        if (menu) {
            menu.parentItem = undefined;
            menu.parentMenu = undefined;
        }
        this.children.delete(releaseFrom.id);
        return true;
    }
    recalculateDescriptionPosition() {
        this.descriptionBar.pos = new utils_1.Point(this.offset.X, 149 - 37 + this.extraOffset + this.offset.Y);
        this.descriptionRectangle.pos = new utils_1.Point(this.offset.X, 149 - 37 + this.extraOffset + this.offset.Y);
        this.descriptionText.pos = new utils_1.Point(this.offset.X + 8, 155 - 37 + this.extraOffset + this.offset.Y);
        this.descriptionBar.size = new utils_1.Size(431 + this.widthOffset, 4);
        this.descriptionRectangle.size = new utils_1.Size(431 + this.widthOffset, 30);
        let count = this.menuItems.length;
        if (count > this.maxItemsOnScreen + 1) {
            count = this.maxItemsOnScreen + 2;
        }
        this.descriptionBar.pos = new utils_1.Point(this.offset.X, 38 * count + this.descriptionBar.pos.Y);
        this.descriptionRectangle.pos = new utils_1.Point(this.offset.X, 38 * count + this.descriptionRectangle.pos.Y);
        this.descriptionText.pos = new utils_1.Point(this.offset.X + 8, 38 * count + this.descriptionText.pos.Y);
    }
    formatDescription(input) {
        if (input.length > 99) {
            input = input.slice(0, 99);
        }
        const maxPixelsPerLine = 425 + this.widthOffset;
        let aggregatePixels = 0;
        let output = '';
        const words = input.split(' ');
        for (const word of words) {
            const offset = utils_1.measureString(word);
            aggregatePixels += offset;
            if (aggregatePixels > maxPixelsPerLine) {
                output = `${output} \n${word} `;
                aggregatePixels = offset + utils_1.measureString(' ');
            }
            else {
                output = `${output}${word} `;
                aggregatePixels += utils_1.measureString(' ');
            }
        }
        return output;
    }
    render() {
        if (!this.visible) {
            return;
        }
        if (this.justOpened) {
            if (this.logo != null && !this.logo.IsTextureDictionaryLoaded) {
                this.logo.loadTextureDictionary();
            }
            if (!this.background.IsTextureDictionaryLoaded) {
                this.background.loadTextureDictionary();
            }
            if (!this.descriptionRectangle.IsTextureDictionaryLoaded) {
                this.descriptionRectangle.loadTextureDictionary();
            }
            if (!this.upAndDownSprite.IsTextureDictionaryLoaded) {
                this.upAndDownSprite.loadTextureDictionary();
            }
        }
        this.mainMenu.draw();
        this.processControl();
        this.background.size =
            this.menuItems.length > this.maxItemsOnScreen + 1
                ? new utils_1.Size(431 + this.widthOffset, 38 * (this.maxItemsOnScreen + 1))
                : new utils_1.Size(431 + this.widthOffset, 38 * this.menuItems.length);
        this.background.draw();
        if (this.menuItems.length > 0) {
            this.menuItems[this.activeItem % this.menuItems.length].selected = true;
            if (this.menuItems[this.activeItem % this.menuItems.length].description.trim() !== '') {
                this.recalculateDescriptionPosition();
                const descCaption = this.menuItems[this.activeItem % this.menuItems.length].description;
                // descCaption = this.FormatDescription(descCaption);
                this.descriptionText.caption = descCaption;
                const numLines = this.descriptionText.caption.split('\n').length;
                this.descriptionRectangle.size = new utils_1.Size(431 + this.widthOffset, numLines * 25 + 15);
                this.descriptionBar.draw();
                this.descriptionRectangle.draw();
                this.descriptionText.draw();
            }
        }
        if (this.menuItems.length <= this.maxItemsOnScreen + 1) {
            let count = 0;
            for (const menuItem of this.menuItems) {
                menuItem.setVerticalPosition(count * 38 - 37 + this.extraOffset);
                menuItem.draw();
                count += 1;
            }
            if (this.counterText && this.counterOverride) {
                this.counterText.caption = this.counterPretext + this.counterOverride;
                this.counterText.draw();
            }
        }
        else {
            let count = 0;
            for (let index = this.minItem; index <= this.maxItem; index += 1) {
                const item = this.menuItems[index];
                item.setVerticalPosition(count * 38 - 37 + this.extraOffset);
                item.draw();
                count += 1;
            }
            this.extraRectangleUp.size = new utils_1.Size(431 + this.widthOffset, 18);
            this.extraRectangleDown.size = new utils_1.Size(431 + this.widthOffset, 18);
            this.upAndDownSprite.pos = new utils_1.Point(190 + this.offset.X + this.widthOffset / 2, 147 + 37 * (this.maxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset);
            this.extraRectangleUp.draw();
            this.extraRectangleDown.draw();
            this.upAndDownSprite.draw();
            if (this.counterText) {
                if (!this.counterOverride) {
                    const cap = `${this.CurrentSelection + 1} / ${this.menuItems.length}`;
                    this.counterText.caption = this.counterPretext + cap;
                }
                else {
                    this.counterText.caption = this.counterPretext + this.counterOverride;
                }
                this.counterText.draw();
            }
        }
        this.logo.draw();
    }
}
exports.Menu = Menu;
