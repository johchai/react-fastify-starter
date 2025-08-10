import { useState } from "react";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input
} from "@client/components";
import { useLogin } from "@client/lib";

import { zodResolver } from "@hookform/resolvers/zod";
import { zPostApiAuthLoginData } from "@internal/types";
import { type SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

interface LoginFormProps {
  onSuccess: () => void;
  onFailure: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = useLogin({
    onSuccess: () => {
      props.onSuccess();
    },
    onError: (error) => {
      props.onFailure();
      console.error("Login failed:", error);
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof zPostApiAuthLoginData>> = (
    data
  ) => {
    setIsLoading(true);
    loginMutation.mutate({
      email: data.body.email,
      password: data.body.password
    });
  };

  const form = useForm<z.infer<typeof zPostApiAuthLoginData>>({
    resolver: zodResolver(zPostApiAuthLoginData),
    defaultValues: {
      body: {
        email: "",
        password: ""
      }
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-6 md:p-8"
        >
          <FormField
            control={form.control}
            name="body.email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="hey@example.com"
                    type="email"
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body.password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" required {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || loginMutation.isPending}
          >
            {isLoading || loginMutation.isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
