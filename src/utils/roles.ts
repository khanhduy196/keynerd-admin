import { UserRole } from "enums/user";

const ADMIN_GROUP_ROLES = [
  UserRole.Admin,
  UserRole.Assistant,
  UserRole.SuperAdmin,
];
export const checkBeingInAdminGroup = (role: UserRole) =>
  ADMIN_GROUP_ROLES.includes(role);
