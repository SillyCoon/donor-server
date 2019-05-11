import { DonorInfo } from './../models/donor-info.model';
import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { Citizenship } from '../models';
import { DatabaseDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { DonorInfoRepository } from '.';

export class CitizenshipRepository extends DefaultCrudRepository
  <
  Citizenship,
  typeof Citizenship.prototype.id
  > {

  public readonly donors: HasManyRepositoryFactory<DonorInfo, typeof Citizenship.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
    @repository.getter('DonorInfoRepository')
    getDonorRepository: Getter<DonorInfoRepository>
  ) {
    super(Citizenship, dataSource);
    this.donors = this.createHasManyRepositoryFactoryFor('donors', getDonorRepository);
  }
}
