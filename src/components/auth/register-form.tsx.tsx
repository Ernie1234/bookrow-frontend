import { Link, useNavigate } from "@tanstack/react-router";

import { BsGoogle } from "react-icons/bs";
import { useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validation/authValidationSchema";
import { useRegisterUser, type RegisterApiPayload } from "../../hooks/useAuth";
import { Checkbox } from "../ui/checkbox";
import { Form } from "../ui/form";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  interface IFormValues {
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    adminToken?: string;
  }

  const form = useForm<IFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      isAdmin: false,
    },
  });

  const { mutate, isPending } = useRegisterUser({
    onSuccess: () => {
      form.reset();
      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      navigate({ to: "/login" });
    },
    onError: (error) => {
      if (error.message.includes("email")) {
        form.setError("email", { message: error.message });
      } else if (error.message.includes("username")) {
        form.setError("username", { message: error.message });
      } else {
        toast.error(error.message || "Registration failed. Please try again.");
      }
    },
  });

  // Watch the isAdmin field to conditionally render the token input
  const isAdminChecked = form.watch("isAdmin");
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const payload: RegisterApiPayload = {
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.isAdmin ? "ADMIN" : "USER",
      ...(data.isAdmin && { adminToken: data.adminToken }),
    };

    mutate(payload);
  };

  // Reset the adminToken field when the checkbox is unchecked
  useEffect(() => {
    if (!isAdminChecked) {
      form.setValue("adminToken", undefined);
    }
  }, [isAdminChecked, form.setValue]);

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-bold text-2xl">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details below to get started.
          </p>
        </div>

        <div className="gap-4 grid">
          {/* Username field */}
          <div className="gap-2 grid">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="john_doe"
              autoComplete="username"
              {...form.register("username")}
              aria-invalid={!!form.formState.errors.username}
            />
            {form.formState.errors.username && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="gap-2 grid">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              {...form.register("email")}
              aria-invalid={!!form.formState.errors.email}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="gap-2 grid">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              {...form.register("password")}
              aria-invalid={!!form.formState.errors.password}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
            <div className="text-muted-foreground text-xs">
              Must be at least 8 characters with uppercase, lowercase, number,
              and special character.
            </div>
          </div>

          {/* Role Checkbox Field */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAdmin"
              checked={isAdminChecked}
              onCheckedChange={(checked) => {
                form.setValue("isAdmin", !!checked, { shouldValidate: true });
              }}
            />
            <Label htmlFor="isAdmin" className="text-sm cursor-pointer">
              Register as an Admin
            </Label>
          </div>

          {/* Admin Token field (Conditionally Rendered) */}
          {isAdminChecked && (
            <div className="gap-2 grid">
              <Label htmlFor="adminToken">Admin Token</Label>
              <Input
                id="adminToken"
                type="text"
                placeholder="Enter 6-digit token"
                {...form.register("adminToken")}
                aria-invalid={!!form.formState.errors.adminToken}
              />
              {form.formState.errors.adminToken && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.adminToken.message}
                </p>
              )}
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isPending || !form.formState.isValid}
          aria-disabled={isPending || !form.formState.isValid}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="border-white border-b-2 rounded-full w-4 h-4 animate-spin"></span>
              Registering...
            </span>
          ) : (
            "Register"
          )}
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
            Register with Google
          </a>
        </Button>

        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:text-primary underline underline-offset-4"
            aria-label="Navigate to login page"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
}
