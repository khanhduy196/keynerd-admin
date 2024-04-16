import { UserRole } from "enums/user";
import { PAGE_PATHS } from "./page-paths";

const ALLOW_ALL = [
  UserRole.Admin,
  UserRole.Assistant,
  UserRole.SuperAdmin,
  UserRole.Employee,
];

export const PAGE_PERMISSIONS = {
  [PAGE_PATHS.HOME]: ALLOW_ALL,
  [PAGE_PATHS.PAGE_NOT_FOUND]: ALLOW_ALL,
  [PAGE_PATHS.FEEDBACK_FOR_ME_LIST]: ALLOW_ALL,
  [PAGE_PATHS.FEEDBACK_FOR_ME_BY_FORMID]: ALLOW_ALL,
  [PAGE_PATHS.FEEDBACK_I_PROVIDED_LIST]: ALLOW_ALL,
  [PAGE_PATHS.FEEDBACK_I_PROVIDED_BY_FORMID]: ALLOW_ALL,
  [PAGE_PATHS.FEEDBACK_SEND]: ALLOW_ALL,
  [PAGE_PATHS.REQUEST]: ALLOW_ALL,
  [PAGE_PATHS.REQUEST_SEND_TO_ALL]: [UserRole.Admin, UserRole.SuperAdmin],
  [PAGE_PATHS.REQUEST_ADD_360_REVIEWER]: ALLOW_ALL,
  [PAGE_PATHS.REQUEST_ANYTIME_FEEDBACK]: ALLOW_ALL,
  [PAGE_PATHS.FEEDBACK_PROACTIVELY_GIVE_ANYTIME]: ALLOW_ALL,
  [PAGE_PATHS.FEEDBACK_PROACTIVELY_GIVE_THREE60]: ALLOW_ALL,
  [PAGE_PATHS.FORM]: [UserRole.Admin, UserRole.SuperAdmin],
  [PAGE_PATHS.FORM_CREATE]: [UserRole.Admin, UserRole.SuperAdmin],
  [PAGE_PATHS.FORM_EDIT]: [UserRole.Admin, UserRole.SuperAdmin],
  [PAGE_PATHS.THREE60_FEEDBACK_LIST]: [UserRole.SuperAdmin],
  [PAGE_PATHS.THREE60_FEEDBACK_BY_FORMID]: [UserRole.SuperAdmin],
  [PAGE_PATHS.PEER_FEEDBACK_LIST]: [
    UserRole.Assistant,
    UserRole.Admin,
    UserRole.SuperAdmin,
  ],
  [PAGE_PATHS.PEER_FEEDBACK_ITEM]: [
    UserRole.Assistant,
    UserRole.SuperAdmin,
    UserRole.Admin,
  ],
};
