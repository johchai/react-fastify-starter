import {
  type GetApiUsersData,
  type Options,
  getApiUsersOptions,
  getApiUsersQueryKey
} from "@internal/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (options?: Options<GetApiUsersData>) => {
  return useQuery(getApiUsersOptions(options));
};

export const getUsersQueryKey = (options?: Options<GetApiUsersData>) =>
  getApiUsersQueryKey(options);
