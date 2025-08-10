import {
  getApiUsersOptions,
  getApiUsersQueryKey
} from "@internal/openapi-types";
import type { GetApiUsersData, Options } from "@internal/openapi-types";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (options?: Options<GetApiUsersData>) => {
  return useQuery(getApiUsersOptions(options));
};

export const getUsersQueryKey = (options?: Options<GetApiUsersData>) =>
  getApiUsersQueryKey(options);
