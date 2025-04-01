import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTToken } from '../configs/jwt-secret';



@Module({
  imports: [UsersModule,
    JwtModule.register({
    global: true,
    secret: JWTToken,
    signOptions: {
        expiresIn: '1m',
    },
})],
    controllers: [AuthController],
    providers: [AuthService],
  })
  export class AuthModule {}
