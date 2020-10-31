import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { MongoRepository } from 'typeorm/repository/MongoRepository'; 
import { DeliveryEntity } from './delivery.entity';
 
@Injectable()
export class DeliveriesService { 
  constructor(@InjectRepository(DeliveryEntity) 
    private readonly deliveriesRepository: MongoRepository<DeliveryEntity>) { }

  async getAll(): Promise<DeliveryEntity[] | undefined> {
    return await this.deliveriesRepository.find();
  }
}