import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { columns } from "./columns";
import { users } from "@/dummy/data";

import React, { useEffect, useState, useCallback } from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, CirclePlus } from "lucide-react";
import { useNavigate } from "react-router";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function PeoplesPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const navigate = useNavigate();
  const loading = false;

  // Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 0,
    totalCount: 0,
  });

  // Search filter state
  const [searchFilter, setSearchFilter] = useState("");

  const table = useReactTable({
    data: users || [],
    columns,
    onSortingChange: (newSorting) => {
      setSorting(newSorting);
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    pageCount: pagination.totalPages,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
  });

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchFilter(value);
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0, // Reset to first page on new search
      }));
    }, 500), // 500ms delay
    []
  );

  // Handle input change
  const handleSearch = (value: string) => {
    setSearchFilter(value); // Update the displayed input value immediately

    debouncedSearch(value);
  };

  const handleNextPage = () => {
    if (pagination.pageIndex < pagination.totalPages - 1) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  };

  const handlePreviousPage = () => {
    if (pagination.pageIndex > 0) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex - 1,
      }));
    }
  };

  // Cleanup debounced functions when component unmounts
  useEffect(
    () => () => {
      debouncedSearch.cancel();
    },
    [debouncedSearch]
  );

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Peoples</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 pb-28 px-4 lg:px-8 pt-0">
        <div>
          <h2 className="md:text-[32px] text-2xl font-semibold">Peoples</h2>
          <p className="text-sm md:text-xl text-muted-foreground">
            A list of all the people in your team
          </p>
        </div>
        <div className="w-full">
          <div className="flex flex-col md:flex-row gap-2 items-center py-2 md:py-4">
            <Input
              placeholder="Search by name"
              value={searchFilter}
              onChange={(event) => handleSearch(event.target.value)}
              className="max-w-sm"
            />
            <div className="flex gap-2 w-full justify-end">
              <Button
                variant="blue"
                onClick={() => navigate("/invoice/create")}
                className="flex-1 md:flex-none"
              >
                <CirclePlus size={16} />
                <span>Create</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Columns <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="rounded-md border w-[calc(100dvw-32px)] md:w-full">
            <Table className="overflow-x-scroll">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map(
                    (
                      _,
                      rowIndex // Ubah 5 sesuai jumlah row skeleton yang diinginkan
                    ) => (
                      <TableRow key={rowIndex}>
                        {columns.map((column, colIndex) => (
                          <TableCell key={colIndex}>
                            <Skeleton className="w-full h-6 rounded-md" />
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  )
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="p-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                pagination.totalCount
              )}{" "}
              of {pagination.totalCount} entries
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">
                Page {pagination.pageIndex + 1} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={pagination.pageIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={pagination.pageIndex >= pagination.totalPages - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
