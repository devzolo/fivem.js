import { Vehicle } from './Vehicle';
import { VehicleWindowIndex } from '../enums';

export class VehicleWindow {
  constructor(private owner: Vehicle, private index: VehicleWindowIndex) {}

  public get Index(): VehicleWindowIndex {
    return this.index;
  }

  public set Index(index: VehicleWindowIndex) {
    this.index = index;
  }

  public get IsIntact(): boolean {
    return !!IsVehicleWindowIntact(this.owner.Handle, this.Index);
  }

  public get Vehicle(): Vehicle {
    return this.owner;
  }

  public repair(): void {
    FixVehicleWindow(this.owner.Handle, this.Index);
  }

  public smash(): void {
    SmashVehicleWindow(this.owner.Handle, this.Index);
  }

  public rollUp(): void {
    RollUpWindow(this.owner.Handle, this.Index);
  }

  public rollDown(): void {
    RollDownWindow(this.owner.Handle, this.Index);
  }

  public remove(): void {
    RemoveVehicleWindow(this.owner.Handle, this.Index);
  }
}
