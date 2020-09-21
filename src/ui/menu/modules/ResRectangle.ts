import { Rectangle, Screen } from '../..';
import { Color, Point, Size } from '../../../utils';

export class ResRectangle extends Rectangle {
  constructor(pos: any, size: any, color: Color) {
    super(pos, size, color);
  }

  public draw(offset?: any): void;

  public draw(pos: any, size: any, color: Color): void;

  public draw(pos?: any, size?: any, color?: Color): void {
    if (!pos) {
      pos = new Size();
    }
    if (pos && !size && !color) {
      pos = new Point(this.pos.X + pos.width, this.pos.Y + pos.height);
      size = this.size;
      color = this.color;
    }

    const height = Screen.Height;
    const width = Screen.ScaledWidth;

    const w = size.width / width;
    const h = size.height / height;
    const x = pos.X / width + w * 0.5;
    const y = pos.Y / height + h * 0.5;

    DrawRect(x, y, w, h, color?.r ?? 255, color?.g ?? 255, color?.b ?? 255, color?.a ?? 255);
  }
}
