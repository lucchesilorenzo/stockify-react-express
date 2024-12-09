import { updateData } from "@/lib/api-client";
import { TTaskEditFormSchema } from "@/lib/validations/task-validations";
import { Task } from "@stockify/backend/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      taskId,
    }: {
      data: TTaskEditFormSchema;
      taskId: Task["id"];
    }) => updateData(`/tasks/${taskId}`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
