import {DefaultCrudRepository} from '@loopback/repository';
import {Residency} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ResidencyRepository extends DefaultCrudRepository<
  Residency,
  typeof Residency.prototype.id
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Residency, dataSource);
  }
}
