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
import {Residency} from '../models';
import {ResidencyRepository} from '../repositories';

export class ResidencyController {
  constructor(
    @repository(ResidencyRepository)
    public residencyRepository : ResidencyRepository,
  ) {}

  @post('/residencies', {
    responses: {
      '200': {
        description: 'Residency model instance',
        content: {'application/json': {schema: {'x-ts-type': Residency}}},
      },
    },
  })
  async create(@requestBody() residency: Residency): Promise<Residency> {
    return await this.residencyRepository.create(residency);
  }

  @get('/residencies/count', {
    responses: {
      '200': {
        description: 'Residency model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Residency)) where?: Where,
  ): Promise<Count> {
    return await this.residencyRepository.count(where);
  }

  @get('/residencies', {
    responses: {
      '200': {
        description: 'Array of Residency model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Residency}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Residency)) filter?: Filter,
  ): Promise<Residency[]> {
    return await this.residencyRepository.find(filter);
  }

  @patch('/residencies', {
    responses: {
      '200': {
        description: 'Residency PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() residency: Residency,
    @param.query.object('where', getWhereSchemaFor(Residency)) where?: Where,
  ): Promise<Count> {
    return await this.residencyRepository.updateAll(residency, where);
  }

  @get('/residencies/{id}', {
    responses: {
      '200': {
        description: 'Residency model instance',
        content: {'application/json': {schema: {'x-ts-type': Residency}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Residency> {
    return await this.residencyRepository.findById(id);
  }

  @patch('/residencies/{id}', {
    responses: {
      '204': {
        description: 'Residency PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() residency: Residency,
  ): Promise<void> {
    await this.residencyRepository.updateById(id, residency);
  }

  @put('/residencies/{id}', {
    responses: {
      '204': {
        description: 'Residency PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() residency: Residency,
  ): Promise<void> {
    await this.residencyRepository.replaceById(id, residency);
  }

  @del('/residencies/{id}', {
    responses: {
      '204': {
        description: 'Residency DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.residencyRepository.deleteById(id);
  }
}
