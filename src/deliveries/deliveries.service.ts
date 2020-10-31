import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { IsDate, IsObject } from 'class-validator';
import { ObjectID, UpdateWriteOpResult } from 'typeorm';
import { MongoRepository } from 'typeorm/repository/MongoRepository'; 
import { DeliveryEntity } from './delivery.entity';
const ObjectId = require('mongodb').ObjectId;

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

  async assign(delivery: string, courier: string) 
  {
    const query = { "_id": new ObjectId(delivery) };
    const update =  { $set: { courier: courier } };
    
    //count deliviries
    const deliveryToUpdate = await this.deliveriesRepository.findOne(query);
    const deliveryToUpdateDate = deliveryToUpdate.deliveryDate;  
    const deliveries = await this.getByDateCourier(courier, deliveryToUpdateDate);

    if(deliveries.length == 5)
    {
      return { 
              "updated":  false,
              "message": "You only can assign 5 deliveries per day"
      }; 
    }

    return { 
              "updated": (await this.deliveriesRepository.updateOne(query, update)).result.n > 0 ? true : false
    }; 
  }

  async getRevenue(id: string, dateFrom: Date, dateTo: Date): Promise<DeliveryEntity[] | undefined> {
    const dateFromString = dateFrom.toISOString(); 
    const dateToString = dateTo.toISOString(); 

    console.debug(dateFromString);
    console.debug(dateToString);

    return await this.deliveriesRepository.find({
      where: 
        { $and: [
          { courier: { $eq: id } },
          { deliveryDate: { $gt: new Date(dateFromString) } },
          { deliveryDate: { $lt: new Date(dateToString) } }
        ] }   
      ,
  });
  }
}