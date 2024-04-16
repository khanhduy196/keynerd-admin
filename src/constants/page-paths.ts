export const PARAMS = {
  ID: ":id",
  FORMID: ":formId",
  REVIEWEEID: ":revieweeId",
};

export const PAGE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  THREE60_FEEDBACK_LIST: "/360",
  THREE60_FEEDBACK_BY_FORMID: "/360/" + PARAMS.ID,
  PEER_FEEDBACK_LIST: "/peer",
  PEER_FEEDBACK_ITEM: "/peer/" + PARAMS.FORMID + "/" + PARAMS.REVIEWEEID,
  FORM: "/form",
  FORM_CREATE: "/form/create",
  FORM_EDIT: "/form/" + PARAMS.ID,
  REQUEST: "/request",
  REQUEST_SEND_TO_ALL: "/request/send",
  REQUEST_ADD_360_REVIEWER: "/request/add/360",
  REQUEST_ANYTIME_FEEDBACK: "/request/add/anytime",
  FEEDBACK_FOR_ME_LIST: "/feedback/for-me",
  FEEDBACK_FOR_ME_BY_FORMID: "/feedback/for-me/" + PARAMS.ID,
  FEEDBACK_I_PROVIDED_LIST: "/feedback/i-provided",
  FEEDBACK_I_PROVIDED_BY_FORMID: "/feedback/i-provided/" + PARAMS.ID,
  // Write feedback to someone by feedback request page
  FEEDBACK_SEND: "/feedback/" + PARAMS.ID + "/send",
  // Proactively give feedback to someone page
  FEEDBACK_PROACTIVELY_GIVE_ANYTIME: "/feedback/give/anytime",
  FEEDBACK_PROACTIVELY_GIVE_THREE60: "/feedback/give/360",
  KEYCAP: "/keycap",
  PAGE_NOT_FOUND: "/page-not-found",
};
