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
import useWorkspace from "@/stores/useWorkspace";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string(),
  logo: z.string(),
  cover: z.string(),
});

export default function WorkspaceCreatePage() {
  const { loading, createWorkspace, getAllWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      logo: "",
      cover:
        "https://res.cloudinary.com/dbvqf264q/image/upload/v1747220438/backgroundwp1_wkdwid.jpg",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { success } = await createWorkspace(data);
    if (success) {
      getAllWorkspace();
      navigate("/dashboard");
    }
  }

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
                <BreadcrumbLink href={`#`}>Workspace</BreadcrumbLink>
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
          <h2 className="md:text-2xl text-lg font-semibold">
            Create Workspace
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Fill out this form to add a new workspace
          </p>
        </div>

        {/* Preview Profile */}
        <div className="flex flex-col gap-2">
          <p className="text-xs md:text-sm font-normal text-muted-foreground">
            Preview Workspace
          </p>
          <div
            className="bg-black rounded-md w-full h-52"
            style={{
              backgroundImage: form.watch("cover")
                ? `url(${form.watch("cover")})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="h-14 md:h-20 relative">
            <div className="absolute flex items-end justify-between -top-10 md:-top-16 w-full">
              <div className="flex items-end gap-4">
                {/* image workspace */}
                {form.watch("logo") ? (
                  <img
                    src={form.watch("logo")}
                    alt="Workspace Logo"
                    className="w-20 h-20 md:w-32 md:h-32 ml-4 rounded-md object-cover bg-background"
                  />
                ) : (
                  <div className="w-20 h-20 md:w-32 md:h-32 ml-4 rounded-md bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-2xl">Logo</span>
                  </div>
                )}
                <h2 className="md:text-[32px] text-2xl font-semibold md:mb-2">
                  {form.watch("name") || "Workspace Name"}
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/* Form Create */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 md:mt-4 "
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
                    placeholder="Name workspace"
                    {...field}
                    className="text-xs md:text-base"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FileInputAvatarImage
              form={form}
              name="logo"
              label="Logo"
              className="w-full text-xs md:text-base"
              setValue={form.setValue}
            />
            <FileInputAvatarImage
              form={form}
              name="cover"
              label="Cover"
              className="w-full text-xs md:text-base"
              setValue={form.setValue}
            />
            <Button
              variant={"blue"}
              type="submit"
              className="ml-auto md:col-span-2 lg:col-span-3"
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
