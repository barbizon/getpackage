import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SendersService } from 'src/senders/senders.service';
import { CouriersService } from 'src/couriers/couriers.service';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sendersService: SendersService,
    private couriersService: CouriersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);  
      
    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      const sender = await this.sendersService.findOneByUser(user.id.toString()); 
      const courier = await this.couriersService.findOneByUser(user.id.toString()); 
  
      user.isSender = sender != null;
      user.isCourier = courier != null;
 
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { userId: user.id, username: user.username, sub: user };
    console.debug(user);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}