import { Screen, Text } from '../../';
import { Alignment, Font } from '../../../enums';
import { Color, Point, Size } from '../../../utils';

export class ResText extends Text {
  public textAlignment: Alignment = Alignment.Left;
  public dropShadow: boolean = false;
  public outline: boolean = false;
  public wordWrap: Size | undefined;

  constructor(caption: string, pos: Point, scale: number, color?: Color, font?: Font, justify?: Alignment) {
    super(caption, pos, scale, color || new Color(255, 255, 255, 255), font || 0, Alignment.Left);
    if (justify) {
      this.textAlignment = justify;
    }
  }

  public draw(offset?: Size): void;
  public draw(caption: string, pos: Point, scale: number, color: Color, font: Font, arg2: boolean): void;
  public draw(
    arg1?,
    pos?,
    scale?,
    color: Color = new Color(255, 255, 255, 255),
    font?: Font,
    arg2?,
    dropShadow?: boolean,
    outline?: boolean,
    wordWrap?,
  ): void {
    let caption = arg1;
    let centered = arg2;
    let textAlignment = arg2;
    if (!arg1) {
      arg1 = new Size(0, 0);
    }
    if (arg1 && !pos) {
      textAlignment = this.textAlignment;
      caption = this.caption;
      pos = new Point(this.pos.X + arg1.Width, this.pos.Y + arg1.Height);
      scale = this.scale;
      color = this.color;
      font = this.font;
      if (centered === true || centered === false) {
        centered = this.alignment === Alignment.Centered;
      } else {
        centered = undefined;
        dropShadow = this.dropShadow;
        outline = this.outline;
        wordWrap = this.wordWrap;
      }
    }

    const height = Screen.Height;
    const width = Screen.ScaledWidth;

    const x = this.pos.X / width;
    const y = this.pos.Y / height;

    SetTextFont(Number(font));
    SetTextScale(1.0, scale);
    SetTextColour(color.r, color.g, color.b, color.a);

    if (centered !== undefined) {
      SetTextCentre(centered);
    } else {
      if (dropShadow) {
        SetTextDropshadow(2, 0, 0, 0, 0);
      }

      if (outline) {
        SetTextOutline();
      }

      switch (textAlignment) {
        case Alignment.Centered:
          SetTextCentre(true);
          break;
        case Alignment.Right:
          SetTextRightJustify(true);
          SetTextWrap(0.0, x);
          break;
      }

      if (wordWrap) {
        const xsize = (this.pos.X + wordWrap.Width) / width;
        SetTextWrap(x, xsize);
      }
    }

    SetTextEntry('STRING');
    Text.addLongString(caption);
    DrawText(x, y);
  }
}
