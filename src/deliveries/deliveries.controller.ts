import { Controller, UseGuards, Get, Post, Request, Query, Body } from '@nestjs/common'; 
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SenderGuard } from 'src/senders/sender.guard';
import { DeliveriesService } from './deliveries.service';
import { AddDeliveryDto } from './dto/add-delivery.dto';
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

    @UseGuards(SenderGuard)
    @Post('adddelivery')
    async addDelivery(@Body() message: AddDeliveryDto, @Request() req) {
      const userId = req.user.userId.id;
      return await this.deliveriesService.add(userId, message.packageWidth, message.packageHeight, 
        message.cost, message.description, message.deliveryDate); 
    }

    @UseGuards(SenderGuard)
    @Post('assigndelivery')
    async assignDelivery(@Body() message: AssignDeliveryDto) {
      console.debug(message);
      return await this.deliveriesService.assign(message.delivery, message.courier);  
    }
}
