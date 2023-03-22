import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  AccessTokenStrategy,
  RefreshTokenBearerStrategy,
  RefreshTokenCookieStrategy,
} from './strategies';

@Module({
  imports: [JwtModule.register({}), forwardRef(() => AdminModule)],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenBearerStrategy,
    RefreshTokenCookieStrategy,
  ],
})
export class AuthModule {}
