import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; 
import { SendersModule } from 'src/senders/senders.module';
import { CouriersModule } from 'src/couriers/couriers.module';

@Module({
  imports: [
    UsersModule,
    SendersModule,
    CouriersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {} 
  