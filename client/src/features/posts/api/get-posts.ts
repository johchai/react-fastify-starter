import {
  type GetApiPostsData,
  type Options,
  getApiPostsOptions,
  getApiPostsQueryKey
} from "@internal/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPosts = (options?: Options<GetApiPostsData>) => {
  return useQuery(getApiPostsOptions(options));
};

export const getPostsQueryKey = (options?: Options<GetApiPostsData>) =>
  getApiPostsQueryKey(options);
