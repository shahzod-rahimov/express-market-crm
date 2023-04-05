import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { GetCurrentUserId, Public } from '../common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'SignIn Admin' })
  @ApiResponse({ status: 200, description: 'Return Tokens' })
  @Public()
  @Post('/signin')
  signin(
    @Body() signinDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(signinDto, res);
  }

  @ApiOperation({ summary: 'Logout Admin' })
  @ApiResponse({ status: 200 })
  @Post('logout')
  logout(
    @GetCurrentUserId() adminId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    res.clearCookie('refresh_token');
    return this.authService.logout(adminId);
  }
}
