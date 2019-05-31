import { DonationPoint } from './../models/donation-point.model';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { DonationTime } from '../models';
import { DonationTimeRepository } from '../repositories';

export class DonationTimeController {
  constructor(
    @repository(DonationTimeRepository)
    public donationTimeRepository: DonationTimeRepository,
  ) { }

  @post('/donation-times', {
    responses: {
      '200': {
        description: 'DonationTime model instance',
        content: { 'application/json': { schema: { 'x-ts-type': DonationTime } } },
      },
    },
  })
  async create(@requestBody() donationTime: DonationTime): Promise<DonationTime> {
    return await this.donationTimeRepository.create(donationTime);
  }

  @get('/donation-times/count', {
    responses: {
      '200': {
        description: 'DonationTime model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(DonationTime)) where?: Where,
  ): Promise<Count> {
    return await this.donationTimeRepository.count(where);
  }

  @get('/donation-times', {
    responses: {
      '200': {
        description: 'Array of DonationTime model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': DonationTime } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DonationTime)) filter?: Filter,
  ): Promise<DonationTime[]> {
    return await this.donationTimeRepository.find(filter);
  }

  @patch('/donation-times', {
    responses: {
      '200': {
        description: 'DonationTime PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() donationTime: DonationTime,
    @param.query.object('where', getWhereSchemaFor(DonationTime)) where?: Where,
  ): Promise<Count> {
    return await this.donationTimeRepository.updateAll(donationTime, where);
  }

  @get('/donation-times/{id}', {
    responses: {
      '200': {
        description: 'DonationTime model instance',
        content: { 'application/json': { schema: { 'x-ts-type': DonationTime } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<DonationTime> {
    return await this.donationTimeRepository.findById(id);
  }

  @patch('/donation-times/{id}', {
    responses: {
      '204': {
        description: 'DonationTime PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() donationTime: DonationTime,
  ): Promise<void> {
    await this.donationTimeRepository.updateById(id, donationTime);
  }

  @put('/donation-times/{id}', {
    responses: {
      '204': {
        description: 'DonationTime PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() donationTime: DonationTime,
  ): Promise<void> {
    await this.donationTimeRepository.replaceById(id, donationTime);
  }

  @del('/donation-times/{id}', {
    responses: {
      '204': {
        description: 'DonationTime DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.donationTimeRepository.deleteById(id);
  }

  @get('/times/{id}/point')
  async getPoint(
    @param.path.number('id') pointId: typeof DonationTime.prototype.id,
  ): Promise<DonationPoint> {
    return await this.donationTimeRepository.donationPoint(pointId);
  }

  @get('/full-times')
  async getFullTimes(): Promise<DonationPoint> {
    return await this.donationTimeRepository.donationPoint(undefined);



  }
}
