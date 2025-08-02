import { Type } from "@sinclair/typebox";

import { BaseError, BaseFail, BaseSuccess } from "./base";

export const User = Type.Object({
  id: Type.Number(),
  name: Type.String({ minLength: 3 }),
  email: Type.String({ format: "email" })
});

export const UserSchemas = {
  GetByID: {
    Params: Type.Object({
      id: Type.Number()
    }),
    Response: BaseSuccess(Type.Object({ user: User })),
    Fail: BaseFail(false),
    Error: BaseError
  },
  GetAll: {
    Response: BaseSuccess(
      Type.Object({
        users: Type.Array(User)
      })
    ),
    Fail: BaseFail(false),
    Error: BaseError
  },
  UpdateUser: {
    Params: Type.Object({
      id: Type.Number()
    }),
    Body: Type.Intersect([
      Type.Pick(User, ["name", "email"]),
      Type.Object({
        password: Type.String({ minLength: 8 })
      })
    ]),
    Response: BaseSuccess(Type.Object({ user: User })),
    Fail: BaseFail(false),
    Error: BaseError
  },
  RemoveUser: {
    Params: Type.Object({
      id: Type.Number()
    }),
    Response: BaseSuccess(Type.Object({ user: User })),
    Fail: BaseFail(false),
    Error: BaseError
  }
};
