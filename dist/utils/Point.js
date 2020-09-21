"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
class Point {
    constructor(x, y) {
        this.X = 0;
        this.Y = 0;
        this.X = x;
        this.Y = y;
    }
    static parse(arg) {
        let point = new Point(0, 0);
        if (typeof arg === 'object') {
            if (arg.length) {
                // Array
                point = new Point(arg[0], arg[1]);
            }
            else if (arg.X && arg.Y) {
                // Object
                point = new Point(arg.X, arg.Y);
            }
        }
        else if (typeof arg === 'string') {
            if (arg.indexOf(',') !== -1) {
                const arr = arg.split(',');
                point = new Point(parseFloat(arr[0]), parseFloat(arr[1]));
            }
        }
        return point;
    }
}
exports.Point = Point;
