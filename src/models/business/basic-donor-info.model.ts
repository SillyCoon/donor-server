import { Model, model, property } from '@loopback/repository';

@model()
export class BasicDonorInfo extends Model {

  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  email: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  password: string;
  phone: string;
  vk: string;
  weightId: number;
  citizenshipId: number;

  constructor(data?: Partial<BasicDonorInfo>) {
    super(data);
  }
}
