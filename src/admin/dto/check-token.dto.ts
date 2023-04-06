import { IsJWT } from 'class-validator';

export class CheckTokenDto {
  @IsJWT()
  readonly token: string;
}
