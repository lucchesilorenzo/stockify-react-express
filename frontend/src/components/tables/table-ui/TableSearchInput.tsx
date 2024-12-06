import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";

import { Input } from "../../ui/input";

import { cn } from "@/lib/utils";

type TableSearchInputProps<T> = {
  table: Table<T>;
  column: string;
  id: string;
  placeholder?: string;
  className?: string;
};

export default function TableSearchInput<T>({
  table,
  column,
  id,
  placeholder,
  className,
}: TableSearchInputProps<T>) {
  return (
    <>
      <Search className="absolute left-5 h-5 w-5 text-gray-500" />
      <Input
        id={id}
        type="search"
        placeholder={placeholder}
        value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
        onChange={(e) =>
          table.getColumn(column)?.setFilterValue(e.target.value)
        }
        className={cn("max-w-sm pl-10", className)}
      />
    </>
  );
}
