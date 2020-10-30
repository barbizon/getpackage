import { Injectable } from '@nestjs/common';
import { User } from './user';
 
@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        isCourier: true,
        isSender: true,
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        isCourier: true,
        isSender: true,
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        isCourier: true,
        isSender: true,
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}