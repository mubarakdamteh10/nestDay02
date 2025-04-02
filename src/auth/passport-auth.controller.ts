import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Get,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { PassportLocalGuard } from './guard/passport-local.guard';
import { PassportJwtGuard } from './guard/passport-jwt.guard';

@Controller('auth-v2')
export class PassportAuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    login(@Request() req) {
        return this.authService.signToken(req.user);
    }

    @UseGuards(PassportJwtGuard)
    @Get('me')
    getUserInfo(@Request() req) {
        return req.user;
    }
}
