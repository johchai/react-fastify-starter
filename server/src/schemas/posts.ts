import { Type } from "@sinclair/typebox";

import { BaseError, BaseFail, BaseSuccess } from "./base";

export const Post = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  content: Type.String()
});

export const PostSchemas = {
  Create: {
    Body: Type.Object({
      title: Type.String({ minLength: 1, maxLength: 240 }),
      content: Type.String({ minLength: 1, maxLength: 1000 })
    }),
    Response: BaseSuccess(Type.Object({ post: Post })),
    Fail: BaseFail(false),
    Error: BaseError
  }
};
