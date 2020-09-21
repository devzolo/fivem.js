"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const utils_1 = require("../utils");
const _1 = require("./");
const interfaces_1 = require("./interfaces");
class Rectangle extends interfaces_1.IElement {
    constructor(pos, size, color) {
        super();
        this.enabled = true;
        this.pos = pos;
        this.size = size;
        this.color = color;
    }
    draw(pos, size, color) {
        if (!pos) {
            pos = new utils_1.Size(0, 0);
        }
        let w2 = 0;
        let y2 = 0;
        if (pos instanceof utils_1.Point) {
            w2 = pos.X;
            y2 = pos.Y;
        }
        else {
            w2 = pos.width;
            y2 = pos.height;
        }
        if (!size && !color) {
            pos = new utils_1.Point(this.pos.X + w2, this.pos.Y + y2);
            size = this.size;
            color = this.color;
        }
        const height = _1.Screen.Height;
        const width = _1.Screen.ScaledWidth;
        const w = size.width / width;
        const h = size.height / height;
        const x = pos.X / width;
        const y = pos.Y / height;
        DrawRect(x, y, w, h, color.r, color.g, color.b, color.a);
    }
}
exports.Rectangle = Rectangle;
