import { Ped } from './';
export declare class Player {
    private pvp;
    get Handle(): number;
    get Character(): Ped;
    get Name(): string;
    get PvPEnabled(): boolean;
    set PvPEnabled(value: boolean);
    private handle;
    private ped;
    constructor(handle: number, pvp?: boolean);
}
//# sourceMappingURL=Player.d.ts.map