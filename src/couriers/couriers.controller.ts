import { Controller, UseGuards, Get, Request, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeliveriesService } from 'src/deliveries/deliveries.service';
import { CouriersService } from './couriers.service';
import { GetRevenueDto } from './dto/get-revenue.dto';

@Controller('couriers')
export class CouriersController {
    constructor(
      private couriersService: CouriersService,
      private deliveriesService: DeliveriesService 
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
      return this.couriersService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('revenew')
    getRevenue(@Query() params: GetRevenueDto, @Request() req) {
      const userId = req.user.userId.id;

      return this.deliveriesService.getRevenue(userId, params.dateFrom, params.dateTo);
    }
}
