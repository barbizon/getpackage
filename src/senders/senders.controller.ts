import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SendersService } from './senders.service';

@Controller('senders')
export class SendersController {
    constructor(
      private sendersService: SendersService 
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile() {
      return this.sendersService.getAll();
    }
}
