import { BasicDonorInfo } from '../models/business/basic-donor-info.model';
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
import { DonorInfo } from '../models';
import { DonorInfoRepository } from '../repositories';

export class DonorController {
  constructor(
    @repository(DonorInfoRepository)
    public donorInfoRepository: DonorInfoRepository,
  ) { }

  @post('/donor-info', {
    responses: {
      '200': {
        description: 'DonorInfo model instance',
        content: { 'application/json': { schema: { 'x-ts-type': DonorInfo } } },
      },
    },
  })
  async create(@requestBody() donorInfo: BasicDonorInfo): Promise<DonorInfo> {

    let spacedProps = {
      first_name: donorInfo.firstName,
      last_name: donorInfo.lastName
    }

    delete donorInfo.lastName;
    delete donorInfo.firstName;

    const dbDonorInfo: DonorInfo = new DonorInfo({
      ...spacedProps, ...donorInfo
    });

    return await this.donorInfoRepository.create(dbDonorInfo);
  }

  @get('/donor-info/count', {
    responses: {
      '200': {
        description: 'DonorInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(DonorInfo)) where?: Where,
  ): Promise<Count> {
    return await this.donorInfoRepository.count(where);
  }

  @get('/donor-info', {
    responses: {
      '200': {
        description: 'Array of DonorInfo model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': DonorInfo } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DonorInfo)) filter?: Filter,
  ): Promise<DonorInfo[]> {
    return await this.donorInfoRepository.find(filter);
  }

  @patch('/donor-info', {
    responses: {
      '200': {
        description: 'DonorInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() donorInfo: DonorInfo,
    @param.query.object('where', getWhereSchemaFor(DonorInfo)) where?: Where,
  ): Promise<Count> {
    return await this.donorInfoRepository.updateAll(donorInfo, where);
  }

  @get('/donor-info/{id}', {
    responses: {
      '200': {
        description: 'DonorInfo model instance',
        content: { 'application/json': { schema: { 'x-ts-type': DonorInfo } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<DonorInfo> {
    return await this.donorInfoRepository.findById(id);
  }

  @patch('/donor-info/{id}', {
    responses: {
      '204': {
        description: 'DonorInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() donorInfo: DonorInfo,
  ): Promise<void> {
    await this.donorInfoRepository.updateById(id, donorInfo);
  }

  @put('/donor-info/{id}', {
    responses: {
      '204': {
        description: 'DonorInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() donorInfo: DonorInfo,
  ): Promise<void> {
    await this.donorInfoRepository.replaceById(id, donorInfo);
  }

  @del('/donor-info/{id}', {
    responses: {
      '204': {
        description: 'DonorInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.donorInfoRepository.deleteById(id);
  }
}
