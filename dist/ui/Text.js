"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const _1 = require("./");
const interfaces_1 = require("./interfaces");
class Text extends interfaces_1.IElement {
    /**
     *
     * @param caption Text to display
     * @param pos Position of text relative to alignment. In pixels.
     * @param scale Size of text. Default 1.0
     * @param color Color of text. Default black.
     * @param font Font of text. Default Chalet London.
     * @param alignment Alignment of text. Default Left.
     */
    constructor(caption, pos, scale = 1, color = utils_1.Color.black, font = enums_1.Font.ChaletLondon, alignment = enums_1.Alignment.Left) {
        super();
        this.caption = caption;
        this.pos = pos;
        this.scale = scale;
        this.color = color;
        this.font = font;
        this.alignment = alignment;
    }
    static addLongString(str) {
        const strLen = 99;
        for (let i = 0; i < str.length; i += strLen) {
            const substr = str.substr(i, Math.min(strLen, str.length - i));
            AddTextComponentSubstringPlayerName(substr);
        }
    }
    draw() {
        const x = this.pos.X / _1.Screen.ScaledWidth;
        const y = this.pos.Y / _1.Screen.Height;
        BeginTextCommandDisplayText('STRING');
        SetTextFont(Number(this.font));
        SetTextScale(this.scale, this.scale);
        SetTextColour(this.color.r, this.color.g, this.color.b, this.color.a);
        switch (this.alignment) {
            case enums_1.Alignment.Centered:
                SetScriptGfxAlign(67, 84);
                break;
            case enums_1.Alignment.Right:
                SetTextJustification(2);
                SetTextWrap(0, GetSafeZoneSize() - x);
                break;
            default:
                SetScriptGfxAlign(76, 84);
                break;
        }
        Text.addLongString(this.caption);
        EndTextCommandDisplayText(x, y);
        ResetScriptGfxAlign();
    }
}
exports.Text = Text;
exports = Text;
