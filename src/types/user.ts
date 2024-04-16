import { UserRole } from "enums/user";

export type User = {
  id: number;
  fullName: string;
  avatar: string;
  email: string;
  role: UserRole;
};

export type UserOption = {
  label: string;
  value: number;
  isDisabled?: boolean;
};

export type UserOptions = UserOption[];

export type UserProfile = {
  id?: number;
  displayName: string;
  avatar?: string;
};
