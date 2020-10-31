import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
    constructor(
      private deliveriesService: DeliveriesService 
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile() {
      return this.deliveriesService.getAll();
    }
}
