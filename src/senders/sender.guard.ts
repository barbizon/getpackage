import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'; 
import { AuthGuard } from '@nestjs/passport'; 

@Injectable()
export class SenderGuard extends AuthGuard('jwt') { 
    handleRequest(err, user, info: Error) { 
         
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
 