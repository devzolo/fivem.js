import { Vector3 } from '../utils';
import { Entity } from './';

export class EntityBone {
  public get Index(): number {
    return this.index;
  }

  public get Owner(): Entity {
    return this.owner;
  }

  public get Position(): Vector3 {
    const coords = GetWorldPositionOfEntityBone(this.owner.Handle, this.index);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  public get IsValid(): boolean {
    return this.owner.exists() && this.index !== -1;
  }

  protected readonly index: number;

  constructor(protected readonly owner: Entity, boneIndex?: number, boneName: string = '') {
    this.owner = owner;
    this.index = boneIndex ? boneIndex : GetEntityBoneIndexByName(this.owner.Handle, boneName);
  }
}
