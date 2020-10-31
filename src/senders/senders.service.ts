import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { MongoRepository } from 'typeorm/repository/MongoRepository'; 
import { SenderEntity } from './sender.entity';
 
@Injectable()
export class SendersService { 
  constructor(@InjectRepository(SenderEntity) 
    private readonly sendersRepository: MongoRepository<SenderEntity>) { }

  async getAll(): Promise<SenderEntity[] | undefined> {
    return await this.sendersRepository.find();
  }
}