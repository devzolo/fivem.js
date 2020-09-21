import { Vehicle } from './Vehicle';
import { VehicleDoorIndex } from '../enums';
import { VehicleDoor } from './VehicleDoor';
export declare class VehicleDoorCollection {
    private _owner;
    private readonly _vehicleDoors;
    constructor(owner: Vehicle);
    getDoors(index: VehicleDoorIndex): VehicleDoor | undefined;
    getAllDoors(): (VehicleDoor | undefined)[];
    openAllDoors(loose?: boolean, instantly?: boolean): void;
    closeAllDoors(instantly?: boolean): void;
    breakAllDoors(stayInTheWorld?: boolean): void;
    hasDoor(index: VehicleDoorIndex): boolean;
}
//# sourceMappingURL=VehicleDoorCollection.d.ts.map