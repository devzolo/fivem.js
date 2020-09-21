"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIMenuItem = void 0;
const __1 = require("../../");
const enums_1 = require("../../../enums");
const utils_1 = require("../../../utils");
const modules_1 = require("../modules/");
class UIMenuItem {
    constructor(text, description = '') {
        this.id = utils_1.uuidv4();
        this.backColor = UIMenuItem.defaultBackColor;
        this.highlightedBackColor = UIMenuItem.defaultHighlightedBackColor;
        this.foreColor = UIMenuItem.defaultForeColor;
        this.highlightedForeColor = UIMenuItem.defaultHighlightedForeColor;
        this.selected = false;
        this.hovered = false;
        this.offset = new utils_1.Point(0, 0);
        this.rightLabel = '';
        this.leftBadge = enums_1.BadgeStyle.None;
        this.rightBadge = enums_1.BadgeStyle.None;
        this.enabled = true;
        this.rectangle = new modules_1.ResRectangle(new utils_1.Point(0, 0), new utils_1.Size(431, 38), new utils_1.Color(150, 0, 0, 0));
        this.text = new modules_1.ResText(text, new utils_1.Point(8, 0), 0.33, utils_1.Color.whiteSmoke, enums_1.Font.ChaletLondon, enums_1.Alignment.Left);
        this.description = description;
        this.selectedSprite = new __1.Sprite('commonmenu', 'gradient_nav', new utils_1.Point(0, 0), new utils_1.Size(431, 38));
        this.badgeLeft = new __1.Sprite('commonmenu', '', new utils_1.Point(0, 0), new utils_1.Size(40, 40));
        this.badgeRight = new __1.Sprite('commonmenu', '', new utils_1.Point(0, 0), new utils_1.Size(40, 40));
        this.labelText = new modules_1.ResText('', new utils_1.Point(0, 0), 0.35, utils_1.Color.white, 0, enums_1.Alignment.Right);
    }
    get Text() {
        return this.text.caption;
    }
    set Text(v) {
        this.text.caption = v;
    }
    setVerticalPosition(y) {
        this.rectangle.pos = new utils_1.Point(this.offset.X, y + 144 + this.offset.Y);
        this.selectedSprite.pos = new utils_1.Point(0 + this.offset.X, y + 144 + this.offset.Y);
        this.text.pos = new utils_1.Point(8 + this.offset.X, y + 147 + this.offset.Y);
        this.badgeLeft.pos = new utils_1.Point(0 + this.offset.X, y + 142 + this.offset.Y);
        this.badgeRight.pos = new utils_1.Point(385 + this.offset.X, y + 142 + this.offset.Y);
        this.labelText.pos = new utils_1.Point(420 + this.offset.X, y + 148 + this.offset.Y);
    }
    addEvent(event, ...args) {
        this.event = { event, args };
    }
    fireEvent() {
        if (this.event) {
            TriggerEvent(this.event.event, ...this.event.args);
        }
    }
    draw() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.rectangle.size = new utils_1.Size(431 + ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.widthOffset) !== null && _b !== void 0 ? _b : 0), 38);
        this.selectedSprite.size = new utils_1.Size(431 + ((_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.widthOffset) !== null && _d !== void 0 ? _d : 0), 38);
        if (this.hovered && !this.selected) {
            this.rectangle.color = new utils_1.Color(20, 255, 255, 255);
            this.rectangle.draw();
        }
        this.selectedSprite.color = this.selected ? this.highlightedBackColor : this.backColor;
        this.selectedSprite.draw();
        this.text.color = this.enabled ? (this.selected ? this.highlightedForeColor : this.foreColor) : new utils_1.Color(255, 163, 159, 148);
        if (this.leftBadge !== enums_1.BadgeStyle.None) {
            this.text.pos = new utils_1.Point(35 + this.offset.X, this.text.pos.Y);
            this.badgeLeft.TextureDict = this.badgeToSpriteLib();
            this.badgeLeft.textureName = this.badgeToSpriteName(this.leftBadge, this.selected);
            this.badgeLeft.color = this.isBagdeWhiteSprite(this.leftBadge)
                ? this.enabled
                    ? this.selected
                        ? this.highlightedForeColor
                        : this.foreColor
                    : new utils_1.Color(255, 163, 159, 148)
                : utils_1.Color.white;
            this.badgeLeft.draw();
        }
        else {
            this.text.pos = new utils_1.Point(8 + this.offset.X, this.text.pos.Y);
        }
        if (this.rightBadge !== enums_1.BadgeStyle.None) {
            this.badgeRight.pos = new utils_1.Point(385 + this.offset.X + ((_f = (_e = this.parent) === null || _e === void 0 ? void 0 : _e.widthOffset) !== null && _f !== void 0 ? _f : 0), this.badgeRight.pos.Y);
            this.badgeRight.TextureDict = this.badgeToSpriteLib();
            this.badgeRight.textureName = this.badgeToSpriteName(this.rightBadge, this.selected);
            this.badgeRight.color = this.isBagdeWhiteSprite(this.rightBadge)
                ? this.enabled
                    ? this.selected
                        ? this.highlightedForeColor
                        : this.foreColor
                    : new utils_1.Color(255, 163, 159, 148)
                : utils_1.Color.white;
            this.badgeRight.draw();
        }
        if (this.rightLabel && this.rightLabel !== '') {
            this.labelText.pos = new utils_1.Point(420 + this.offset.X + ((_h = (_g = this.parent) === null || _g === void 0 ? void 0 : _g.widthOffset) !== null && _h !== void 0 ? _h : 0), this.labelText.pos.Y);
            this.labelText.caption = this.rightLabel;
            this.labelText.color = this.text.color = this.enabled
                ? this.selected
                    ? this.highlightedForeColor
                    : this.foreColor
                : new utils_1.Color(255, 163, 159, 148);
            this.labelText.draw();
        }
        this.text.draw();
    }
    setLeftBadge(badge) {
        this.leftBadge = badge;
    }
    setRightBadge(badge) {
        this.rightBadge = badge;
    }
    setRightLabel(text) {
        this.rightLabel = text;
    }
    /**
     * Always returns 'commonmenu' for now
     */
    badgeToSpriteLib() {
        return 'commonmenu';
    }
    badgeToSpriteName(badge, selected) {
        switch (badge) {
            case enums_1.BadgeStyle.None:
                return '';
            case enums_1.BadgeStyle.BronzeMedal:
                return 'mp_medal_bronze';
            case enums_1.BadgeStyle.GoldMedal:
                return 'mp_medal_gold';
            case enums_1.BadgeStyle.SilverMedal:
                return 'medal_silver';
            case enums_1.BadgeStyle.Alert:
                return 'mp_alerttriangle';
            case enums_1.BadgeStyle.Crown:
                return 'mp_hostcrown';
            case enums_1.BadgeStyle.Ammo:
                return selected ? 'shop_ammo_icon_b' : 'shop_ammo_icon_a';
            case enums_1.BadgeStyle.Armour:
                return selected ? 'shop_armour_icon_b' : 'shop_armour_icon_a';
            case enums_1.BadgeStyle.Barber:
                return selected ? 'shop_barber_icon_b' : 'shop_barber_icon_a';
            case enums_1.BadgeStyle.Clothes:
                return selected ? 'shop_clothing_icon_b' : 'shop_clothing_icon_a';
            case enums_1.BadgeStyle.Franklin:
                return selected ? 'shop_franklin_icon_b' : 'shop_franklin_icon_a';
            case enums_1.BadgeStyle.Bike:
                return selected ? 'shop_garage_bike_icon_b' : 'shop_garage_bike_icon_a';
            case enums_1.BadgeStyle.Car:
                return selected ? 'shop_garage_icon_b' : 'shop_garage_icon_a';
            case enums_1.BadgeStyle.Gun:
                return selected ? 'shop_gunclub_icon_b' : 'shop_gunclub_icon_a';
            case enums_1.BadgeStyle.Heart:
                return selected ? 'shop_health_icon_b' : 'shop_health_icon_a';
            case enums_1.BadgeStyle.Lock:
                return 'shop_lock';
            case enums_1.BadgeStyle.Makeup:
                return selected ? 'shop_makeup_icon_b' : 'shop_makeup_icon_a';
            case enums_1.BadgeStyle.Mask:
                return selected ? 'shop_mask_icon_b' : 'shop_mask_icon_a';
            case enums_1.BadgeStyle.Michael:
                return selected ? 'shop_michael_icon_b' : 'shop_michael_icon_a';
            case enums_1.BadgeStyle.Star:
                return 'shop_new_star';
            case enums_1.BadgeStyle.Tatoo:
                return selected ? 'shop_tattoos_icon_b' : 'shop_tattoos_icon_a';
            case enums_1.BadgeStyle.Tick:
                return 'shop_tick_icon';
            case enums_1.BadgeStyle.Trevor:
                return selected ? 'shop_trevor_icon_b' : 'shop_trevor_icon_a';
            case enums_1.BadgeStyle.Cash:
                return 'mp_specitem_cash';
            default:
                return '';
        }
    }
    isBagdeWhiteSprite(badge) {
        switch (badge) {
            case enums_1.BadgeStyle.Lock:
            case enums_1.BadgeStyle.Tick:
            case enums_1.BadgeStyle.Crown:
                return true;
            default:
                return false;
        }
    }
    badgeToColor(badge, selected) {
        switch (badge) {
            case enums_1.BadgeStyle.Lock:
            case enums_1.BadgeStyle.Tick:
            case enums_1.BadgeStyle.Crown:
                return selected ? new utils_1.Color(255, 0, 0, 0) : new utils_1.Color(255, 255, 255, 255);
            default:
                return new utils_1.Color(255, 255, 255, 255);
        }
    }
}
exports.UIMenuItem = UIMenuItem;
UIMenuItem.defaultBackColor = utils_1.Color.empty;
UIMenuItem.defaultHighlightedBackColor = utils_1.Color.white;
UIMenuItem.defaultForeColor = utils_1.Color.whiteSmoke;
UIMenuItem.defaultHighlightedForeColor = utils_1.Color.black;
