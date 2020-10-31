import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { MongoRepository } from 'typeorm/repository/MongoRepository'; 
import { CourierEntity } from './courier.entity';
 
@Injectable()
export class CouriersService { 
  constructor(@InjectRepository(CourierEntity) 
    private readonly couriersRepository: MongoRepository<CourierEntity>) { }

  async getAll(): Promise<CourierEntity[] | undefined> {
    return await this.couriersRepository.find();
  }

  async findOneByUser(userId: string): Promise<CourierEntity | undefined> { 
    var sender = await this.couriersRepository.findOne({ userId: userId }); 
    return sender; 
  } 
}