import { Audio } from '../Audio';
import { HudColor, NotificationType } from '../enums';
import { Color, PointF, stringToArray, Vector3 } from '../utils';
import { Notification } from './';

export abstract class Screen {
  public static get Width(): number {
    return GetScreenActiveResolution()[0];
  }

  public static get Height(): number {
    return GetScreenActiveResolution()[1];
  }

  public static get AspectRatio(): number {
    return GetAspectRatio(false);
  }

  public static get ScaledWidth(): number {
    return this.Height * this.AspectRatio;
  }

  public static showSubtitle(message: string, duration = 2500): void {
    const strings: string[] = stringToArray(message);

    BeginTextCommandPrint('CELL_EMAIL_BCON');

    strings.forEach((element) => {
      AddTextComponentSubstringPlayerName(element);
    });

    EndTextCommandPrint(duration, true);
  }

  public static displayHelpTextThisFrame(message: string): void {
    const strings: string[] = stringToArray(message);

    BeginTextCommandDisplayHelp('CELL_EMAIL_BCON');

    strings.forEach((element) => {
      AddTextComponentSubstringPlayerName(element);
    });

    EndTextCommandDisplayHelp(0, false, false, -1);
  }

  public static showNotification(message: string, blinking = false): Notification {
    const strings: string[] = stringToArray(message);

    SetNotificationTextEntry('CELL_EMAIL_BCON');

    strings.forEach((element) => {
      AddTextComponentSubstringPlayerName(element);
    });

    return new Notification(DrawNotification(blinking, true));
  }

  public static showAdvancedNotification(
    message: string,
    title: string,
    subtitle: string,
    iconSet: string,
    icon: string,
    bgColor: HudColor = HudColor.NONE,
    flashColor: Color = Color.empty,
    blinking = false,
    type: NotificationType = NotificationType.Default,
    showInBrief = true,
    sound = true,
  ): Notification {
    const strings: string[] = stringToArray(message);

    SetNotificationTextEntry('CELL_EMAIL_BCON');

    strings.forEach((element) => {
      AddTextComponentSubstringPlayerName(element);
    });

    if (bgColor !== HudColor.NONE) {
      SetNotificationBackgroundColor(Number(bgColor));
    }

    if (flashColor !== Color.empty && blinking) {
      SetNotificationFlashColor(flashColor.r, flashColor.g, flashColor.b, flashColor.a);
    }

    if (sound) {
      Audio.playSoundFrontEnd('DELETE', 'HUD_DEATHMATCH_SOUNDSET');
    }

    SetNotificationMessage(iconSet, icon, true, Number(type), title, subtitle);
    return new Notification(DrawNotification(blinking, showInBrief));
  }

  public static worldToScreen(position: Vector3, scaleWidth = false): PointF {
    const coords = GetScreenCoordFromWorldCoord(position.x, position.y, position.z);
    return new PointF(coords[0] * (scaleWidth ? this.ScaledWidth : this.Width), coords[1] * this.Height, coords[2]);
  }
}
