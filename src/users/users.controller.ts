import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
      private usersService: UsersService 
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile() {
      return this.usersService.getAll();
    }
}
