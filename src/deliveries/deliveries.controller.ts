import { Controller, UseGuards, Get, Post, Request, Query, Body } from '@nestjs/common'; 
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeliveriesService } from './deliveries.service';
import { AssignDeliveryDto } from './dto/assing-delivery.dto';
import { GetDeliveriesParam } from './dto/get-deliveries.params';

@Controller('deliveries')
export class DeliveriesController {
    constructor(
      private deliveriesService: DeliveriesService 
    ) {}
 
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
      return this.deliveriesService.getAll();
    }
    
    @UseGuards(JwtAuthGuard) 
    @Get('getdeliveries')
    getDeliveries(@Query() params: GetDeliveriesParam, @Request() req) {
      const userId = req.user.userId.id;
      const isSender = req.user.userId.isSender; 
       
      return isSender ? 
        this.deliveriesService.getByDateSender(userId, params.deliveryDate) :
        this.deliveriesService.getByDateCourier(userId, params.deliveryDate); 
    }

    @UseGuards(JwtAuthGuard)
    @Post('adddelivery')
    addDelivery(@Request() req) {
      return null;
    }

    @UseGuards(JwtAuthGuard)
    @Post('assigndelivery')
    async assignDelivery(@Body() message: AssignDeliveryDto) {
      console.debug(message);
      return await this.deliveriesService.assign(message.delivery, message.courier);  
    }
}
