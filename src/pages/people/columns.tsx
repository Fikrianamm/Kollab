import { DataTableColumnHeader } from "@/components/column-header";
import { User } from "@/types/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

import { MoreHorizontal, PenLine, Trash2 } from "lucide-react";
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

function DropdownAction({ row }: { row: Row<User> }) {
  const people = row.original;

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
          <Link to={`/peoples/edit/${people.user_id}`}>
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
            are you sure you want to delete member{" "}
            <span className="font-semibold text-foreground">{people.name}</span>
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

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => (
      <img
        src={row.getValue("avatar")}
        alt={row.getValue("name")}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full"
      />
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
