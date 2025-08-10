import {
  getApiPostsOptions,
  getApiPostsQueryKey
} from "@internal/openapi-types";
import type { GetApiPostsData, Options } from "@internal/openapi-types";
import { useQuery } from "@tanstack/react-query";

export const useGetPosts = (options?: Options<GetApiPostsData>) => {
  return useQuery(getApiPostsOptions(options));
};

export const getPostsQueryKey = (options?: Options<GetApiPostsData>) =>
  getApiPostsQueryKey(options);
