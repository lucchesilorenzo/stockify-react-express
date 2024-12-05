"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoadingButton } from "../common/loading-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// import { generateTasks } from "@/app/actions/task-actions";
import { Textarea } from "@/components/ui/textarea";
import {
  TTaskGeneratorFormSchema,
  taskGeneratorFormSchema,
} from "@/lib/validations/task-validations";

type GenerateTaskFormProps = {
  onFormSubmit: () => void;
};

export default function GenerateTaskForm({
  onFormSubmit,
}: GenerateTaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TTaskGeneratorFormSchema>({
    resolver: zodResolver(taskGeneratorFormSchema),
  });

  async function onSubmit(data: TTaskGeneratorFormSchema) {
    // const result = await generateTasks(data);
    // if (result?.message) {
    //   toast.error(result.message);
    //   return;
    // }
    // onFormSubmit();
    // toast.success("Tasks created successfully.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="prompt">
            Prompt <span className="text-red-600">*</span>
          </Label>
          <Textarea
            id="prompt"
            placeholder="Generate a task..."
            rows={3}
            {...register("prompt")}
          />
          {errors.prompt && (
            <p className="px-1 text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="numTasks">
            Number of tasks <span className="text-red-600">*</span>
          </Label>
          <Input
            id="numTasks"
            placeholder="Enter number of tasks"
            {...register("numTasks")}
          />
          {errors.numTasks && (
            <p className="px-1 text-sm text-red-600">
              {errors.numTasks.message}
            </p>
          )}
        </div>

        <LoadingButton isLoading={isSubmitting} className="w-full">
          Generate
        </LoadingButton>
      </div>
    </form>
  );
}
