import {DefaultCrudRepository} from '@loopback/repository';
import {Role} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.id
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Role, dataSource);
  }
}
