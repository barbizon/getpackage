import { Module } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { CouriersController } from './couriers.controller'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourierEntity } from './courier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourierEntity])],
  providers: [CouriersService],
  exports: [CouriersService],
  controllers: [CouriersController],
})
export class CouriersModule {}