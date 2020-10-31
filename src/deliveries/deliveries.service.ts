import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { IsDate, IsObject } from 'class-validator';
import { MongoRepository } from 'typeorm/repository/MongoRepository'; 
import { DeliveryEntity } from './delivery.entity';
 
@Injectable()
export class DeliveriesService { 
  constructor(@InjectRepository(DeliveryEntity) 
    private readonly deliveriesRepository: MongoRepository<DeliveryEntity>) { }

  async getAll(): Promise<DeliveryEntity[] | undefined> {
    return await this.deliveriesRepository.find();
  }

  async getByDateSender(id: string, deliveryDate: Date): Promise<DeliveryEntity[] | undefined> {
    const dateString = deliveryDate.toISOString();  

    return await this.deliveriesRepository.find({
      where: 
        { $and: [
          { deliveryDate: { $eq: new Date(dateString) } },
          { sender: { $eq: id } }
        ] }   
      ,
  });
  }

  async getByDateCourier(id: string, deliveryDate: Date): Promise<DeliveryEntity[] | undefined> {
    const dateString = deliveryDate.toISOString(); 

    return await this.deliveriesRepository.find({
      where: 
        { $and: [
          { deliveryDate: { $eq: new Date(dateString) } },
          { courier: { $eq: id } }
        ] }   
      ,
  });
  }
}