import { Type } from "@sinclair/typebox";

import { BaseError, BaseFail, BaseSuccess } from "./base";

export const RawUserSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String({ format: "email" }),
  hashed_password: Type.String(),
  created_at: Type.String({ format: "date-time" }),
  deleted_at: Type.Optional(Type.String({ format: "date-time" }))
});

export const PublicUserSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String({ format: "email" })
});

export const AuthSchemas = {
  Login: {
    Body: Type.Object({
      email: Type.String({ format: "email" }),
      password: Type.String({ minLength: 6 })
    }),
    Response: BaseSuccess(Type.Object({ user: PublicUserSchema })),
    Fail: BaseFail(false),
    Error: BaseError
  },

  Logout: {
    Response: BaseSuccess(Type.Object({})),
    Error: BaseError
  },

  Refresh: {
    Response: BaseSuccess(Type.Object({})),
    Fail: BaseFail(false)
  }
};
