import { LoginUserDto } from './login-user.dto';

export interface LoginResponseDto {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: LoginUserDto;
}
