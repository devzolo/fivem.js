"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
const utils_1 = require("../utils");
const _1 = require("./");
class Sprite {
    constructor(textureDict, textureName, pos, size, heading = 0, color = new utils_1.Color(255, 255, 255, 255)) {
        this.textureDict = textureDict;
        this.textureName = textureName;
        this.pos = pos;
        this.size = size;
        this.heading = heading;
        this.color = color;
        this.visible = true;
    }
    loadTextureDictionary() {
        RequestStreamedTextureDict(this.textureDict, true);
        const interval = setInterval(() => {
            if (this.IsTextureDictionaryLoaded) {
                clearInterval(interval);
            }
        }, 0);
    }
    set TextureDict(v) {
        this.textureDict = v;
        if (!this.IsTextureDictionaryLoaded) {
            this.loadTextureDictionary();
        }
    }
    get TextureDict() {
        return this.textureDict;
    }
    get IsTextureDictionaryLoaded() {
        return !!HasStreamedTextureDictLoaded(this.textureDict);
    }
    draw(textureDictionary, textureName, pos, size, heading, color, loadTexture) {
        textureDictionary = textureDictionary || this.TextureDict;
        textureName = textureName || this.textureName;
        pos = pos || this.pos;
        size = size || this.size;
        heading = heading || this.heading;
        color = color || this.color;
        loadTexture = loadTexture || true;
        if (loadTexture) {
            if (!HasStreamedTextureDictLoaded(textureDictionary)) {
                RequestStreamedTextureDict(textureDictionary, false);
            }
        }
        const height = _1.Screen.Height;
        const width = _1.Screen.ScaledWidth;
        const w = this.size.width / width;
        const h = this.size.height / height;
        const x = this.pos.X / width + w * 0.5;
        const y = this.pos.Y / height + h * 0.5;
        DrawSprite(textureDictionary, textureName, x, y, w, h, heading, color.r, color.g, color.b, color.a);
    }
}
exports.Sprite = Sprite;
