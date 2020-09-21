import { EntityBoneCollection, Ped, PedBone } from './';
export declare class PedBoneCollection extends EntityBoneCollection {
    constructor(owner: Ped);
    get Core(): PedBone;
    get LastDamaged(): PedBone | undefined;
    clearLastDamaged(): void;
}
//# sourceMappingURL=PedBoneCollection.d.ts.map