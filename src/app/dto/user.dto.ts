import { UserRolesEnum } from '../enums/user-roles.enum';

export interface UserDto {
  username: string;
  role: UserRolesEnum;
}
