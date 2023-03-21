import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/signin')
  // signin(@Body() signinDto: SignInDto){
  //   return this.authService.signin(signinDto)
  // }
}
