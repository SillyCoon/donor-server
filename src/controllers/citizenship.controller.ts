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
import {Citizenship} from '../models';
import {CitizenshipRepository} from '../repositories';

export class CitizenshipController {
  constructor(
    @repository(CitizenshipRepository)
    public citizenshipRepository : CitizenshipRepository,
  ) {}

  @post('/citizenships', {
    responses: {
      '200': {
        description: 'Citizenship model instance',
        content: {'application/json': {schema: {'x-ts-type': Citizenship}}},
      },
    },
  })
  async create(@requestBody() citizenship: Citizenship): Promise<Citizenship> {
    return await this.citizenshipRepository.create(citizenship);
  }

  @get('/citizenships/count', {
    responses: {
      '200': {
        description: 'Citizenship model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Citizenship)) where?: Where,
  ): Promise<Count> {
    return await this.citizenshipRepository.count(where);
  }

  @get('/citizenships', {
    responses: {
      '200': {
        description: 'Array of Citizenship model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Citizenship}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Citizenship)) filter?: Filter,
  ): Promise<Citizenship[]> {
    return await this.citizenshipRepository.find(filter);
  }

  @patch('/citizenships', {
    responses: {
      '200': {
        description: 'Citizenship PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() citizenship: Citizenship,
    @param.query.object('where', getWhereSchemaFor(Citizenship)) where?: Where,
  ): Promise<Count> {
    return await this.citizenshipRepository.updateAll(citizenship, where);
  }

  @get('/citizenships/{id}', {
    responses: {
      '200': {
        description: 'Citizenship model instance',
        content: {'application/json': {schema: {'x-ts-type': Citizenship}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Citizenship> {
    return await this.citizenshipRepository.findById(id);
  }

  @patch('/citizenships/{id}', {
    responses: {
      '204': {
        description: 'Citizenship PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() citizenship: Citizenship,
  ): Promise<void> {
    await this.citizenshipRepository.updateById(id, citizenship);
  }

  @put('/citizenships/{id}', {
    responses: {
      '204': {
        description: 'Citizenship PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() citizenship: Citizenship,
  ): Promise<void> {
    await this.citizenshipRepository.replaceById(id, citizenship);
  }

  @del('/citizenships/{id}', {
    responses: {
      '204': {
        description: 'Citizenship DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.citizenshipRepository.deleteById(id);
  }
}
