import {
  Button,
  Form,
  SelectInputField,
  TextInputField
} from "@client/components";
import { paths } from "@client/config";
import { useDeleteUser, useGetUser, useUpdateUser } from "@client/features";

import { zodResolver } from "@hookform/resolvers/zod";
import { zPatchApiUsersByIdData } from "@internal/openapi-types";
import { RoleEnum } from "@internal/openapi-types/shared";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";

type UpdateUserProps = {
  userID: string;
};

export const UpdateUser = ({ userID }: UpdateUserProps) => {
  const navigate = useNavigate();

  const updateUserMutation = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        console.log("User updated successfully");
      }
    }
  });
  const deleteUserMutation = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        console.log("User deleted successfully");
        navigate(paths.users.root.getHref());
      }
    }
  });

  const userQuery = useGetUser({
    path: { id: userID }
  });

  const onSubmit: SubmitHandler<z.infer<typeof zPatchApiUsersByIdData>> = (
    data
  ) => {
    updateUserMutation.mutate({
      path: { id: userID },
      body: {
        name: data.body.name,
        email: data.body.email,
        role: data.body.role,
        deleted_at: data.body.deleted_at
      }
    });
  };

  const form = useForm<z.infer<typeof zPatchApiUsersByIdData>>({
    resolver: zodResolver(zPatchApiUsersByIdData),
    defaultValues: {
      body: {
        name: userQuery.data?.data.user.name,
        email: userQuery.data?.data.user.email,
        role: userQuery.data?.data.user.role,
        deleted_at: userQuery.data?.data.user.deleted_at
      },
      path: {
        id: userID
      }
    }
  });

  // TODO: may need to do something to prevent admin role being updated.
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("Validation errors:", errors);
        })}
      >
        <TextInputField control={form.control} name="body.name" label="Name" />
        <TextInputField
          control={form.control}
          name="body.email"
          label="Email"
        />
        <SelectInputField
          control={form.control}
          name="body.role"
          label="Ticket priority"
          options={Object.entries(RoleEnum).map(([value, label]) => ({
            value,
            label
          }))}
        />
        <div className="flex w-full items-center gap-2">
          <Button type="submit" disabled={updateUserMutation.isPending}>
            {updateUserMutation.isPending ? "Updating..." : "Update"}
          </Button>
          {userQuery.data?.data.user.deleted_at ? (
            <Button
              type="button"
              disabled={
                updateUserMutation.isPending || deleteUserMutation.isPending
              }
              variant="secondary"
              onClick={() => {
                updateUserMutation.mutate({
                  path: { id: userID },
                  body: {
                    name: userQuery.data?.data.user.name,
                    email: userQuery.data?.data.user.email,
                    role: userQuery.data?.data.user.role,
                    deleted_at: null
                  }
                });
              }}
            >
              Restore
            </Button>
          ) : (
            <Button
              type="button"
              disabled={deleteUserMutation.isPending}
              variant="destructive"
              onClick={() =>
                deleteUserMutation.mutate({ path: { id: userID } })
              }
            >
              Deactivate
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
