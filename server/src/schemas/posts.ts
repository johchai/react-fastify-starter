import { Type } from "@sinclair/typebox";

import { BaseError, BaseFail, BaseSuccess } from "./base";

export const Post = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  content: Type.String(),
  user_id: Type.Number(),
  created_at: Type.Optional(Type.String({ format: "date-time" }))
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
  },
  GetAll: {
    Response: BaseSuccess(Type.Object({ posts: Type.Array(Post) })),
    Fail: BaseFail(false),
    Error: BaseError
  },
  GetByID: {
    Params: Type.Object({
      id: Type.Number()
    }),
    Response: BaseSuccess(Type.Object({ post: Post })),
    Fail: BaseFail(false),
    Error: BaseError
  },
  UpdatePost: {
    Body: Type.Object({
      title: Type.Optional(Type.String({ minLength: 1, maxLength: 240 })),
      content: Type.Optional(Type.String({ minLength: 1, maxLength: 1000 }))
    }),
    Params: Type.Object({
      id: Type.Number()
    }),
    Response: BaseSuccess(Type.Object({ post: Post })),
    Fail: BaseFail(false),
    Error: BaseError
  },
  RemovePost: {
    Params: Type.Object({
      id: Type.Number()
    }),
    Response: BaseSuccess(Type.Object({ post: Post })),
    Fail: BaseFail(false),
    Error: BaseError
  }
};
