"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Audio_1 = require("./Audio");
const enums_1 = require("./enums");
const models_1 = require("./models");
class Game {
    /**
     * Calculate the Jenkins One At A Time (joaat) has from the given string.
     *
     * @param input The input string to calculate the hash
     */
    static generateHash(input) {
        if (typeof input === 'undefined') {
            return 0;
        }
        return GetHashKey(input);
    }
    /**
     * Gets the game language
     */
    static get Language() {
        return GetUiLanguageId();
    }
    /**
     * Gets how many milliseconds the game has been open this session
     */
    static get GameTime() {
        return GetGameTimer();
    }
    /**
     * Sets the time scale of the Game.
     *
     * @param time The time scale, only accepts values between 0.0 and 1.0
     */
    static set TimeScale(time) {
        SetTimeScale(time <= 1 && time >= 0 ? time : 1);
    }
    /**
     * Gets the total amount of frames rendered in this session
     */
    static get FrameCount() {
        return GetFrameCount();
    }
    /**
     * Gets the current frame rate per second
     */
    static get FPS() {
        return 1 / this.LastFrameTime;
    }
    /**
     * Gets the time it currently takes to render a frame, in seconds;
     */
    static get LastFrameTime() {
        return GetFrameTime();
    }
    /**
     * Get the local player's Player object.
     */
    static get Player() {
        const handle = PlayerId();
        if (typeof this.cachedPlayer === 'undefined' || handle !== this.cachedPlayer.Handle) {
            this.cachedPlayer = new models_1.Player(handle);
        }
        return this.cachedPlayer;
    }
    /**
     * Get the local player character's Ped object.
     * @returns A local player's character.
     */
    static get PlayerPed() {
        return this.Player.Character;
    }
    /**
     * Get an iterable list of players currently on server.
     * @returns Iterable list of Player objects.
     */
    static *playerList() {
        for (let i = 0; i < GetActivePlayers(); i += 1) {
            yield new models_1.Player(i);
        }
    }
    /**
     * Get whether PvP is enabled.
     * @returns True if enabled.
     */
    static get PlayerVersusPlayer() {
        return this.Player.PvPEnabled;
    }
    /**
     * Set whether PvP is enabled.
     */
    static set PlayerVersusPlayer(value) {
        this.Player.PvPEnabled = value;
    }
    /**
     * Get the maximum wanted level.
     */
    static get MaxWantedLevel() {
        return GetMaxWantedLevel();
    }
    /**
     * Set the maximum wanted level the local client can get.
     */
    static set MaxWantedLevel(value) {
        if (value < 0) {
            value = 0;
        }
        else if (value > 5) {
            value = 5;
        }
        SetMaxWantedLevel(value);
    }
    /**
     * Set the multiplier of the wanted level.
     */
    static set WantedMultiplier(value) {
        SetWantedLevelMultiplier(value);
    }
    /**
     * Set whether police blips should show on minimap.
     */
    static set ShowPoliceBlipsOnRadar(toggle) {
        SetPoliceRadarBlips(toggle);
    }
    /**
     * Get if nightvision is active.
     */
    static get Nightvision() {
        return !!IsNightvisionActive();
    }
    /**
     * Toggle nightvision.
     */
    static set Nightvision(toggle) {
        SetNightvision(toggle);
    }
    /**
     * Get if thermal (heat) vision is active.
     */
    static get ThermalVision() {
        return !!IsSeethroughActive();
    }
    /**
     * Toggle thermal (heat) vision.
     */
    static set ThermalVision(toggle) {
        SetSeethrough(toggle);
    }
    static get IsMissionActive() {
        return !!GetMissionFlag();
    }
    static set IsMissionActive(toggle) {
        SetMissionFlag(toggle);
    }
    static get IsRandomEventActive() {
        return GetRandomEventFlag() === 1;
    }
    static set IsRandomEventActive(toggle) {
        SetRandomEventFlag(toggle ? 1 : 0);
    }
    static get IsCutsceneActive() {
        return !!IsCutsceneActive();
    }
    /**
     * Is a waypoint set on the map.
     */
    static get IsWaypointActive() {
        return !!IsWaypointActive();
    }
    /**
     * Is the player in the pause menu (ESC).
     */
    static get IsPaused() {
        return !!IsPauseMenuActive();
    }
    /**
     * Force enable pause menu.
     */
    static set IsPaused(toggle) {
        SetPauseMenuActive(toggle);
    }
    /**
     * Get if a loading screen is active.
     */
    static get IsLoading() {
        return !!GetIsLoadingScreenActive();
    }
    /**
     * Get current input mode.
     * @returns InputMode: Mouse & Keyboard or GamePad.
     */
    static get CurrentInputMode() {
        return IsInputDisabled(2) ? enums_1.InputMode.MouseAndKeyboard : enums_1.InputMode.GamePad;
    }
    /**
     * Gets the player's current radio station.
     *
     * @returns A radio station.
     */
    static get RadioStation() {
        const stationName = GetPlayerRadioStationName();
        const keys = Object.keys(enums_1.RadioStation).filter((x) => enums_1.RadioStation[x] === stationName);
        return keys.length > 0 ? enums_1.RadioStation[keys[0]] : enums_1.RadioStation.RadioOff;
    }
    /**
     * Sets the player's radio station.
     *
     * @param station A radio station.
     */
    static set RadioStation(station) {
        const stationName = enums_1.RadioStation[station];
        SetRadioToStationName(stationName);
    }
    /**
     * Check whether a control is currently pressed.
     *
     * @param inputMode InputMode
     * @param control Control
     * @returns True or False.
     */
    static isControlPressed(inputMode, control) {
        return !!IsControlPressed(inputMode, Number(control));
    }
    /**
     * Check whether a disabled control is currently pressed.
     *
     * @param inputMode InputMode
     * @param control Control
     * @returns True or False.
     */
    static isDisabledControlPressed(inputMode, control) {
        return !!IsDisabledControlPressed(inputMode, Number(control));
    }
    /**
     * Check whether a control has been pressed since last check.
     *
     * @param inputMode InputMode
     * @param control Control
     * @returns True or False.
     */
    static isControlJustPressed(inputMode, control) {
        return !!IsControlJustPressed(inputMode, Number(control));
    }
    /**
     * Check whether a disabled control has been pressed since last check.
     *
     * @param inputMode InputMode
     * @param control Control
     * @returns True or False.
     */
    static isDisabledControlJustPressed(inputMode, control) {
        return !!IsDisabledControlJustPressed(inputMode, Number(control));
    }
    /**
     * Check whether a control is being released.
     *
     * @param inputMode InputMode
     * @param control Control
     * @returns True or False.
     */
    static isControlReleased(inputMode, control) {
        return !!IsControlReleased(inputMode, Number(control));
    }
    /**
     * Check whether a control has been released since last check.
     *
     * @param inputMode InputMode
     * @param control Control
     * @returns True or False.
     */
    static isControlJustReleased(inputMode, control) {
        return !!IsControlJustReleased(inputMode, Number(control));
    }
    /**
     * Check whether a control is enabled this frame.
     *
     * @param inputMode InputMode
     * @param control Control
     * @returns True or False.
     */
    static isControlEnabled(inputMode, control) {
        return !!IsControlEnabled(inputMode, Number(control));
    }
    /**
     * Makes the Game Engine respond to the given Control this frame
     *
     * @param inputMode InputMode
     * @param control Control
     */
    static enableControlThisFrame(inputMode, control) {
        EnableControlAction(inputMode, Number(control), true);
    }
    /**
     * Makes the Game Engine ignore the given Control this frame
     *
     * @param inputMode InputMode
     * @param control Control
     */
    static disableControlThisFrame(inputMode, control) {
        DisableControlAction(inputMode, Number(control), true);
    }
    /**
     * Disables all Controls this frame.
     *
     * @param inputMode InputMode
     */
    static disableAllControlsThisFrame(inputMode) {
        DisableAllControlActions(inputMode);
    }
    /**
     * Enables all Controls this frame.
     *
     * @param inputMode InputMode
     */
    static enableAllControlsThisFrame(inputMode) {
        EnableAllControlActions(inputMode);
    }
    /**
     * Get an entity object from an entity handle.
     *
     * @param handle Handle of entity
     * @returns A Ped, Vehicle or Prop object. `undefined` if entity handle doesn't exist.
     */
    static entityFromHandle(handle) {
        switch (GetEntityType(handle)) {
            case 1:
                return new models_1.Ped(handle);
            case 2:
                return new models_1.Vehicle(handle);
            case 3:
                return new models_1.Prop(handle);
        }
        return undefined;
    }
    /**
     * Play a sound. Same as Audio.playSound
     *
     * @param soundFile Name of sound
     * @param soundSet The set where the sound is in
     */
    static playSound(soundFile, soundSet) {
        Audio_1.Audio.playSound(soundFile, soundSet);
    }
    /**
     * Play music. Same as Audio.playSound
     *
     * @param musicFile Music file.
     */
    static playMusic(musicFile) {
        Audio_1.Audio.playMusic(musicFile);
    }
    /**
     * Stop music. If `musicFile` is not given, last played music is stopped. Same as Audio.playSound
     *
     * @param musicFile (optional) Music file.
     */
    static stopMusic(musicFile) {
        Audio_1.Audio.stopMusic(musicFile);
    }
}
exports.Game = Game;
