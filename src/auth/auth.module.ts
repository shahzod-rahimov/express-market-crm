import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => AdminModule)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
