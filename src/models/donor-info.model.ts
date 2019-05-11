import { Citizenship } from './citizenship.model';
import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Weight } from './weight.model';

@model({
  settings: {
    foreignKeys: {
      weightId: {
        name: "weightId",
        foreignKey: "weightId",
        entityKey: "id",
        entity: "Weight"
      },
      citizenshipId: {
        name: "citizenshipId",
        foreignKey: "citizenshipId",
        entityKey: "id",
        entity: "Citizenship"
      }
    }
  }
})
export class DonorInfo extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true
  })
  email: string;

  @property({
    type: 'string',
    required: true
  })
  password: string;

  @property({
    name: 'first_name',
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    name: 'last_name',
    type: 'string',
    required: true,
  })
  last_name: string;

  @property({
    type: 'string',
  })
  patronymic?: string;

  @property({
    type: 'string',
    required: true
  })
  phone: string;

  @property({
    type: 'string',
    required: false
  })
  vk: string;

  @belongsTo(() => Weight)
  weightId: number;

  @belongsTo(() => Citizenship)
  citizenshipId: number;

  constructor(data?: Partial<DonorInfo>) {
    super(data);
  }
}
