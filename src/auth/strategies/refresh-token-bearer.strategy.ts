import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../types';
import { Request } from 'express';

@Injectable()
export class RefreshTokenBearerStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
    // console.log('kirdi');
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    const refreshToken = authHeader.split(' ')[1];
    // console.log(refreshToken);
    if (!refreshToken) throw new ForbiddenException("Refresh token not'g'ri");

    return {
      ...payload,
      refreshToken,
    };
  }
}
