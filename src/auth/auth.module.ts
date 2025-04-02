import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTToken } from '../configs/jwt-secret';
import { PassportAuthController } from './passport-auth.controller';
import { LocalStrategy } from './strategies/local.strategy';


const Jwt:DynamicModule = JwtModule.register({
    global: true,
    secret: JWTToken,
    signOptions: {
        expiresIn: '1m',
    },
});

@Module({
    imports: [
        UsersModule,
        Jwt
    ],
    controllers: [AuthController, PassportAuthController],
    providers: [AuthService,LocalStrategy],
})
export class AuthModule {}
