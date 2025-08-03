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
import type { LoginParams } from "@client/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

interface LoginFormProps {
  onSuccess: () => void; // callback for successful login
  onFailure: () => void; // optional callback for failed login
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

  const onSubmit: SubmitHandler<LoginParams> = (data) => {
    setIsLoading(true);
    loginMutation.mutate({
      email: data.email,
      password: data.password
    });
  };

  const formSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters")
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
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
            name="email"
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
            name="password"
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
