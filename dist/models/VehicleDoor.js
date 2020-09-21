"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleDoor = void 0;
class VehicleDoor {
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
    get AngleRatio() {
        return GetVehicleDoorAngleRatio(this.owner.Handle, this.Index);
    }
    set AngleRatio(value) {
        SetVehicleDoorControl(this.owner.Handle, this.Index, 1, value);
    }
    set CanBeBroken(value) {
        SetVehicleDoorBreakable(this.owner.Handle, this.Index, value);
    }
    get IsOpen() {
        return this.AngleRatio > 0;
    }
    get IsFullyOpen() {
        return !!IsVehicleDoorFullyOpen(this.owner.Handle, this.Index);
    }
    get IsBroken() {
        return !!IsVehicleDoorDamaged(this.owner.Handle, this.Index);
    }
    get Vehicle() {
        return this.owner;
    }
    open(loose = false, instantly = false) {
        SetVehicleDoorOpen(this.owner.Handle, this.Index, loose, instantly);
    }
    close(instantly = false) {
        SetVehicleDoorShut(this.owner.Handle, this.Index, instantly);
    }
    break(stayInTheWorld = true) {
        SetVehicleDoorBroken(this.owner.Handle, this.Index, stayInTheWorld);
    }
}
exports.VehicleDoor = VehicleDoor;
