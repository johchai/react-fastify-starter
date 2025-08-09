import { getPostsQueryKey } from "@client/features";

import { postApiPostsMutation } from "@internal/openapi-types/@tanstack";
import type { Options } from "@internal/openapi-types/sdk";
import type { PostApiPostsData } from "@internal/openapi-types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = (params?: {
  requestOptions?: Partial<Options<PostApiPostsData>>;
  mutationConfig?: Partial<ReturnType<typeof postApiPostsMutation>>;
}) => {
  const queryClient = useQueryClient();

  const base = postApiPostsMutation(params?.requestOptions);
  const userOnSuccess = params?.mutationConfig?.onSuccess;

  return useMutation({
    ...base,
    ...(params?.mutationConfig ?? {}),
    onSuccess: (data, variables, context) => {
      // Invalidate posts list to get updated list including new post
      queryClient.invalidateQueries({ queryKey: getPostsQueryKey() });

      // Call user-provided onSuccess if any
      userOnSuccess?.(data, variables, context);
    }
  });
};
