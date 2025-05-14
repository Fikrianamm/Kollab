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
import { CalendarIcon, Check, ChevronsUpDown, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import usePeople from "@/stores/usePeople";
import { useNavigate, useSearchParams } from "react-router";
import useWorkspace from "@/stores/useWorkspace";
import useTask from "@/stores/useTask";

export const SubtaskSchema = z.object({
  is_complete: z.boolean(),
  description: z.string(),
});

const FormSchema = z.object({
  title: z
    .string()
    .max(50, { message: "Title must be at most 50 characters long." }),
  deadline: z.date({
    required_error: "A date of deadline is required.",
  }),
  priority: z.string(),
  status: z.string(),
  description: z
    .string()
    .max(250, { message: "Title must be at most 250 characters long." }),
  subtask: z.array(SubtaskSchema),
  user_id: z.string(),
  workspace_id: z.string(),
});

export default function TasksCreatePage() {
  const { peoples, getAllPeople } = usePeople();
  const { workspaces } = useWorkspace();
  const { loading, createTask } = useTask();
  const [searchParams] = useSearchParams();
  const workspaceParams = searchParams.get("workspaceId") as string;
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      priority: "unknown",
      status: "to do",
      description: "",
      user_id: "",
      workspace_id: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = {
      title: data.title,
      deadline: data.deadline,
      priority: data.priority,
      status: data.status,
      description: data.description,
      subtask: data.subtask,
      user_id: data.user_id,
    };
    const { success } = await createTask(
      formData as ITaskData,
      data.workspace_id
    );
    if (success) {
      navigate("/tasks");
    }
  }

  useEffect(() => {
    getAllPeople();
  }, [getAllPeople]);

  useEffect(() => {
    if (workspaceParams) {
      form.reset({
        workspace_id: workspaceParams,
      });
    }
  }, []);

  useEffect(() => {
    if (workspaceParams) {
      form.setValue("workspace_id", workspaceParams);
    }
  }, [workspaceParams]);

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
                <BreadcrumbPage className="line-clamp-1">Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 pb-28 px-4 pt-0">
        <div>
          <h2 className="md:text-2xl text-lg font-semibold">Create Task</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Add your task information
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
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                                  people.id?.toString() === field.value
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
                                    people.id?.toString() === field.value
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                      form.formState.errors.description ? "border-red-500" : ""
                    } h-max`}
                    {...field}
                    onChange={(content) => field.onChange(content)}
                  />
                </FormItem>
              )}
            />
            <SubtaskForm form={form} />

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

function SubtaskForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtask", // Perbaikan: mengubah "subtask" menjadi "subtasks" agar sesuai dengan schema
  });

  const [newSubtaskDescription, setNewSubtaskDescription] = useState("");
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);

  // Fungsi untuk menambahkan subtask baru
  const addSubtask = (e: any) => {
    e.preventDefault();

    if (newSubtaskDescription.trim() === "") return;

    append({
      is_complete: false,
      description: newSubtaskDescription.trim(),
    });

    setNewSubtaskDescription("");
    setIsAddingSubtask(false);
  };

  // Fungsi untuk toggle subtask completion
  const toggleSubtask = (index: number, currentValue: boolean) => {
    const updatedFields = [...fields];
    updatedFields[index].is_complete = !currentValue;
    form.setValue(`subtask.${index}.is_complete`, !currentValue);
  };

  return (
    <div className="col-span-2 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="font-medium">Subtasks</p>
        <Button
          variant={"transparent"}
          type="button"
          className="text-blue-600"
          onClick={() => setIsAddingSubtask(true)}
        >
          <Plus size={16} className="mr-1" />
          Add Subtask
        </Button>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {fields.length === 0 && !isAddingSubtask && (
          <p className="text-sm text-muted-foreground">No subtasks added yet</p>
        )}

        {fields.map((subtask, index) => (
          <div
            key={subtask.id}
            className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-md p-3"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`subtask-${index}`}
                checked={subtask.is_complete}
                onCheckedChange={() =>
                  toggleSubtask(index, subtask.is_complete)
                }
              />
              <label
                htmlFor={`subtask-${index}`}
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  subtask.is_complete ? "line-through text-gray-500" : ""
                }`}
              >
                {subtask.description}
              </label>
            </div>
            <Button
              variant={"ghost"}
              className="hover:bg-red-100 hover:text-red-600 h-8 w-8 p-0"
              type="button"
              onClick={() => remove(index)}
            >
              <Trash size={16} />
            </Button>
          </div>
        ))}

        {/* Form tambah subtask baru */}
        {isAddingSubtask && (
          <div className="mt-2 flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-md p-3">
            <div className="flex w-full gap-2">
              <Input
                type="text"
                placeholder="Enter subtask description"
                value={newSubtaskDescription}
                onChange={(e) => setNewSubtaskDescription(e.target.value)}
                autoFocus
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newSubtaskDescription.trim()) {
                    e.preventDefault();
                    addSubtask(e);
                  }
                }}
              />
              <Button
                variant={"blue"}
                type="button" // Ubah dari "submit" ke "button"
                className="bg-blue-500 hover:bg-blue-600"
                disabled={!newSubtaskDescription.trim()}
                onClick={(e) => addSubtask(e)} // Tambahkan onClick handler
              >
                Add
              </Button>
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => {
                  setIsAddingSubtask(false);
                  setNewSubtaskDescription("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
