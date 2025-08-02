import { TSchema, Type } from "@sinclair/typebox";

// SUGGESTION 1: MOVE ALL THESE TO /UTILS
// SUGGESTION 2: MOVE ALL THE OTHERS TO /ROUTES/*

export const BaseSuccess = <T extends TSchema>(dataSchema: T) =>
  Type.Object({
    status: Type.Literal("success"),
    message: Type.String(),
    data: dataSchema,
    timestamp: Type.String({ format: "date-time" })
  });

export const BaseFail = (includeErrors: boolean = false) =>
  Type.Object({
    status: Type.Literal("fail"),
    message: Type.String(),
    ...(includeErrors
      ? { errors: Type.Record(Type.String(), Type.String()) }
      : {}),
    timestamp: Type.String({ format: "date-time" })
  });

export const BaseError = Type.Object({
  status: Type.Literal("error"),
  message: Type.String(),
  timestamp: Type.String({ format: "date-time" })
});
