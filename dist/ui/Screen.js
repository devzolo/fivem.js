"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Screen = void 0;
const Audio_1 = require("../Audio");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const _1 = require("./");
class Screen {
    static get Width() {
        return GetScreenActiveResolution()[0];
    }
    static get Height() {
        return GetScreenActiveResolution()[1];
    }
    static get AspectRatio() {
        return GetAspectRatio(false);
    }
    static get ScaledWidth() {
        return this.Height * this.AspectRatio;
    }
    static showSubtitle(message, duration = 2500) {
        const strings = utils_1.stringToArray(message);
        BeginTextCommandPrint('CELL_EMAIL_BCON');
        strings.forEach((element) => {
            AddTextComponentSubstringPlayerName(element);
        });
        EndTextCommandPrint(duration, true);
    }
    static displayHelpTextThisFrame(message) {
        const strings = utils_1.stringToArray(message);
        BeginTextCommandDisplayHelp('CELL_EMAIL_BCON');
        strings.forEach((element) => {
            AddTextComponentSubstringPlayerName(element);
        });
        EndTextCommandDisplayHelp(0, false, false, -1);
    }
    static showNotification(message, blinking = false) {
        const strings = utils_1.stringToArray(message);
        SetNotificationTextEntry('CELL_EMAIL_BCON');
        strings.forEach((element) => {
            AddTextComponentSubstringPlayerName(element);
        });
        return new _1.Notification(DrawNotification(blinking, true));
    }
    static showAdvancedNotification(message, title, subtitle, iconSet, icon, bgColor = enums_1.HudColor.NONE, flashColor = utils_1.Color.empty, blinking = false, type = enums_1.NotificationType.Default, showInBrief = true, sound = true) {
        const strings = utils_1.stringToArray(message);
        SetNotificationTextEntry('CELL_EMAIL_BCON');
        strings.forEach((element) => {
            AddTextComponentSubstringPlayerName(element);
        });
        if (bgColor !== enums_1.HudColor.NONE) {
            SetNotificationBackgroundColor(Number(bgColor));
        }
        if (flashColor !== utils_1.Color.empty && blinking) {
            SetNotificationFlashColor(flashColor.r, flashColor.g, flashColor.b, flashColor.a);
        }
        if (sound) {
            Audio_1.Audio.playSoundFrontEnd('DELETE', 'HUD_DEATHMATCH_SOUNDSET');
        }
        SetNotificationMessage(iconSet, icon, true, Number(type), title, subtitle);
        return new _1.Notification(DrawNotification(blinking, showInBrief));
    }
    static worldToScreen(position, scaleWidth = false) {
        const coords = GetScreenCoordFromWorldCoord(position.x, position.y, position.z);
        return new utils_1.PointF(coords[0] * (scaleWidth ? this.ScaledWidth : this.Width), coords[1] * this.Height, coords[2]);
    }
}
exports.Screen = Screen;
