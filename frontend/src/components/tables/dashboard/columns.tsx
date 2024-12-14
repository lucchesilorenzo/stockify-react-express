import { Activity } from "@stockify/backend/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardActivity } from "@/lib/types";
import { capitalize, cn } from "@/lib/utils";

export const columns: ColumnDef<DashboardActivity>[] = [
  {
    accessorKey: "activity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Activity
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const activity: DashboardActivity["activity"] = row.getValue("activity");
      const formattedActivity = capitalize(activity);

      let activityColor;

      switch (activity) {
        case "CREATED":
          activityColor = "bg-green-100 text-green-800";
          break;
        case "UPDATED":
          activityColor = "bg-yellow-100 text-yellow-800";
          break;
        case "DELETED":
          activityColor = "bg-red-100 text-red-800";
          break;
        case "ARCHIVED":
          activityColor = "bg-gray-100 text-gray-800";
          break;
        case "RESTORED":
          activityColor = "bg-cyan-100 text-cyan-800";
          break;
      }

      return (
        <div
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            activityColor,
          )}
        >
          {formattedActivity}
        </div>
      );
    },
  },
  {
    accessorKey: "entity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Entity
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product: DashboardActivity["product"] = row.getValue("product");

      return <div>{product || "N/A"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Activity["createdAt"] = row.getValue("createdAt");

      return (
        <div className="min-w-[150px] text-center">
          {format(date, "yyyy-MM-dd | HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    id: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Operator
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const firstName = row.original.user.firstName;
      const lastName = row.original.user.lastName;

      return (
        <div className="min-w-[150px] font-medium">{`${firstName} ${lastName}`}</div>
      );
    },
  },
];
