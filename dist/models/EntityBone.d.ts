import { Vector3 } from '../utils';
import { Entity } from './';
export declare class EntityBone {
    protected readonly owner: Entity;
    get Index(): number;
    get Owner(): Entity;
    get Position(): Vector3;
    get IsValid(): boolean;
    protected readonly index: number;
    constructor(owner: Entity, boneIndex?: number, boneName?: string);
}
//# sourceMappingURL=EntityBone.d.ts.map