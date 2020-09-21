import { HudColor, NotificationType } from '../enums';
import { Color, PointF, Vector3 } from '../utils';
import { Notification } from './';
export declare abstract class Screen {
    static get Width(): number;
    static get Height(): number;
    static get AspectRatio(): number;
    static get ScaledWidth(): number;
    static showSubtitle(message: string, duration?: number): void;
    static displayHelpTextThisFrame(message: string): void;
    static showNotification(message: string, blinking?: boolean): Notification;
    static showAdvancedNotification(message: string, title: string, subtitle: string, iconSet: string, icon: string, bgColor?: HudColor, flashColor?: Color, blinking?: boolean, type?: NotificationType, showInBrief?: boolean, sound?: boolean): Notification;
    static worldToScreen(position: Vector3, scaleWidth?: boolean): PointF;
}
//# sourceMappingURL=Screen.d.ts.map