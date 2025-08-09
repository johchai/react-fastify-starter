import {
  getApiUsersOptions,
  getApiUsersQueryKey
} from "@internal/openapi-types/@tanstack";
import type { Options } from "@internal/openapi-types/sdk";
import type { GetApiUsersData } from "@internal/openapi-types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (options?: Options<GetApiUsersData>) => {
  return useQuery(getApiUsersOptions(options));
};

export const getUsersQueryKey = (options?: Options<GetApiUsersData>) =>
  getApiUsersQueryKey(options);
