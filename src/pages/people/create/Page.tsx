import Back from "@/components/back";
import { FileInputAvatarImage } from "@/components/fileInput";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
import usePeople from "@/stores/usePeople";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const FormSchema = z
  .object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    avatar: z.string(),
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

export default function PeoplesCreatePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, createPeople } = usePeople();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      avatar: "https://avatar.iran.liara.run/username?username=Your+Name",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { success } = await createPeople(data);
    if (success) {
      navigate("/peoples");
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Back />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/peoples`}>Peoples</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 pb-28 px-4 pt-0">
        <div>
          <h2 className="md:text-2xl text-lg font-semibold">Create People</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Fill out this form to add a new people
          </p>
        </div>

        {/* Preview Profile */}
        <div className="flex flex-col gap-2">
          <p className="text-xs md:text-sm font-normal text-muted-foreground">
            Preview Profile
          </p>
          <div className="flex gap-3 items-center">
            <img
              src={form.watch("avatar")}
              alt={form.watch("username")}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-center object-fit-cover"
            />
            <div className="flex flex-col">
              <p className="text-sm md:text-lg font-semibold">
                @
                {`${
                  form.watch("username") ? form.watch("username") : "yourname"
                }`}
              </p>
              <p className="text-xs md:text-base font-normal text-muted-foreground">
                {`${
                  form.watch("email")
                    ? form.watch("email")
                    : "youremail@example.com"
                }`}
              </p>
            </div>
          </div>
        </div>
        {/* Form Create */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 md:mt-4 "
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-foreground text-xs md:text-base"
                    htmlFor="name"
                  >
                    Name
                  </FormLabel>
                  <Input
                    id="name"
                    placeholder="Name"
                    {...field}
                    className="text-xs md:text-base"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-foreground text-xs md:text-base"
                    htmlFor="username"
                  >
                    Username
                  </FormLabel>
                  <Input
                    id="username"
                    placeholder="Username"
                    {...field}
                    className="text-xs md:text-base"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-foreground text-xs md:text-base"
                    htmlFor="name"
                  >
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    {...field}
                    className="text-xs md:text-base"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FileInputAvatarImage
              form={form}
              name="avatar"
              label="Avatar"
              className="w-full text-xs md:text-base"
              setValue={form.setValue}
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
                      {showPassword ? (
                        <EyeOff size={16} className="text-muted-foreground" />
                      ) : (
                        <Eye size={16} className="text-muted-foreground" />
                      )}
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
                        <EyeOff size={16} className="text-muted-foreground" />
                      ) : (
                        <Eye size={16} className="text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"blue"}
              type="submit"
              className="ml-auto md:col-span-2"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </SidebarInset>
  );
}
