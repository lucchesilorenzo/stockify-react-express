import { Table } from "@tanstack/react-table";
import { PlusCircleIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { cn } from "@/lib/utils";

type TableSelectProps<T> = {
  table: Table<T>;
  column: string;
  id: string;
  placeholder?: string;
  defaultOptionLabel: string;
  categoryItems?: { id: string; name: string }[];
  orderItems?: { value: string; label: string }[];
  taskItems?: { value: string; label: string; icon: React.ElementType }[];
  className?: string;
  type?: "task" | "order";
};

export default function TableSelect<T>({
  table,
  column,
  id,
  placeholder,
  defaultOptionLabel,
  categoryItems,
  orderItems,
  taskItems,
  className,
  type,
}: TableSelectProps<T>) {
  if (type === "task" && taskItems) {
    return (
      <Select
        onValueChange={(value) =>
          table.getColumn(column)?.setFilterValue(value === "all" ? "" : value)
        }
      >
        <SelectTrigger id={id} className={cn(className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              <span>{defaultOptionLabel}</span>
            </div>
          </SelectItem>
          {taskItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <div className="flex items-center">
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (type === "order" && orderItems) {
    return (
      <Select
        onValueChange={(value) =>
          table.getColumn(column)?.setFilterValue(value === "all" ? "" : value)
        }
      >
        <SelectTrigger id={id} className={cn(className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{defaultOptionLabel}</SelectItem>
          {orderItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Select
      onValueChange={(value) =>
        table.getColumn(column)?.setFilterValue(value === "all" ? "" : value)
      }
    >
      <SelectTrigger id={id} className={cn(className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{defaultOptionLabel}</SelectItem>
        {categoryItems &&
          categoryItems.map((item) => (
            <SelectItem key={item.id} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
