import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { debug } from 'console';
import { Observable } from 'rxjs';
import { SendersService } from './senders.service';

@Injectable()
export class SenderGuard extends AuthGuard('jwt') { 
    handleRequest(err, user, info: Error) {
        return user;
    } 
}
 