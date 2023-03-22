import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class RefreshTokenGuard extends AuthGuard('refresh-jwt') {
  constructor() {
    super();
  }
  // canActivate(context: ExecutionContext) {
  //   console.log(context);
  //   return super.canActivate(context);
  // }
}
