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
import {Weight} from '../models';
import {WeightRepository} from '../repositories';

export class WeightController {
  constructor(
    @repository(WeightRepository)
    public weightRepository : WeightRepository,
  ) {}

  @post('/weights', {
    responses: {
      '200': {
        description: 'Weight model instance',
        content: {'application/json': {schema: {'x-ts-type': Weight}}},
      },
    },
  })
  async create(@requestBody() weight: Weight): Promise<Weight> {
    return await this.weightRepository.create(weight);
  }

  @get('/weights/count', {
    responses: {
      '200': {
        description: 'Weight model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Weight)) where?: Where,
  ): Promise<Count> {
    return await this.weightRepository.count(where);
  }

  @get('/weights', {
    responses: {
      '200': {
        description: 'Array of Weight model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Weight}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Weight)) filter?: Filter,
  ): Promise<Weight[]> {
    return await this.weightRepository.find(filter);
  }

  @patch('/weights', {
    responses: {
      '200': {
        description: 'Weight PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() weight: Weight,
    @param.query.object('where', getWhereSchemaFor(Weight)) where?: Where,
  ): Promise<Count> {
    return await this.weightRepository.updateAll(weight, where);
  }

  @get('/weights/{id}', {
    responses: {
      '200': {
        description: 'Weight model instance',
        content: {'application/json': {schema: {'x-ts-type': Weight}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Weight> {
    return await this.weightRepository.findById(id);
  }

  @patch('/weights/{id}', {
    responses: {
      '204': {
        description: 'Weight PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() weight: Weight,
  ): Promise<void> {
    await this.weightRepository.updateById(id, weight);
  }

  @put('/weights/{id}', {
    responses: {
      '204': {
        description: 'Weight PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() weight: Weight,
  ): Promise<void> {
    await this.weightRepository.replaceById(id, weight);
  }

  @del('/weights/{id}', {
    responses: {
      '204': {
        description: 'Weight DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.weightRepository.deleteById(id);
  }
}
