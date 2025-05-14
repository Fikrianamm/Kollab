/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  enumPriorityType,
  enumStatusType,
  ITaskData,
  PriorityType,
  StatusType,
} from "@/types/types";
import { PriorityTaskBadge, StatusTaskBadge } from "@/components/badge";
import ReactQuill from "react-quill-new";
import { useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import usePeople from "@/stores/usePeople";
import { useNavigate, useParams } from "react-router";
import useWorkspace from "@/stores/useWorkspace";
import useTask from "@/stores/useTask";

const FormSchema = z.object({
  title: z.string(),
  deadline: z.date(),
  priority: z.string(),
  status: z.string(),
  description: z.string(),
  user_id: z.string(),
  workspace_id: z.string(),
});

export default function TasksEditPage() {
  const { peoples, getAllPeople } = usePeople();
  const { workspaces } = useWorkspace();
  const { getTask, task, updateTask, loading, resetTask } = useTask();
  const navigate = useNavigate();
  const { id } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      priority: "",
      status: "",
      description: "",
      user_id: "",
      workspace_id: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { success } = await updateTask(data as ITaskData, id as string);
    if (success) {
      navigate("/tasks");
    }
  }

  useEffect(() => {
    getAllPeople();
  }, [getAllPeople]);

  useEffect(() => {
    getTask(id as string);
  }, [getTask, id]);

  useEffect(() => {
    if (task && peoples) {
      form.reset({
        title: task.title,
        deadline: task.deadline ? new Date(task.deadline) : new Date(),
        priority: task.priority,
        status: task.status,
        description: task.description,
        user_id: task.user_id ? String(task.user_id) : "",
        workspace_id: task.workspace_id ? String(task.workspace_id) : "",
      });
    }
  }, [task, form, peoples]);

  useEffect(() => {
    return () => {
      resetTask();
    };
  }, [resetTask]);

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
                <BreadcrumbLink href={`/peoples`}>Tasks</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">Edit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 pb-28 px-4 pt-0">
        {loading ? (
          <div className="border border-border w-full h-full flex items-center justify-center rounded-md">
            Loading...
          </div>
        ) : (
          <>
            <div>
              <h2 className="md:text-2xl text-lg font-semibold">Edit Task</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Update your task information
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
                      <FormLabel className="text-foreground" htmlFor="title">
                        Title
                      </FormLabel>
                      <Input id="title" placeholder="Title" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a priority task" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {enumPriorityType.map((priority) => (
                            <SelectItem value={priority} key={priority}>
                              <PriorityTaskBadge
                                priority={priority as PriorityType}
                              />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a status task" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {enumStatusType.map((status) => (
                            <SelectItem value={status} key={status}>
                              <StatusTaskBadge status={status as StatusType} />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Assginees</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? peoples?.find(
                                    (people) =>
                                      String(people.id) === field.value
                                  )?.name
                                : "Select Member"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search member..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No member found.</CommandEmpty>
                              <CommandGroup>
                                {peoples?.map((people) => (
                                  <CommandItem
                                    value={people.name}
                                    key={people.id}
                                    onSelect={() => {
                                      form.setValue(
                                        "user_id",
                                        people.id?.toString() as string
                                      );
                                    }}
                                  >
                                    <img
                                      src={people.avatar}
                                      alt={people.username}
                                      className="w-5 h-5 rounded-full"
                                    />
                                    {people.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        String(people.id) === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workspace_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a workspace" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {workspaces.map((workspace) => (
                            <SelectItem
                              value={String(workspace.id)}
                              key={workspace.id}
                            >
                              {workspace.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <ReactQuill
                        theme="snow"
                        placeholder="Add your comment"
                        className={`${
                          form.formState.errors.description
                            ? "border-red-500"
                            : ""
                        } h-max`}
                        {...field}
                        onChange={(content) => field.onChange(content)}
                      />
                    </FormItem>
                  )}
                />
                <Button
                  variant={"blue"}
                  type="submit"
                  className="ml-auto md:col-span-2"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Updating..." : "Update"}
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </SidebarInset>
  );
}
