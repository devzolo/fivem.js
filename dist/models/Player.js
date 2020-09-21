"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const _1 = require("./");
class Player {
    constructor(handle, pvp = true) {
        this.pvp = pvp;
        this.handle = handle;
        this.PvPEnabled = pvp;
    }
    get Handle() {
        return this.handle;
    }
    get Character() {
        const handle = GetPlayerPed(this.handle);
        if (!this.ped || handle !== this.ped.Handle) {
            this.ped = new _1.Ped(handle);
        }
        return this.ped;
    }
    get Name() {
        return GetPlayerName(this.handle);
    }
    get PvPEnabled() {
        return this.pvp;
    }
    set PvPEnabled(value) {
        NetworkSetFriendlyFireOption(value);
        SetCanAttackFriendly(this.Character.Handle, value, value);
        this.pvp = value;
    }
}
exports.Player = Player;
