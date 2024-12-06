import { useState } from "react";

import { Task } from "@prisma/client";
import { MoreHorizontalIcon } from "lucide-react";

import DropdownSubMenu from "../common/DropdownSubMenu";
import FormDialog from "../common/FormDialog";
import MainAlertDialog from "../common/MainAlertDialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useTask } from "@/hooks/useTask";
import { taskLabels, taskPriorities, taskStatuses } from "@/lib/data";

type TaskActionsProps = {
  task: Task;
};

export default function TaskActions({ task }: TaskActionsProps) {
  const { handleDeleteTask, handleUpdateTaskField } = useTask();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  async function onDeleteTask() {
    await handleDeleteTask(task.id);
    setIsAlertOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownSubMenu
            menuTrigger="Status"
            value={task.status}
            onValueChange={(value) =>
              handleUpdateTaskField("status", value, task.id)
            }
            itemGroup={taskStatuses}
          />

          <DropdownSubMenu
            menuTrigger="Label"
            value={task.label}
            onValueChange={(value) =>
              handleUpdateTaskField("label", value, task.id)
            }
            itemGroup={taskLabels}
          />

          <DropdownSubMenu
            menuTrigger="Priority"
            value={task.priority}
            onValueChange={(value) =>
              handleUpdateTaskField("priority", value, task.id)
            }
            itemGroup={taskPriorities}
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsAlertOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FormDialog
        actionType="editTask"
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        task={task}
      />

      <MainAlertDialog
        type="task"
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        onDeleteItem={onDeleteTask}
      />
    </>
  );
}
