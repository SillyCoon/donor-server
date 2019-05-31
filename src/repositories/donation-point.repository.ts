import { DonationTimeRepository } from './donation-time.repository';
import { DonationTime } from './../models/donation-time.model';
import { DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { DonationPoint } from '../models';
import { DatabaseDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';

export class DonationPointRepository extends DefaultCrudRepository<
  DonationPoint,
  typeof DonationPoint.prototype.id
  > {

  public readonly times: HasManyRepositoryFactory<
    DonationTime,
    typeof DonationPoint.prototype.id
  >;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,

    @repository.getter('DonationTimeRepository')
    timeRepositoryGetter: Getter<DonationTimeRepository>,

  ) {
    super(DonationPoint, dataSource);
    this.times = this.createHasManyRepositoryFactoryFor('times', timeRepositoryGetter);
  }
}
