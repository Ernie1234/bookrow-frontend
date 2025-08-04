// components/forms/LoginForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { BsGoogle } from "react-icons/bs";
import { Link } from "@tanstack/react-router";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import {
  loginSchema,
  type LoginData,
} from "../../validation/authValidationSchema";
import { useLogin } from "../../hooks/useAuth";

interface LoginFormProps extends React.ComponentProps<"form"> {
  onSuccess?: () => void;
}

export function LoginForm({ className, onSuccess, ...props }: LoginFormProps) {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      onSuccess?.();
    },
  });
  const onSubmit = (data: LoginData) => {
    login(data);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-bold text-2xl">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="gap-6 grid">
        <div className="gap-3 grid">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...form.register("email")}
            error={form.formState.errors.email?.message}
          />
        </div>

        <div className="gap-3 grid">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="ml-auto text-sm hover:underline underline-offset-4"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            {...form.register("password")}
            error={form.formState.errors.password?.message}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="border-t border-border w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button variant="outline" className="w-full" asChild>
          <a href={`${import.meta.env.VITE_API_URL}/auth/google`}>
            <BsGoogle className="mr-2 size-4" />
            Login with Google
          </a>
        </Button>
      </div>

      <div className="text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
