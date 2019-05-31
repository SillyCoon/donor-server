import { DonationPointRepository } from './donation-point.repository';
import { DonationPoint } from './../models/donation-point.model';
import { DefaultCrudRepository, BelongsToAccessor, repository, createBelongsToAccessor, RelationType } from '@loopback/repository';
import { DonationTime } from '../models';
import { DatabaseDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';

export class DonationTimeRepository extends DefaultCrudRepository<
  DonationTime,
  typeof DonationTime.prototype.id
  > {

  public readonly donationPoint: BelongsToAccessor<DonationPoint, typeof DonationTime.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
    @repository.getter('DonationPointRepository')
    donationPointRepositoryGetter: Getter<DonationPointRepository>,
  ) {

    super(DonationTime, dataSource);
    this.donationPoint = createBelongsToAccessor(
      {
        target: () => DonationPoint,
        name: "donationPoint",
        type: RelationType.belongsTo,
        source: DonationTime,
        keyFrom: 'pointId',
        keyTo: 'id',
      },

      donationPointRepositoryGetter,
      this
    );
  }

}
