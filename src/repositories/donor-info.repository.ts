import { DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { DonorInfo } from '../models';
import { DatabaseDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';

export class DonorInfoRepository extends DefaultCrudRepository<
  DonorInfo,
  typeof DonorInfo.prototype.id
  > {

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,

  ) {
    super(DonorInfo, dataSource);
  }
}
