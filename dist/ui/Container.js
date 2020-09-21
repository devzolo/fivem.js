"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const utils_1 = require("../utils");
const _1 = require("./");
class Container extends _1.Rectangle {
    constructor(pos, size, color) {
        super(pos, size, color);
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    draw(offset) {
        if (!this.enabled) {
            return;
        }
        offset = offset || new utils_1.Size();
        const height = _1.Screen.Height;
        const width = _1.Screen.ScaledWidth;
        const w = this.size.width / width;
        const h = this.size.height / height;
        const x = (this.pos.X + offset.width) / width + w * 0.5;
        const y = (this.pos.Y + offset.height) / height + h * 0.5;
        DrawRect(x, y, w, h, this.color.r, this.color.g, this.color.b, this.color.a);
        for (const item of this.items) {
            item.draw(new utils_1.Size(this.pos.X + offset.width, this.pos.Y + offset.height));
        }
    }
}
exports.Container = Container;
