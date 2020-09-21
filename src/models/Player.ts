import { Ped } from './';

export class Player {
  public get Handle(): number {
    return this.handle;
  }

  public get Character(): Ped {
    const handle = GetPlayerPed(this.handle);

    if (!this.ped || handle !== this.ped.Handle) {
      this.ped = new Ped(handle);
    }

    return this.ped;
  }

  public get Name(): string {
    return GetPlayerName(this.handle);
  }

  public get PvPEnabled(): boolean {
    return this.pvp;
  }

  public set PvPEnabled(value: boolean) {
    NetworkSetFriendlyFireOption(value);
    SetCanAttackFriendly(this.Character.Handle, value, value);
    this.pvp = value;
  }

  private handle: number;
  private ped: Ped | undefined;

  constructor(handle: number, private pvp: boolean = true) {
    this.handle = handle;
    this.PvPEnabled = pvp;
  }
}
