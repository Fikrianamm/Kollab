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
import { INITIAL_TASKS } from "@/constants/taskConstants";
import { workspaces } from "@/dummy/data";
import {
  MoreHorizontal,
  PenLine,
  Plus,
  Trash2,
} from "lucide-react";
import { Link, useParams } from "react-router";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useDroppable,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { useState } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskStatus = "TODO" | "IN_PROGRESS" | "ON_REVIEW" | "DONE";

export interface Task {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
}

export interface Container {
  id: TaskStatus;
  title: string;
  tasks: Task[];
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
              Setting
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

function SortableItem({ id, task }: { id: UniqueIdentifier; task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing touch-none rounded-md border border-border hover:border-blue-600 p-4 shadow-sm hover:shadow-md bg-background ${
        isDragging ? "z-10 opacity-50 shadow-md" : ""
      }`}
      style={style}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-foreground">{task.title}</h3>
        <MoreHorizontal size={16} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
    </li>
  );
}

function DroppableContainer({
  id,
  title,
  tasks,
}: {
  id: string;
  title: string;
  tasks: Task[];
}) {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <div ref={setNodeRef} className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-muted-foreground">{title}</h2>
        <Plus
          className="text-muted-foreground hover:text-foreground"
          size={20}
        />
      </div>
      <div className="flex-1">
        <SortableContext
          items={tasks.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex flex-col gap-4">
            {tasks.map((task) => (
              <SortableItem key={task.id} task={task} id={task.id} />
            ))}
          </ul>
        </SortableContext>
      </div>
    </div>
  );
}

function ItemOverlay({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className={`cursor-grab active:cursor-grabbing touch-none rounded-md border border-border hover:border-blue-600 p-4 shadow-sm hover:shadow-md bg-background`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-foreground">{title}</h3>
        <MoreHorizontal size={16} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default function WorkspacePage() {
  const { id } = useParams();
  const [containers, setContainers] = useState<Container[]>(INITIAL_TASKS);
  void setContainers;

  const workspace = workspaces.find((workspace) => String(workspace.id) === id);
  // const [tasks, setTasks] = useState<ITask[]>([...INITIAL_TASKS]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  void activeId;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  function findContainerId(
    itemId: UniqueIdentifier
  ): UniqueIdentifier | undefined {
    if (containers.some((container) => container.id === itemId)) {
      return itemId;
    }
    return containers.find((container) =>
      container.tasks.some((item) => item.id === itemId)
    )?.id;
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const activeContainerId = findContainerId(activeId);
    const overContainerId = findContainerId(overId);

    if (!activeContainerId || !overContainerId) {
      return;
    }

    if (activeContainerId === overContainerId && activeId !== overId) {
      return;
    }

    if (activeContainerId === overContainerId) return;

    setContainers((prev) => {
      const activeContainer = prev.find((c) => c.id === activeContainerId);
      if (!activeContainer) return prev;

      const activeItem = activeContainer.tasks.find(
        (item) => item.id === activeId
      );

      if (!activeItem) return prev;

      const newContainers = prev.map((container) => {
        if (container.id === activeContainerId) {
          return {
            ...container,
            tasks: container.tasks.filter((item) => item.id !== activeId),
          };
        }

        if (container.id === overContainerId) {
          if (overId === overContainerId) {
            return {
              ...container,
              tasks: [...container.tasks, activeItem],
            };
          }
          const overItemIndex = container.tasks.findIndex(
            (item) => item.id === overId
          );
          if (overItemIndex !== -1) {
            return {
              ...container,
              tasks: [
                ...container.tasks.slice(0, overItemIndex + 1),
                activeItem,
                ...container.tasks.slice(overItemIndex + 1),
              ],
            };
          }
        }

        return container;
      });
      return newContainers;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeContainerId = findContainerId(active.id);
    const overContainerId = findContainerId(over.id);

    if (!activeContainerId || !overContainerId) {
      setActiveId(null);
      return;
    }

    if (activeContainerId === overContainerId && active.id !== over.id) {
      const containerIndex = containers.findIndex(
        (c) => c.id === activeContainerId
      );

      if (containerIndex === -1) {
        setActiveId(null);
        return;
      }

      const container = containers[containerIndex];
      const activeIndex = container.tasks.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = container.tasks.findIndex(
        (item) => item.id === over.id
      );

      if (activeIndex !== -1 && overIndex !== -1) {
        const newItems = arrayMove(container.tasks, activeIndex, overIndex);

        setContainers((containers) => {
          return containers.map((c, i) => {
            if (i === containerIndex) {
              return { ...c, tasks: newItems };
            }
            return c;
          });
        });
      }
    }
    setActiveId(null);
  };

  function getActiveItem() {
    for (const container of containers) {
      const item = container.tasks.find((item) => item.id === activeId);
      if (item) return item;
    }
    return null;
  }

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
                {workspace?.name}
              </h2>
            </div>
            <WorkspaceActions />
            <div className="items-end md:flex hidden">
              <Button variant={"transparent"}>Create Task</Button>
              <Button variant={"transparent"}>Setting</Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto pb-6">
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            collisionDetection={closestCorners}
            sensors={sensors}
          >
            <div className="flex gap-4 min-w-max md:min-w-0 w-full">
              {containers.map((container) => (
                <DroppableContainer
                  key={container.id}
                  id={container.id}
                  title={container.title}
                  tasks={container.tasks}
                />
              ))}
            </div>
            <DragOverlay
              dropAnimation={{
                duration: 150,
                easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
              }}
            >
              {activeId ? (
                <ItemOverlay
                  title={getActiveItem()?.title as string}
                  description={getActiveItem()?.description as string}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </SidebarInset>
  );
}
