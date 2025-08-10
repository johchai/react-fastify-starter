import {
  type GetApiPostsByIdData,
  type Options,
  getApiPostsByIdOptions,
  getApiPostsByIdQueryKey
} from "@internal/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPost = (options: Options<GetApiPostsByIdData>) => {
  return useQuery(getApiPostsByIdOptions(options));
};

// For prefetching or SSR usage
export const getPostQueryKey = (options: Options<GetApiPostsByIdData>) =>
  getApiPostsByIdQueryKey(options);
