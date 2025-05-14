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
import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import useAuth from "@/stores/useAuth";

const FormSchema = z.object({
  email: z.string().email().nonempty(),
  password: z
    .string()
    .nonempty()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { loading, login, getUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { success } = await login(data);
    if (success) {
      navigate("/dashboard", { replace: true });
    }
  }

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground" htmlFor="email">
                  Email
                </FormLabel>
                <Input id="email" placeholder="m@example.com" {...field} autoFocus/>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground" htmlFor="password">
                  Password
                </FormLabel>
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Please contact your team leader.
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Want to create your own team?{" "}
          <Link
            to="/auth/register"
            className="hover:underline underline-offset-4 text-black dark:text-white"
          >
            Sign Up here as a leader.
          </Link>
        </div>
      </form>
    </Form>
  );
}
