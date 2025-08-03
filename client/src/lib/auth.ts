import type { LoginParams, RegisterParams } from "@client/types";

import { AuthService } from "@internal/openapi-types";
import { configureAuth } from "react-query-auth";

const authConfig = {
  userFn: async () => {
    const res = await AuthService.getApiAuthMe();
    return res.data.user;
  },
  loginFn: async (data: LoginParams) => {
    const res = await AuthService.postApiAuthLogin({
      email: data.email,
      password: data.password
    });
    return res.data.user;
  },
  registerFn: async (data: RegisterParams) => {
    const res = await AuthService.postApiAuthRegister({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role
    });
    return res.data.user;
  },
  logoutFn: async () => {
    await AuthService.postApiAuthLogout();
  }
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);
