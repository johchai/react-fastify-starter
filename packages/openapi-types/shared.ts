// predefined types

export const RoleEnum = {
  admin: "admin",
  editor: "editor",
  viewer: "viewer",
} as const;

export type Role =
  | keyof typeof RoleEnum
  | (typeof RoleEnum)[keyof typeof RoleEnum];
