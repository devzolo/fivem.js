import { Blip } from '../Blip';
import { ForceType } from '../enums';
import { WeaponHash } from '../hashes';
import { Model } from '../Model';
import { Quaternion, Vector3 } from '../utils';
import { EntityBoneCollection, Ped, Prop, Vehicle } from './';
import { EntityBone } from './EntityBone';
export declare class Entity {
    static fromHandle(handle: number): Ped | Vehicle | Prop | undefined;
    static fromNetworkId(networkId: number): Ped | Vehicle | Prop | undefined;
    protected handle: number;
    protected bones: EntityBoneCollection | undefined;
    constructor(handle: number);
    get Handle(): number;
    get NetworkId(): number;
    get Health(): number;
    set Health(amount: number);
    get MaxHealth(): number;
    set MaxHealth(amount: number);
    isDead(): boolean;
    isAlive(): boolean;
    get Model(): Model;
    get Position(): Vector3;
    set Position(position: Vector3);
    set PositionNoOffset(position: Vector3);
    get Rotation(): Vector3;
    set Rotation(rotation: Vector3);
    get Quaternion(): Quaternion;
    set Quaternion(quaternion: Quaternion);
    get Heading(): number;
    set Heading(heading: number);
    set IsPositionFrozen(value: boolean);
    get Velocity(): Vector3;
    set Velocity(velocity: Vector3);
    get RotationVelocity(): Vector3;
    set MaxSpeed(value: number);
    set HasGravity(value: boolean);
    get HeightAboveGround(): number;
    get SubmersionLevel(): number;
    get LodDistance(): number;
    set LodDistance(value: number);
    get IsVisible(): boolean;
    set IsVisible(value: boolean);
    get IsOccluded(): boolean;
    get IsOnScreen(): boolean;
    get IsUpright(): boolean;
    get IsUpsideDown(): boolean;
    get IsInAir(): boolean;
    get IsInWater(): boolean;
    get IsPersistent(): boolean;
    set IsPersistent(value: boolean);
    get IsOnFire(): boolean;
    set IsInvincible(value: boolean);
    set IsOnlyDamagedByPlayer(value: boolean);
    get Opacity(): number;
    set Opacity(value: number);
    resetOpacity(): void;
    get HasCollided(): boolean;
    get IsCollisionEnabled(): boolean;
    set IsCollisionEnabled(value: boolean);
    set IsRecordingCollisions(value: boolean);
    get Bones(): EntityBoneCollection;
    get AttachedBlip(): Blip | undefined;
    attachBlip(): Blip;
    setNoCollision(entity: Entity, toggle: boolean): void;
    hasClearLosToEntity(entity: Entity, traceType?: number): boolean;
    hasClearLosToEntityInFront(entity: Entity): boolean;
    hasBeenDamagedBy(entity: Entity): boolean;
    hasBeenDamagedByWeapon(weapon: WeaponHash): boolean;
    hasBeenDamagedByAnyWeapon(): boolean;
    hasBeenDamagedByAnyMeleeWeapon(): boolean;
    clearLastWeaponDamage(): void;
    isInArea(minBounds: Vector3, maxBounds: Vector3): boolean;
    isInAngledArea(origin: Vector3, edge: Vector3, angle: number): boolean;
    isInRangeOf(position: Vector3, range: number): boolean;
    isNearEntity(entity: Entity, bounds: Vector3): boolean;
    isTouching(entity: Entity): boolean;
    isTouchingModel(model: Model): boolean;
    getOffsetPosition(offset: Vector3): Vector3;
    getPositionOffset(worldCoords: Vector3): Vector3;
    attachTo(entity: Entity, position: Vector3, rotation: Vector3): void;
    attachToBone(entityBone: EntityBone, position: Vector3, rotation: Vector3): void;
    detach(): void;
    isAttached(): boolean;
    isAttachedTo(entity: Entity): boolean;
    getEntityAttachedTo(): Entity | undefined;
    applyForce(direction: Vector3, rotation: Vector3, forceType?: ForceType): void;
    applyForceRelative(direction: Vector3, rotation: Vector3, forceType?: ForceType): void;
    removeAllParticleEffects(): void;
    exists(): boolean;
    delete(): void;
    markAsNoLongerNeeded(): void;
}
//# sourceMappingURL=Entity.d.ts.map