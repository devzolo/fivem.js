"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIMenuSliderItem = void 0;
const __1 = require("../../");
// import { BadgeStyle } from '../../../enums';
const utils_1 = require("../../../utils/");
const modules_1 = require("../modules/");
const _1 = require("./");
class UIMenuSliderItem extends _1.UIMenuItem {
    constructor(text, items, index, description = '', divider = false, arrowOnlyOnSelected = false) {
        super(text, description);
        this.index = 0;
        const y = 0;
        this.arrowOnlyOnSelected = arrowOnlyOnSelected;
        this.items = items;
        this.arrowLeft = new __1.Sprite('commonmenutu', 'arrowleft', new utils_1.Point(0, 105 + y), new utils_1.Size(15, 15));
        this.arrowRight = new __1.Sprite('commonmenutu', 'arrowright', new utils_1.Point(0, 105 + y), new utils_1.Size(15, 15));
        this.rectangleBackground = new modules_1.ResRectangle(new utils_1.Point(0, 0), new utils_1.Size(150, 9), new utils_1.Color(255, 4, 32, 57));
        this.rectangleSlider = new modules_1.ResRectangle(new utils_1.Point(0, 0), new utils_1.Size(75, 9), new utils_1.Color(255, 57, 116, 200));
        if (divider) {
            this.rectangleDivider = new modules_1.ResRectangle(new utils_1.Point(0, 0), new utils_1.Size(2.5, 20), utils_1.Color.whiteSmoke);
        }
        else {
            this.rectangleDivider = new modules_1.ResRectangle(new utils_1.Point(0, 0), new utils_1.Size(2.5, 20), utils_1.Color.transparent);
        }
        this.Index = index;
    }
    get Index() {
        return this.index % this.items.length;
    }
    set Index(value) {
        this.index = 100000000 - (100000000 % this.items.length) + value;
    }
    setVerticalPosition(y) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.rectangleBackground.pos = new utils_1.Point(250 + this.offset.X + ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.widthOffset) !== null && _b !== void 0 ? _b : 0), y + 158.5 + this.offset.Y);
        this.rectangleSlider.pos = new utils_1.Point(250 + this.offset.X + ((_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.widthOffset) !== null && _d !== void 0 ? _d : 0), y + 158.5 + this.offset.Y);
        this.rectangleDivider.pos = new utils_1.Point(323.5 + this.offset.X + ((_f = (_e = this.parent) === null || _e === void 0 ? void 0 : _e.widthOffset) !== null && _f !== void 0 ? _f : 0), y + 153 + this.offset.Y);
        this.arrowLeft.pos = new utils_1.Point(235 + this.offset.X + ((_h = (_g = this.parent) === null || _g === void 0 ? void 0 : _g.widthOffset) !== null && _h !== void 0 ? _h : 0), 155.5 + y + this.offset.Y);
        this.arrowRight.pos = new utils_1.Point(400 + this.offset.X + ((_k = (_j = this.parent) === null || _j === void 0 ? void 0 : _j.widthOffset) !== null && _k !== void 0 ? _k : 0), 155.5 + y + this.offset.Y);
        super.setVerticalPosition(y);
    }
    indexToItem(index) {
        return this.items[index];
    }
    draw() {
        var _a, _b;
        super.draw();
        this.arrowLeft.color = this.enabled ? (this.selected ? utils_1.Color.black : utils_1.Color.whiteSmoke) : new utils_1.Color(255, 163, 159, 148);
        this.arrowRight.color = this.enabled ? (this.selected ? utils_1.Color.black : utils_1.Color.whiteSmoke) : new utils_1.Color(255, 163, 159, 148);
        const offset = ((this.rectangleBackground.size.width - this.rectangleSlider.size.width) / (this.items.length - 1)) * this.Index;
        this.rectangleSlider.pos = new utils_1.Point(250 + this.offset.X + offset + +((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.widthOffset) !== null && _b !== void 0 ? _b : 0), this.rectangleSlider.pos.Y);
        if (this.arrowOnlyOnSelected) {
            if (this.selected) {
                this.arrowLeft.draw();
                this.arrowRight.draw();
            }
        }
        else {
            this.arrowLeft.draw();
            this.arrowRight.draw();
        }
        this.rectangleBackground.draw();
        this.rectangleSlider.draw();
        this.rectangleDivider.draw();
    }
}
exports.UIMenuSliderItem = UIMenuSliderItem;
