import { DonationStatusRepository } from './donation-status.repository';
import { DonationTimeRepository } from './donation-time.repository';
import { User } from './../models/user.model';
import { DonationTime } from './../models/donation-time.model';
import { DefaultCrudRepository, BelongsToAccessor, repository, createBelongsToAccessor, RelationType } from '@loopback/repository';
import { DonorTime, DonationStatus } from '../models';
import { DatabaseDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { UserRepository } from './user.repository';

export class DonorTimeRepository extends DefaultCrudRepository<
  DonorTime,
  typeof DonorTime.prototype.id
  > {

  public readonly donationTime: BelongsToAccessor<
    DonationTime,
    typeof DonorTime.prototype.id
  >;

  public readonly donor: BelongsToAccessor<
    User,
    typeof DonorTime.prototype.id
  >;

  public readonly donationStatus: BelongsToAccessor<
    DonationStatus,
    typeof DonorTime.prototype.id
  >;


  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,

    @repository.getter('DonationTimeRepository')
    donationTimeRepositoryGetter: Getter<DonationTimeRepository>,

    @repository.getter('CustomerRepository')
    donationStatusRepositoryGetter: Getter<DonationStatusRepository>,

    @repository.getter('CustomerRepository')
    donorRepositoryGetter: Getter<UserRepository>,

  ) {
    super(DonorTime, dataSource);
    this.donationTime = createBelongsToAccessor(
      {
        target: () => DonationTime,
        name: "donationTime",
        type: RelationType.belongsTo,
        source: DonorTime,
        keyFrom: 'donationTimeId',
        keyTo: 'id',
      }, donationTimeRepositoryGetter,
      this),

      this.donationStatus = createBelongsToAccessor(
        {
          target: () => DonationStatus,
          name: "donationStatus",
          type: RelationType.belongsTo,
          source: DonorTime,
          keyFrom: 'statusId',
          keyTo: 'id',
        }, donationStatusRepositoryGetter,
        this),

      this.donor = createBelongsToAccessor(
        {
          target: () => User,
          name: "user",
          type: RelationType.belongsTo,
          source: DonorTime,
          keyFrom: 'donorId',
          keyTo: 'id',
        }, donorRepositoryGetter,
        this)
  }
}
