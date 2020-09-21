import { Vehicle } from './Vehicle';
import { VehicleDoorIndex } from '../enums';

export class VehicleDoor {
  constructor(private owner: Vehicle, private index: VehicleDoorIndex) {}

  public get Index(): VehicleDoorIndex {
    return this.index;
  }

  public set Index(index: VehicleDoorIndex) {
    this.index = index;
  }

  public get AngleRatio(): number {
    return GetVehicleDoorAngleRatio(this.owner.Handle, this.Index);
  }

  public set AngleRatio(value: number) {
    SetVehicleDoorControl(this.owner.Handle, this.Index, 1, value);
  }

  public set CanBeBroken(value: boolean) {
    SetVehicleDoorBreakable(this.owner.Handle, this.Index, value);
  }

  public get IsOpen(): boolean {
    return this.AngleRatio > 0;
  }

  public get IsFullyOpen(): boolean {
    return !!IsVehicleDoorFullyOpen(this.owner.Handle, this.Index);
  }

  public get IsBroken(): boolean {
    return !!IsVehicleDoorDamaged(this.owner.Handle, this.Index);
  }

  public get Vehicle(): Vehicle {
    return this.owner;
  }

  public open(loose = false, instantly = false): void {
    SetVehicleDoorOpen(this.owner.Handle, this.Index, loose, instantly);
  }

  public close(instantly = false): void {
    SetVehicleDoorShut(this.owner.Handle, this.Index, instantly);
  }

  public break(stayInTheWorld = true): void {
    SetVehicleDoorBroken(this.owner.Handle, this.Index, stayInTheWorld);
  }
}
