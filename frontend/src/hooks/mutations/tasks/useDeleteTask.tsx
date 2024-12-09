import { deleteData } from "@/lib/api-client";
import { Task } from "@stockify/backend/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: Task["id"]) => deleteData(`/tasks/${taskId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
