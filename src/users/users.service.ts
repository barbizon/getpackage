import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { MongoRepository } from 'typeorm/repository/MongoRepository';
import { User } from './user';
import { UserEntity } from './user.entity';
 
@Injectable()
export class UsersService { 
  constructor(@InjectRepository(UserEntity) 
    private readonly usersRepository: MongoRepository<UserEntity>) { }

  async findOne(username: string): Promise<User | undefined> { 
      var users = await this.usersRepository.find({ username: username }); 
      return users[0]; 
  }

  async findLogin(username: string, pwd: string): Promise<User | undefined> {  
      var users = await this.usersRepository.find({ username: username, passwordHash: pwd });  
      return users[0]; 
  }

  async getAll(): Promise<User[] | undefined> {
    return await this.usersRepository.find();
  }
}