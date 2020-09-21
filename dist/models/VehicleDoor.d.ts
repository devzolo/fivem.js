import { Vehicle } from './Vehicle';
import { VehicleDoorIndex } from '../enums';
export declare class VehicleDoor {
    private owner;
    private index;
    constructor(owner: Vehicle, index: VehicleDoorIndex);
    get Index(): VehicleDoorIndex;
    set Index(index: VehicleDoorIndex);
    get AngleRatio(): number;
    set AngleRatio(value: number);
    set CanBeBroken(value: boolean);
    get IsOpen(): boolean;
    get IsFullyOpen(): boolean;
    get IsBroken(): boolean;
    get Vehicle(): Vehicle;
    open(loose?: boolean, instantly?: boolean): void;
    close(instantly?: boolean): void;
    break(stayInTheWorld?: boolean): void;
}
//# sourceMappingURL=VehicleDoor.d.ts.map