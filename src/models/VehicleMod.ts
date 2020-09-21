import { Vehicle } from './Vehicle';
import { VehicleModType } from '../enums';

export class VehicleMod {
  constructor(private owner: Vehicle, private modType: VehicleModType) {}

  public get ModType(): VehicleModType {
    return this.modType;
  }

  public set ModType(modType: VehicleModType) {
    this.modType = modType;
  }

  public get Index(): number {
    return GetVehicleMod(this.owner.Handle, this.ModType);
  }

  public set Index(value: number) {
    SetVehicleMod(this.owner.Handle, this.ModType, value, this.Variation);
  }

  public get Variation(): boolean {
    return !!GetVehicleModVariation(this.owner.Handle, this.ModType);
  }

  public set Variation(value: boolean) {
    SetVehicleMod(this.owner.Handle, this.ModType, this.Index, value);
  }

  public get ModCount(): number {
    return GetNumVehicleMods(this.owner.Handle, this.ModType);
  }

  public get Vehicle(): Vehicle {
    return this.owner;
  }

  public remove(): void {
    RemoveVehicleMod(this.owner.Handle, this.ModType);
  }
}
