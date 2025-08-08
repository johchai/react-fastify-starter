import {
  getApiPostsByIdOptions,
  getApiPostsByIdQueryKey
} from "@internal/openapi-types/@tanstack";
import type { Options } from "@internal/openapi-types/sdk";
import type { GetApiPostsByIdData } from "@internal/openapi-types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPost = (options: Options<GetApiPostsByIdData>) => {
  return useQuery(getApiPostsByIdOptions(options));
};

// For prefetching or SSR usage
export const getPostQueryKey = (options: Options<GetApiPostsByIdData>) =>
  getApiPostsByIdQueryKey(options);
