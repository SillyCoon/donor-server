import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: 'true'
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}
