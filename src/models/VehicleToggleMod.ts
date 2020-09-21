import { Vehicle } from './Vehicle';
import { VehicleToggleModType } from '../enums';

export class VehicleToggleMod {
  constructor(private owner: Vehicle, private modType: VehicleToggleModType) {}

  public get ModType(): VehicleToggleModType {
    return this.modType;
  }

  public set ModType(modType: VehicleToggleModType) {
    this.modType = modType;
  }

  public get IsInstalled(): boolean {
    return !!IsToggleModOn(this.owner.Handle, this.ModType);
  }

  public set IsInstalled(value: boolean) {
    ToggleVehicleMod(this.owner.Handle, this.ModType, value);
  }

  public get LocalizedModTypeName(): string {
    return GetModSlotName(this.owner.Handle, this.ModType);
  }

  public get Vehicle(): Vehicle {
    return this.owner;
  }

  public remove(): void {
    RemoveVehicleMod(this.owner.Handle, this.ModType);
  }
}
