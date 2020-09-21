"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureString = exports.measureStringWidthNoConvert = exports.stringToArray = void 0;
const __1 = require("..");
const Math_1 = require("./Math");
function stringToArray(input) {
    let stringsNeeded = 1;
    if (input.length > 99) {
        stringsNeeded = Math.ceil(input.length / 99);
    }
    const outputString = new Array(stringsNeeded);
    for (let i = 0; i < stringsNeeded; i++) {
        outputString[i] = input.substring(i * 99, i * 99 + Math_1.clamp(input.substring(i * 99).length, 0, 99));
    }
    return outputString;
}
exports.stringToArray = stringToArray;
function measureStringWidthNoConvert(input) {
    SetTextEntryForWidth('STRING');
    __1.ResText.addLongString(input);
    SetTextFont(0);
    SetTextScale(0.35, 0.35);
    return GetTextScreenWidth(false);
}
exports.measureStringWidthNoConvert = measureStringWidthNoConvert;
function measureString(str) {
    const width = __1.Screen.ScaledWidth;
    return measureStringWidthNoConvert(str) * width;
}
exports.measureString = measureString;
