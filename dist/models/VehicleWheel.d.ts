import { Vehicle } from './Vehicle';
export declare class VehicleWheel {
    private owner;
    private index;
    constructor(owner: Vehicle, index: number);
    get Index(): number;
    set Index(index: number);
    get Vehicle(): Vehicle;
    burst(): void;
    fix(): void;
}
//# sourceMappingURL=VehicleWheel.d.ts.map