"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleWindow = void 0;
class VehicleWindow {
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
    get IsIntact() {
        return !!IsVehicleWindowIntact(this.owner.Handle, this.Index);
    }
    get Vehicle() {
        return this.owner;
    }
    repair() {
        FixVehicleWindow(this.owner.Handle, this.Index);
    }
    smash() {
        SmashVehicleWindow(this.owner.Handle, this.Index);
    }
    rollUp() {
        RollUpWindow(this.owner.Handle, this.Index);
    }
    rollDown() {
        RollDownWindow(this.owner.Handle, this.Index);
    }
    remove() {
        RemoveVehicleWindow(this.owner.Handle, this.Index);
    }
}
exports.VehicleWindow = VehicleWindow;
