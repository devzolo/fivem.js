import { Vehicle } from './Vehicle';

export class VehicleWheel {
  constructor(private owner: Vehicle, private index: number) {}

  public get Index(): number {
    return this.index;
  }

  public set Index(index: number) {
    this.index = index;
  }

  public get Vehicle(): Vehicle {
    return this.owner;
  }

  public burst(): void {
    SetVehicleTyreBurst(this.owner.Handle, this.Index, true, 1000);
  }

  public fix(): void {
    SetVehicleTyreFixed(this.owner.Handle, this.Index);
  }
}
