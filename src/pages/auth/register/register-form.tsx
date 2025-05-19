import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "@/stores/useAuth";
import Back from "@/components/back";

const FormSchema = z
  .object({
    name_team: z.string().nonempty(),
    name: z.string().nonempty(),
    username: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z
      .string()
      .nonempty()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { loading, register } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name_team: "",
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { success } = await register(data);
    if (success) {
      navigate("/auth/login");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            name="name_team"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name_team">Team Name</FormLabel>
                <Input id="name_team" placeholder="Your team name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" placeholder="Your name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" placeholder="Your username" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" placeholder="m@example.com" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirm_password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirm_password">
                  Confirm Password
                </FormLabel>
                <div className="relative">
                  <Input
                    id="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="******"
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              variant={"blue"}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                "Sign Up as Leader"
              )}
            </Button>
            <Back variant="button" />
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Member accounts can only be created by a leader inside the dashboard.
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="hover:underline underline-offset-4 text-black dark:text-white"
          >
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
}
