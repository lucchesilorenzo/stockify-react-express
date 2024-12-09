import { updateData } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UpdateTaskField = {
  field: string;
  value: string;
  taskId: string;
};

export function useUpdateTaskField() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ field, value, taskId }: UpdateTaskField) =>
      updateData(`/tasks/${taskId}/field`, { field, value }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
