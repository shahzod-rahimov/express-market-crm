import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtPayload, Tokens } from './types';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/entities/admin.entity';
import { Response } from 'express';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(authDto: SignInDto, res: Response): Promise<Tokens> {
    const { username, password } = authDto;
    const admin = await this.adminService.findByUserName(username);

    if (!admin) {
      throw new ForbiddenException('Access Denied');
    }

    if (!admin.is_active) {
      throw new HttpException(
        'You are not an active admin',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.hashed_password,
    );

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    return this.getTokens(admin, res);
  }

  async logout(adminId: number): Promise<boolean> {
    await this.adminService.updateToken(adminId, null);
    throw new HttpException('Successfully logout', HttpStatus.OK);
  }

  async getTokens(admin: Admin, res: Response): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
      is_active: admin.is_active,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    await this.updateRefreshTokenHash(admin.id, refresh_token);

    res.cookie('refresh_token', refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return {
      access_token,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
      is_creator: admin.is_creator,
      user_name: admin.user_name,
    };
  }

  async updateRefreshTokenHash(
    adminId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateToken(adminId, hashedRefreshToken);
  }
}
