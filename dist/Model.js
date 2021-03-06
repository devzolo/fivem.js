"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const Game_1 = require("./Game");
const hashes_1 = require("./hashes");
const utils_1 = require("./utils");
/**
 * Class to create and manage entity models.
 */
class Model {
    /**
     * Creates a model object based on the hash key or model string.
     *
     * @param hash A number or string of the model's hash. Example: "mp_m_freemode_01"
     */
    constructor(hash) {
        if (typeof hash === 'string') {
            this.hash = Game_1.Game.generateHash(hash);
        }
        else {
            this.hash = hash;
        }
    }
    /**
     * Gets the hash of the model.
     *
     * @returns The hash key.
     */
    get Hash() {
        return this.hash;
    }
    /**
     * Gets if the model is valid or not.
     *
     * @returns Whether this model is valid.
     */
    get IsValid() {
        return !!IsModelValid(this.hash);
    }
    /**
     * Gets if the model is in cd image or not.
     *
     * @returns Whether this model is in cd image.
     */
    get IsInCdImage() {
        return !!IsModelInCdimage(this.hash);
    }
    /**
     * Gets if the model is loaded or not.
     *
     * @returns Whether this model is loaded.
     */
    get IsLoaded() {
        return !!HasModelLoaded(this.hash);
    }
    /**
     * Gets if the model collision is loaded or not.
     *
     * @returns Whether this model collision is loaded.
     */
    get IsCollisionLoaded() {
        return !!HasCollisionForModelLoaded(this.hash);
    }
    /**
     * Gets if the model is a bicycle or not.
     *
     * @returns Whether this model is a bicycle.
     */
    get IsBicycle() {
        return !!IsThisModelABicycle(this.hash);
    }
    /**
     * Gets if the model is a motorbike or not.
     *
     * @returns Whether this model is a motorbike.
     */
    get IsBike() {
        return !!IsThisModelABike(this.hash);
    }
    /**
     * Gets if the model is a boat or not.
     *
     * @returns Whether this model is a boat.
     */
    get IsBoat() {
        return !!IsThisModelABoat(this.hash);
    }
    /**
     * Gets if the model is a car or not.
     *
     * @returns Whether this model is a car.
     */
    get IsCar() {
        return !!IsThisModelACar(this.hash);
    }
    /**
     * Gets if the model is a cargobob or not.
     *
     * @returns Whether this model is a cargobob.
     */
    get IsCargobob() {
        return (this.hash === hashes_1.VehicleHash.Cargobob ||
            this.hash === hashes_1.VehicleHash.Cargobob2 ||
            this.hash === hashes_1.VehicleHash.Cargobob3 ||
            this.hash === hashes_1.VehicleHash.Cargobob4);
    }
    /**
     * Gets if the model is a helicopter or not.
     *
     * @returns Whether this model is a helicopter.
     */
    get IsHelicopter() {
        return !!IsThisModelAHeli(this.hash);
    }
    /**
     * Gets if the model is a Ped or not.
     *
     * @returns Whether this model is a Ped.
     */
    get IsPed() {
        return !!IsModelAPed(this.hash);
    }
    /**
     * Gets if the model is a plane or not.
     *
     * @returns Whether this model is a plane.
     */
    get IsPlane() {
        return !!IsThisModelAPlane(this.hash);
    }
    /**
     * Gets if the model is a prop or not.
     *
     * @returns Whether this model is a prop.
     */
    get IsProp() {
        return this.IsValid && !this.IsPed && !this.IsVehicle && !IsWeaponValid(this.hash);
    }
    /**
     * Gets if the model is a quadbike or not.
     *
     * @returns Whether this model is a quadbike.
     */
    get IsQuadbike() {
        return !!IsThisModelAQuadbike(this.hash);
    }
    /**
     * Gets if the model is a train or not.
     *
     * @returns Whether this model is a train.
     */
    get IsTrain() {
        return !!IsThisModelATrain(this.hash);
    }
    /**
     * Gets if the model is a Vehicle or not.
     *
     * @returns Whether this model is a Vehicle.
     */
    get IsVehicle() {
        return !!IsModelAVehicle(this.hash);
    }
    /**
     * Gets the model dimensions.
     *
     * @returns This model dimensions.
     */
    get Dimensions() {
        const [min, max] = GetModelDimensions(this.hash);
        const right = new utils_1.Vector3(min[0], min[1], min[2]);
        const left = new utils_1.Vector3(max[0], max[1], max[2]);
        return utils_1.Vector3.subtract(left, right);
    }
    /**
     * Request and load the model with a specified timeout. Advised timeout - 1000.
     *
     * @param timeout Maximum allowed time for model to load.
     */
    request(timeout) {
        return new Promise((resolve) => {
            if (!this.IsInCdImage && !this.IsValid && !IsWeaponValid(this.hash)) {
                resolve(false);
            }
            RequestModel(this.hash);
            const start = GetGameTimer();
            const interval = setInterval(() => {
                if (this.IsLoaded || GetGameTimer() - start >= timeout) {
                    clearInterval(interval);
                    this.markAsNoLongerNeeded();
                    resolve(this.IsLoaded);
                }
            }, 0);
        });
    }
    /**
     * Sets the model as no longer needed allowing the game engine to free memory.
     */
    markAsNoLongerNeeded() {
        SetModelAsNoLongerNeeded(this.hash);
    }
}
exports.Model = Model;
