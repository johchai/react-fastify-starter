export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_LIST = {
  LOGIN: "/api/login",
  LOGOUT: "/api/logout",
  REGISTER: "/api/register",
  GET_USER_INFO: "/api/user/info",
  UPDATE_USER_INFO: "/api/user/update",
  DELETE_USER: "/api/user/delete",
  GET_ALL_USERS: "/api/users/all",
  GET_USER_BY_ID: (id: string) => `/api/user/${id}`,
  UPDATE_USER_BY_ID: (id: string) => `/api/user/${id}/update`,
  DELETE_USER_BY_ID: (id: string) => `/api/user/${id}/delete`
};
