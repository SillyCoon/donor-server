import { DonationPoint } from './donation-point.model';
import { Entity, model, property, belongsTo } from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'donation_time'
    }
  },
})
export class DonationTime extends Entity {

  @property({
    id: true,
    required: false,
    generated: true
  })
  id?: number;

  @belongsTo(() => DonationPoint, { keyTo: 'id' })
  pointId: number;

  @property({
    required: true,
  })
  time: Date;

  @property({
    required: true,
  })
  donors_quantity: number

  @property({
    required: false,
    default: false,
    description: 'Остановлена ли регистрация?',
  })
  is_stopped: boolean

  @property({
    required: false,
    default: true,
    description: 'Отображаются на данный момент или нет?',
  })
  is_historical: boolean

  constructor(data?: Partial<DonationTime>) {
    super(data);
  }
}




