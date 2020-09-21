"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIMenuCheckboxItem = void 0;
const __1 = require("../../");
// import { BadgeStyle } from '../../../enums';
const utils_1 = require("../../../utils");
const _1 = require("./");
class UIMenuCheckboxItem extends _1.UIMenuItem {
    constructor(text, check = false, description = '') {
        super(text, description);
        this.checked = false;
        this.oncheckedChanged = new utils_1.LiteEvent();
        const y = 0;
        this.checkedSprite = new __1.Sprite('commonmenu', 'shop_box_blank', new utils_1.Point(410, y + 95), new utils_1.Size(50, 50));
        this.checked = check;
    }
    get checkedChanged() {
        return this.oncheckedChanged.expose();
    }
    setVerticalPosition(y) {
        var _a, _b;
        super.setVerticalPosition(y);
        this.checkedSprite.pos = new utils_1.Point(380 + this.offset.X + ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.widthOffset) !== null && _b !== void 0 ? _b : 0), y + 138 + this.offset.Y);
    }
    draw() {
        var _a, _b;
        super.draw();
        this.checkedSprite.pos = this.checkedSprite.pos = new utils_1.Point(380 + this.offset.X + ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.widthOffset) !== null && _b !== void 0 ? _b : 0), this.checkedSprite.pos.Y);
        const isDefaultHightlitedForeColor = this.highlightedForeColor === _1.UIMenuItem.defaultHighlightedForeColor;
        if (this.selected && isDefaultHightlitedForeColor) {
            this.checkedSprite.textureName = this.checked ? 'shop_box_tickb' : 'shop_box_blankb';
        }
        else {
            this.checkedSprite.textureName = this.checked ? 'shop_box_tick' : 'shop_box_blank';
        }
        this.checkedSprite.color = this.enabled
            ? this.selected && !isDefaultHightlitedForeColor
                ? this.highlightedForeColor
                : this.foreColor
            : new utils_1.Color(255, 163, 159, 148);
        this.checkedSprite.draw();
    }
}
exports.UIMenuCheckboxItem = UIMenuCheckboxItem;
