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
import {DonationStatus} from '../models';
import {DonationStatusRepository} from '../repositories';

export class DonationStatusController {
  constructor(
    @repository(DonationStatusRepository)
    public donationStatusRepository : DonationStatusRepository,
  ) {}

  @post('/donation-statuses', {
    responses: {
      '200': {
        description: 'DonationStatus model instance',
        content: {'application/json': {schema: {'x-ts-type': DonationStatus}}},
      },
    },
  })
  async create(@requestBody() donationStatus: DonationStatus): Promise<DonationStatus> {
    return await this.donationStatusRepository.create(donationStatus);
  }

  @get('/donation-statuses/count', {
    responses: {
      '200': {
        description: 'DonationStatus model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(DonationStatus)) where?: Where,
  ): Promise<Count> {
    return await this.donationStatusRepository.count(where);
  }

  @get('/donation-statuses', {
    responses: {
      '200': {
        description: 'Array of DonationStatus model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': DonationStatus}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DonationStatus)) filter?: Filter,
  ): Promise<DonationStatus[]> {
    return await this.donationStatusRepository.find(filter);
  }

  @patch('/donation-statuses', {
    responses: {
      '200': {
        description: 'DonationStatus PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() donationStatus: DonationStatus,
    @param.query.object('where', getWhereSchemaFor(DonationStatus)) where?: Where,
  ): Promise<Count> {
    return await this.donationStatusRepository.updateAll(donationStatus, where);
  }

  @get('/donation-statuses/{id}', {
    responses: {
      '200': {
        description: 'DonationStatus model instance',
        content: {'application/json': {schema: {'x-ts-type': DonationStatus}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<DonationStatus> {
    return await this.donationStatusRepository.findById(id);
  }

  @patch('/donation-statuses/{id}', {
    responses: {
      '204': {
        description: 'DonationStatus PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() donationStatus: DonationStatus,
  ): Promise<void> {
    await this.donationStatusRepository.updateById(id, donationStatus);
  }

  @put('/donation-statuses/{id}', {
    responses: {
      '204': {
        description: 'DonationStatus PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() donationStatus: DonationStatus,
  ): Promise<void> {
    await this.donationStatusRepository.replaceById(id, donationStatus);
  }

  @del('/donation-statuses/{id}', {
    responses: {
      '204': {
        description: 'DonationStatus DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.donationStatusRepository.deleteById(id);
  }
}
