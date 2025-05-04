import { DataTableColumnHeader } from "@/components/column-header";
import { User } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

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
    cell: ({ row }) => <div>{row.getValue("avatar")}</div>,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const formattedDate = format(row.getValue("created_at"), "LLL dd, yyyy");
      return <div>{formattedDate}</div>;
    },
  },
];
