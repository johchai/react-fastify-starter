import { getPostQueryKey, getPostsQueryKey } from "@client/features";

import {
  type DeleteApiPostsByIdData,
  type Options,
  deleteApiPostsByIdMutation
} from "@internal/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePost = (params?: {
  requestOptions?: Partial<Options<DeleteApiPostsByIdData>>;
  mutationConfig?: Partial<ReturnType<typeof deleteApiPostsByIdMutation>>;
}) => {
  const queryClient = useQueryClient();

  const base = deleteApiPostsByIdMutation(params?.requestOptions);
  const userOnSuccess = params?.mutationConfig?.onSuccess;

  return useMutation({
    ...base,
    ...(params?.mutationConfig ?? {}),
    onSuccess: (data, variables, context) => {
      // 1. invalidate posts list
      queryClient.invalidateQueries({ queryKey: getPostsQueryKey() });

      // 2. invalidate the specific post if we have its id
      const postID = variables.path.id;
      if (postID) {
        queryClient.invalidateQueries({
          queryKey: getPostQueryKey({ path: { id: postID } })
        });
      }

      // 3. call user provide a onSuccess
      userOnSuccess?.(data, variables, context);
    }
  });
};
