export type JwtPayload = {
  email: string;
  is_creator: boolean;
  is_active: boolean;
  sub: number;
};
