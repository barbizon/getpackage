import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators'; 
import { MongoRepository } from 'typeorm/repository/MongoRepository'; 
import { DeliveryEntity } from './delivery.entity';
const ObjectId = require('mongodb').ObjectId;

@Injectable()
export class DeliveriesService { 
  constructor(@InjectRepository(DeliveryEntity) 
    private readonly deliveriesRepository: MongoRepository<DeliveryEntity>) { }

  async add(id: string, packageWidth: number, packageHeight: number, cost: number, description: string, deliveryDate: Date) {
    const deliveryEntity: DeliveryEntity = new DeliveryEntity();
    const dateString = deliveryDate.toISOString();  
 
    deliveryEntity.packageSize = {width:packageWidth, height: packageHeight };
    deliveryEntity.cost = cost;
    deliveryEntity.description = description;
    deliveryEntity.deliveryDate = new Date(dateString);  
    deliveryEntity.sender = id;
    deliveryEntity.createdDate = new Date();

    const result = await this.deliveriesRepository.create(deliveryEntity);
    const response = await this.deliveriesRepository.save(result);
    return deliveryEntity;
  }

  async getAll(): Promise<DeliveryEntity[] | undefined> {
    return await this.deliveriesRepository.find();
  }

  async getByDateSender(id: string, deliveryDate: Date, pageNumber?: number, pageSize?: number): Promise<DeliveryEntity[] | undefined> {
    const takeVal = (pageSize || 1000000).toString();
    const skipVal = ((pageNumber - 1) * pageSize || 0).toString();

    const dateString = deliveryDate.toISOString();  

    return await this.deliveriesRepository.find({
      where: 
        { $and: [
          { deliveryDate: { $eq: new Date(dateString) } },
          { sender: { $eq: id } }
        ] }   ,
        take: parseInt(takeVal),
        skip: parseInt(skipVal)
      ,
  });
  }

  async getByDateCourier(id: string, deliveryDate: Date, pageNumber?: number, pageSize?: number): Promise<DeliveryEntity[] | undefined> {
    const takeVal = (pageSize || 1000000).toString();
    const skipVal = ((pageNumber - 1) * pageSize || 0).toString();
 
    const dateString = deliveryDate.toISOString(); 

    return await this.deliveriesRepository.find({
      where: 
        { $and: [
          { deliveryDate: { $eq: new Date(dateString) } },
          { courier: { $eq: id } }
        ] } ,
        take: parseInt(takeVal),
        skip: parseInt(skipVal)
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
    const deliveries = await this.getByDateCourier(courier, deliveryToUpdateDate, 1, 5);

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