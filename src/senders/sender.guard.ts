import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { debug } from 'console';
import { Observable } from 'rxjs';
import { SendersService } from './senders.service';

@Injectable()
export class SenderGuard extends AuthGuard('jwt') { 
    handleRequest(err, user, info: Error) { 
        
        console.debug(user); 

        if(!user || !user.userId.isSender)
            {
                throw new HttpException(
                    'Unauthorized',
                    HttpStatus.UNAUTHORIZED,
                  );
            }

        return user;
    } 
}
 