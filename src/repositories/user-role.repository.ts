import { DefaultCrudRepository } from '@loopback/repository';
import { UserRole } from '../models';
import { DatabaseDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UserRoleRepository extends DefaultCrudRepository<
  UserRole,
  typeof UserRole.prototype.id
  > {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(UserRole, dataSource);
  }
}
