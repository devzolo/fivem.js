"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityBoneCollection = void 0;
const _1 = require("./");
class EntityBoneCollection {
    //private readonly _collection: Enumerator<EntityBone>;
    //private _currentIndex = -1;
    constructor(owner) {
        this.owner = owner;
    }
    hasBone(name) {
        return GetEntityBoneIndexByName(this.owner.Handle, name) !== -1;
    }
    get Core() {
        return new _1.EntityBone(this.owner, -1);
    }
}
exports.EntityBoneCollection = EntityBoneCollection;
