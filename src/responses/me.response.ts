import { UserRole } from "enums/user";

export type MeResponse = {
  id: number;
  fullName: string;
  avatar: string;
  email: string;
  role: UserRole;
};
