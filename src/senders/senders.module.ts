import { Module } from '@nestjs/common';
import { SendersService } from './senders.service';
import { SendersController } from './senders.controller'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { SenderEntity } from './sender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SenderEntity])],
  providers: [SendersService],
  exports: [SendersService],
  controllers: [SendersController],
})
export class SendersModule {}