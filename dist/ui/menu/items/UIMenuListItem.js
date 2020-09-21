"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIMenuListItem = void 0;
const __1 = require("../../");
const enums_1 = require("../../../enums");
const utils_1 = require("../../../utils");
const modules_1 = require("../modules/");
const _1 = require("./");
class UIMenuListItem extends _1.UIMenuItem {
    constructor(text, description = '', collection = new modules_1.ItemsCollection([]), startIndex = 0, arrowOnlyOnSelected = true) {
        super(text, description);
        this.scrollingEnabled = true;
        this.holdTimeBeforeScroll = 200;
        this.index = 0;
        this.onListChanged = new utils_1.LiteEvent();
        this.holdTime = 0;
        this.currOffset = 0;
        this.collection = [];
        const y = 0;
        this.arrowOnlyOnSelected = arrowOnlyOnSelected;
        this.Collection = collection.getListItems();
        this.Index = startIndex;
        this.arrowLeft = new __1.Sprite('commonmenu', 'arrowleft', new utils_1.Point(110, 105 + y), new utils_1.Size(30, 30));
        this.arrowRight = new __1.Sprite('commonmenu', 'arrowright', new utils_1.Point(280, 105 + y), new utils_1.Size(30, 30));
        this.itemText = new modules_1.ResText('', new utils_1.Point(290, y + 104), 0.35, utils_1.Color.white, enums_1.Font.ChaletLondon, enums_1.Alignment.Right);
    }
    Caption() {
        // I suck at JS 'LINQ'
        let caption = ' ';
        if (this.Collection.length >= this.Index) {
            const item = this.Collection[this.Index];
            if (typeof item === 'string') {
                caption = item;
            }
            else {
                caption = item.displayText;
            }
        }
        return caption;
    }
    get Collection() {
        return this.collection;
    }
    set Collection(v) {
        if (!v) {
            throw new Error("The collection can't be null");
        }
        this.collection = v;
    }
    set SelectedItem(v) {
        if (v !== undefined) {
            const idx = this.Collection.indexOf(v);
            if (idx > 0) {
                this.Index = idx;
            }
            else {
                this.Index = 0;
            }
        }
    }
    get SelectedItem() {
        return this.Collection.length > 0 ? (this.Collection[this.Index] instanceof modules_1.ListItem ? this.Collection[this.Index] : undefined) : undefined;
    }
    get SelectedValue() {
        return this.SelectedItem == null
            ? null
            : typeof this.SelectedItem === 'string'
                ? this.SelectedItem
                : this.SelectedItem.data == null
                    ? this.SelectedItem.displayText
                    : this.SelectedItem.data;
    }
    get ListChanged() {
        return this.onListChanged.expose();
    }
    get Index() {
        if (this.Collection === null) {
            return -1;
        }
        if (this.Collection !== null && this.Collection.length === 0) {
            return -1;
        }
        return this.index % this.Collection.length;
    }
    set Index(value) {
        if (this.Collection === null) {
            return;
        }
        if (this.Collection.length === 0) {
            return;
        }
        this.index = 100000 - (100000 % this.Collection.length) + value;
        const caption = this.Caption();
        this.currOffset = utils_1.measureString(caption);
    }
    setCollection(collection) {
        this.Collection = collection.getListItems();
    }
    setCollectionItem(index, item, resetSelection = true) {
        if (index > this.Collection.length) {
            // Placeholder for formatting
            throw new Error('Index out of bounds');
        }
        if (typeof item === 'string') {
            // Placeholder for formatting
            item = new modules_1.ListItem(item);
        }
        this.Collection.splice(index, 1, item);
        if (resetSelection) {
            // Placeholder for formatting
            this.Index = 0;
        }
    }
    setVerticalPosition(y) {
        var _a, _b, _c, _d, _e, _f;
        this.arrowLeft.pos = new utils_1.Point(300 + this.offset.X + ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.widthOffset) !== null && _b !== void 0 ? _b : 0), 147 + y + this.offset.Y);
        this.arrowRight.pos = new utils_1.Point(400 + this.offset.X + ((_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.widthOffset) !== null && _d !== void 0 ? _d : 0), 147 + y + this.offset.Y);
        this.itemText.pos = new utils_1.Point(300 + this.offset.X + ((_f = (_e = this.parent) === null || _e === void 0 ? void 0 : _e.widthOffset) !== null && _f !== void 0 ? _f : 0), y + 147 + this.offset.Y);
        super.setVerticalPosition(y);
    }
    // public setRightLabel(text: string) {
    //   return this;
    // }
    // public setRightBadge(badge: BadgeStyle) {
    //   return this;
    // }
    draw() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        super.draw();
        const caption = this.Caption();
        const offset = this.currOffset;
        this.itemText.color = this.enabled ? (this.selected ? this.highlightedForeColor : this.foreColor) : new utils_1.Color(255, 163, 159, 148);
        this.itemText.caption = caption;
        this.arrowLeft.color = this.enabled ? (this.selected ? this.highlightedForeColor : this.foreColor) : new utils_1.Color(255, 163, 159, 148);
        this.arrowRight.color = this.enabled ? (this.selected ? this.highlightedForeColor : this.foreColor) : new utils_1.Color(255, 163, 159, 148);
        this.arrowLeft.pos = new utils_1.Point(375 - offset + this.offset.X + ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.widthOffset) !== null && _b !== void 0 ? _b : 0), this.arrowLeft.pos.Y);
        if (this.arrowOnlyOnSelected) {
            if (this.selected) {
                this.arrowLeft.draw();
                this.arrowRight.draw();
                this.itemText.pos = new utils_1.Point(405 + this.offset.X + ((_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.widthOffset) !== null && _d !== void 0 ? _d : 0), this.itemText.pos.Y);
            }
            else {
                this.itemText.pos = new utils_1.Point(420 + this.offset.X + ((_f = (_e = this.parent) === null || _e === void 0 ? void 0 : _e.widthOffset) !== null && _f !== void 0 ? _f : 0), this.itemText.pos.Y);
            }
        }
        else {
            this.arrowLeft.draw();
            this.arrowRight.draw();
            this.itemText.pos = new utils_1.Point(405 + this.offset.X + ((_h = (_g = this.parent) === null || _g === void 0 ? void 0 : _g.widthOffset) !== null && _h !== void 0 ? _h : 0), this.itemText.pos.Y);
        }
        this.itemText.draw();
    }
}
exports.UIMenuListItem = UIMenuListItem;
