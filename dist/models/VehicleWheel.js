"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleWheel = void 0;
class VehicleWheel {
    constructor(owner, index) {
        this.owner = owner;
        this.index = index;
    }
    get Index() {
        return this.index;
    }
    set Index(index) {
        this.index = index;
    }
    get Vehicle() {
        return this.owner;
    }
    burst() {
        SetVehicleTyreBurst(this.owner.Handle, this.Index, true, 1000);
    }
    fix() {
        SetVehicleTyreFixed(this.owner.Handle, this.Index);
    }
}
exports.VehicleWheel = VehicleWheel;
