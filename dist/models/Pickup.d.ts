import { PickupHash } from '../hashes/PickupHash';
export declare class Pickup {
    private handle;
    static getWeaponTypeFromPickupType(pickupHash: PickupHash): number;
    private hash;
    constructor(handle: number);
    exists(): boolean;
    remove(): void;
    setRegenerationTime(duration: number): void;
    get Exist(): boolean;
    getWeaponType(): number;
}
//# sourceMappingURL=Pickup.d.ts.map