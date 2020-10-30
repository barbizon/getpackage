import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([UserEntity]),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb+srv://getpackage:get$package@cluster0.yadvv.mongodb.net/getpackage?retryWrites=true&w=majority',
    //   database: 'getpackage',
    //   entities: [
    //     __dirname + '/**/*.entity{.ts,.js}',
    //   ],
    //   ssl: true,
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true
    // }), 
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
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
