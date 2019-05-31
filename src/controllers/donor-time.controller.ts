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
import { DonorTime } from '../models';
import { DonorTimeRepository } from '../repositories';

export class DonorTimeController {
  constructor(
    @repository(DonorTimeRepository)
    public donorTimeRepository: DonorTimeRepository,
  ) { }

  @post('/donor-times', {
    responses: {
      '200': {
        description: 'DonorTime model instance',
        content: { 'application/json': { schema: { 'x-ts-type': DonorTime } } },
      },
    },
  })
  async create(@requestBody() donorTime: DonorTime): Promise<DonorTime> {
    if (!donorTime.statusId) {
      donorTime.statusId = 1;
    }
    return await this.donorTimeRepository.create(donorTime);
  }

  @get('/donor-times/count', {
    responses: {
      '200': {
        description: 'DonorTime model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(DonorTime)) where?: Where,
  ): Promise<Count> {
    return await this.donorTimeRepository.count(where);
  }

  @get('/donor-times', {
    responses: {
      '200': {
        description: 'Array of DonorTime model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': DonorTime } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DonorTime)) filter?: Filter,
  ): Promise<DonorTime[]> {
    return await this.donorTimeRepository.find(filter);
  }

  @patch('/donor-times', {
    responses: {
      '200': {
        description: 'DonorTime PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() donorTime: DonorTime,
    @param.query.object('where', getWhereSchemaFor(DonorTime)) where?: Where,
  ): Promise<Count> {
    return await this.donorTimeRepository.updateAll(donorTime, where);
  }

  @get('/donor-times/{id}', {
    responses: {
      '200': {
        description: 'DonorTime model instance',
        content: { 'application/json': { schema: { 'x-ts-type': DonorTime } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<DonorTime> {
    return await this.donorTimeRepository.findById(id);
  }

  @patch('/donor-times/{id}', {
    responses: {
      '204': {
        description: 'DonorTime PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() donorTime: DonorTime,
  ): Promise<void> {
    await this.donorTimeRepository.updateById(id, donorTime);
  }

  @put('/donor-times/{id}', {
    responses: {
      '204': {
        description: 'DonorTime PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() donorTime: DonorTime,
  ): Promise<void> {
    await this.donorTimeRepository.replaceById(id, donorTime);
  }

  @del('/donor-times/{id}', {
    responses: {
      '204': {
        description: 'DonorTime DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.donorTimeRepository.deleteById(id);
  }
}
