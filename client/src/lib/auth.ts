import { configureAuth } from "react-query-auth";

import { client } from "../../../packages/openapi-types/generated/client.gen";
import {
  getApiAuthMe,
  postApiAuthLogin,
  postApiAuthLogout,
  postApiAuthRefresh,
  postApiAuthRegister
} from "../../../packages/openapi-types/generated/sdk.gen";

// configure client's instance to include credentials
client.setConfig({
  credentials: "include"
});

const authConfig = {
  userFn: async () => {
    try {
      // call /me, if failed, then try /refresh.
      const res = await getApiAuthMe();
      if (res.error && res.error.status === "fail") {
        try {
          const refreshRes = await postApiAuthRefresh();
          if (refreshRes.data?.data.user) {
            return refreshRes.data.data.user;
          }
        } catch (refreshErr) {
          console.error("Refresh failed", refreshErr);
        }
        throw new Error("User not authenticated");
      }
      return res.data?.data.user;
    } catch (err) {
      console.error("Unexpected error during auth check:", err);
      throw new Error("User not authenticated");
    }
  },
  loginFn: async (data: Parameters<typeof postApiAuthLogin>[0]["body"]) => {
    const res = await postApiAuthLogin({
      body: {
        email: data.email,
        password: data.password
      }
    });
    return res.data?.data.user;
  },
  registerFn: async (
    data: Parameters<typeof postApiAuthRegister>[0]["body"]
  ) => {
    const res = await postApiAuthRegister({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      }
    });
    return res.data?.data.user;
  },
  logoutFn: async () => {
    await postApiAuthLogout();
  }
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);
