import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { COLUMNS, INITIAL_TASKS } from "@/constants/taskConstants";
import { workspaces } from "@/dummy/data";
import { MoreHorizontal, PenLine, Plus, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router";

type TaskStatus = "TODO" | "IN_PROGRESS" | "ON_REVIEW" | "DONE";

export interface ITask {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
}

export interface IColumn {
  id: TaskStatus;
  title: string;
}

interface ColumnProps {
  column: IColumn;
  tasks: ITask[];
  key?: string;
}

interface TaskCardProps {
  task: ITask;
  key?: string;
}

function WorkspaceActions() {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden" asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link to={`/workspaces/edit/`}>
            <DropdownMenuItem>
              <PenLine />
              Edit
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DialogTrigger className="w-full">
            <DropdownMenuItem>
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="w-[calc(100dvw-32px)] md:w-full rounded-lg">
        <DialogHeader>
          <DialogTitle>Confirm delete</DialogTitle>
          <DialogDescription className="py-4">
            are you sure you want to delete task{" "}
            <span className="font-semibold text-foreground">test</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <div>
            <Button variant="destructive" type="button">
              Delete
            </Button>
          </div>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function WorkspaceColumn(props: ColumnProps) {
  const { column, tasks, key } = props;
  return (
    <div key={key} className="flex flex-1 flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-muted-foreground">{column.title}</h2>
        <Plus
          className="text-muted-foreground hover:text-foreground"
          size={20}
        />
      </div>
      <div className="flex flex-col flex-1 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

function TaskCard(props: TaskCardProps) {
  const { task, key } = props;
  return (
    <div
      key={key}
      className="cursor-grab rounded-md border border-border hover:border-blue-600 p-4 shadow-sm hover:shadow-md"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-foreground">{task.title}</h3>
        <MoreHorizontal size={16} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
    </div>
  );
}

export default function WorkspacePage() {
  const { id } = useParams();
  const workspace = workspaces.find((workspace) => workspace.project_id === id);
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Workspace</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 pb-28 px-4 lg:px-4 pt-0">
        {/* background workspace */}
        <div
          className="bg-black rounded-md w-full h-52"
          style={{
            backgroundImage: "url('/backgroundwp1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="h-14 md:h-20 relative">
          <div className="absolute flex items-end justify-between -top-10 md:-top-16 w-full">
            <div className="flex items-end gap-4">
              {/* image workspace */}
              <img
                src="/javascript.png"
                className="w-20 h-20 md:w-32 md:h-32 ml-4 rounded-md"
              />
              <h2 className="md:text-[32px] text-2xl font-semibold md:mb-2">
                {workspace?.title}
              </h2>
            </div>
            <WorkspaceActions />
            <div className="items-end md:flex hidden">
              <Button variant={"transparent"}>Create Card</Button>
              <Button variant={"transparent"}>Setting</Button>
            </div>
          </div>
        </div>
        <div className="max-w-dvw overflow-x-auto">
          <div className="grid grid-cols-4 gap-4">
            {COLUMNS.map((column) => (
              <WorkspaceColumn
                key={column.id}
                column={column}
                tasks={INITIAL_TASKS.filter(
                  (task) => task.status === column.id
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
