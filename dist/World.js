"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const _1 = require("./");
const Blip_1 = require("./Blip");
const Camera_1 = require("./Camera");
const enums_1 = require("./enums");
const hashes_1 = require("./hashes");
const models_1 = require("./models");
const Pickup_1 = require("./models/Pickup");
const Raycast_1 = require("./Raycast");
const utils_1 = require("./utils");
/**
 * Class with common world manipulations.
 *
 * This class includes methods for creating entities and common world rendering.
 */
class World {
    /**
     * Get the current camera that's rendering.
     */
    static get RenderingCamera() {
        return new Camera_1.Camera(GetRenderingCam());
    }
    /**
     * Set the rendering camera. World.RenderingCamera = null to reset.
     */
    static set RenderingCamera(value) {
        if (value === null) {
            RenderScriptCams(false, false, 3000, true, false);
        }
        else {
            value.IsActive = true;
            RenderScriptCams(true, false, 3000, true, false);
        }
    }
    /**
     * Get the current date in the world.
     */
    static get CurrentDate() {
        const year = GetClockYear();
        const month = GetClockMonth();
        const day = GetClockDayOfMonth();
        const hour = GetClockHours();
        const minutes = GetClockMinutes();
        const seconds = GetClockSeconds();
        return new Date(year, month, day, hour, minutes, seconds);
    }
    /**
     * Set the current date of the world.
     */
    static set CurrentDate(date) {
        SetClockDate(date.getDate(), date.getMonth(), date.getFullYear());
        SetClockTime(date.getHours(), date.getMinutes(), date.getSeconds());
    }
    /**
     * Disables all emissive textures, street/building/vehicle lights. "EMP" effect.
     */
    static set Blackout(value) {
        SetBlackout(value);
    }
    /**
     * Get the current cloud hat.
     */
    static get CloudHat() {
        return this.currentCloudHat;
    }
    /**
     * Set the current cloud hat.
     */
    static set CloudHat(value) {
        var _a;
        this.currentCloudHat = value;
        if (this.currentCloudHat === enums_1.CloudHat.Unknown) {
            this.currentCloudHat = enums_1.CloudHat.Clear;
            ClearCloudHat();
            return;
        }
        SetCloudHatTransition((_a = this.cloudHatDict.get(this.currentCloudHat)) !== null && _a !== void 0 ? _a : '', 3);
    }
    /**
     * Get the opacity of current cloud hat. Value is between 0-1.
     */
    static get CloudHatOpacity() {
        return GetCloudHatOpacity();
    }
    /**
     * Set opacity of current cloud hat between 0-1.
     */
    static set CloudHatOpacity(value) {
        SetCloudHatOpacity(utils_1.clamp(value, 0, 1));
    }
    /**
     * Get the current weather type.
     */
    static get Weather() {
        switch (GetPrevWeatherTypeHashName()) {
            case -1750463879:
                return enums_1.Weather.ExtraSunny;
            case 916995460:
                return enums_1.Weather.Clear;
            case -1530260698:
                return enums_1.Weather.Neutral;
            case 282916021:
                return enums_1.Weather.Smog;
            case -1368164796:
                return enums_1.Weather.Foggy;
            case 821931868:
                return enums_1.Weather.Clouds;
            case -1148613331:
                return enums_1.Weather.Overcast;
            case 1840358669:
                return enums_1.Weather.Clearing;
            case 1420204096:
                return enums_1.Weather.Raining;
            case -1233681761:
                return enums_1.Weather.ThunderStorm;
            case 669657108:
                return enums_1.Weather.Blizzard;
            case -273223690:
                return enums_1.Weather.Snowing;
            case 603685163:
                return enums_1.Weather.Snowlight;
            case -1429616491:
                return enums_1.Weather.Christmas;
            case -921030142:
                return enums_1.Weather.Halloween;
            default:
                return enums_1.Weather.Unknown;
        }
    }
    /**
     * Set the current weather.
     */
    static set Weather(value) {
        if (value !== enums_1.Weather.Unknown) {
            const weather = this.weatherDict[value];
            SetWeatherTypeOverTime(weather, 1);
            setTimeout(() => {
                SetWeatherTypeNow(weather);
            }, 100);
        }
    }
    /**
     * Get the next weather type.
     */
    static get NextWeather() {
        switch (GetNextWeatherTypeHashName()) {
            case -1750463879:
                return enums_1.Weather.ExtraSunny;
            case 916995460:
                return enums_1.Weather.Clear;
            case -1530260698:
                return enums_1.Weather.Neutral;
            case 282916021:
                return enums_1.Weather.Smog;
            case -1368164796:
                return enums_1.Weather.Foggy;
            case 821931868:
                return enums_1.Weather.Clouds;
            case -1148613331:
                return enums_1.Weather.Overcast;
            case 1840358669:
                return enums_1.Weather.Clearing;
            case 1420204096:
                return enums_1.Weather.Raining;
            case -1233681761:
                return enums_1.Weather.ThunderStorm;
            case 669657108:
                return enums_1.Weather.Blizzard;
            case -273223690:
                return enums_1.Weather.Snowing;
            case 603685163:
                return enums_1.Weather.Snowlight;
            case -1429616491:
                return enums_1.Weather.Christmas;
            case -921030142:
                return enums_1.Weather.Halloween;
            default:
                return enums_1.Weather.Unknown;
        }
    }
    /**
     * Set weather type instantly. Similar to World.transitionToWeather with duration 0.
     */
    static set NextWeather(value) {
        if (value !== enums_1.Weather.Unknown) {
            const weather = this.weatherDict[value];
            SetWeatherTypeOverTime(weather, 0);
        }
    }
    /**
     * Doesn't work
     */
    static get WeatherTransition() {
        const transition = GetWeatherTypeTransition();
        return [this.weatherDict[transition[0]], this.weatherDict[transition[1]], transition[2]];
    }
    /**
     * Doesn't work
     */
    static set WeatherTransition(transition) {
        SetWeatherTypeTransition(transition[0], transition[1], transition[2]);
    }
    /**
     * Transition to different weather type within a certain time.
     *
     * @param weather Weather type to change to.
     * @param duration Time for full weather change (in milliseconds);
     */
    static transitionToWeather(weather, duration) {
        if (weather !== enums_1.Weather.Unknown) {
            SetWeatherTypeOverTime(this.weatherDict[weather], duration);
        }
    }
    /**
     * Destroys all existing cameras and sets your rendering camera back to GameplayCam.
     */
    static destroyAllCameras() {
        DestroyAllCams(false);
    }
    /**
     * Creates a blip at a given position and optionally radius.
     *
     * @param position World coordinate of blip.
     * @param radius (Optional) Radius of where blip should be shown.
     * @returns Blip object.
     */
    static createBlip(position, radius) {
        if (radius !== undefined) {
            return new Blip_1.Blip(AddBlipForRadius(position.x, position.y, position.z, radius));
        }
        return new Blip_1.Blip(AddBlipForCoord(position.x, position.y, position.z));
    }
    /**
     * Creates a camera using 'DEFAULT_SCRIPTED_CAMERA'.
     *
     * @param position World coordinate where the camera should render.
     * @param rotation Rotation of camera relative to world.
     * @param fieldOfView Field of view angle of camera.
     * @returns Camera object.
     */
    static createCamera(position, rotation, fieldOfView) {
        return new Camera_1.Camera(CreateCamWithParams('DEFAULT_SCRIPTED_CAMERA', position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, fieldOfView, true, 2));
    }
    /**
     * Create a ped at a desired location.
     *
     * @param model Ped model to be spawned.
     * @param position World position (coordinates) of Ped spawn.
     * @param heading Heading of Ped when spawning.
     * @returns Ped object.
     */
    static createPed(model, position, heading = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!model.IsPed || !(yield model.request(1000))) {
                return undefined;
            }
            return new models_1.Ped(CreatePed(26, model.Hash, position.x, position.y, position.z, heading, true, false));
        });
    }
    /**
     * Creates a ped with a random model.
     *
     * @param position World coordinate of Ped spawn.
     * @returns Ped object.
     */
    static createRandomPed(position) {
        return new models_1.Ped(CreateRandomPed(position.x, position.y, position.z));
    }
    /**
     * Create a vehicle at a desired location.
     *
     * @param model Vehicle model to be spawned.
     * @param position World position (coordinates) of Vehicle spawn.
     * @param heading Heading of Vehicle when spawning.
     * @returns Vehicle object.
     */
    static createVehicle(model, position, heading = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!model.IsVehicle || !(yield model.request(1000))) {
                return undefined;
            }
            return new models_1.Vehicle(CreateVehicle(model.Hash, position.x, position.y, position.z, heading, true, false));
        });
    }
    /**
     * Create a random vehicle at a desired location.
     *
     * @param position World position (coordinates) of Vehicle spawn.
     * @param heading Heading of Vehicle when spawning.
     * @returns Vehicle object.
     */
    static createRandomVehicle(position, heading = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicleCount = Object.keys(hashes_1.VehicleHash).length / 2; // check
            const randomIndex = utils_1.getRandomInt(0, vehicleCount);
            const randomVehicleName = hashes_1.VehicleHash[randomIndex];
            const modelHash = GetHashKey(randomVehicleName);
            const model = new _1.Model(modelHash);
            if (!model.IsVehicle || !(yield model.request(1000))) {
                return undefined;
            }
            return new models_1.Vehicle(CreateVehicle(model.Hash, position.x, position.y, position.z, heading, true, false));
        });
    }
    static createProp(model, position, dynamic, placeOnGround) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!model.IsProp || !(yield model.request(1000))) {
                return undefined;
            }
            const prop = new _1.Prop(CreateObject(model.Hash, position.x, position.y, position.z, true, true, dynamic));
            if (placeOnGround) {
                prop.placeOnGround();
            }
            return prop;
        });
    }
    static createPickup(pickupHash, position, value = 0, model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!pickupHash) {
                return undefined;
            }
            if (!model.IsValid || !(yield model.request(1000))) {
                return undefined;
            }
            return new Pickup_1.Pickup(CreatePickup(pickupHash, position.x, position.y, position.z, 0, value, false, model.Hash));
        });
    }
    /**
     * Draw a marker at a desired location.
     *
     * @param type Type of marker.
     * @param position Location of marker.
     * @param direction Direction facing.
     * @param rotation World rotation.
     * @param scale Size of marker.
     * @param color Color of marker.
     * @param bobUpAndDown Animated movement along marker's own X axis.
     * @param faceCamera Rendering marker facing rendering camera.
     * @param rotateY Rotate along Y axis.
     * @param textureDict Custom texture dictionary for custom marker.
     * @param textureName Custom texture name for custom marker.
     * @param drawOnEntity Render the marker on an entity.
     */
    static drawMarker(type, position, direction, rotation, scale, color, bobUpAndDown = false, faceCamera = false, rotateY = false, textureDict = '', textureName = '', drawOnEntity = false) {
        DrawMarker(Number(type), position.x, position.y, position.z, direction.x, direction.y, direction.z, rotation.x, rotation.y, rotation.z, scale.x, scale.y, scale.z, color.r, color.g, color.b, color.a, bobUpAndDown, faceCamera, 2, rotateY, textureDict, textureName, drawOnEntity);
    }
    /**
     * Creates a light in the world with a certain length (range).
     *
     * @param pos World coordinate where to draw the light.
     * @param color RGB colors of the light.
     * @param range How far to draw the light.
     * @param intensity Intensity of the light ("alpha").
     */
    static drawLightWithRange(pos, color, range, intensity) {
        DrawLightWithRange(pos.x, pos.y, pos.z, color.r, color.g, color.b, range, intensity);
    }
    /**
     * Creates a light in the world. More configurable than World.drawLightWithRange.
     *
     * @param pos World coordinate of spotlight.
     * @param dir Direction to face spotlight.
     * @param color RGB colors of spotlight.
     * @param distance The maximum distance the spotlight can reach.
     * @param brightness Brightness of the spotlight.
     * @param roundness "Smoothness" of the edge of the spotlight.
     * @param radius Radius size of spotlight.
     * @param fadeOut Falloff size of the spotlight's edge.
     */
    static drawSpotLight(pos, dir, color, distance, brightness, roundness, radius, fadeOut) {
        DrawSpotLight(pos.x, pos.y, pos.z, dir.x, dir.y, dir.z, color.r, color.g, color.b, distance, brightness, roundness, radius, fadeOut);
    }
    /**
     * Creates a light in the world. Same as World.drawSpotlight, but also draws shadows.
     *
     * @param pos World coordinate of spotlight.
     * @param dir Direction to face spotlight.
     * @param color RGB colors of spotlight.
     * @param distance The maximum distance the spotlight can reach.
     * @param brightness Brightness of the spotlight.
     * @param roundness "Smoothness" of the edge of the spotlight.
     * @param radius Radius size of spotlight.
     * @param fadeOut Falloff size of the spotlight's edge.
     */
    static drawSpotLightWithShadow(pos, dir, color, distance, brightness, roundness, radius, fadeOut) {
        DrawSpotLightWithShadow(pos.x, pos.y, pos.z, dir.x, dir.y, dir.z, color.r, color.g, color.b, distance, brightness, roundness, radius, fadeOut, 0);
    }
    /**
     * Draws a line in the world. It's not possible to change thickness.
     *
     * @param start World coordinate of start position of line.
     * @param end World coordinate of end position of line.
     * @param color RGB color of line.
     */
    static drawLine(start, end, color) {
        DrawLine(start.x, start.y, start.z, end.x, end.y, end.z, color.r, color.g, color.b, color.a);
    }
    /**
     * Draw polygon in the world.
     *
     * @param vertexA World coordinate of first point.
     * @param vertexB World coordinate of second point.
     * @param vertexC World coordinate of third point.
     * @param color RGB color of polygon.
     */
    static drawPoly(vertexA, vertexB, vertexC, color) {
        DrawPoly(vertexA.x, vertexA.y, vertexA.z, vertexB.x, vertexB.y, vertexB.z, vertexC.x, vertexC.y, vertexC.z, color.r, color.g, color.b, color.a);
    }
    /**
     * Cast ("shoot") a ray in a certain direction to detect entities in the way.
     *
     * @param source Starting position of raycast.
     * @param direction Direction to cast a ray to.
     * @param maxDistance Max distance to cast the ray.
     * @param options Possible entity types to detect.
     * @param ignoreEntity An entity to ignore (usually player's Ped).
     * @returns RaycastResult object.
     */
    static raycast(source, direction, maxDistance, options, ignoreEntity) {
        const target = utils_1.Vector3.add(source, utils_1.Vector3.multiply(direction, maxDistance));
        return new Raycast_1.RaycastResult(StartShapeTestRay(source.x, source.y, source.z, target.x, target.y, target.z, Number(options), ignoreEntity.Handle, 7));
    }
    static getAllProps() {
        const props = [];
        const [handle, entityHandle] = FindFirstObject(0);
        let prop = _1.Entity.fromHandle(entityHandle);
        if (prop !== undefined && prop.exists()) {
            props.push(prop);
        }
        let findResult = [false, 0];
        do {
            findResult = FindNextObject(handle, 0);
            if (findResult[0]) {
                prop = _1.Entity.fromHandle(findResult[1]);
                if (prop !== undefined && prop.exists()) {
                    props.push(prop);
                }
            }
        } while (findResult[0]);
        EndFindObject(handle);
        return props;
    }
    static getAllPeds() {
        const peds = [];
        const [handle, entityHandle] = FindFirstPed(0);
        let ped = _1.Entity.fromHandle(entityHandle);
        if (ped !== undefined && ped.exists()) {
            peds.push(ped);
        }
        let findResult = [false, 0];
        do {
            findResult = FindNextPed(handle, 0);
            if (findResult[0]) {
                ped = _1.Entity.fromHandle(findResult[1]);
                if (ped !== undefined && ped.exists()) {
                    peds.push(ped);
                }
            }
        } while (findResult[0]);
        EndFindPed(handle);
        return peds;
    }
    static getAllVehicles() {
        const vehicles = [];
        const [handle, entityHandle] = FindFirstVehicle(0);
        let vehicle = _1.Entity.fromHandle(entityHandle);
        if (vehicle !== undefined && vehicle.exists()) {
            vehicles.push(vehicle);
        }
        let findResult = [false, 0];
        do {
            findResult = FindNextVehicle(handle, 0);
            if (findResult[0]) {
                vehicle = _1.Entity.fromHandle(findResult[1]);
                if (vehicle !== undefined && vehicle.exists()) {
                    vehicles.push(vehicle);
                }
            }
        } while (findResult[0]);
        EndFindVehicle(handle);
        return vehicles;
    }
}
exports.World = World;
World.currentCloudHat = enums_1.CloudHat.Clear;
World.cloudHatDict = new Map([
    [enums_1.CloudHat.Unknown, 'Unknown'],
    [enums_1.CloudHat.Altostratus, 'altostratus'],
    [enums_1.CloudHat.Cirrus, 'Cirrus'],
    [enums_1.CloudHat.Cirrocumulus, 'cirrocumulus'],
    [enums_1.CloudHat.Clear, 'Clear 01'],
    [enums_1.CloudHat.Cloudy, 'Cloudy 01'],
    [enums_1.CloudHat.Contrails, 'Contrails'],
    [enums_1.CloudHat.Horizon, 'Horizon'],
    [enums_1.CloudHat.HorizonBand1, 'horizonband1'],
    [enums_1.CloudHat.HorizonBand2, 'horizonband2'],
    [enums_1.CloudHat.HorizonBand3, 'horizonband3'],
    [enums_1.CloudHat.Horsey, 'horsey'],
    [enums_1.CloudHat.Nimbus, 'Nimbus'],
    [enums_1.CloudHat.Puffs, 'Puffs'],
    [enums_1.CloudHat.Rain, 'RAIN'],
    [enums_1.CloudHat.Snowy, 'Snowy 01'],
    [enums_1.CloudHat.Stormy, 'Stormy 01'],
    [enums_1.CloudHat.Stratoscumulus, 'stratoscumulus'],
    [enums_1.CloudHat.Stripey, 'Stripey'],
    [enums_1.CloudHat.Shower, 'shower'],
    [enums_1.CloudHat.Wispy, 'Wispy'],
]);
World.weatherDict = [
    'EXTRASUNNY',
    'CLEAR',
    'CLOUDS',
    'SMOG',
    'FOGGY',
    'OVERCAST',
    'RAIN',
    'THUNDER',
    'CLEARING',
    'NEUTRAL',
    'SNOW',
    'BLIZZARD',
    'SNOWLIGHT',
    'XMAS',
];
