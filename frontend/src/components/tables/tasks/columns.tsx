"use client";

import React from "react";

import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";

import TaskActions from "@/components/tasks/task-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { taskLabels, taskPriorities, taskStatuses } from "@/lib/data";
import { TaskWithUser } from "@/lib/types";
import { formatTaskId } from "@/lib/utils";

export const columns: ColumnDef<TaskWithUser>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const task = row.original;

      return <div className="font-medium">{formatTaskId(task)}</div>;
    },
  },
  {
    accessorKey: "label",
    id: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const label: Task["label"] = row.getValue("label");

      const taskLabel = taskLabels.find((item) => item.value === label);

      return <Badge variant="outline">{taskLabel?.label}</Badge>;
    },
  },
  {
    accessorKey: "title",
    id: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: Task["title"] = row.getValue("title");

      return (
        <div className="max-w-[500px] truncate text-left font-medium">
          {title}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    id: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: Task["status"] = row.getValue("status");

      const statusInfo = taskStatuses.find((item) => item.value === status);
      const Icon = statusInfo?.icon ?? "";

      return (
        <div className="flex min-w-[100px] items-center justify-center gap-2">
          {React.createElement(Icon, {
            className: "h-4 w-4 text-muted-foreground",
          })}
          <span>{statusInfo?.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    id: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priority: Task["priority"] = row.getValue("priority");

      const priorityInfo = taskPriorities.find(
        (item) => item.value === priority,
      );
      const Icon = priorityInfo?.icon ?? "";

      return (
        <div className="flex items-center justify-center gap-2">
          {React.createElement(Icon, {
            className: "h-4 w-4 text-muted-foreground",
          })}
          <span>{priorityInfo?.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    id: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate: Task["dueDate"] = row.getValue("dueDate");

      return <div className="text-center">{format(dueDate, "yyyy-MM-dd")}</div>;
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
        <div className="min-w-[150px] text-center font-medium">{`${firstName} ${lastName}`}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return <TaskActions task={task} />;
    },
  },
];
