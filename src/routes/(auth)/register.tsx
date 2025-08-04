import { createFileRoute } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { RegisterForm } from "../../components/auth/register-form.tsx";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid lg:grid-cols-2 min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start gap-2">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex justify-center items-center bg-primary rounded-md size-6 text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            BukRow
          </a>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative bg-muted">
        <img
          src="https://t4.ftcdn.net/jpg/08/15/81/65/360_F_815816533_MU29lmFkE2Y6R65nGz1W1y5LvjKyluQg.jpg"
          alt="Image"
          className="absolute inset-0 dark:brightness-[0.8] dark:grayscale w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
