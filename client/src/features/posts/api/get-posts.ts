import {
  getApiPostsOptions,
  getApiPostsQueryKey
} from "@internal/openapi-types/@tanstack";
import type { Options } from "@internal/openapi-types/sdk";
import type { GetApiPostsData } from "@internal/openapi-types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPosts = (options?: Options<GetApiPostsData>) => {
  return useQuery(getApiPostsOptions(options));
};

export const getPostsQueryKey = (options?: Options<GetApiPostsData>) =>
  getApiPostsQueryKey(options);
