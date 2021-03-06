"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ped = void 0;
const __1 = require("../");
const enums_1 = require("../enums");
const _1 = require("./");
class Ped extends _1.Entity {
    constructor(handle) {
        super(handle);
        this.speechModifierNames = [
            'SPEECH_PARAMS_STANDARD',
            'SPEECH_PARAMS_ALLOW_REPEAT',
            'SPEECH_PARAMS_BEAT',
            'SPEECH_PARAMS_FORCE',
            'SPEECH_PARAMS_FORCE_FRONTEND',
            'SPEECH_PARAMS_FORCE_NO_REPEAT_FRONTEND',
            'SPEECH_PARAMS_FORCE_NORMAL',
            'SPEECH_PARAMS_FORCE_NORMAL_CLEAR',
            'SPEECH_PARAMS_FORCE_NORMAL_CRITICAL',
            'SPEECH_PARAMS_FORCE_SHOUTED',
            'SPEECH_PARAMS_FORCE_SHOUTED_CLEAR',
            'SPEECH_PARAMS_FORCE_SHOUTED_CRITICAL',
            'SPEECH_PARAMS_FORCE_PRELOAD_ONLY',
            'SPEECH_PARAMS_MEGAPHONE',
            'SPEECH_PARAMS_HELI',
            'SPEECH_PARAMS_FORCE_MEGAPHONE',
            'SPEECH_PARAMS_FORCE_HELI',
            'SPEECH_PARAMS_INTERRUPT',
            'SPEECH_PARAMS_INTERRUPT_SHOUTED',
            'SPEECH_PARAMS_INTERRUPT_SHOUTED_CLEAR',
            'SPEECH_PARAMS_INTERRUPT_SHOUTED_CRITICAL',
            'SPEECH_PARAMS_INTERRUPT_NO_FORCE',
            'SPEECH_PARAMS_INTERRUPT_FRONTEND',
            'SPEECH_PARAMS_INTERRUPT_NO_FORCE_FRONTEND',
            'SPEECH_PARAMS_ADD_BLIP',
            'SPEECH_PARAMS_ADD_BLIP_ALLOW_REPEAT',
            'SPEECH_PARAMS_ADD_BLIP_FORCE',
            'SPEECH_PARAMS_ADD_BLIP_SHOUTED',
            'SPEECH_PARAMS_ADD_BLIP_SHOUTED_FORCE',
            'SPEECH_PARAMS_ADD_BLIP_INTERRUPT',
            'SPEECH_PARAMS_ADD_BLIP_INTERRUPT_FORCE',
            'SPEECH_PARAMS_FORCE_PRELOAD_ONLY_SHOUTED',
            'SPEECH_PARAMS_FORCE_PRELOAD_ONLY_SHOUTED_CLEAR',
            'SPEECH_PARAMS_FORCE_PRELOAD_ONLY_SHOUTED_CRITICAL',
            'SPEECH_PARAMS_SHOUTED',
            'SPEECH_PARAMS_SHOUTED_CLEAR',
            'SPEECH_PARAMS_SHOUTED_CRITICAL',
        ];
    }
    static exists(ped) {
        return typeof ped !== 'undefined' && ped.exists();
    }
    get Health() {
        return super.Health - 100;
    }
    set Health(amount) {
        super.Health = amount + 100;
    }
    get MaxHealth() {
        return super.MaxHealth - 100;
    }
    set MaxHealth(amount) {
        super.MaxHealth = amount + 100;
    }
    get CurrentVehicle() {
        const veh = new _1.Vehicle(GetVehiclePedIsIn(this.handle, false));
        return veh.exists() ? veh : undefined;
    }
    get LastVehicle() {
        const veh = new _1.Vehicle(GetVehiclePedIsIn(this.handle, true));
        return veh.exists() ? veh : undefined;
    }
    get VehicleTryingToEnter() {
        const veh = new _1.Vehicle(GetVehiclePedIsTryingToEnter(this.handle));
        return veh.exists() ? veh : undefined;
    }
    get IsJumpingOutOfVehicle() {
        return !!IsPedJumpingOutOfVehicle(this.handle);
    }
    set StaysInVehicleWhenJacked(value) {
        SetPedStayInVehicleWhenJacked(this.handle, value);
    }
    set MaxDrivingSpeed(value) {
        SetDriveTaskMaxCruiseSpeed(this.handle, value);
    }
    get IsHuman() {
        return !!IsPedHuman(this.handle);
    }
    set IsEnemy(value) {
        SetPedAsEnemy(this.handle, value);
    }
    set IsPriorityTargetForEnemies(value) {
        SetEntityIsTargetPriority(this.handle, value, 0);
    }
    get IsPlayer() {
        return !!IsPedAPlayer(this.handle);
    }
    get IsCuffed() {
        return !!IsPedCuffed(this.handle);
    }
    get IsWearingHelmet() {
        return !!IsPedWearingHelmet(this.handle);
    }
    get IsRagdoll() {
        return !!IsPedRagdoll(this.handle);
    }
    get IsIdle() {
        return (!this.IsInjured &&
            !this.IsRagdoll &&
            !this.IsInAir &&
            !this.IsOnFire &&
            !this.IsDucking &&
            !this.IsGettingIntoAVehicle &&
            !this.IsInCombat &&
            !this.IsInMeleeCombat &&
            (!this.isInAnyVehicle() || this.isSittingInAnyVehicle()));
    }
    get IsProne() {
        return !!IsPedProne(this.handle);
    }
    set IsDucking(value) {
        SetPedDucking(this.handle, value);
    }
    get IsDucking() {
        return !!IsPedDucking(this.handle);
    }
    get IsGettingUp() {
        return !!IsPedGettingUp(this.handle);
    }
    get IsClimbing() {
        return !!IsPedClimbing(this.handle);
    }
    get IsJumping() {
        return !!IsPedJumping(this.handle);
    }
    get IsFalling() {
        return !!IsPedFalling(this.handle);
    }
    get IsStopped() {
        return !!IsPedStopped(this.handle);
    }
    get IsWalking() {
        return !!IsPedWalking(this.handle);
    }
    get IsRunning() {
        return !!IsPedRunning(this.handle);
    }
    get IsSprinting() {
        return !!IsPedSprinting(this.handle);
    }
    get IsDiving() {
        return !!IsPedDiving(this.handle);
    }
    get IsInParachuteFreeFall() {
        return !!IsPedInParachuteFreeFall(this.handle);
    }
    get IsSwimming() {
        return !!IsPedSwimming(this.handle);
    }
    get IsSwimmingUnderWater() {
        return !!IsPedSwimmingUnderWater(this.handle);
    }
    get IsVaulting() {
        return !!IsPedVaulting(this.handle);
    }
    get IsOnBike() {
        return !!IsPedOnAnyBike(this.handle);
    }
    get IsOnFoot() {
        return !!IsPedOnFoot(this.handle);
    }
    get IsInSub() {
        return !!IsPedInAnySub(this.handle);
    }
    get IsInTaxi() {
        return !!IsPedInAnyTaxi(this.handle);
    }
    get IsInTrain() {
        return !!IsPedInAnyTrain(this.handle);
    }
    get IsInHeli() {
        return !!IsPedInAnyHeli(this.handle);
    }
    get IsInPlane() {
        return !!IsPedInAnyPlane(this.handle);
    }
    get IsInFlyingVehicle() {
        return !!IsPedInFlyingVehicle(this.handle);
    }
    get IsInBoat() {
        return !!IsPedInAnyBoat(this.handle);
    }
    get IsInPoliceVehicle() {
        return !!IsPedInAnyPoliceVehicle(this.handle);
    }
    get IsJacking() {
        return !!IsPedJacking(this.handle);
    }
    get IsBeingJacked() {
        return !!IsPedBeingJacked(this.handle);
    }
    get IsGettingIntoAVehicle() {
        return !!IsPedGettingIntoAVehicle(this.handle);
    }
    get IsTryingToEnterALockedVehicle() {
        return !!IsPedTryingToEnterALockedVehicle(this.handle);
    }
    get IsInjured() {
        return !!IsPedInjured(this.handle);
    }
    get IsFleeing() {
        return !!IsPedFleeing(this.handle);
    }
    get IsInCombat() {
        return !!IsPedInCombat(this.handle, PlayerPedId());
    }
    get IsInMeleeCombat() {
        return !!IsPedInMeleeCombat(this.handle);
    }
    get IsInStealthMode() {
        return !!GetPedStealthMovement(this.handle);
    }
    get IsAmbientSpeechPlaying() {
        return !!IsAmbientSpeechPlaying(this.handle);
    }
    get IsScriptedSpeechPlaying() {
        return !!IsScriptedSpeechPlaying(this.handle);
    }
    get IsAnySpeechPlaying() {
        return !!IsAnySpeechPlaying(this.handle);
    }
    get IsAmbientSpeechEnabled() {
        return !IsAmbientSpeechDisabled(this.handle);
    }
    set IsPainAudioEnabled(value) {
        DisablePedPainAudio(this.handle, !value);
    }
    get IsPlantingBomb() {
        return !!IsPedPlantingBomb(this.handle);
    }
    get IsShooting() {
        return !!IsPedShooting(this.handle);
    }
    get IsReloading() {
        return !!IsPedReloading(this.handle);
    }
    get IsDoingDriveby() {
        return !!IsPedDoingDriveby(this.handle);
    }
    get IsGoingIntoCover() {
        return !!IsPedGoingIntoCover(this.handle);
    }
    get IsBeingStunned() {
        return !!IsPedBeingStunned(this.handle, 0);
    }
    get IsBeingStealthKilled() {
        return !!IsPedBeingStealthKilled(this.handle);
    }
    get IsPerformingStealthKill() {
        return !!IsPedPerformingStealthKill(this.handle);
    }
    get IsAimingFromCover() {
        return !!IsPedAimingFromCover(this.handle);
    }
    get SelectedWeapon() {
        return GetSelectedPedWeapon(this.handle);
    }
    getAmmoInWeapon(weaponHash) {
        return GetAmmoInPedWeapon(this.handle, weaponHash);
    }
    getAmmoInClip(weaponHash, ammo) {
        return GetAmmoInClip(this.handle, weaponHash, ammo);
    }
    isInCover(expectUseWeapon = false) {
        return !!IsPedInCover(this.handle, expectUseWeapon);
    }
    get IsInCoverFacingLeft() {
        return !!IsPedInCoverFacingLeft(this.handle);
    }
    set FiringPattern(value) {
        SetPedFiringPattern(this.handle, value);
    }
    set DropsWeaponsOnDeath(value) {
        SetPedDropsWeaponsWhenDead(this.handle, value);
    }
    set DrivingSpeed(value) {
        SetDriveTaskCruiseSpeed(this.handle, value);
    }
    set DrivingStyle(style) {
        SetDriveTaskDrivingStyle(this.handle, Number(style));
    }
    isInAnyVehicle() {
        return !!IsPedInAnyVehicle(this.handle, false);
    }
    isInVehicle(vehicle) {
        return !!IsPedInVehicle(this.handle, vehicle.Handle, false);
    }
    isSittingInAnyVehicle() {
        return !!IsPedSittingInAnyVehicle(this.handle);
    }
    isSittingInVehicle(vehicle) {
        return !!IsPedSittingInVehicle(this.handle, vehicle.Handle);
    }
    setIntoVehicle(vehicle, seat) {
        SetPedIntoVehicle(this.handle, vehicle.Handle, Number(seat));
    }
    isHeadtracking(entity) {
        return !!IsPedHeadtrackingEntity(this.handle, entity.Handle);
    }
    isInCombatAgainst(target) {
        return !!IsPedInCombat(this.handle, target.Handle);
    }
    getJacker() {
        return new Ped(GetPedsJacker(this.handle));
    }
    getJackTarget() {
        return new Ped(GetJackTarget(this.handle));
    }
    getMeleeTarget() {
        return new Ped(GetMeleeTargetForPed(this.handle));
    }
    getKiller() {
        return _1.Entity.fromHandle(GetPedSourceOfDeath(this.handle));
    }
    kill() {
        this.Health = -1;
    }
    resurrect() {
        const maxHealth = this.Health;
        const isCollisionEnabled = super.IsCollisionEnabled;
        ResurrectPed(this.handle);
        this.MaxHealth = maxHealth;
        this.Health = maxHealth;
        super.IsCollisionEnabled = isCollisionEnabled;
        ClearPedTasksImmediately(this.handle);
    }
    resetVisibleDamage() {
        ResetPedVisibleDamage(this.handle);
    }
    clearBloodDamage() {
        ClearPedBloodDamage(this.handle);
    }
    // TODO: Add RelationshipGroup
    get IsInGroup() {
        return !!IsPedInGroup(this.handle);
    }
    set NeverLeavesGroup(value) {
        SetPedNeverLeavesGroup(this.handle, value);
    }
    leaveGroup() {
        RemovePedFromGroup(this.handle);
    }
    playAmbientSpeed(speechName, voiceName = '', modifier = enums_1.SpeechModifier.Standard) {
        if (Number(modifier) >= 0 && Number(modifier) < this.speechModifierNames.length) {
            if (voiceName === '') {
                PlayAmbientSpeech1(this.handle, speechName, this.speechModifierNames[Number(modifier)]);
            }
            else {
                PlayAmbientSpeechWithVoice(this.handle, speechName, voiceName, this.speechModifierNames[Number(modifier)], false);
            }
        }
        else {
            throw new RangeError('modifier');
        }
    }
    applyDamage(damageAmount) {
        ApplyDamageToPed(this.handle, damageAmount, true);
    }
    hasBeenDamagedByWeapon(weapon) {
        return !!HasPedBeenDamagedByWeapon(this.handle, Number(weapon), 0);
    }
    hasBeenDamagedByAnyWeapon() {
        return !!HasPedBeenDamagedByWeapon(this.handle, 0, 2);
    }
    hasBeenDamagedByAnyMeleeWeapon() {
        return !!HasPedBeenDamagedByWeapon(this.handle, 0, 1);
    }
    clearLastWeaponDamage() {
        ClearPedLastWeaponDamage(this.handle);
    }
    get Bones() {
        if (!this.pedBones) {
            this.pedBones = new _1.PedBoneCollection(this);
        }
        return this.pedBones;
    }
    giveWeapon(weapon, ammoCount = 999, isHidden = false, equipNow = true) {
        GiveWeaponToPed(this.handle, weapon, ammoCount, isHidden, equipNow);
    }
    removeWeapon(weapon) {
        RemoveWeaponFromPed(this.handle, weapon);
    }
    removeAllWeapons() {
        RemoveAllPedWeapons(this.handle, true);
    }
    getLastWeaponImpactPosition() {
        const position = GetPedLastWeaponImpactCoord(this.handle);
        return new __1.Vector3(position[0], position[1][0], position[1][1]); // Does this work?
    }
    get CanRagdoll() {
        return !!CanPedRagdoll(this.handle);
    }
    set CanRagdoll(value) {
        SetPedCanRagdoll(this.handle, value);
    }
    ragdoll(duration = -1, ragdollType = enums_1.RagdollType.Normal) {
        this.CanRagdoll = true;
        SetPedToRagdoll(this.handle, duration, duration, Number(ragdollType), false, false, false);
    }
    cancelRagdoll() {
        SetPedToRagdoll(this.handle, 1, 1, 1, false, false, false);
    }
    giveHelmet(canBeRemovedByPed, helmetType, textureIndex) {
        GivePedHelmet(this.handle, !canBeRemovedByPed, Number(helmetType), textureIndex);
    }
    removeHelmet(instantly) {
        RemovePedHelmet(this.handle, instantly);
    }
    openParachute() {
        ForcePedToOpenParachute(this.handle);
    }
    getConfigFlag(flagId) {
        return !!GetPedConfigFlag(this.handle, flagId, true);
    }
    setConfigFlag(flagId, value) {
        SetPedConfigFlag(this.handle, flagId, value);
    }
    resetConfigFlag(flagId) {
        SetPedResetFlag(this.handle, flagId, true);
    }
    clone(heading) {
        return new Ped(ClonePed(this.handle, heading, false, false));
    }
    exists(ped) {
        if (!ped) {
            return super.exists() && GetEntityType(this.handle) === 1;
        }
        return ped.exists();
    }
}
exports.Ped = Ped;
