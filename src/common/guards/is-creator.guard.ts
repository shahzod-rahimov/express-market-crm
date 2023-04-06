import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CreatorGuard extends AuthGuard('access-jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.is_creator) return true;

    throw new HttpException(
      'You are not a creator admin',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
