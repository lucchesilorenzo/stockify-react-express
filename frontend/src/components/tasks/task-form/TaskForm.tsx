import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "../../common/LoadingButton";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import TaskFormDatePicker from "./TaskFormDatePicker";

import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/mutations/tasks/useCreateTask";
import { taskLabels, taskPriorities, taskStatuses } from "@/lib/data";
import {
  TTaskFormSchema,
  taskFormSchema,
} from "@/lib/validations/task-validations";
import { useFontSize } from "@/hooks/useFontSize";
import { cn } from "@/lib/utils";

type TaskFormProps = {
  onFormSubmit: () => void;
};

export default function TaskForm({ onFormSubmit }: TaskFormProps) {
  const { fontSize } = useFontSize();
  const { mutateAsync: createTask } = useCreateTask();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm<TTaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
  });

  const space: Record<string, { spaceY: string }> = {
    "text-md": { spaceY: "space-y-6" },
    "text-lg": { spaceY: "space-y-4" },
    "text-xl": { spaceY: "space-y-2" },
  };

  async function onSubmit(data: TTaskFormSchema) {
    await createTask(data);
    onFormSubmit();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className={cn(space[fontSize].spaceY)}>
        <div className="space-y-1">
          <Label htmlFor="title">
            Title <span className="text-red-600">*</span>
          </Label>
          <Textarea
            id="title"
            placeholder="Enter task title"
            {...register("title")}
          />
          {errors.title && (
            <p className="px-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="status">
            Status <span className="text-red-600">*</span>
          </Label>
          <Select onValueChange={(value) => setValue("status", value)}>
            <SelectTrigger id="status-select" className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              {taskStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  <div className="flex items-center">
                    <status.icon className="mr-2 h-4 w-4" />
                    <span>{status.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="px-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="priority">
            Priority <span className="text-red-600">*</span>
          </Label>
          <Select onValueChange={(value) => setValue("priority", value)}>
            <SelectTrigger id="priority-select" className="w-full">
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              {taskPriorities.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  <div className="flex items-center">
                    <priority.icon className="mr-2 h-4 w-4" />
                    <span>{priority.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.priority && (
            <p className="px-1 text-sm text-red-600">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="label">
            Label <span className="text-red-600">*</span>
          </Label>
          <Select onValueChange={(value) => setValue("label", value)}>
            <SelectTrigger id="label-select" className="w-full">
              <SelectValue placeholder="Select a label" />
            </SelectTrigger>
            <SelectContent>
              {taskLabels.map((label) => (
                <SelectItem key={label.value} value={label.value}>
                  {label.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.label && (
            <p className="px-1 text-sm text-red-600">{errors.label.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="dueDate">
            Due Date <span className="text-red-600">*</span>
          </Label>
          <TaskFormDatePicker control={control} name="dueDate" />
          {errors.dueDate && (
            <p className="px-1 text-sm text-red-600">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        <LoadingButton isLoading={isSubmitting} className="w-full">
          Create
        </LoadingButton>
      </div>
    </form>
  );
}
