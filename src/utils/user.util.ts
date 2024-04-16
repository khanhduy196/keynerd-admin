import { UserProfileResponse } from "responses";
import { UserProfile } from "types/user";

export const transformToUserProfile = (
  user?: UserProfileResponse,
  isCurrentUser?: boolean,
  anonymousText = "Anonymous"
): UserProfile => {
  if (!user) {
    return {
      displayName: anonymousText,
    };
  }

  const { email, id, avatar } = user;

  if (isCurrentUser) {
    return { displayName: "You", id, avatar };
  }

  return { displayName: email, id, avatar };
};

export const getReviewersInfoToDisplay = (
  rawReviewers: UserProfileResponse[]
): UserProfile[] => {
  const anonymousReviewer = rawReviewers.find(({ id }) => !id);

  if (anonymousReviewer) {
    return [
      transformToUserProfile(undefined, undefined, "Anonymous Reviewer(s)"),
    ];
  }

  return rawReviewers.map((reviewer) => transformToUserProfile(reviewer));
};
