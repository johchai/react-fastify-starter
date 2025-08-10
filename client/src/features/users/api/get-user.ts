import {
  getApiUsersByIdOptions,
  getApiUsersByIdQueryKey
} from "@internal/openapi-types";
import type { GetApiUsersByIdData, Options } from "@internal/openapi-types";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (options: Options<GetApiUsersByIdData>) => {
  return useQuery(getApiUsersByIdOptions(options));
};

// For prefetching or SSR usage
export const getUserQueryKey = (options: Options<GetApiUsersByIdData>) =>
  getApiUsersByIdQueryKey(options);
