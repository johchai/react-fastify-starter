import type { LoginParams, RegisterParams } from "@client/types";

import { ApiError, AuthService } from "@internal/openapi-types";
import { configureAuth } from "react-query-auth";

const authConfig = {
  userFn: async () => {
    try {
      const res = await AuthService.getApiAuthMe();
      return res.data.user;
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          try {
            const refreshRes = await AuthService.postApiAuthRefresh();
            if (refreshRes.data.user) {
              return refreshRes.data.user;
            }
          } catch (refreshErr) {
            console.error("Refresh failed", refreshErr);
          }
        }
      }

      throw new Error("User not authenticated");
    }
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
