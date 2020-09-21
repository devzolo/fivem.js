"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleModCollection = void 0;
const enums_1 = require("../enums");
const VehicleMod_1 = require("./VehicleMod");
const utils_1 = require("../utils");
const VehicleToggleMod_1 = require("./VehicleToggleMod");
class VehicleModCollection {
    constructor(owner) {
        this.owner = owner;
        this._vehicleMods = new Map();
        this._vehicleToggleMods = new Map();
    }
    hasVehicleMod(type) {
        return GetNumVehicleMods(this.owner.Handle, type) > 0;
    }
    getMod(modType) {
        if (!this._vehicleMods.has(modType)) {
            this._vehicleMods.set(modType, new VehicleMod_1.VehicleMod(this.owner, modType));
        }
        return this._vehicleMods.get(modType);
    }
    getToggleMod(modType) {
        if (!this._vehicleToggleMods.has(modType)) {
            this._vehicleToggleMods.set(modType, new VehicleToggleMod_1.VehicleToggleMod(this.owner, modType));
        }
        return this._vehicleToggleMods.get(modType);
    }
    getAllMods() {
        return Object.keys(enums_1.VehicleModType)
            .filter((key) => !isNaN(Number(key)))
            .map((key) => {
            const index = Number(key);
            if (this.hasVehicleMod(index)) {
                return this.getMod(index);
            }
            return undefined;
        })
            .filter((m) => m);
    }
    get WheelType() {
        return GetVehicleWheelType(this.owner.Handle);
    }
    set WheelType(type) {
        SetVehicleWheelType(this.owner.Handle, type);
    }
    installModKit() {
        SetVehicleModKit(this.owner.Handle, 0);
    }
    get Livery() {
        var _a, _b, _c, _d;
        const modCount = (_b = (_a = this.getMod(enums_1.VehicleModType.Livery)) === null || _a === void 0 ? void 0 : _a.ModCount) !== null && _b !== void 0 ? _b : 0;
        if (modCount > 0) {
            return (_d = (_c = this.getMod(enums_1.VehicleModType.Livery)) === null || _c === void 0 ? void 0 : _c.Index) !== null && _d !== void 0 ? _d : -1;
        }
        return GetVehicleLivery(this.owner.Handle);
    }
    set Livery(value) {
        let mod = this.getMod(enums_1.VehicleModType.Livery);
        if (mod && mod.ModCount > 0) {
            mod.Index = value;
        }
        else {
            SetVehicleLivery(this.owner.Handle, value);
        }
    }
    get LiveryCount() {
        var _a, _b;
        const modCount = (_b = (_a = this.getMod(enums_1.VehicleModType.Livery)) === null || _a === void 0 ? void 0 : _a.ModCount) !== null && _b !== void 0 ? _b : 0;
        if (modCount > 0) {
            return modCount;
        }
        return GetVehicleLiveryCount(this.owner.Handle);
    }
    get WindowTint() {
        return GetVehicleWindowTint(this.owner.Handle);
    }
    set WindowTint(tint) {
        SetVehicleWindowTint(this.owner.Handle, tint);
    }
    get PrimaryColor() {
        return GetVehicleColours(this.owner.Handle)[0];
    }
    set PrimaryColor(color) {
        SetVehicleColours(this.owner.Handle, color, this.SecondaryColor);
    }
    get SecondaryColor() {
        return GetVehicleColours(this.owner.Handle)[1];
    }
    set SecondaryColor(color) {
        SetVehicleColours(this.owner.Handle, this.PrimaryColor, color);
    }
    get RimColor() {
        return GetVehicleExtraColours(this.owner.Handle)[1];
    }
    set RimColor(color) {
        SetVehicleExtraColours(this.owner.Handle, this.PearlescentColor, color);
    }
    get PearlescentColor() {
        return GetVehicleExtraColours(this.owner.Handle)[0];
    }
    set PearlescentColor(color) {
        SetVehicleExtraColours(this.owner.Handle, color, this.RimColor);
    }
    set TrimColor(color) {
        SetVehicleInteriorColour(this.owner.Handle, color);
    }
    set DashboardColor(color) {
        SetVehicleDashboardColour(this.owner.Handle, color);
    }
    setModColor1(paintType, color) {
        SetVehicleModColor_1(this.owner.Handle, paintType, color, 0);
    }
    setModColor2(paintType, color) {
        SetVehicleModColor_2(this.owner.Handle, paintType, color);
    }
    get ColorCombination() {
        return GetVehicleColourCombination(this.owner.Handle);
    }
    set ColorCombination(value) {
        SetVehicleColourCombination(this.owner.Handle, value);
    }
    get ColorCombinationCount() {
        return GetNumberOfVehicleColours(this.owner.Handle);
    }
    get TireSmokeColor() {
        const color = GetVehicleTyreSmokeColor(this.owner.Handle);
        return utils_1.Color.fromRgb(color[0], color[1], color[2]);
    }
    set TireSmokeColor(color) {
        SetVehicleTyreSmokeColor(this.owner.Handle, color.r, color.g, color.b);
    }
    get NeonLightsColor() {
        const color = GetVehicleNeonLightsColour(this.owner.Handle);
        return utils_1.Color.fromRgb(color[0], color[1], color[2]);
    }
    set NeonLightsColor(color) {
        SetVehicleNeonLightsColour(this.owner.Handle, color.r, color.g, color.b);
    }
    isNeonLightsOn(light) {
        return !!IsVehicleNeonLightEnabled(this.owner.Handle, light);
    }
    setNeonLightsOn(light, on) {
        SetVehicleNeonLightEnabled(this.owner.Handle, light, on);
    }
    areAllNeonLightsOn() {
        if (!this.HasAllNeonLights) {
            return false;
        }
        let on = true;
        Object.keys(enums_1.VehicleNeonLight)
            .filter((key) => !isNaN(Number(key)))
            .forEach((key) => {
            if (!on) {
                return;
            }
            on = this.isNeonLightsOn(Number(key));
        });
        return on;
    }
    setAllNeonLightsOn(on) {
        Object.keys(enums_1.VehicleNeonLight)
            .filter((key) => !isNaN(Number(key)))
            .forEach((key) => {
            this.setNeonLightsOn(Number(key), on);
        });
    }
    get HasAllNeonLights() {
        return (Object.keys(enums_1.VehicleNeonLight)
            .filter((key) => !isNaN(Number(key)))
            .findIndex((light) => !this.hasNeonLight(Number(light))) === -1);
    }
    hasNeonLight(light) {
        switch (light) {
            case enums_1.VehicleNeonLight.Left:
                return this.owner.Bones.hasBone('neon_l');
            case enums_1.VehicleNeonLight.Right:
                return this.owner.Bones.hasBone('neon_r');
            case enums_1.VehicleNeonLight.Front:
                return this.owner.Bones.hasBone('neon_f');
            case enums_1.VehicleNeonLight.Back:
                return this.owner.Bones.hasBone('neon_b');
            default:
                return false;
        }
    }
    get CustomPrimaryColor() {
        const color = GetVehicleCustomPrimaryColour(this.owner.Handle);
        return utils_1.Color.fromRgb(color[0], color[1], color[2]);
    }
    set CustomPrimaryColor(color) {
        SetVehicleCustomPrimaryColour(this.owner.Handle, color.r, color.g, color.b);
    }
    get CustomSecondaryColor() {
        const color = GetVehicleCustomSecondaryColour(this.owner.Handle);
        return utils_1.Color.fromRgb(color[0], color[1], color[2]);
    }
    set CustomSecondaryColor(color) {
        SetVehicleCustomSecondaryColour(this.owner.Handle, color.r, color.g, color.b);
    }
    get IsPrimaryColorCustom() {
        return !!GetIsVehiclePrimaryColourCustom(this.owner.Handle);
    }
    get IsSecondaryColorCustom() {
        return !!GetIsVehicleSecondaryColourCustom(this.owner.Handle);
    }
    clearCustomPrimaryColor() {
        ClearVehicleCustomPrimaryColour(this.owner.Handle);
    }
    clearCustomSecondaryColor() {
        ClearVehicleCustomSecondaryColour(this.owner.Handle);
    }
    get LicensePlateStyle() {
        return GetVehicleNumberPlateTextIndex(this.owner.Handle);
    }
    set LicensePlateStyle(style) {
        SetVehicleNumberPlateTextIndex(this.owner.Handle, style);
    }
    get LicensePlateType() {
        return GetVehiclePlateType(this.owner.Handle);
    }
    get LicensePlate() {
        return GetVehicleNumberPlateText(this.owner.Handle);
    }
    set LicensePlate(text) {
        SetVehicleNumberPlateText(this.owner.Handle, text);
    }
}
exports.VehicleModCollection = VehicleModCollection;
