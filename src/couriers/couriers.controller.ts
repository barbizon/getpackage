import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CouriersService } from './couriers.service';

@Controller('couriers')
export class CouriersController {
    constructor(
      private couriersService: CouriersService 
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile() {
      return this.couriersService.getAll();
    }
}
