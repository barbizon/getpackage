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
}