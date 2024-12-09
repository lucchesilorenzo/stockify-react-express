import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@stockify/backend/types";
import { useForm } from "react-hook-form";

import TaskFormDatePicker from "./task-form/TaskFormDatePicker";

import { LoadingButton } from "@/components/common/LoadingButton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  TTaskEditFormSchema,
  taskEditFormSchema,
} from "@/lib/validations/task-validations";
import { useUpdateTask } from "@/hooks/mutations/tasks/useUpdateTask";

type TaskEditFormProps = {
  onFormSubmit: () => void;
  task: Task;
};

export default function TaskEditForm({
  onFormSubmit,
  task,
}: TaskEditFormProps) {
  const { mutateAsync: updateTask } = useUpdateTask();
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<TTaskEditFormSchema>({
    resolver: zodResolver(taskEditFormSchema),
    defaultValues: {
      title: task.title,
      dueDate: task.dueDate,
    },
  });

  async function onSubmit(data: TTaskEditFormSchema) {
    await updateTask({ data, taskId: task.id });
    onFormSubmit();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <div className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Textarea
            id="title"
            placeholder="Enter task title"
            defaultValue={task.title}
            rows={3}
            {...register("title")}
          />
          {errors.title && (
            <p className="px-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <TaskFormDatePicker control={control} name="dueDate" />
          {errors.dueDate && (
            <p className="px-1 text-sm text-red-600">
              {errors.dueDate.message}
            </p>
          )}
        </div>
      </div>

      <LoadingButton isLoading={isSubmitting} className="w-full">
        Edit
      </LoadingButton>
    </form>
  );
}
