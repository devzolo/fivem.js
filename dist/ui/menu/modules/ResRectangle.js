"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResRectangle = void 0;
const __1 = require("../..");
const utils_1 = require("../../../utils");
class ResRectangle extends __1.Rectangle {
    constructor(pos, size, color) {
        super(pos, size, color);
    }
    draw(pos, size, color) {
        var _a, _b, _c, _d;
        if (!pos) {
            pos = new utils_1.Size();
        }
        if (pos && !size && !color) {
            pos = new utils_1.Point(this.pos.X + pos.width, this.pos.Y + pos.height);
            size = this.size;
            color = this.color;
        }
        const height = __1.Screen.Height;
        const width = __1.Screen.ScaledWidth;
        const w = size.width / width;
        const h = size.height / height;
        const x = pos.X / width + w * 0.5;
        const y = pos.Y / height + h * 0.5;
        DrawRect(x, y, w, h, (_a = color === null || color === void 0 ? void 0 : color.r) !== null && _a !== void 0 ? _a : 255, (_b = color === null || color === void 0 ? void 0 : color.g) !== null && _b !== void 0 ? _b : 255, (_c = color === null || color === void 0 ? void 0 : color.b) !== null && _c !== void 0 ? _c : 255, (_d = color === null || color === void 0 ? void 0 : color.a) !== null && _d !== void 0 ? _d : 255);
    }
}
exports.ResRectangle = ResRectangle;
