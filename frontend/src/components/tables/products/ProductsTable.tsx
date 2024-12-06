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
import { Download } from "lucide-react";

import CSVExport from "@/components/common/CSVExport";
import ProductTablePopover from "@/components/products/ProductTablePopover";
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
import { useProduct } from "@/hooks/useProduct";

export interface ProductsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  csvData: Record<string, string | number>[];
}

export default function ProductsTable<TData, TValue>({
  columns,
  data,
  csvData,
}: ProductsTableProps<TData, TValue>) {
  const { categories } = useProduct();
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
              column="name"
              id="product-search"
              placeholder="Filter products..."
            />

            <TableSelect
              table={table}
              column="category.name"
              id="category-select"
              placeholder="Select categories"
              defaultOptionLabel="All Categories"
              categoryItems={categories}
              className="w-[100px] md:w-[300px]"
            />

            <ProductTablePopover table={table} />

            <CSVExport data={csvData} fileName="products.csv">
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:block">Export</span>
            </CSVExport>
          </div>
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
