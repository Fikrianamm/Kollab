import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { subTasks, tasks, users } from "@/dummy/data";
import { useToast } from "@/hooks/use-toast";
import formatCreatedAt from "@/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar, Plus, Settings, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { z } from "zod";
import ReactQuill from "react-quill-new";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PriorityType, StatusType, SubTask } from "@/types/types";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PriorityTaskBadge, StatusTaskBadge } from "@/components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Back from "@/components/back";

function CommentCard({
  avatar,
  username,
  description,
  created_at,
}: {
  avatar: string;
  username: string;
  description: string;
  created_at: Date;
}) {
  return (
    <div className="flex gap-4 items-start">
      <img src={avatar} alt={username} className="w-8 h-8" />
      <div className="flex flex-col flex-1 border border-border rounded-md">
        <div className="flex gap-2 px-4 py-2 bg-blue-900/10 border-b rounded-t-md border-border items-center">
          <div className="flex gap-2 items-center">
            <p className="text-sm font-semibold text-foreground">{username}</p>
          </div>
          <p className="ml-1 font-normal text-muted-foreground text-sm">
            {formatCreatedAt(created_at as Date)}
          </p>
        </div>
        <div className="p-4">
          <p className="text-sm text-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

const FormSchema = z.object({
  comment: z.string().nonempty(),
});

export function AssigneesSelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" role="combobox" aria-expanded={open}>
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0" align="end">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={String(user.id)}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {user.username}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === String(user.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function PriorityDropdown({
  currPriorityTask,
}: {
  currPriorityTask: PriorityType;
}) {
  const [priority, setPriority] = useState<PriorityType>(currPriorityTask);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Priority Task</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={priority}
          onValueChange={(value) => setPriority(value as PriorityType)}
        >
          <DropdownMenuRadioItem value="urgent">
            <PriorityTaskBadge priority="urgent" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="high">
            <PriorityTaskBadge priority="high" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="medium">
            <PriorityTaskBadge priority="medium" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="low">
            <PriorityTaskBadge priority="low" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="unknown">
            <PriorityTaskBadge priority="unknown" />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function StatusDropdown({
  currStatusTask,
}: {
  currStatusTask: StatusType;
}) {
  const [status, setStatus] = useState<StatusType>(currStatusTask);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Status Task</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={(value) => setStatus(value as StatusType)}
        >
          <DropdownMenuRadioItem value="to do">
            <StatusTaskBadge status="to do" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="in progress">
            <StatusTaskBadge status="in progress" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="on review">
            <StatusTaskBadge status="on review" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="done">
            <StatusTaskBadge status="done" />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function TasksViewPage() {
  const { idTask } = useParams();
  const task = tasks.find((task) => String(task.id) === idTask);
  const formatedDate = format(task?.deadline as Date, "dd LLL yyyy");
  const { toast } = useToast();
  const initialDataSubtasks = subTasks.filter(
    (subtask) => subtask.task_id === task?.id
  );
  const [subtasks, setSubtasks] = useState<SubTask[]>(
    initialDataSubtasks ?? []
  );

  const completedCount = subtasks.filter((task) => task.is_complete).length;
  const progress =
    subtasks.length > 0
      ? Math.round((completedCount / subtasks.length) * 100)
      : 0;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
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

  const toggleSubtask = (id: string) => {
    setSubtasks((subtasks) =>
      subtasks.map((task) =>
        String(task.id) === id
          ? { ...task, is_complete: !task.is_complete }
          : task
      )
    );
  };

  const [newSubtask, setNewSubtask] = useState("");
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        {
          id: 20,
          description: newSubtask,
          is_complete: false,
          task_id: task?.id as number,
        },
      ]);
      setNewSubtask("");
      setIsAddingSubtask(false);
    }
  };

  const deleteSubtask = (id: string) => {
    setSubtasks(subtasks.filter((task) => String(task.id) !== id));
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
                <BreadcrumbLink href={`/workspaces/${task?.workspace?.id}`}>
                  {task?.workspace?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  {task?.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 pb-28 px-4 pt-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-3xl font-semibold text-foreground">
            {task?.title}
          </h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={16} />
            <p className="text-xs md:text-sm font-normal">
              Deadline
              <span className="text-red-500 ml-2">{formatedDate}</span>
            </p>
          </div>
        </div>
        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 mt-2 md:mt-4">
          {/* information task */}
          <div className="flex flex-col col-span-2 gap-4">
            {/* description task */}
            <div className="flex flex-col border border-border rounded-md mb-4">
              <div className="flex flex-wrap gap-2 px-4 py-2 bg-blue-900/10 border-b border-border items-center">
                <div className="flex gap-2 items-center">
                  <img
                    src={task?.user?.avatar}
                    alt={task?.user?.username}
                    className="w-7 h-7"
                  />
                  <p className="text-base font-semibold text-foreground">
                    {task?.user?.username}
                  </p>
                </div>
                <p className="ml-2 font-normal text-muted-foreground text-sm">
                  created at {format(task?.created_at as Date, "dd LLL yyyy p")}
                </p>
              </div>
              <div className="p-4">
                <p className="text-base text-foreground">{task?.description}</p>
              </div>
              <Separator />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-2 items-center">
                    <h3 className="text-base font-semibold">Sub-Task</h3>
                    <p className="text-muted-foreground text-xs md:text-sm">{`${completedCount}/${subtasks.length} completed`}</p>
                  </div>
                  <Button
                    variant={"transparent"}
                    type="button"
                    className="text-blue-600"
                    onClick={() => setIsAddingSubtask(true)}
                  >
                    <Plus size={16} />
                    Add Subtask
                  </Button>
                </div>
                <Progress value={progress} />
                <div className="flex flex-col gap-2 mt-4">
                  {subtasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={String(task.id)}
                          checked={task.is_complete}
                          onCheckedChange={() => toggleSubtask(String(task.id))}
                        />
                        <label
                          htmlFor={String(task.id)}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {task.description}
                        </label>
                      </div>
                      <Button
                        variant={"ghost"}
                        className="hover:bg-red-200/30! dark:hover:bg-red-500/10! hover:text-red-600!"
                        type="button"
                        onClick={() => deleteSubtask(String(task.id))}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  ))}
                  {/* Add new sub-task input */}
                  {isAddingSubtask && (
                    <div className="mt-3 flex items-center">
                      <Input
                        type="text"
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                        placeholder="Add new sub-task"
                        autoFocus
                      />
                      <Button
                        variant={"blue"}
                        onClick={addSubtask}
                        className="ml-2 bg-blue-500 px-3 py-2 rounded-md text-sm"
                      >
                        Add
                      </Button>
                      <Button
                        variant={"ghost"}
                        onClick={() => setIsAddingSubtask(false)}
                        className="ml-2 text-gray-400 px-3 py-2 rounded-md text-sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {task?.comment?.map((comment) => (
              <CommentCard
                avatar={comment?.user?.avatar as string}
                username={comment?.user?.username as string}
                description={comment?.comment as string}
                created_at={comment?.date as Date}
              />
            ))}
            {/* Comment input */}
            <div className="flex gap-4 items-start">
              <img
                src={task?.user?.avatar}
                alt={task?.user?.username}
                className="w-8 h-8"
              />
              <div className="flex flex-col flex-1">
                <div className="flex gap-2 mb-2 items-center">
                  <div className="flex gap-2 items-center">
                    <p className="text-sm font-semibold text-foreground">
                      Add a comment
                    </p>
                  </div>
                </div>
                <div className="pb-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        name="comment"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <ReactQuill
                              theme="snow"
                              placeholder="Add your comment"
                              className={`${
                                form.formState.errors.comment
                                  ? "border-red-500"
                                  : ""
                              } h-max`}
                              {...field}
                              onChange={(content) => field.onChange(content)}
                            />
                          </FormItem>
                        )}
                      />
                      <div className="w-full mt-2 flex justify-end">
                        <Button
                          variant={"blue"}
                          type="submit"
                          className="ml-auto"
                          disabled={
                            form.watch("comment")?.trim().length === 0 ||
                            form.formState.isSubmitting
                          }
                        >
                          {form.formState.isSubmitting
                            ? "Loading..."
                            : "Comment"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          {/* settings task */}
          <div className="flex-col flex gap-2 mt-2 md:mt-0">
            {/* assignees */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground text-sm">Assignees</p>
                {/* <Button variant={"ghost"} type="button">
                  <Settings />
                </Button> */}
                <AssigneesSelector />
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src={task?.user?.avatar}
                  alt={task?.user?.username}
                  className="w-6 h-6"
                />
                <p className="text-foreground text-sm">
                  {task?.user?.username}
                </p>
              </div>
            </div>
            <Separator className="mt-2" />

            {/* priority */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground text-sm">Priority</p>
                <PriorityDropdown
                  currPriorityTask={task?.priority as PriorityType}
                />
              </div>
              <div>
                <PriorityTaskBadge priority={task?.priority as PriorityType} />
              </div>
            </div>
            <Separator className="mt-2" />

            {/* status */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground text-sm">Status</p>
                <StatusDropdown currStatusTask={task?.status as StatusType} />
              </div>
              <div>
                <StatusTaskBadge status={task?.status as StatusType} />
              </div>
            </div>
            <Separator className="mt-2" />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
