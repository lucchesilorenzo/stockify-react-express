import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlusCircleIcon } from "lucide-react";

import FormDialog from "@/components/common/FormDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/tables/table-ui/TablePagination";
import TableSearchInput from "@/components/tables/table-ui/TableSearchInput";
import TableSelect from "@/components/tables/table-ui/TableSelect";
import { taskPriorities, taskStatuses } from "@/lib/data";

export interface TasksTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function TasksTable<TData, TValue>({
  columns,
  data,
}: TasksTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      {/* Filters and actions */}
      <div>
        <div className="flex items-center justify-between gap-x-4 py-4">
          <div className="relative flex items-center space-x-2">
            <TableSearchInput
              table={table}
              column="title"
              id="task-search"
              placeholder="Filter tasks..."
            />

            <TableSelect
              table={table}
              column="status"
              id="status-task-select"
              placeholder="Select status"
              defaultOptionLabel="All Statuses"
              type="task"
              taskItems={taskStatuses}
            />

            <TableSelect
              table={table}
              column="priority"
              id="priority-task-select"
              placeholder="Select priority"
              defaultOptionLabel="All Priorities"
              type="task"
              taskItems={taskPriorities}
            />
          </div>
          <FormDialog actionType="addTask">
            <PlusCircleIcon className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:block">Add Task</span>
          </FormDialog>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <TablePagination table={table} />
      </div>
    </>
  );
}
