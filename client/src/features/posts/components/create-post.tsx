import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input
} from "@client/components";
import { paths } from "@client/config";
import { useCreatePost } from "@client/features";

import { zodResolver } from "@hookform/resolvers/zod";
import { zPostApiPostsData } from "@internal/openapi-types/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";

export const CreatePost = () => {
  const navigate = useNavigate();

  const createPostMutation = useCreatePost({
    mutationConfig: {
      onSuccess: () => {
        console.log("Post created successfully");
        navigate(paths.posts.root.getHref());
      }
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof zPostApiPostsData>> = (data) => {
    createPostMutation.mutate({
      body: {
        title: data.body.title,
        content: data.body.content
      }
    });
  };

  const form = useForm<z.infer<typeof zPostApiPostsData>>({
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
        <FormField
          control={form.control}
          name="body.title"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" required {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body.content"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input type="text" required {...field} />
              </FormControl>
            </FormItem>
          )}
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
