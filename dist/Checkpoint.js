"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkpoint = void 0;
const enums_1 = require("./enums");
const utils_1 = require("./utils");
class Checkpoint {
    constructor(handle) {
        this.handle = handle;
        this.position = new utils_1.Vector3();
        this.targetPosition = new utils_1.Vector3();
        this.icon = enums_1.CheckpointIcon.CylinderSingleArrow;
        this.radius = 0;
    }
    get Handle() {
        return this.handle;
    }
    get Position() {
        return this.position;
    }
    set Position(position) {
        this.position = position;
    }
    get TargetPosition() {
        return this.targetPosition;
    }
    set TargetPosition(targetPosition) {
        this.targetPosition = targetPosition;
    }
    get Icon() {
        return this.icon;
    }
    set Icon(icon) {
        this.icon = icon;
    }
    // TODO
    //   public get CustomIcon(): CheckpointIcon {
    //     return this.icon;
    //   }
    //     public set CustomIcon(icon: CheckpointIcon) {
    //     this.icon = icon;
    //   }
    get Radius() {
        return this.radius;
    }
    set Radius(radius) {
        this.radius = radius;
    }
}
exports.Checkpoint = Checkpoint;
