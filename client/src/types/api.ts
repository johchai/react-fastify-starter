import type { ApiError, AuthService } from "@internal/openapi-types";

export type LoginParams = Parameters<typeof AuthService.postApiAuthLogin>[0];
export type RegisterParams = Parameters<
  typeof AuthService.postApiAuthRegister
>[0];

export type AuthApiError = InstanceType<typeof ApiError>;
