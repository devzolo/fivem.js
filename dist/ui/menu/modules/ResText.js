"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResText = void 0;
const __1 = require("../../");
const enums_1 = require("../../../enums");
const utils_1 = require("../../../utils");
class ResText extends __1.Text {
    constructor(caption, pos, scale, color, font, justify) {
        super(caption, pos, scale, color || new utils_1.Color(255, 255, 255, 255), font || 0, enums_1.Alignment.Left);
        this.textAlignment = enums_1.Alignment.Left;
        this.dropShadow = false;
        this.outline = false;
        if (justify) {
            this.textAlignment = justify;
        }
    }
    draw(arg1, pos, scale, color = new utils_1.Color(255, 255, 255, 255), font, arg2, dropShadow, outline, wordWrap) {
        let caption = arg1;
        let centered = arg2;
        let textAlignment = arg2;
        if (!arg1) {
            arg1 = new utils_1.Size(0, 0);
        }
        if (arg1 && !pos) {
            textAlignment = this.textAlignment;
            caption = this.caption;
            pos = new utils_1.Point(this.pos.X + arg1.Width, this.pos.Y + arg1.Height);
            scale = this.scale;
            color = this.color;
            font = this.font;
            if (centered === true || centered === false) {
                centered = this.alignment === enums_1.Alignment.Centered;
            }
            else {
                centered = undefined;
                dropShadow = this.dropShadow;
                outline = this.outline;
                wordWrap = this.wordWrap;
            }
        }
        const height = __1.Screen.Height;
        const width = __1.Screen.ScaledWidth;
        const x = this.pos.X / width;
        const y = this.pos.Y / height;
        SetTextFont(Number(font));
        SetTextScale(1.0, scale);
        SetTextColour(color.r, color.g, color.b, color.a);
        if (centered !== undefined) {
            SetTextCentre(centered);
        }
        else {
            if (dropShadow) {
                SetTextDropshadow(2, 0, 0, 0, 0);
            }
            if (outline) {
                SetTextOutline();
            }
            switch (textAlignment) {
                case enums_1.Alignment.Centered:
                    SetTextCentre(true);
                    break;
                case enums_1.Alignment.Right:
                    SetTextRightJustify(true);
                    SetTextWrap(0.0, x);
                    break;
            }
            if (wordWrap) {
                const xsize = (this.pos.X + wordWrap.Width) / width;
                SetTextWrap(x, xsize);
            }
        }
        SetTextEntry('STRING');
        __1.Text.addLongString(caption);
        DrawText(x, y);
    }
}
exports.ResText = ResText;
