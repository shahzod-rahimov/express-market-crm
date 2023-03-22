import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { GetCurrentUserId, Public } from '../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  signup(
    @Body() signUpDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signup(signUpDto, res);
  }

  @Public()
  @Post('/signin')
  signin(
    @Body() signinDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(signinDto, res);
  }

  @Post('logout')
  logout(
    @GetCurrentUserId() adminId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    res.clearCookie('refresh_token');
    return this.authService.logout(adminId);
  }
}
