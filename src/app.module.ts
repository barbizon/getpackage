import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { CouriersController } from './couriers/couriers.controller';
import { SendersController } from './senders/senders.controller';
import { DeliveriesController } from './deliveries/deliveries.controller';
import { CouriersService } from './couriers/couriers.service';
import { DeliveriesService } from './deliveries/deliveries.service';
import { SendersService } from './senders/senders.service';
import { SenderEntity } from './senders/sender.entity';
import { SendersModule } from './senders/senders.module';
import { CouriersModule } from './couriers/couriers.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { CourierEntity } from './couriers/courier.entity';
import { DeliveryEntity } from './deliveries/delivery.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([UserEntity, SenderEntity, CourierEntity, DeliveryEntity]), 
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_CONNECTION_STRING'), 
        database: configService.get<string>('MONGODB_DATABASE'),
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
        ],
        ssl: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    AuthModule, 
    UsersModule, 
    ConfigModule.forRoot(), SendersModule, CouriersModule, DeliveriesModule
  ],
  controllers: [AppController, CouriersController, SendersController, DeliveriesController],
  providers: [AppService, CouriersService, DeliveriesService, SendersService],
})
export class AppModule {}
