"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleToggleMod = void 0;
class VehicleToggleMod {
    constructor(owner, modType) {
        this.owner = owner;
        this.modType = modType;
    }
    get ModType() {
        return this.modType;
    }
    set ModType(modType) {
        this.modType = modType;
    }
    get IsInstalled() {
        return !!IsToggleModOn(this.owner.Handle, this.ModType);
    }
    set IsInstalled(value) {
        ToggleVehicleMod(this.owner.Handle, this.ModType, value);
    }
    get LocalizedModTypeName() {
        return GetModSlotName(this.owner.Handle, this.ModType);
    }
    get Vehicle() {
        return this.owner;
    }
    remove() {
        RemoveVehicleMod(this.owner.Handle, this.ModType);
    }
}
exports.VehicleToggleMod = VehicleToggleMod;
