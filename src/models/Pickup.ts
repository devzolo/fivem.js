import { PickupHash } from '../hashes/PickupHash';

export class Pickup {
  public static getWeaponTypeFromPickupType(pickupHash: PickupHash) {
    return GetWeaponTypeFromPickupType(pickupHash);
  }

  private hash: number = 0;

  public constructor(private handle: number) {}

  public exists(): boolean {
    return DoesEntityExist(this.handle) ? true : false;
  }

  public remove(): void {
    RemovePickup(this.handle);
  }

  public setRegenerationTime(duration: number) {
    SetPickupRegenerationTime(this.handle, duration);
  }

  public get Exist() {
    return this.exists();
  }

  public getWeaponType() {
    return Pickup.getWeaponTypeFromPickupType(this.hash);
  }
}
