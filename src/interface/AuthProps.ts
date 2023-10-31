export enum Permission {
  Undefined = 0,
  ACADEMY = 1,
  TEACHER = 2,
  ADMIN = 3
}

export interface AuthProps {
  authorized: boolean;
  permission: Permission
}