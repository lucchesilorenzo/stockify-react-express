import { postData } from "@/lib/api-client";
import { TTaskGeneratorFormSchema } from "@/lib/validations/task-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGenerateTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TTaskGeneratorFormSchema) =>
      postData("/tasks/generate", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
