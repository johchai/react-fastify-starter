import {
  getApiUsersByIdOptions,
  getApiUsersByIdQueryKey
} from "@internal/openapi-types/@tanstack";
import type { Options } from "@internal/openapi-types/sdk";
import type { GetApiUsersByIdData } from "@internal/openapi-types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (options: Options<GetApiUsersByIdData>) => {
  return useQuery(getApiUsersByIdOptions(options));
};

// For prefetching or SSR usage
export const getUserQueryKey = (options: Options<GetApiUsersByIdData>) =>
  getApiUsersByIdQueryKey(options);
