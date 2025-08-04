import type {
  postApiAuthLogin,
  postApiAuthRegister
} from "@internal/openapi-types/sdk";
import { zPostApiAuthLoginData } from "@internal/openapi-types/zod";
import type z from "zod";

export type zLoginFormInput = z.infer<typeof zPostApiAuthLoginData>;
export type LoginParams = Parameters<typeof postApiAuthLogin>[0]["body"];
export type RegisterParams = Parameters<typeof postApiAuthRegister>[0]["body"];
