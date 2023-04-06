export type JwtPayload = {
  username: string;
  is_creator: boolean;
  is_active: boolean;
  sub: number;
};
