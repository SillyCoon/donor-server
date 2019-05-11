import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { Weight, DonorInfo } from '../models';
import { DatabaseDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { DonorInfoRepository } from '.';

export class WeightRepository extends DefaultCrudRepository<
  Weight,
  typeof Weight.prototype.id
  > {

  public readonly donors: HasManyRepositoryFactory<DonorInfo, typeof Weight.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,

    @repository.getter('DonorInfoRepository')
    getDonorRepository: Getter<DonorInfoRepository>
  ) {
    super(Weight, dataSource);
    this.donors = this.createHasManyRepositoryFactoryFor('donors', getDonorRepository);
  }
}
