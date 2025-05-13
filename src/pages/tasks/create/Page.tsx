import Back from "@/components/back";
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
import { users } from "@/dummy/data";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { z } from "zod";

const FormSchema = z.object({
  id: z.string(),
  user_id: z.number(),
  title: z.string(),
  deadline: z.date(),
  priority: z.string(),
  status: z.string(),
  description: z.string(),
});

export default function TasksCreatePage() {
  const { toast } = useToast();
  const { id } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: id,
      user_id: users[0].id,
      title: "",
      priority: "unknown",
      status: "to do",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
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

        {/* Form Create */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 md:mt-4 "
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-foreground text-xs md:text-base"
                    htmlFor="title"
                  >
                    Title
                  </FormLabel>
                  <Input
                    id="title"
                    placeholder="Title"
                    {...field}
                    className="text-xs md:text-base"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"blue"}
              type="submit"
              className="ml-auto md:col-span-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </SidebarInset>
  );
}
