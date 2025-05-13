import { DataTableColumnHeader } from "@/components/column-header";
import { Task } from "@/types/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

import { Eye, MoreHorizontal, PenLine, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { PriorityTaskBadge, StatusTaskBadge } from "@/components/badge";

function DropdownAction({ row }: { row: Row<Task> }) {
  const task = row.original;

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
          <Link
            to={`/workspaces/${task.workspace_id}/task/${task.workspace_id}`}
          >
            <DropdownMenuItem>
              <Eye />
              View
            </DropdownMenuItem>
          </Link>
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

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "project.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Workspace" />
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      return <PriorityTaskBadge priority={row.getValue("priority")} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusTaskBadge status={row.getValue("status")} />;
    },
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned To" />
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const formattedDate = format(row.getValue("created_at"), "LLL dd, yyyy");
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "Actions",
    enableHiding: false,
    cell: ({ row }) => <DropdownAction row={row} />,
  },
];
