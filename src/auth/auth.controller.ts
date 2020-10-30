import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common'; 
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        console.debug(process.env.DATABASE_USER);
        return this.authService.login(req.user);
    } 
} 