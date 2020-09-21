"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItem = void 0;
const utils_1 = require("../../../utils");
class ListItem {
    constructor(text = '', data = null) {
        this.id = utils_1.uuidv4();
        this.displayText = text;
        this.data = data;
    }
}
exports.ListItem = ListItem;
