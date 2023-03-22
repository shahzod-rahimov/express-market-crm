import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
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

  // getAll() {
  //   return this.adminService.findAll();
  // }

  async signup(authDto: CreateAdminDto, res: Response): Promise<Tokens> {
    const isEmailExists = await this.adminService.findByEmail(authDto.email);

    if (isEmailExists) {
      throw new BadRequestException('Email is exists');
    }

    const isUsernameExists = await this.adminService.findByUserName(
      authDto.user_name,
    );

    if (isUsernameExists) {
      throw new BadRequestException('Username is exists');
    }

    const isPhonenumberExists = await this.adminService.findByPhonenumber(
      authDto.phone_number,
    );

    if (isPhonenumberExists) {
      throw new BadRequestException('Phone number is exists');
    }

    const hashed_password = await bcrypt.hash(authDto.hashed_password, 7);
    const newUser = await this.adminService.create({
      ...authDto,
      hashed_password,
    });

    return this.getCookies(newUser, res);
  }

  async signin(authDto: SignInDto, res: Response): Promise<Tokens> {
    const { email, password } = authDto;
    const admin = await this.adminService.findByEmail(email);

    if (!admin) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.hashed_password,
    );

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    return this.getCookies(admin, res);
  }

  async logout(adminId: number): Promise<boolean> {
    await this.adminService.updateToken(adminId, null)
    // await this.prismaService.user.updateMany({
    //   where: {
    //     id: +userId,
    //     hashedRefreshToken: {
    //       not: null,
    //     },
    //   },
    //   data: {
    //     hashedRefreshToken: null,
    //   },
    // });
    throw new HttpException('Successfully logout', HttpStatus.OK);
  }

  async getTokens(admin: Admin): Promise<Tokens> {
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

    return {
      access_token,
      refresh_token,
    };
  }

  async updateRefreshTokenHash(
    adminId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateToken(adminId, hashedRefreshToken);
  }

  async getCookies(admin: Admin, res: Response) {
    const tokens = await this.getTokens(admin);
    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }
}
