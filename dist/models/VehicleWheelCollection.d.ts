import { Vehicle } from './Vehicle';
import { VehicleWheel } from './VehicleWheel';
import { VehicleWheelIndex } from '../enums';
export declare class VehicleWheelCollection {
    private owner;
    private readonly _vehicleWheels;
    constructor(owner: Vehicle);
    getWheel(index: VehicleWheelIndex): VehicleWheel | undefined;
    getAllWheels(): (VehicleWheel | undefined)[];
    burstAllWheels(): void;
    fixAllWheels(): void;
    hasWheel(wheel: VehicleWheelIndex): boolean;
}
//# sourceMappingURL=VehicleWheelCollection.d.ts.map