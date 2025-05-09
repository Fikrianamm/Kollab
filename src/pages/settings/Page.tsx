import { FileInput } from "@/components/fileInput";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { users } from "@/dummy/data";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const FormProfileSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string(),
});

export const FormPasswordSchema = z
  .object({
    currPass: z.string().nonempty(),
    newPass: z
      .string()
      .nonempty()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPass: z.string(),
  })
  .refine((data) => data.newPass === data.confirmPass, {
    message: "Passwords don't match",
    path: ["confirmPass"],
  });

function FormProfile() {
  const user = users[0];
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormProfileSchema>>({
    resolver: zodResolver(FormProfileSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormProfileSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-sm md:text-base font-normal text-muted-foreground">
          Preview Profile
        </p>
        <div className="flex gap-3 items-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 md:w-16 md:h-16"
          />
          <div className="flex flex-col">
            <p className="text-sm md:text-lg font-semibold">@{user.username}</p>
            <p className="text-xs md:text-base font-normal text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground" htmlFor="name">
                      Name
                    </FormLabel>
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
                    <FormLabel className="text-foreground" htmlFor="username">
                      Username
                    </FormLabel>
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
                    <FormLabel className="text-foreground" htmlFor="email">
                      Email
                    </FormLabel>
                    <Input id="email" placeholder="m@example.com" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FileInput
                form={form}
                name="avatar"
                label="Avatar"
                className="w-full"
              />
              <Button type="submit" variant={"blue"} className="w-max ml-auto">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

function FormPassword() {
  const [showCurrPassword, setShowCurrPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormPasswordSchema>>({
    resolver: zodResolver(FormPasswordSchema),
    defaultValues: {
      currPass: "",
      newPass: "",
      confirmPass: "",
    },
  });

  const toggleCurrPasswordVisibility = () => {
    setShowCurrPassword(!showCurrPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function onSubmit(data: z.infer<typeof FormPasswordSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <>
      <div className="flex flex-col gap-2 mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                name="currPass"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="currPass">Current Password</FormLabel>
                    <div className="relative">
                      <Input
                        id="currPass"
                        type={showCurrPassword ? "text" : "password"}
                        placeholder="******"
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={toggleCurrPasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-3"
                      >
                        {showCurrPassword ? (
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
              <FormField
                name="newPass"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="newPass">New Password</FormLabel>
                    <div className="relative">
                      <Input
                        id="newPass"
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
                        {showPassword ? (
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
              <FormField
                name="confirmPass"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPass">
                      Confirm Password
                    </FormLabel>
                    <div className="relative">
                      <Input
                        id="confirmPass"
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
              <Button type="submit" variant={"blue"} className="w-max ml-auto">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default function SettingPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 pb-28 px-4">
        <div className="flex flex-col gap-4 p-4 rounded-md border border-border">
          <div>
            <h2 className="md:text-[32px] text-2xl font-semibold">
              Profile Information
            </h2>
            <p className="text-sm md:text-xl text-muted-foreground">
              Update your accounts profile information
            </p>
          </div>
          <FormProfile />
        </div>
        <div className="flex flex-col gap-4 p-4 rounded-md border border-border">
          <div>
            <h2 className="md:text-[32px] text-2xl font-semibold">
              Update Password
            </h2>
            <p className="text-sm md:text-xl text-muted-foreground">
              Ensure your account is using a long, random password to stay
              secure
            </p>
          </div>
          <FormPassword />
        </div>
      </div>
    </SidebarInset>
  );
}
