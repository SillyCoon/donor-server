import { DonorTimeRepository } from './../repositories/donor-time.repository';
import { DonorTime } from './../models/donor-time.model';
import { DonationTimeRepository } from './../repositories/donation-time.repository';
import { post, param, requestBody } from '@loopback/rest';
import { DonationPointRepository } from '../repositories/';
import { DonationPoint, DonationTime } from '../models/';
import { repository } from '@loopback/repository';
import {
  get
} from '@loopback/rest';
import * as _ from 'lodash';


export class RecordController {
  constructor(
    @repository(DonationPointRepository)
    protected donationPointRepository: DonationPointRepository,


    @repository(DonationTimeRepository)
    protected donationTimeRepository: DonationPointRepository,

    @repository(DonorTimeRepository)
    protected donorTimeRepository: DonorTimeRepository
  ) { }


  /**
   * Создаем новое время
   * @param donationData
   */
  @post('/records')
  async createRecord(
    @requestBody() donationData: DonationTime,
  ): Promise<DonationTime> {
    return await this.donationPointRepository.times(donationData.pointId).create(donationData);
  }

  @get('/records')
  async getAvailableRecords(): Promise<any> {

    let times = await this.donationPointRepository.times(undefined).find({ where: { is_historical: false } });
    let points = await this.donationPointRepository.find();

    return times.map(time => {
      const point = points.find(pointItem => pointItem.id === time.pointId);
      //TODO: Учесть null и undefined
      return { ...time, ...{ name: point!.name, description: point!.description } as DonationPoint }
    });
  }

}
