import { AudioFlag } from './enums';
import { Entity } from './models';
import { Vector3 } from './utils';

export abstract class Audio {
  public static playSoundAt(position: Vector3, sound: string, set = ''): number {
    PlaySoundFromCoord(-1, sound, position.x, position.y, position.z, set, false, 0, false);
    return GetSoundId();
  }

  public static playSoundFromEntity(entity: Entity, sound: string, set = ''): number {
    PlaySoundFromEntity(-1, sound, entity.Handle, set, false, 0);
    return GetSoundId();
  }

  public static playSoundFrontEnd(sound: string, set = ''): number {
    PlaySoundFrontend(-1, sound, set, false);
    return GetSoundId();
  }

  public static stopSound(soundId: number): void {
    StopSound(soundId);
  }

  public static releaseSound(soundId: number): void {
    ReleaseSoundId(soundId);
  }

  public static hasSoundFinished(soundId: number): boolean {
    return !!HasSoundFinished(soundId);
  }

  public static setAudioFlag(flag: string | AudioFlag, toggle: boolean): void {
    if (typeof flag === 'string') {
      SetAudioFlag(flag, toggle);
    } else {
      SetAudioFlag(this.audioFlags[Number(flag)], toggle);
    }
  }

  public static playSound(soundFile: string, soundSet: string): void {
    this.releaseSound(this.playSoundFrontEnd(soundFile, soundSet));
  }

  public static playMusic(musicFile: string): void {
    if (this.cachedMusicFile !== null) {
      CancelMusicEvent(musicFile);
    }
    this.cachedMusicFile = musicFile;
    TriggerMusicEvent(musicFile);
  }

  public static stopMusic(musicFile = ''): void {
    if (!musicFile) {
      if (this.cachedMusicFile) {
        CancelMusicEvent(this.cachedMusicFile);
        this.cachedMusicFile = '';
      }
    } else {
      CancelMusicEvent(musicFile);
    }
  }

  protected static cachedMusicFile = '';

  private static readonly audioFlags: string[] = [
    'ActivateSwitchWheelAudio',
    'AllowCutsceneOverScreenFade',
    'AllowForceRadioAfterRetune',
    'AllowPainAndAmbientSpeechToPlayDuringCutscene',
    'AllowPlayerAIOnMission',
    'AllowPoliceScannerWhenPlayerHasNoControl',
    'AllowRadioDuringSwitch',
    'AllowRadioOverScreenFade',
    'AllowScoreAndRadio',
    'AllowScriptedSpeechInSlowMo',
    'AvoidMissionCompleteDelay',
    'DisableAbortConversationForDeathAndInjury',
    'DisableAbortConversationForRagdoll',
    'DisableBarks',
    'DisableFlightMusic',
    'DisableReplayScriptStreamRecording',
    'EnableHeadsetBeep',
    'ForceConversationInterrupt',
    'ForceSeamlessRadioSwitch',
    'ForceSniperAudio',
    'FrontendRadioDisabled',
    'HoldMissionCompleteWhenPrepared',
    'IsDirectorModeActive',
    'IsPlayerOnMissionForSpeech',
    'ListenerReverbDisabled',
    'LoadMPData',
    'MobileRadioInGame',
    'OnlyAllowScriptTriggerPoliceScanner',
    'PlayMenuMusic',
    'PoliceScannerDisabled',
    'ScriptedConvListenerMaySpeak',
    'SpeechDucksScore',
    'SuppressPlayerScubaBreathing',
    'WantedMusicDisabled',
    'WantedMusicOnMission',
  ];
}
