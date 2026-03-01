export enum UserRolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const UserRolesLabels: Record<UserRolesEnum, string> = {
  [UserRolesEnum.ADMIN]: 'Administrador',
  [UserRolesEnum.USER]: 'Usuário',
};
