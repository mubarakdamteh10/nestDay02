import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Sign } from 'crypto';
import { cp } from 'fs';

type AuthInput = {username: string, password: string}
type SignInData = { userId: number, username: string }
type AuthResult = { accessToken: string, userId: number, username: string }

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async authenticate(input: AuthInput): Promise<AuthResult|null> {
        const userAuth = await this.validateUser(input);
    
        if (!userAuth) {
            throw new UnauthorizedException('Invalid credentials eiei');
        }
        const signToken = await this.signToken(userAuth);
        return signToken;
    }

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersService.findUserByName(input.username);
 
        if (user && user.password === input.password) {
            return {
                userId: user.userId,
                username: user.username
            }
        }else {
            console.log('Password mismatch or user not found');
        }

        return null;
    }

    async signToken(user: SignInData): Promise<AuthResult> {
        const tokenPayload = {
            sub : user.userId,
            username: user.username
        };
        console.log('payload :',tokenPayload);
        

        const accessToken = await this.jwtService.signAsync(tokenPayload);
        
        return {
            accessToken,
            userId: user.userId,
            username: user.username};
    }

    
}
