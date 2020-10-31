import { Module } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { CouriersController } from './couriers.controller'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourierEntity } from './courier.entity'; 
import { DeliveriesModule } from 'src/deliveries/deliveries.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourierEntity]), DeliveriesModule],
  providers: [CouriersService],
  exports: [CouriersService],
  controllers: [CouriersController],
})
export class CouriersModule {}