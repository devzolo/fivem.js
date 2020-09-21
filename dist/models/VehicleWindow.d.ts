import { Vehicle } from './Vehicle';
import { VehicleWindowIndex } from '../enums';
export declare class VehicleWindow {
    private owner;
    private index;
    constructor(owner: Vehicle, index: VehicleWindowIndex);
    get Index(): VehicleWindowIndex;
    set Index(index: VehicleWindowIndex);
    get IsIntact(): boolean;
    get Vehicle(): Vehicle;
    repair(): void;
    smash(): void;
    rollUp(): void;
    rollDown(): void;
    remove(): void;
}
//# sourceMappingURL=VehicleWindow.d.ts.map