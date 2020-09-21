import { Color, Point, Size } from '../utils';
export declare class Sprite {
    textureName: string;
    pos: Point;
    size: Size;
    heading: number;
    color: Color;
    visible: boolean;
    private textureDict;
    constructor(textureDict: string, textureName: string, pos: Point, size: Size, heading?: number, color?: Color);
    loadTextureDictionary(): void;
    set TextureDict(v: string);
    get TextureDict(): string;
    get IsTextureDictionaryLoaded(): boolean;
    draw(textureDictionary?: string, textureName?: string, pos?: Point, size?: Size, heading?: number, color?: Color, loadTexture?: boolean): void;
}
//# sourceMappingURL=Sprite.d.ts.map