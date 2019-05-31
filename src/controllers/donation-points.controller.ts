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
import {DonationPoint} from '../models';
import {DonationPointRepository} from '../repositories';

export class DonationPointsController {
  constructor(
    @repository(DonationPointRepository)
    public donationPointRepository : DonationPointRepository,
  ) {}

  @post('/donation-points', {
    responses: {
      '200': {
        description: 'DonationPoint model instance',
        content: {'application/json': {schema: {'x-ts-type': DonationPoint}}},
      },
    },
  })
  async create(@requestBody() donationPoint: DonationPoint): Promise<DonationPoint> {
    return await this.donationPointRepository.create(donationPoint);
  }

  @get('/donation-points/count', {
    responses: {
      '200': {
        description: 'DonationPoint model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(DonationPoint)) where?: Where,
  ): Promise<Count> {
    return await this.donationPointRepository.count(where);
  }

  @get('/donation-points', {
    responses: {
      '200': {
        description: 'Array of DonationPoint model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': DonationPoint}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DonationPoint)) filter?: Filter,
  ): Promise<DonationPoint[]> {
    return await this.donationPointRepository.find(filter);
  }

  @patch('/donation-points', {
    responses: {
      '200': {
        description: 'DonationPoint PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() donationPoint: DonationPoint,
    @param.query.object('where', getWhereSchemaFor(DonationPoint)) where?: Where,
  ): Promise<Count> {
    return await this.donationPointRepository.updateAll(donationPoint, where);
  }

  @get('/donation-points/{id}', {
    responses: {
      '200': {
        description: 'DonationPoint model instance',
        content: {'application/json': {schema: {'x-ts-type': DonationPoint}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<DonationPoint> {
    return await this.donationPointRepository.findById(id);
  }

  @patch('/donation-points/{id}', {
    responses: {
      '204': {
        description: 'DonationPoint PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() donationPoint: DonationPoint,
  ): Promise<void> {
    await this.donationPointRepository.updateById(id, donationPoint);
  }

  @put('/donation-points/{id}', {
    responses: {
      '204': {
        description: 'DonationPoint PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() donationPoint: DonationPoint,
  ): Promise<void> {
    await this.donationPointRepository.replaceById(id, donationPoint);
  }

  @del('/donation-points/{id}', {
    responses: {
      '204': {
        description: 'DonationPoint DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.donationPointRepository.deleteById(id);
  }
}
