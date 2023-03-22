import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../types';
import { Request } from 'express';

export const cookieExtractor: JwtFromRequestFunction = (req: Request) => {
  if (req && req.cookies) {
    return req.cookies['refresh_token'];
  }
  return null;
};

@Injectable()
export class RefreshTokenCookieStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) throw new ForbiddenException("Refresh token not'g'ri");
    
    return {
      ...payload,
      refreshToken,
    };
  }
}
