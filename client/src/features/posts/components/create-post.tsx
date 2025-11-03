import {
  Button,
  Form,
  TextAreaInputField,
  TextInputField
} from "@client/components";
import { paths } from "@client/config";
import { useCreatePost } from "@client/features";

import { zodResolver } from "@hookform/resolvers/zod";
import { type PostApiPostsData, zPostApiPostsData } from "@internal/types";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const CreatePost = () => {
  const navigate = useNavigate();

  const createPostMutation = useCreatePost({
    mutationConfig: {
      onSuccess: () => {
        console.debug("Post created successfully");
        navigate(paths.posts.root.getHref());
      }
    }
  });

  const onSubmit: SubmitHandler<Omit<PostApiPostsData, "url">> = (data) => {
    createPostMutation.mutate({
      body: {
        title: data.body.title,
        content: data.body.content
      }
    });
  };

  const form = useForm<Omit<PostApiPostsData, "url">>({
    resolver: zodResolver(zPostApiPostsData),
    defaultValues: {
      body: {
        title: "",
        content: ""
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
          placeholder="Enter post title here..."
        />
        <TextAreaInputField
          control={form.control}
          label="Content"
          name="body.content"
          placeholder="Enter post content here..."
        />
        <div className="flex w-full items-center gap-2">
          <Button type="submit" disabled={createPostMutation.isPending}>
            {createPostMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
