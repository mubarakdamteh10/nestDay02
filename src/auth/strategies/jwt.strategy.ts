import { Injectable } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { JWTToken } from "../../configs/jwt-secret";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWTToken,
        });
    }
    async validate(payload: {sub: string, username: string}) {
        return {userId: payload.sub, username: payload.username};
    }
}
