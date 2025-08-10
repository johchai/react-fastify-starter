import { getUserQueryKey, getUsersQueryKey } from "@client/features";

import {
  type Options,
  type PatchApiUsersByIdData,
  patchApiUsersByIdMutation
} from "@internal/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = (params?: {
  requestOptions?: Partial<Options<PatchApiUsersByIdData>>;
  mutationConfig?: Partial<ReturnType<typeof patchApiUsersByIdMutation>>;
}) => {
  const queryClient = useQueryClient();

  const base = patchApiUsersByIdMutation(params?.requestOptions);
  const userOnSuccess = params?.mutationConfig?.onSuccess;

  return useMutation({
    ...base,
    ...(params?.mutationConfig ?? {}),
    onSuccess: (data, variables, context) => {
      // 1. invalidate users list
      queryClient.invalidateQueries({ queryKey: getUsersQueryKey() });

      // 2. invalidate the specific user if we have its id
      const userID = variables.path.id;
      if (userID) {
        queryClient.invalidateQueries({
          queryKey: getUserQueryKey({ path: { id: userID } })
        });
      }

      // 3. call user provide a onSuccess
      userOnSuccess?.(data, variables, context);
    }
  });
};
