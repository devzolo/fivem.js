import { Vehicle } from './Vehicle';
import { VehicleWindowIndex } from '../enums';
import { VehicleWindow } from './VehicleWindow';
export declare class VehicleWindowCollection {
    private _owner;
    private readonly _vehicleWindows;
    constructor(owner: Vehicle);
    getWindow(index: VehicleWindowIndex): VehicleWindow | undefined;
    getAllWindows(): (VehicleWindow | undefined)[];
    get AreAllWindowsIntact(): boolean;
    rollDownAllWindows(): void;
    rollUpAllWindows(): void;
    hasWindow(window: VehicleWindowIndex): boolean;
}
//# sourceMappingURL=VehicleWindowCollection.d.ts.map