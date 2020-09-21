"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleMod = void 0;
class VehicleMod {
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
    get Index() {
        return GetVehicleMod(this.owner.Handle, this.ModType);
    }
    set Index(value) {
        SetVehicleMod(this.owner.Handle, this.ModType, value, this.Variation);
    }
    get Variation() {
        return !!GetVehicleModVariation(this.owner.Handle, this.ModType);
    }
    set Variation(value) {
        SetVehicleMod(this.owner.Handle, this.ModType, this.Index, value);
    }
    get ModCount() {
        return GetNumVehicleMods(this.owner.Handle, this.ModType);
    }
    get Vehicle() {
        return this.owner;
    }
    remove() {
        RemoveVehicleMod(this.owner.Handle, this.ModType);
    }
}
exports.VehicleMod = VehicleMod;
