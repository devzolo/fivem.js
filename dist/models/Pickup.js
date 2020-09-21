"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pickup = void 0;
class Pickup {
    constructor(handle) {
        this.handle = handle;
        this.hash = 0;
    }
    static getWeaponTypeFromPickupType(pickupHash) {
        return GetWeaponTypeFromPickupType(pickupHash);
    }
    exists() {
        return DoesEntityExist(this.handle) ? true : false;
    }
    remove() {
        RemovePickup(this.handle);
    }
    setRegenerationTime(duration) {
        SetPickupRegenerationTime(this.handle, duration);
    }
    get Exist() {
        return this.exists();
    }
    getWeaponType() {
        return Pickup.getWeaponTypeFromPickupType(this.hash);
    }
}
exports.Pickup = Pickup;
