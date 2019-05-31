import { DonationTime } from './donation-time.model';
import { Entity, model, property, hasMany } from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'donation_point'
    }
  },
})
export class DonationPoint extends Entity {

  @property({
    id: true,
    required: false,
    generated: true
  })
  id?: number;

  @property({
    required: true
  })
  name: string

  @property({
    required: false
  })
  description: string

  @hasMany(() => DonationTime, { keyTo: 'pointId' })
  times: DonationTime[]

  constructor(data?: Partial<DonationPoint>) {
    super(data);
  }
}
