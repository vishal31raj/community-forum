export const USER_ROLES = {
  STUDENT: "student",
  MODERATOR: "moderator",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
