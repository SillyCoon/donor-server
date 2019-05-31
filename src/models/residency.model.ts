import { Entity, model, property, hasMany } from '@loopback/repository';
import { DonorInfo } from '.';

@model({ settings: {} })
export class Residency extends Entity {

  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  constructor(data?: Partial<Residency>) {
    super(data);
  }
}
