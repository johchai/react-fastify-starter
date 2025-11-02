export declare enum RoleEnum {
    admin = "admin",
    editor = "editor",
    viewer = "viewer"
}
export type Role = keyof typeof RoleEnum | (typeof RoleEnum)[keyof typeof RoleEnum];
