import { Entity, model, property, hasMany } from '@loopback/repository';
import { DonorInfo } from '.';

@model()
export class Citizenship extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @hasMany(() => DonorInfo)
  donors?: DonorInfo[];

  constructor(data?: Partial<Citizenship>) {
    super(data);
  }
}
