import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import parse from "html-react-parser";
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
import {
  Eye,
  MoreHorizontal,
  PenLine,
  Plus,
  SquareCheck,
  Trash2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
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
import { useEffect, useState } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useWorkspace from "@/stores/useWorkspace";
import { getAllWorkspace } from "@/utils/api";
import useTask from "@/stores/useTask";
import { PriorityType, StatusType, Task } from "@/types/types";
import { transformWorkspaceTasks } from "@/utils/transformWorkspaceTasks";
import useAuth from "@/stores/useAuth";
import { PriorityTaskBadge } from "@/components/badge";
import { formatDistance, isBefore } from "date-fns";
import { Progress } from "@/components/ui/progress";

export interface Container {
  id: StatusType;
  title: string;
  tasks: Task[];
}

function WorkspaceActions() {
  const { workspace } = useWorkspace();
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
          <Link to={`/workspaces/edit/${workspace?.id}`}>
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
            are you sure you want to delete workspace{" "}
            <span className="font-semibold text-foreground">
              {workspace?.name}
            </span>
            ?
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

function OptionMenuTask({ task }: { task: Task }) {
  const { workspace } = useWorkspace();
  const { deleteTask, loading } = useTask();
  const { dataUser } = useAuth();
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link to={`/workspaces/${workspace?.id}/task/${task.id}`}>
            <DropdownMenuItem>
              <Eye />
              View
            </DropdownMenuItem>
          </Link>
          {dataUser?.role === "Leader" && (
            <>
              <DropdownMenuSeparator />
              <Link to={`/tasks/edit/${task.id}`}>
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
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="w-[calc(100dvw-32px)] md:w-full rounded-lg">
        <DialogHeader>
          <DialogTitle>Confirm delete</DialogTitle>
          <DialogDescription className="py-4">
            are you sure you want to delete task{" "}
            <span className="font-semibold text-foreground">{task.title}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <div>
            <Button
              variant="destructive"
              type="button"
              disabled={loading}
              onClick={() => deleteTask(task.id?.toString() as string)}
            >
              Delete
            </Button>
          </div>
          <DialogClose>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
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

  const parsedDesc = parse(task.description || "");

  const today = new Date();
  const deadline = task.deadline;

  let displayText = "";

  if (isBefore(deadline, today)) {
    displayText = "Overdue";
  } else {
    displayText = formatDistance(deadline, today, { addSuffix: true });
  }

  const completedCount =
    task?.subtask?.filter((obj) => obj.is_complete).length || 0;
  const lengthSubtask = task?.subtask?.length || 0;

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
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-foreground line-clamp-2">
          {task.title}
        </h3>
        <OptionMenuTask task={task} />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center flex-wrap">
          <img
            src={task.user?.avatar}
            alt={task.user?.username}
            className="w-5 h-5 rounded-full"
          />
          <p className="text-muted-foreground text-xs">{task.user?.username}</p>
        </div>
        <PriorityTaskBadge priority={task?.priority as PriorityType} />
      </div>
      <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {parsedDesc}
      </div>
      {lengthSubtask > 0 ? (
        <>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground flex items-center">
              <SquareCheck size={14} className="mr-1" />
              <span className="text-blue-600">{completedCount}</span>/
              {lengthSubtask} completed
            </p>
            <p className="text-xs text-muted-foreground">
              {(completedCount / lengthSubtask) * 100}%
            </p>
          </div>
          <Progress className="my-2" />
          <p className="text-xs text-orange-600">{displayText}</p>
        </>
      ) : (
        <p className="text-xs text-orange-600 mt-2">{displayText}</p>
      )}
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
    <div ref={setNodeRef} className="flex flex-col min-w-[180px] md:w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-muted-foreground">{title}</h2>
        <Plus
          className="text-muted-foreground hover:text-foreground hidden"
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
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {parse(description)}
      </p>
    </div>
  );
}

export default function WorkspacePage() {
  const { id } = useParams();
  const [containers, setContainers] = useState<Container[]>([]);
  const {
    workspace,
    getWorkspace,
    loading,
    resetWorkspace,
    deleteWorkspace,
    updateTaskStatus,
  } = useWorkspace();
  const { dataUser } = useAuth();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  // Update containers when workspace data changes
  useEffect(() => {
    if (workspace && workspace.task) {
      setContainers(transformWorkspaceTasks(workspace.task));
    }
  }, [workspace]);

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

    updateTaskStatus(
      active.id.toString() as string,
      overContainerId.toString() as StatusType
    );

    setActiveId(null);
  };

  function getActiveItem() {
    for (const container of containers) {
      const item = container.tasks.find((item) => item.id === activeId);
      if (item) return item;
    }
    return null;
  }

  const navigate = useNavigate();

  async function handleDeleteWorkspace(id: string) {
    const { success } = await deleteWorkspace(id);
    if (success) {
      navigate("/dashboard");
      getAllWorkspace();
    }
  }

  useEffect(() => {
    getWorkspace(id as string);
  }, [getWorkspace, id]);

  useEffect(() => {
    return () => {
      resetWorkspace();
    };
  }, [resetWorkspace]);

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
        {loading ? (
          <div
            className="bg-gray-600 rounded-md w-full h-52 animate-pulse"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <div
            className="bg-black rounded-md w-full h-52"
            style={{
              backgroundImage: `url(${workspace?.cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className="h-14 md:h-20 relative">
          <div className="absolute flex items-end justify-between -top-10 md:-top-16 w-full">
            <div className="flex items-end gap-4">
              {/* image workspace */}
              {loading ? (
                <div className="w-20 h-20 md:w-32 md:h-32 ml-4 rounded-md bg-gray-600 animate-pulse" />
              ) : (
                <div
                  className="w-20 h-20 md:w-32 md:h-32 ml-4 rounded-md bg-center"
                  style={{
                    backgroundImage: `url(${workspace?.logo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              )}
              <h2 className="md:text-[32px] text-2xl font-semibold md:mb-2">
                {workspace?.name}
              </h2>
            </div>
            {!loading && dataUser?.role === "Leader" && (
              <>
                <WorkspaceActions />
                <div className="items-end md:flex hidden">
                  {/* <Link to={`/tasks/create?workspaceId=${workspace?.id}`}> */}
                  <Link to={`/tasks/create`}>
                    <Button variant={"transparent"}>Create Task</Button>
                  </Link>
                  <Link to={`/workspaces/edit/${workspace?.id}`}>
                    <Button variant={"transparent"}>Setting</Button>
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"transparent"} type="button">
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[calc(100dvw-32px)] md:w-full rounded-lg">
                      <DialogHeader>
                        <DialogTitle>Confirm delete</DialogTitle>
                        <DialogDescription className="py-4">
                          are you sure you want to delete workspace{" "}
                          <span className="font-semibold text-foreground">
                            {workspace?.name}
                          </span>
                          ?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex flex-row justify-end gap-2">
                        <div>
                          <Button
                            variant="destructive"
                            type="button"
                            onClick={() =>
                              handleDeleteWorkspace(String(workspace?.id))
                            }
                          >
                            Delete
                          </Button>
                        </div>
                        <DialogClose>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            )}
          </div>
        </div>
        {loading ? (
          <div className="grid-cols-1 grid w-full h-full bg-gray-600/40 animate-pulse mt-4 rounded-md" />
        ) : (
          <div className="overflow-x-auto pb-6">
            <DndContext
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              collisionDetection={closestCorners}
              sensors={sensors}
            >
              <div className="flex gap-4 w-full md:min-w-0">
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
        )}
      </div>
    </SidebarInset>
  );
}
