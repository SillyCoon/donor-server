import { DonationTime } from './donation-time.model';
import { User } from './user.model';
import { Entity, model, property, belongsTo } from '@loopback/repository';
import { DonationStatus } from './donation-status.model';

@model({
  settings: {
    mysql: {
      table: 'donor_time'
    }
  },
})
export class DonorTime extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true
  })
  id?: number;

  @belongsTo(() => User, { keyTo: 'id' })
  donorId: number;

  @belongsTo(() => DonationTime, { keyTo: 'id' })
  donationTimeId: number

  @belongsTo(() => DonationStatus, { keyTo: 'id' })
  statusId?: number;

  constructor(data?: Partial<DonorTime>) {
    super(data);
  }
}
