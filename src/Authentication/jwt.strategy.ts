import { PassportStrategy } from '@nestjs/passport';


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET', // protect this, move to env var
    });
  }


  async validate(payload: any) {

    return {
      id: payload.sub,
      name: payload.name,
    };
  }
}
