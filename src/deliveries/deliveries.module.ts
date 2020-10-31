import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEntity } from './delivery.entity';
import { SendersService } from 'src/senders/senders.service';
import { SenderEntity } from 'src/senders/sender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryEntity])],
  providers: [DeliveriesService],
  exports: [DeliveriesService],
  controllers: [DeliveriesController],
})
export class DeliveriesModule {}