import {DefaultCrudRepository} from '@loopback/repository';
import {DonationStatus} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DonationStatusRepository extends DefaultCrudRepository<
  DonationStatus,
  typeof DonationStatus.prototype.id
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(DonationStatus, dataSource);
  }
}
