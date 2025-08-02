import { Type } from "@sinclair/typebox";

import { BaseError, BaseFail, BaseSuccess } from "./base";

export const RawUser = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String({ format: "email" }),
  hashed_password: Type.String(),
  created_at: Type.String({ format: "date-time" }),
  deleted_at: Type.Union([Type.String({ format: "date-time" }), Type.Null()])
});

export const PublicUser = Type.Object({
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
    Response: BaseSuccess(Type.Object({ user: PublicUser })),
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
