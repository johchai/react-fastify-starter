import {
  Button,
  Form,
  TextAreaInputField,
  TextInputField
} from "@client/components";
import { paths } from "@client/config";
import { useDeletePost, useGetPost, useUpdatePost } from "@client/features";

import { zodResolver } from "@hookform/resolvers/zod";
import { zPatchApiPostsByIdData } from "@internal/types";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";

type UpdatePostProps = {
  postID: string;
};

export const UpdatePost = ({ postID }: UpdatePostProps) => {
  const navigate = useNavigate();

  const updatePostMutation = useUpdatePost({
    mutationConfig: {
      onSuccess: () => {
        console.log("Post updated successfully");
      }
    }
  });
  const deletePostMutation = useDeletePost({
    mutationConfig: {
      onSuccess: () => {
        console.log("Post deleted successfully");
        navigate(paths.posts.root.getHref());
      }
    }
  });

  const postQuery = useGetPost({
    path: { id: postID }
  });

  const onSubmit: SubmitHandler<z.infer<typeof zPatchApiPostsByIdData>> = (
    data
  ) => {
    updatePostMutation.mutate({
      path: { id: postID },
      body: {
        title: data.body?.title,
        content: data.body?.content
      }
    });
  };

  const form = useForm<z.infer<typeof zPatchApiPostsByIdData>>({
    resolver: zodResolver(zPatchApiPostsByIdData),
    defaultValues: {
      body: {
        title: postQuery.data?.data.post.title ?? "",
        content: postQuery.data?.data.post.content ?? ""
      },
      path: {
        id: postID
      }
    }
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("Validation errors:", errors);
        })}
      >
        <TextInputField
          control={form.control}
          name="body.title"
          label="Title"
        />
        <TextAreaInputField
          control={form.control}
          label="Content"
          name="body.content"
          placeholder="Enter post content here..."
        />
        <div className="flex w-full items-center gap-2">
          <Button type="submit" disabled={updatePostMutation.isPending}>
            {updatePostMutation.isPending ? "Updating..." : "Update"}
          </Button>
          <Button
            type="button"
            disabled={deletePostMutation.isPending}
            variant="destructive"
            onClick={() => deletePostMutation.mutate({ path: { id: postID } })}
          >
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
};
