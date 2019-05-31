import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'donation_status'
    }
  },
})
export class DonationStatus extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    required: true
  })
  name: string;

  @property({
    required: false
  })
  description: string;

  constructor(data?: Partial<DonationStatus>) {
    super(data);
  }
}
