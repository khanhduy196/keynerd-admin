import { PropsWithChildren } from "react";
import { User } from "./user";

export type PropsWithUser = {
  user: User;
};

export type PropsWithChildrenWithUser = PropsWithChildren & {
  user: User;
};
